document.getElementById("enviar").addEventListener("click", function() {
    const valor = document.getElementById("valor").value;
    const nome = document.getElementById("nome").value; 
    const valorE = document.getElementById("valorE").value; 
    const aparelho = document.getElementById("aparelho").value; 

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

    fetch("http://localhost:8080/garantia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            value: valor,
            name: nome,
            extensiveValue: valorE,
            product: aparelho  
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Dados enviados com sucesso."
        });
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao enviar os dados."
        });
    });

    limpar();
});

function limpar(){
    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("valorE").value = "";
    document.getElementById("aparelho").value = "";
}


          