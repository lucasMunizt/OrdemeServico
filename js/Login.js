
document.getElementById('entrar').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    //console.log(email, senha)
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
    })
  .then(response => {
        if (!response.ok) {
               Swal.fire({
                icon: "error",
                title: "ERRO!",
                text: "SENHA OU EMAIL INCORRETO!"
              });
              limpar();       
        }
        return response.json();
    })
  .then(data => {
        const token = data.token;
        //console.log(token)

        // verifica se o token é válido
        if (token.exp < Date.now() / 1000) {
            console.error('Token expirado');
            // redireciona o usuário para a página de login
            window.location.href = "/login.html";
        } else {
            console.log('Token válido');
            // agora você pode verificar se o token é válido
            if (token) {
                // token é válido, você pode armazená-lo em localStorage ou cookies
                localStorage.setItem('token', token);

                // verifica se o token é válido em subsequentes requisições
                fetch('http://localhost:8080/user/data', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
              .then(response => {
                   if (!response.ok) {
                       throw new Error('Falha na requisição');
                   }
                   return response.json();
               })
              .then(data => {
                   console.log(data);
               })
              .catch(error => {
                   console.error('Erro ao carregar dados:', error);
               });

                // redireciona o usuário para a página de menu
                window.location.href = "/Menu.html";
            } else {
                // token é inválido, você pode mostrar um erro para o usuário
                console.error('Erro ao logar: token inválido');
            }
        }
    })
  .catch(error => {
        console.error('Erro ao logar:', error);
        // Trate o erro adequadamente, por exemplo, exibindo uma mensagem de erro para o usuário
    });
});

function limpar(){
    email.value = "";
    senha.value = "";
}