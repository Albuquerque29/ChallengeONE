const textAreaJs = document.querySelector(".textAreaJs");
const btn_Crip = document.querySelector(".btn_Crip");
const btn_Descrip = document.querySelector(".btn_Descrip");
const mensagem_Final = document.querySelector(".mensagem_Final");
const mensagem_Info = document.getElementById("mensagem_Info");
const btn_Copiar = document.getElementById("btn_Copiar");


const erroMensagem = "Por favor, use apenas letras minúsculas e sem acentuação.";

let replace = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
];

const remplace = (novovalor) => {
    mensagem_Final.innerHTML = novovalor;
    textAreaJs.value = "";
    boneco.style.display = "none";
    mensagem_Info.style.display = "none";
    btn_Copiar.style.display = "block";
}

const validarTexto = (texto) => {
    const regex = /[A-ZÀ-ÿ]/;
    if (regex.test(texto)) {
        alert(erroMensagem);
        return false;
    }
    return true;
}

btn_Crip.addEventListener("click", () => {
    const texto = textAreaJs.value;
    if (validarTexto(texto)) {
        function encriptar(novotexto) {
            for (let i = 0; i < replace.length; i++) {
                if (novotexto.includes(replace[i][0])) {
                    novotexto = novotexto.replaceAll(replace[i][0], replace[i][1]);
                }
            }
            return novotexto;
        }
        remplace(encriptar(texto.toLowerCase()));
    }
});

btn_Descrip.addEventListener("click", () => {
    const texto = textAreaJs.value;
    if (validarTexto(texto)) {
        function desencriptar(novotexto) {
            for (let i = 0; i < replace.length; i++) {
                if (novotexto.includes(replace[i][1])) {
                    novotexto = novotexto.replaceAll(replace[i][1], replace[i][0]);
                }
            }
            return novotexto;
        }
        remplace(desencriptar(texto.toLowerCase()));
    }
});

function setupBtn_Copiar() {
    function CopiarTexto() {
        const mensagem = document.querySelector('.mensagem_Final');
        if (mensagem) {
            navigator.clipboard.writeText(mensagem.innerText)
                .then(() => {
                    alert('Texto Copiado');
                    textAreaJs.value = "";
                    mensagem_Final.innerHTML = "Nenhuma mensagem encontrada";
                    boneco.style.display = "block"; 
                    mensagem_Info.style.display = "block"; 
                    btn_Copiar.style.display = "none";
                })
                .catch(err => console.error('Erro ao copiar o texto:', err));
        }
    }
    const btn_Copiar = document.getElementById('btn_Copiar');
    if (btn_Copiar) {
        btn_Copiar.addEventListener('click', CopiarTexto);
    } else {
        console.error('Botão #btn_Copiar não encontrado.');
    }
}
document.addEventListener('DOMContentLoaded', setupBtn_Copiar);

document.addEventListener("DOMContentLoaded", function() {
    const pgLeft = document.querySelector(".pg_left");

    function ajustarAltura() {
        // Ajusta a altura mínima para garantir que o conteúdo se ajuste
        pgLeft.style.minHeight = pgLeft.scrollHeight + "px";
    }
    ajustarAltura();
    const observer = new MutationObserver(ajustarAltura);
    observer.observe(pgLeft, { childList: true, subtree: true });
    window.addEventListener("resize", ajustarAltura);
});