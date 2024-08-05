// js/dadosGarantia.js
import { db } from './DataBase/config/configDataBase.js';
import { collection, getDocs, query, orderBy, limit, startAfter } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

let garantias = [];
let lastVisibleGarantia = null;
const pageSize = 10;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "garantia"), orderBy("data", "desc"), limit(pageSize)));
        
        garantias = [];
        querySnapshot.forEach(doc => {
            garantias.push(doc.data());
        });

        lastVisibleGarantia = querySnapshot.docs[querySnapshot.docs.length - 1];
        exibirDadosGarantias(garantias);

        const loadMoreButton = document.getElementById('load-more');

        if (garantias.length === pageSize) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }

        loadMoreButton.addEventListener('click', carregarMaisGarantias);

    } catch (e) {
        console.error("Erro ao carregar dados: ", e);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados."
        });
    }

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === "") {
            exibirDadosGarantias(garantias);
        } else {
            const filteredGarantias = garantias.filter(garantia => 
                (garantia.nome && garantia.nome.toLowerCase().includes(searchTerm)) || 
                (garantia.os && garantia.os.toString().includes(searchTerm))
            );
            exibirDadosGarantias(filteredGarantias);
        }
    });
});

async function carregarMaisGarantias() {
    try {
        const querySnapshot = await getDocs(query(collection(db, "garantia"), orderBy("data", "desc"), startAfter(lastVisibleGarantia), limit(pageSize)));
        querySnapshot.forEach(doc => {
            garantias.push(doc.data());
        });

        lastVisibleGarantia = querySnapshot.docs[querySnapshot.docs.length - 1];
        
        exibirDadosGarantias(garantias);

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

function exibirDadosGarantias(garantias) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = '';

    if (garantias.length === 0) {
        infoDiv.innerHTML = '<p>Nenhum dado encontrado.</p>';
        return;
    }

    garantias.forEach(garantia => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('info-item'); // Adiciona a classe CSS 'info-item'
        itemDiv.innerHTML = `
            <p>OS: ${garantia.os}</p>
            <p>Nome: ${garantia.nome}</p>
            <p>Aparelho: ${garantia.aparelho}</p>
            <p>Peças: ${garantia.pecas}</p>
            <p>Valor: ${garantia.valor}</p>
            <p>Data: ${formatarData(garantia.data)}</p>
            <br>
        `;
        infoDiv.appendChild(itemDiv);
    });
}
