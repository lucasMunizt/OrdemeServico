

function gerarQrcode(){
    let nome = document.getElementById("nome");
    let telefone = document.getElementById("telefone");
    let endereco = document.getElementById("endereco");
    let bairro = document.getElementById("bairro");
    let data =  document.getElementById("data");
    let aparelho = document.getElementById("aparelho");
    let reclamacoes = document.getElementById("reclamacoes");
    let observacoes = document.getElementById("observacoes");
    let qrCode = 'https://chart.googleapis.com/chart?cht=qr&chs=250x250chl=';

    let conteudo = qrCode + observacoes ;

    let imagem =  document.getElementById("img").src = conteudo;

   console.log("ola");


}


