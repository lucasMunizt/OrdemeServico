document.getElementById('enviar').addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const pedido = document.getElementById('pedido').value;
    const endereco = document.getElementById('endereco').value;
    console.log(nome,pedido,endereco)
    fetch('http://localhost:8080/formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nome,
            pedido: pedido,
            endereco: endereco
        }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Falha na requisição: ' + response.statusText);
    })
    .then(data => console.log(data))
    .catch(error => console.error('Erro ao salvar:', error));
});