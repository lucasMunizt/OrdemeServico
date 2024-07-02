document.getElementById("enviar").addEventListener("click", async function() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value; 
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const aparelho = document.getElementById("aparelho").value;
    const reclamacoes = document.getElementById("reclamacoes").value;
    const observacoes = document.getElementById("observacoes").value;
    const valor = document.getElementById("valor").value;
    const dateInput = document.getElementById("date").value;
    const date = new Date(dateInput).toISOString();
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

    // Função para verificar e analisar a resposta JSON
    const checkResponse = async (response) => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    };

    try {
        // Primeira requisição
        const clientResponse = await fetch("http://localhost:8080/client", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: nome,
                telephone: telefone,
                addres: endereco,
                neighboard: bairro,
            })
        });

        // Segunda requisição
        const servicosResponse = await fetch("http://localhost:8080/servicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                device: aparelho,
                complaints: reclamacoes,
                observations: observacoes,
                value: valor,
                date: date
            })
        });

        const clientData = await checkResponse(clientResponse);
        const servicosData = await checkResponse(servicosResponse);

      
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao enviar os dados."
        });
    }

    limpar();
});

function limpar(){
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("aparelho").value = "";
    document.getElementById("reclamacoes").value = "";
    document.getElementById("observacoes").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("date").value = "";
}
