import { db } from './config/configDataBase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

async function GetDataBase(aparelho, nome, pecas, valor) {
    try {
        await addDoc(collection(db, "garantia"), {
            nome: nome,
            aparelho: aparelho,
            pecas: pecas,
            valor: valor,
           
        });
        alert("Dados enviados com sucesso!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        alert("Erro ao enviar dados.");
    }
}

document.getElementById("enviar").addEventListener("click", function() {
    const os = document.getElementById("os").value;
    const nome = document.getElementById("nome").value;
    const aparelho = document.getElementById("aparelho").value;
    const pecas = document.getElementById("pecas").value;
    const valor = document.getElementById("valor").value;
   // const dateInput = document.getElementById("date").value;
  //  const date = new Date(dateInput).toISOString();
  GetDataBase(nome,aparelho,pecas,valor)

    limpar();
});

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("os").value = "";
    document.getElementById("aparelho").value = "";
    document.getElementById("pecas").value = "";
    document.getElementById("date").value = "";
}
