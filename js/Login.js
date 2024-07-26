// Login.js

import { auth, signInWithEmailAndPassword } from './config/configDataBase.js';

document.getElementById('entrar').addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, senha);
        console.log("Login bem-sucedido");
        window.location.href = "/Menu.html";
    } catch (error) {
        console.error("Erro de login:", error.message);
    }
    
   

    limpar();
});

function limpar(){
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}
