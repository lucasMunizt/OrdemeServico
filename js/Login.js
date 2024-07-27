import {LoginDatabese} from "./DataBase/DatabaseLogin.js"

document.getElementById('entrar').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    LoginDatabese(email,senha)
    limpar();
});

function limpar(){
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}
