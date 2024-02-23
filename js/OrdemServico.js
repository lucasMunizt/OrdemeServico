document.getElementById("enviar").addEventListener("click", function() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value; 
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const date = document.getElementById("date").value;
    const aparelho = document.getElementById("aparelho").value;
    const reclamacoes = document.getElementById("reclamacoes").value;
    const observacoes = document.getElementById("observacoes").value;
    fetch("http://localhost:8080/servicos/os", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            telefone: telefone,
            endereco:endereco,
            bairro:bairro,
            date:date,
            aparelho:aparelho,
            reclamacoes:reclamacoes,
            observacoes:observacoes
        })
    })
    .then(function(res) { console.log(res)})
    .catch(function(res) { console.log(res)})


   limpar();
});

function limpar(){
    nome.value = "";
    telefone.value = "";
    endereco.value = "";
    bairro.value = "";
    date.value = "";
    aparelho.value = "";
    reclamacoes.value = "";
    observacoes.value = "";
}




