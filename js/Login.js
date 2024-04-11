    document.getElementById("entrar").addEventListener("click", function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        fetch("http://localhost:5500/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
            const token = data.token;
            if (token) {
                // Armazene o token no localStorage
                localStorage.setItem('token', token);
                console.log('Token recebido:', token);

                // Verifique o token
                if (verificarToken()) {
                    // Token válido, o usuário está autenticado
                    console.log('Usuário autenticado.');
                    // Faça alguma ação adicional, como redirecionar para outra página
                    window.location.href = "/Menu.html";
                } else {
                    console.log('Usuário não autenticado.');
                    // Trate a situação de não autenticação, se necessário
                }
            } else {
                console.error('Token não recebido na resposta.');
                // Trate a situação de não recebimento do token, se necessário
            }
        })
        .catch(error => {
            // Trate erros, exiba mensagens de erro, etc.
            console.error(error.message);
        });
    });

    function verificarToken() {
        const token = localStorage.getItem('token');
        if (!token) {
            // Se não houver token, o usuário não está autenticado
            return false;
        }

        // Decodifique o token para verificar a expiração
        const tokenDecoded = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Converta para segundos

        if (tokenDecoded.exp < currentTime) {
            // Se o token expirou, o usuário precisa fazer login novamente
            localStorage.removeItem('token');
            return false;
        }

        // O token é válido
        return true;
    }