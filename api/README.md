### 🚀 Como executar a API localmente

Siga os passos abaixo para preparar o ambiente e rodar a aplicação na sua máquina.

**1. Pré-requisitos**
Certifique-se de ter o [Python](https://www.python.org/downloads/) (versão 3.8 ou superior) instalado no seu sistema.

**2. Crie um Ambiente Virtual (Recomendado)**
Abra o terminal na pasta da API e crie um ambiente virtual para isolar as dependências do projeto:

```bash
python -m venv venv
```

**3. Ative o Ambiente Virtual**

- No **Windows**:
  ```bash
  venv\Scripts\activate
  ```
- No **Linux/Mac**:
  ```bash
  source venv/bin/activate
  ```

**4. Instale as Dependências**
Com o ambiente ativado, instale os pacotes necessários lendo o arquivo de requisitos:

```bash
pip install -r requirements.txt
```

**5. Configuração do Banco de Dados**
No arquivo `app.py`, verifique as configurações de conexão com o banco de dados e ajuste com as suas credenciais locais (usuário, senha, etc).

**6. Rode a Aplicação**
Inicie o servidor local rodando o comando:

```bash
python app.py
```

A API estará rodando! Você pode acessar a rota do relatório em: `http://localhost:5000/report`

---

Você pode simplesmente copiar o bloco acima e colar no seu documento ou repositório!
