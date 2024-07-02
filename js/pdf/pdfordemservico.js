import { Valorid } from "./Dadosid.js";
document.getElementById('enviar').addEventListener("click", async function() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value; 
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const aparelho = document.getElementById("aparelho").value;
    const reclamacoes = document.getElementById("reclamacoes").value;
    const observacoes = document.getElementById("observacoes").value;
    const valor = document.getElementById("valor").value;
    const dateInput = document.getElementById("date").value;
    const dadosId = await Valorid();
    function formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    const formattedDate = formatDate(dateInput);

    // Verifica se jsPDF está carregado corretamente
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

        // Define o texto em negrito
        doc.setFont("helvetica", "bold");
        doc.text("REGISTRO DE ORDEM DE SERVIÇO", 60, 15);
        doc.text("CLV - ASSISTÊNCIA TÉCNICA EM ELETRODOMÉSTICOS", 60, 20);
        doc.text("TADEU BRITO TELES   CNPJ:40.034.260/0001-67", 60, 25);
        doc.text("RUA: DAMIÃO FERNANDES, 433 - PARQUELÂNDIA", 60, 30);
        doc.text("CEP: 60455-600 - FORTALEZA-CE", 60, 35);
        doc.text("TEL: (85)99994.8957/ (85)3214.6321", 60, 40);
        doc.text(`OS: ${dadosId}`, 10, 65);
        doc.text(`Nome: ${nome}`, 10, 75);
        doc.text(`Telefone: ${telefone}`, 10, 85);
        doc.text(`Endereço: ${endereco}`, 10, 95);
        doc.text(`Bairro: ${bairro}`, 10, 105);
        doc.text(`Modelo: ${aparelho}`, 10, 115);

        // Reclamações
        doc.text(`Reclamação do cliente:`, 10, 125);
        const reclamacoesList = reclamacoes.split('\n');
        let yOffset = 135;
        reclamacoesList.forEach((reclamacao, index) => {
            doc.text(`${index + 1}. ${reclamacao}`, 10, yOffset + index * 10);
        });

        // Observações
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
});
