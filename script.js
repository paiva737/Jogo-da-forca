
const categoria = document.querySelector("#category");
const letrasErradas = document.querySelector(".wrongLetters");
const palavraInterface = document.querySelector(".dashes");
const olhos = Array.from(document.querySelectorAll(".eyes"));
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
let palavraProposta;
let letrasErradasArray = [];
let indiceBoneco;
const numTentativas = 7;
const opacidadeOlhos = 0.3;
const categorias = {
    frutas: ["abacaxi", "limao", "banana", "maça", "laranja","uva","kiwi","melao","jabuticaba","pera", "coco"],
    profissoes: ["engenheiro", "advogado", "medico", "professor", "pescador","desenvolvedor","arquiteto","cardiologista","endocrinologista"],
    cores: ["amarelo", "azul", "laranja", "roxo", "vermelho","lilas", "preto", "cinza", "branco"],
    animais: ["papagaio", "galo", "cachorro", "gato", "aguia","urubu", "coelho", "avestruz", "andromedario"],
    esportes: ["futebol", "basquete","handball", "futvolei","nataçao","golf", "tenis","volei","surf", "kitesurf","skate"]
};

function retornaArrayCategorias(){
    return Object.keys(categorias);
}

function retornaCategoria(){
    const arrayCategorias = retornaArrayCategorias();
    let indiceCategoria = retornaNumAleatorio (arrayCategorias.length)
    return arrayCategorias[indiceCategoria];
}

function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
}

function retornaNumAleatorio(max){
    return Math.floor(Math.random() * max);
}

function definePalavraProposta(){
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = retornaNumAleatorio (arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    console.log(palavraProposta);
    ocultaPalavra();
}

function ocultaPalavra(){
    let palavraOcultada = "";
    for(let i = 0; i < palavraProposta.length; i++){
        palavraOcultada += "-";
    }
    exibePalavraInterface(palavraOcultada);
}

function exibePalavraInterface(palavra){
    palavraInterface.innerHTML = palavra;
}

function tentativa(letra){
    if(palavraProposta.includes(letra)){
         atualizaPalavraInterface(letra);
    }else{
     letrasErradasArray.push(letra);
     letrasErradas.innerHTML = "Letras Erradas: "   + letrasErradasArray;
     if(partesBoneco.length > indiceBoneco){
        desenhaBoneco();
     }
    
    }
    verificaFimDeJogo();
}

function verificaFimDeJogo(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavraInterface("Você Ganhou !!");
        window.removeEventListener("keypress", retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavraInterface("Você Perdeu !!!");
        window.removeEventListener("keypress", retornaLetra);
        exibePalavraErrada();
        
    }
}

function exibePalavraErrada(){
    exibePalavraInterface(`A palavra era: ${palavraProposta}`)
}


function atualizaPalavraInterface(letra){
    let palavraAux = "";
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra;
        }else if(palavraInterface.innerHTML[i] != "-"){
        palavraAux += palavraInterface.innerHTML[i];
        }else{
            palavraAux += "-";
        }
    }
    exibePalavraInterface(palavraAux);
}


function retornaLetra(e){ 
    tentativa(e.key);
}


function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}


function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}


function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}


function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
