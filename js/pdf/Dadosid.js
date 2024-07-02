 export async function Valorid() {
    const token = localStorage.getItem('token');
    let idsOs = [];
    if (!token) {
        console.error('Erro: Token não encontrado');
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Usuário não autenticado! Faça login novamente."
        });
        window.location.href = "/login.html";
        return;
    }

    try {
        const responseServicos = await fetch("http://localhost:8080/servicos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!responseServicos.ok) {
            throw new Error('Erro na requisição');
        }

        const dataServicos = await responseServicos.json();
       
        dataServicos.forEach(servico => {
            idsOs.push(servico.id);
        });

    } catch (error) {
        console.error('Erro ao carregar dados dos serviços:', error);
        Swal.fire({
            icon: "error",
            title: "ERRO!",
            text: "Falha ao carregar os dados dos serviços."
        });
    }

    return idsOs[idsOs.length-1] + 1
}

