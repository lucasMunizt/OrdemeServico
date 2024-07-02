document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Erro: Token não encontrado');
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Usuário não autenticado! Faça login novamente."
        });
        window.location.href = "/login.html";
        return;
    }

    // Fetch dados do cliente
    fetch("http://localhost:8080/client", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados do cliente:', data); // Adicionado para depuração
        const clienteInfoDiv = document.getElementById('cliente-info');
        data.forEach(cliente => {
            const clienteDiv = document.createElement('div');
            clienteDiv.innerHTML = `
                <p>Nome: ${cliente.name}</p>
                <p>Telefone: ${cliente.telephone}</p>
                <p>Endereço: ${cliente.addres}</p>
                <p>Bairro: ${cliente.neighboard || 'N/A'}</p>
            `;
            clienteInfoDiv.appendChild(clienteDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados do cliente:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados do cliente."
        });
    });

    // Fetch dados dos serviços
    fetch("http://localhost:8080/servicos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados dos serviços:', data); // Adicionado para depuração
        const servicosInfoDiv = document.getElementById('servicos-info');
        data.forEach(servico => {
            const servicoDiv = document.createElement('div');
            servicoDiv.innerHTML = `
                <p>Aparelho: ${servico.device}</p>
                <p>Reclamações: ${servico.complaints}</p>
                <p>Observações: ${servico.observations}</p>
            `;
            servicosInfoDiv.appendChild(servicoDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados dos serviços:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados dos serviços."
        });
    });
});