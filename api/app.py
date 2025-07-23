import io
from flask import Flask, send_file
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import mysql.connector
import pandas as pd
from datetime import datetime

app = Flask(__name__)

A4_WIDTH = 8.27
A4_HEIGHT = 11.69

# Database configuration (replace with your credentials)
config = {
    'user': 'root',
    'password': 'dbadmin08',
    'host': 'localhost',
    'database': 'labssystem'
}

def connect_to_db():
    try:
        conn = mysql.connector.connect(**config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
        return None

def generate_eda_report():
    # Connect to the database
    conn = connect_to_db()
    if conn is None:
        return None
    
    # Create PDF in memory
    buffer = io.BytesIO()
    report_date = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    pdf_filename = f"LabsSystem_EDA_Report_{report_date}.pdf"
    
    with PdfPages(buffer) as pdf:
        # Title page
        plt.figure(figsize=(A4_WIDTH, A4_HEIGHT))
        plt.text(0.5, 0.7, "Relatório de Análise Exploratória de Dados", 
                ha='center', va='center', size=20)
        plt.text(0.5, 0.6, "Sistema de Gestão de Laboratórios de Computação", 
                ha='center', va='center', size=16)
        plt.text(0.5, 0.5, f"Gerado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", 
                ha='center', va='center', size=12)
        plt.axis('off')
        pdf.savefig()
        plt.close()
        
        # Table summary with table style
        plt.figure(figsize=(A4_WIDTH, A4_HEIGHT))
        plt.title("Resumo das Tabelas no Banco de Dados", fontsize=16, pad=20)

        # Get table data
        tables = [
            "Campus", "Block", "Laboratory", "Computer", "User", "LabSchedule", "Program", 
            "LabProgramRequest", "ComputerProgram", "ComputerIssue", 
            "MaintenanceRequest"
        ]
        
        cursor = conn.cursor()
        data = []
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            data.append([table, count])
        
        # Create DataFrame for table
        df_summary = pd.DataFrame(data, columns=["Tabela", "Número de Registros"])
        
        # Create axis
        ax = plt.gca()
        ax.axis('off')
        ax.axis('tight')

        # Create stylized table
        table = ax.table(
            cellText=df_summary.values,
            colLabels=df_summary.columns,
            cellLoc='center',
            loc='center'
        )

        table.auto_set_font_size(False)
        table.set_fontsize(12)
        table.scale(1.2, 1.5)  # Width, Height of cells

        pdf.savefig()
        plt.close()

        fig, axes = plt.subplots(nrows=2, ncols=1, figsize=(A4_WIDTH, A4_HEIGHT))
        fig.suptitle("Gráficos de Análise dos Dados", fontsize=16)

        # GRÁFICO 1: Distribuição de Computadores por Status
        cursor.execute("SELECT status, COUNT(*) FROM Computer GROUP BY status")
        data = cursor.fetchall()
        if data:
            statuses, counts = zip(*data)
            axes[0].bar(statuses, counts, color='skyblue')
            axes[0].set_title("Distribuição de Computadores por Status")
            axes[0].set_xlabel("Status")
            axes[0].set_ylabel("Quantidade")
            axes[0].grid(axis='y')


        # GRÁFICO 2: Problemas por Componente (renderizado em axes[1])
        cursor.execute("SELECT component, COUNT(*) FROM ComputerIssue GROUP BY component")
        data = cursor.fetchall()
        if data:
            components, issue_counts = zip(*data)
            axes[1].pie(issue_counts, labels=components, autopct='%1.1f%%', startangle=90)
            axes[1].set_title("Ocorrências de Problemas por Componente")
            axes[1].axis('equal')  # Mantém proporções
        else:
            axes[1].text(0.5, 0.5, "Sem dados disponíveis", ha='center', va='center')

        pdf.savefig(fig)
        plt.close(fig)

         # ---------- PÁGINA 3: Gráficos por Laboratório ----------

        fig3, axes3 = plt.subplots(nrows=2, ncols=1, figsize=(A4_WIDTH, A4_HEIGHT))
        fig3.suptitle("Análise por Laboratório", fontsize=16)

        # --- Gráfico 1: Computadores por status por laboratório (empilhado por bloco) ---
        cursor.execute("""
            SELECT l.name AS lab_name, b.name AS block_name, c.status, COUNT(*) AS total
            FROM Computer c
            JOIN Laboratory l ON c.lab_id = l.lab_id
            JOIN Block b ON l.block_id = b.block_id
            GROUP BY l.name, b.name, c.status
        """)
        rows = cursor.fetchall()
        df_status = pd.DataFrame(rows, columns=["Laboratório", "Bloco", "Status", "Total"])

        if not df_status.empty:
            pivot = df_status.pivot_table(index=["Laboratório", "Bloco"], columns="Status", values="Total", fill_value=0)
            labs_labels = [f"{lab}\n({block})" for lab, block in pivot.index]
            pivot.index = labs_labels

            bottom = None
            colors = {'disponivel': 'green', 'fora de servico': 'red', 'em reparo': 'orange'}
            for status in ['disponivel', 'fora de servico', 'em reparo']:
                if status in pivot.columns:
                    bars = axes3[0].bar(pivot.index, pivot[status], bottom=bottom, label=status, color=colors[status])
                    axes3[0].bar_label(bars, padding=2, fontsize=6)
                    bottom = pivot[status] if bottom is None else bottom + pivot[status]

            axes3[0].set_title("Status dos Computadores por Laboratório")
            axes3[0].set_ylabel("Quantidade")
            axes3[0].tick_params(axis='x', rotation=0, labelsize=6)
            axes3[0].legend()

        # --- Gráfico 2: Issues por laboratório e por status (agrupado) ---
        cursor.execute("""
            SELECT l.name AS lab_name, ci.status, COUNT(*) AS total
            FROM ComputerIssue ci
            JOIN Computer c ON ci.computer_id = c.computer_id
            JOIN Laboratory l ON c.lab_id = l.lab_id
            GROUP BY l.name, ci.status
        """)
        rows = cursor.fetchall()
        df_issues = pd.DataFrame(rows, columns=["Laboratório", "Status", "Total"])

        if not df_issues.empty:
            pivot = df_issues.pivot(index="Laboratório", columns="Status", values="Total").fillna(0)
            statuses = ["aberto", "em andamento", "resolvido"]
            x = range(len(pivot.index))
            width = 0.25
            for i, status in enumerate(statuses):
                values = pivot[status] if status in pivot.columns else [0]*len(pivot)
                bars = axes3[1].bar(
                    [pos + i*width for pos in x],
                    values,
                    width=width,
                    label=status
                )
                axes3[1].bar_label(bars, padding=2, fontsize=6)
            axes3[1].set_xticks([pos + width for pos in x])
            axes3[1].set_xticklabels(pivot.index, rotation=0, fontsize=6)
            axes3[1].set_title("Ocorrências por Laboratório e Status")
            axes3[1].set_ylabel("Quantidade")
            axes3[1].legend()

        pdf.savefig(fig3)
        plt.close(fig3)

    conn.close()
    buffer.seek(0)
    return buffer, pdf_filename

@app.route('/report')
def get_report():
    report, filename = generate_eda_report()
    if report is None:
        return "Failed to generate report", 500
    report.seek(0)  # Reset buffer position
    return send_file(
        report,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=filename
    )

if __name__ == '__main__':
    app.run(debug=True)