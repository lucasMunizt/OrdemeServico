/*const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuração do proxy
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8080', // substitua com a URL do seu backend
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // reescreve o caminho, remove /api
    },
}));

app.listen(5500, () => {
    console.log('Proxy escutando na porta 5500!');
});*/
