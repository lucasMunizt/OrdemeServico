import { db } from './DataBase/config/configDataBase.js';
import { collection, addDoc, query, orderBy, limit, getDocs  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

async function GetDataBase(nome, telefone, endereco, bairro, aparelho, reclamacoes, observacoes, valor,data) {
    try {
        await addDoc(collection(db, "servico"), {
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            bairro: bairro,
            aparelho: aparelho,
            reclamacoes: reclamacoes,
            observacoes: observacoes,
            valor: valor,
            data:data,
            id: await getLastId() + 1
        });
        alert("Dados enviados com sucesso!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        alert("Erro ao enviar dados.");
    }
}

document.getElementById("enviar").addEventListener("click",async () => {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const aparelho = document.getElementById("aparelho").value;
    const reclamacoes = document.getElementById("reclamacoes").value;
    const observacoes = document.getElementById("observacoes").value;
    const valor = document.getElementById("valor").value;
    const dateInput = document.getElementById("date").value;
    GetDataBase(nome, telefone, endereco, bairro, aparelho, reclamacoes, observacoes, valor,dateInput);
    console.log("nome"+ nome)
    function formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    const formattedDate = formatDate(dateInput);

    if (window.jspdf) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
       
        doc.setFont("helvetica");
        doc.setFontSize(12);
        const imgUrl = './img/logobranco.jpg';
        const imgX = 10;
        const imgY = 10;
        const imgWidth = 30;
        const imgHeight = 30;
        doc.addImage(imgUrl, 'JPEG', imgX, imgY, imgWidth, imgHeight);

        doc.setFont("helvetica", "bold");
        doc.text("REGISTRO DE ORDEM DE SERVIÇO", 60, 15);
        doc.text("CLV - ASSISTÊNCIA TÉCNICA EM ELETRODOMÉSTICOS", 60, 20);
        doc.text("TADEU BRITO TELES   CNPJ:40.034.260/0001-67", 60, 25);
        doc.text("RUA: DAMIÃO FERNANDES, 433 - PARQUELÂNDIA", 60, 30);
        doc.text("CEP: 60455-600 - FORTALEZA-CE", 60, 35);
        doc.text("TEL: (85)99994.8957/ (85)3214.6321", 60, 40);
        doc.text(`OS: ${await getLastId() + 1}`, 10, 65);
        doc.text(`Nome: ${nome}`, 10, 75);
        doc.text(`Telefone: ${telefone}`, 10, 85);
        doc.text(`Endereço: ${endereco}`, 10, 95);
        doc.text(`Bairro: ${bairro}`, 10, 105);
        doc.text(`Modelo: ${aparelho}`, 10, 115);

        doc.text(`Reclamação do cliente:`, 10, 125);
        const reclamacoesList = reclamacoes.split('\n');
        let yOffset = 135;
        reclamacoesList.forEach((reclamacao, index) => {
            doc.text(`${index + 1}. ${reclamacao}`, 10, yOffset + index * 10);
        });

        doc.text(`Observações:`, 10, yOffset + reclamacoesList.length * 10 + 10);
        const observacoesList = observacoes.split('\n');
        yOffset += reclamacoesList.length * 10 + 20;
        observacoesList.forEach((observacao, index) => {
            doc.text(`${index + 1}. ${observacao}`, 10, yOffset + index * 10);
        });

        yOffset += observacoesList.length * 10 + 10;
        doc.text(`Valor: ${valor}`, 10, yOffset);
        doc.text(`Data: ${formattedDate}`, 10, yOffset + 10);

        doc.save(`${nome}`);
    } else {
        console.error('jsPDF não foi carregado corretamente.');
    }
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

export async function getLastId() {
    try {
        const colRef = collection(db, "servico");
        const q = query(colRef, orderBy("id", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("Nenhum documento encontrado.");
            alert("Nenhum documento encontrado.");
        } else {
            const doc = querySnapshot.docs[0];
            const lastId = doc.data().id;
            console.log("Último ID encontrado:", lastId);
            return lastId;
        }
    } catch (e) {
        console.error("Erro ao buscar o último ID: ", e);
        alert("Erro ao buscar o último ID.");
    }
}