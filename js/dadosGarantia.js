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

    let garantias = [];

    // Fetch dados da garantia
    fetch("http://localhost:8080/garantia", {
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
        console.log('Dados da garantia:', data); // Adicionado para depuração
        garantias = data;
        exibirDadosGarantia();
    })
    .catch(error => {
        console.error('Erro ao carregar dados da garantia:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados da garantia."
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

    function exibirDadosGarantia() {
        if (garantias.length === 0) {
            return;
        }

        const infoDiv = document.getElementById('info');

        if (!infoDiv) {
            console.error('Erro: Elemento com ID "info" não encontrado no DOM.');
            return;
        }

        garantias.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('info-item'); // Adiciona a classe CSS 'info-item'
            itemDiv.innerHTML = `
                <p>Nome: ${item.name}</p>
                <p>Produto: ${item.product}</p>
                <p>Peças: ${item.parts}</p>
                <p>Valor: ${item.value}</p>
                <p>Data: ${formatarData(item.date)}</p>
                <p>Ordem de Serviço: ${item.os}</p>
                <br>
            `;
            infoDiv.appendChild(itemDiv);
        });
    }
});

