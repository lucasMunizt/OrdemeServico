import { db } from './config/configDataBase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

async function GetDataBase(nome, telefone, endereco, bairro, aparelho, reclamacoes, observacoes, valor) {
    try {
        await addDoc(collection(db, "servico"), {
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            bairro: bairro,
            aparelho: aparelho,
            reclamacoes: reclamacoes,
            observacoes: observacoes,
            valor: valor
        });
        alert("Dados enviados com sucesso!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        alert("Erro ao enviar dados.");
    }
}

document.getElementById("enviar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const aparelho = document.getElementById("aparelho").value;
    const reclamacoes = document.getElementById("reclamacoes").value;
    const observacoes = document.getElementById("observacoes").value;
    const valor = document.getElementById("valor").value;
    GetDataBase(nome, telefone, endereco, bairro, aparelho, reclamacoes, observacoes, valor);
    limpar();
});

function limpar() {
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