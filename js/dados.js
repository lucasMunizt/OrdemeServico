// js/main.js
import { db } from './DataBase/config/configDataBase.js';
import { collection, getDocs, query, orderBy, limit, startAfter } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

let servicos = [];
let lastVisible = null;
const pageSize = 10;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "servico"), orderBy("id", "desc"), limit(pageSize)));
        servicos = [];

        querySnapshot.forEach(doc => {
            servicos.push(doc.data());
        });

        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        exibirDados(servicos);

        const loadMoreButton = document.getElementById('load-more');
        if (servicos.length === pageSize) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }

        loadMoreButton.addEventListener('click', carregarMais);

    } catch (e) {
        console.error("Erro ao carregar dados: ", e);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados."
        });
    }

    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === "") {
            exibirDados(servicos);
        } else {
            const filteredServicos = servicos.filter(servico => 
                (servico.nome && servico.nome.toLowerCase().includes(searchTerm)) || 
                (servico.id && servico.id.toString().includes(searchTerm))
            );
            exibirDados(filteredServicos);
        }
    });
});

async function carregarMais() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "servico"), orderBy("id", "desc"), startAfter(lastVisible), limit(pageSize)));
        querySnapshot.forEach(doc => {
            servicos.push(doc.data());
        });

        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        exibirDados(servicos);

        const loadMoreButton = document.getElementById('load-more');
        if (querySnapshot.docs.length < pageSize) {
            loadMoreButton.style.display = 'none';
        }
    } catch (e) {
        console.error("Erro ao carregar mais dados: ", e);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar mais dados."
        });
    }
}

function formatarData(data) {
    if (!data) return 'N/A';
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function exibirDados(servicos) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = '';

    if (servicos.length === 0) {
        infoDiv.innerHTML = '<p>Nenhum dado encontrado.</p>';
        return;
    }

    servicos.forEach(servico => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('info-item'); // Adiciona a classe CSS 'info-item'
        itemDiv.innerHTML = `
            <p>Nome: ${servico.nome}</p>
            <p>Telefone: ${servico.telefone}</p>
            <p>Endereço: ${servico.endereco}</p>
            <p>Bairro: ${servico.bairro}</p>
            <p>Aparelho: ${servico.aparelho}</p>
            <p>Reclamações: ${servico.reclamacoes}</p>
            <p>Observações: ${servico.observacoes}</p>
            <p>Valor: ${servico.valor}</p>
            <p>Data: ${formatarData(servico.data)}</p>
            <p>ID: ${servico.id}</p>
            <br>
        `;
        infoDiv.appendChild(itemDiv);
    });
}