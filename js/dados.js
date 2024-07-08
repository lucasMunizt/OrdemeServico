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

    let clientes = [];
    let servicos = [];

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
        clientes = data;
        exibirDadosCombinados();
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
        servicos = data;
        exibirDadosCombinados();
    })
    .catch(error => {
        console.error('Erro ao carregar dados dos serviços:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados dos serviços."
        });
    });

    function formatarData(data) {
        if (!data) return 'N/A';
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function exibirDadosCombinados() {
        if (clientes.length === 0 || servicos.length === 0) {
            return;
        }

        const infoDiv = document.getElementById('info');

        if (!infoDiv) {
            console.error('Erro: Elemento com ID "info" não encontrado no DOM.');
            return;
        }

        // Ordenar os clientes e serviços para que os mais recentes fiquem primeiro
        clientes.reverse();
        servicos.reverse();

        const dadosCombinados = clientes.map(cliente => {
            const servicosCliente = servicos.filter(servico => servico.id === cliente.id);
            console.log(`Serviços para o cliente ${cliente.name}:`, servicosCliente);
            return { ...cliente, servicos: servicosCliente };
        });

        console.log('Dados combinados:', dadosCombinados); // Adicionado para depuração

        dadosCombinados.forEach(item => {
      
            const itemDiv = document.createElement('div');
           
            itemDiv.style.backgroundColor = '#e4ebe5'
            itemDiv.style.width = '500px'
            itemDiv.style.height = '400px'
            itemDiv.style.borderRadius = '10px'
            itemDiv.style.color = 'black'
            
            
            
            

            itemDiv.innerHTML = `
                <p style = "margin-top: 60px;">Nome: ${item.name}</p>
                <p>Telefone: ${item.telephone}</p>
                <p>Endereço: ${item.addres}</p>
                <p>Bairro: ${item.neighboard || 'N/A'}</p>
                ${item.servicos.map(servico => `
                    <p>Aparelho: ${servico.device}</p>
                    <p>Reclamações: ${servico.claims || 'N/A'}</p>
                    <p>Observações: ${servico.observation || 'N/A'}</p>
                    <p>Valor: ${servico.value || 'N/A'}</p>
                    <p>Data: ${formatarData(servico.date)}</p>
                `).join('')}
                <br>
            `;
            infoDiv.appendChild(itemDiv);
            
        });
    }
});
