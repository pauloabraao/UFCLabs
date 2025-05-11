const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // ou seu usuário
  password: 'dbadmin08' // substitua pela sua senha
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida! ID da conexão:', connection.threadId);
  
  connection.query('SELECT VERSION()', (err, results) => {
    if (err) throw err;
    console.log('Versão do MySQL:', results[0]['VERSION()']);
    connection.end();
  });
});