import { auth, signInWithEmailAndPassword } from './config/configDataBase.js';

 export async function LoginDatabese(email,senha){
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        console.log("Login bem-sucedido");
        window.location.href = "/Menu.html";
    } catch (error) {
        console.error("Erro de login:", error.message);
    }
}