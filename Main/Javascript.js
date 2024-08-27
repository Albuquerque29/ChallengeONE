const textAreaJs = document.querySelector(".textAreaJs");
const btn_Crip = document.querySelector(".btn_Crip");
const btn_Descrip = document.querySelector(".btn_Descrip");
const mensagem_Final = document.querySelector(".mensagem_Final");
const mensagem_Info = document.getElementById("mensagem_Info");
const btn_Copiar = document.getElementById("btn_Copiar");
const boneco = document.getElementById("boneco");

const erroMensagem = "Por favor, use apenas letras minúsculas e sem acentuação.";

let replace = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
];

let troca = (novovalor) => {
    mensagem_Info.innerHTML = novovalor;
    mensagem_Info.style.fontSize = "22px";
    textAreaJs.value = "";
    boneco.style.display = "none";
    mensagem_Final.style.display = "none";
    btn_Copiar.style.display = "block";
};

let validarTexto = (texto) => {
    const regex = /[A-ZÀ-ÿ]/;
    if (regex.test(texto)) {
        alert(erroMensagem);
        return false;
    }
    return true;
};

btn_Crip.addEventListener("click", () => {
    const texto = textAreaJs.value;
    if (validarTexto(texto)) {
        function encriptar(novotexto) {
            for (let i = 0; i < replace.length; i++) {
                novotexto = novotexto.replaceAll(replace[i][0], replace[i][1]);
            }
            return novotexto;
        }
        troca(encriptar(texto.toLowerCase()));
    }
});

btn_Descrip.addEventListener("click", () => {
    const texto = textAreaJs.value;
    if (validarTexto(texto)) {
        function desencriptar(novotexto) {
            for (let i = 0; i < replace.length; i++) {
                novotexto = novotexto.replaceAll(replace[i][1], replace[i][0]);
            }
            return novotexto;
        }
        troca(desencriptar(texto.toLowerCase()));
    }
});

function setupBtn_Copiar() {
    function CopiarTexto() {
        const textoParaCopiar = mensagem_Info.innerText;
        if (textoParaCopiar && textoParaCopiar !== "Digite um texto que você deseja criptografar ou descriptografar") {
            navigator.clipboard.writeText(textoParaCopiar)
                .then(() => {
                    alert('Texto copiado com sucesso!');
                    textAreaJs.value = "";
                    mensagem_Final.style.display = "block";
                    mensagem_Info.innerHTML = "Digite um texto que você deseja criptografar ou descriptografar";
                    mensagem_Info.style.fontSize = "16px";
                    boneco.style.display = "block";
                    btn_Copiar.style.display = "none";
                })
                .catch(err => console.error('Erro ao copiar o texto:', err));
        } else {
            alert('Nenhuma mensagem para copiar.');
        }
    }

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
        pgLeft.style.minHeight = pgLeft.scrollHeight + "px";
    }
    ajustarAltura();
    const observer = new MutationObserver(ajustarAltura);
    observer.observe(pgLeft, { childList: true, subtree: true });
    window.addEventListener("resize", ajustarAltura);
});
