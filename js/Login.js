    document.getElementById("entrar").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 
    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na chamada de API: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Trate os dados, redirecione, exiba mensagens, etc.
        console.log(data);
    })
    .catch(error => {
        // Trate erros, exiba mensagens de erro, etc.
        console.error(error.message);
    });
});



