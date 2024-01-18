const http = require('http');
const app = require('./app');
const port = process.env.PORT || 6002;
const server = http.createServer(app);
console.log('Servidor(profissionais) rodando na porta ' + port);
server.listen(port);
console.log('server running on port: ' + port);
