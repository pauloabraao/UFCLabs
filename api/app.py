import io
from flask import Flask, send_file
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
    'database': 'LabsSystem'
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
            "Campus", "Block", "Laboratory", "Computer", "User", 
            "ScheduleSlot", "LabSchedule", "Program", 
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

    conn.close()
    buffer.seek(0)
    return buffer, pdf_filename

@app.route('/report')
def get_report():
    report, filename = generate_eda_report()
    if report is None:
        return "Failed to generate report", 500
    return send_file(
        report,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=filename
    )

if __name__ == '__main__':
    app.run(debug=True)