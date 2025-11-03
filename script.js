// =================================================================
//                 CÓDIGO JAVASCRIPT COMPLETO (FINAL)
//        (Professor Corrigido, Imagens Locais e Tempo Aumentado)
// =================================================================

// --- Variáveis Globais de Jogo ---
let vidaJogador = 3;
const vidaJogadorMax = 3; 
let mundoAtual = '';
let perguntaAtual = {};
let pontuacao = 0;
let cronometro;
const TEMPO_LIMITE = 25; // TEMPO AUMENTADO PARA 25 SEGUNDOS!
const PONTOS_POR_ACERTO = 100;
const PONTOS_POR_BOSS = 300;
let estagioAtualIndex = 0; // Rastreia o estágio atual no mapa
let estagiosDoMundoAtual = []; // Array de estágios do mundo escolhido


// --- IMAGENS PRÉ-DEFINIDAS (USANDO CAMINHOS LOCAIS) ---

// Imagens do Herói (Player)
const IMAGENS_HEROI = {
    matematica: "img/gato.png",  // Ajuste se sua pasta/nome for diferente
    portugues: "img/gato.png"   // Ajuste se sua pasta/nome for diferente
};
// Imagens de Fim de Jogo (Ajuste se quiser usar arquivos locais)
const IMG_GAME_OVER = "./imagens/game_over.png";
const IMG_VITORIA = "./imagens/vitoria.png";
// Professor e Dicas (Ajuste se quiser usar arquivos locais)
const IMG_PROFESSOR_MAT = "img/macaco.png"; 
const IMG_PROFESSOR_PORT = "img/coruja.png"; 

const DICAS_PROFESSORES = {
    matematica: "Lembre-se da ordem das operações: primeiro multiplicação/divisão, depois adição/subtração. Tente contar nos dedos!",
    portugues: "Preste atenção nas letras iniciais e finais! Tente falar a palavra em voz alta para identificar as sílabas."
};


// --- CONTEÚDO: PERGUNTAS E INIMIGOS (COM IMAGENS LOCAIS) ---
// *Nota: Mantenha a estrutura de pastas e nomes de arquivo em minúsculas para o GitHub Pages*

// ################### MATEMÁTICA ###################
const PERGUNTAS_MAT_NIVEL_1 = [ 
    { pergunta: "Quanto é 3 + 1?", respostas: ["1", "3", "2", "4"], correta: "4", inimigo: "Monstro da Adição Simples", inimigoImg: "./imagens/mat_n1_1.png", vida: 1 },
    { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "./imagens/mat_n1_2.png", vida: 1 },
    { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "./imagens/mat_n1_3.png", vida: 1 },
    { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "./imagens/mat_n1_4.png", vida: 1 },
];

const PERGUNTAS_MAT_NIVEL_2_E_3 = [ 
    { pergunta: "Quanto é 2 x 3?", respostas: ["4", "5", "6", "7"], correta: "6", inimigo: "Multiplicador Fantasma", inimigoImg: "./imagens/mat_n2_1.png", vida: 1 },
    { pergunta: "Qual é o resultado de 10 / 2?", respostas: ["3", "4", "5", "6"], correta: "5", inimigo: "Divisor Místico", inimigoImg: "./imagens/mat_n2_2.png", vida: 1 },
    { pergunta: "O que é um número par?", respostas: ["Ímpar", "Um número que divide por 2", "Um número que não divide por 2", "Zero"], correta: "Um número que divide por 2", inimigo: "Duende da Paridade", inimigoImg: "./imagens/mat_n2_3.png", vida: 1 },
    { pergunta: "Qual o resultado de 4 + 4 - 2?", respostas: ["8", "6", "7", "5"], correta: "6", inimigo: "Mago dos Cálculos Avançados", inimigoImg: "./imagens/mat_n2_4.png", vida: 1 },
];

const BOSS_MAT_1 = { 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: "./imagens/boss_mat1.png", 
    vida: 3, 
    perguntasFases: [
        { pergunta: "Fase 1: Quanto é 10 + 10 + 10?", respostas: ["20", "30", "40", "50"], correta: "30" },
        { pergunta: "Fase 2: Calcule: 5 x 2 + 3", respostas: ["13", "15", "11", "10"], correta: "13" },
        { pergunta: "Fase 3: Se 1/4 é 5, quanto é o total?", respostas: ["10", "20", "15", "25"], correta: "20" }
    ]
};

const BOSS_MAT_2 = { 
    inimigo: "TITÃ DA MATEMÁTICA AVANÇADA (BOSS 2)", 
    inimigoImg: "./imagens/boss_mat2.png", 
    vida: 3,
    perguntasFases: [
        { pergunta: "Fase 1: Qual a raiz quadrada de 9?", respostas: ["1", "3", "6", "9"], correta: "3" },
        { pergunta: "Fase 2: Se x = 5, quanto é 2x + 1?", respostas: ["10", "11", "12", "6"], correta: "11" },
        { pergunta: "Fase 3: 0.5 em porcentagem é...?", respostas: ["5%", "50%", "0.5%", "15%"], correta: "50%" }
    ]
};

// ################### PORTUGUÊS ###################
const PERGUNTAS_PORT_NIVEL_1 = [ 
    { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "./imagens/port_n1_1.png", vida: 1 },
    { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "./imagens/port_n1_2.png", vida: 1 },
    { pergunta: "O que rima com 'SAPATO'?", respostas: ["MÃO", "DEDO", "PATO", "RUA"], correta: "PATO", inimigo: "Rima Risonha", inimigoImg: "./imagens/port_n1_3.png", vida: 1 },
    { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "./imagens/port_n1_4.png", vida: 1 },
];

const PERGUNTAS_PORT_NIVEL_2_E_3 = [ 
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa", inimigo: "Copiador Inimigo", inimigoImg: "./imagens/port_n2_1.png", vida: 1 },
    { pergunta: "Qual palavra tem 3 vogais?", respostas: ["ARARA", "ARCO", "CASA", "PORTA"], correta: "ARARA", inimigo: "Caçador de Vogais", inimigoImg: "./imagens/port_n2_2.png", vida: 1 },
    { pergunta: "Qual é o plural de 'CARRO'?", respostas: ["CARROS", "CARROES", "CARRA", "CARRO"], correta: "CARROS", inimigo: "Rei do Plural", inimigoImg: "./imagens/port_n2_3.png", vida: 1 },
    { pergunta: "Qual palavra é um 'adjetivo'?", respostas: ["Correr", "Bonito", "Mesa", "Dois"], correta: "Bonito", inimigo: "Feiticeiro dos Adjetivos", inimigoImg: "./imagens/port_n2_4.png", vida: 1 },
];

const BOSS_PORT_1 = { 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: "./imagens/boss_port1.png", 
    vida: 3, 
    perguntasFases: [
        { pergunta: "Fase 1: Qual palavra tem a letra 'R' no meio?", respostas: ["ARROZ", "RATO", "PATO", "SOL"], correta: "ARROZ" },
        { pergunta: "Fase 2: O que é um 'adjetivo' em: 'O céu está azul'?", respostas: ["céu", "está", "azul", "o"], correta: "azul" },
        { pergunta: "Fase 3: Qual é o aumentativo de 'CASA'?", respostas: ["Casinha", "Casarão", "Casebre", "Casota"], correta: "Casarão" }
    ]
};

const BOSS_PORT_2 = { 
    inimigo: "ARQUI-DEMÔNIO DA SINTAXE (BOSS 2)", 
    inimigoImg: "./imagens/boss_port2.png", 
    vida: 3,
    perguntasFases: [
        { pergunta: "Fase 1: Qual é o substantivo próprio desta lista?", respostas: ["cadeira", "cachorro", "brasil", "mesa"], correta: "brasil" },
        { pergunta: "Fase 2: A palavra 'FELICIDADE' é um substantivo...?", respostas: ["Concreto", "Comum", "Abstrato", "Próprio"], correta: "Abstrato" },
        { pergunta: "Fase 3: Qual é a função da vírgula na frase 'João, venha cá'?", respostas: ["Separar ideias", "Vocativo", "Adjunto", "Conectivo"], correta: "Vocativo" }
    ]
};


/**
 * CRIAÇÃO DE ESTÁGIOS APRIMORADA (10 Estágios)
 * Padrão: 4 Perguntas Nível 1 -> BOSS 1 (Estágio 5) -> 4 Perguntas Nível 2/3 -> BOSS 2 (Estágio 10)
 */
function criarEstagios(perguntasN1, perguntasN2e3, boss1, boss2) {
    
    const poolN1 = perguntasN1
        .map(p => ({ tipo: 'pergunta', data: JSON.parse(JSON.stringify(p)), concluido: false }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4); 

    const poolN2e3 = perguntasN2e3
        .map(p => ({ tipo: 'pergunta', data: JSON.parse(JSON.stringify(p)), concluido: false }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4); 

    const estagios = [
        ...poolN1, 
        { tipo: 'boss', data: JSON.parse(JSON.stringify(boss1)), concluido: false, vidaAtual: boss1.vida, vidaMax: boss1.vida }, 
        ...poolN2e3, 
        { tipo: 'boss', data: JSON.parse(JSON.stringify(boss2)), concluido: false, vidaAtual: boss2.vida, vidaMax: boss2.vida } 
    ];
    
    return estagios;
}


// --- Funções de Dicas do Professor (CORRIGIDO) ---

function mostrarProfessorDica() {
    const imagemProfessor = mundoAtual === 'matematica' ? IMG_PROFESSOR_MAT : IMG_PROFESSOR_PORT;
    const dicaTexto = DICAS_PROFESSORES[mundoAtual];

    const areaProfessor = document.getElementById('area-professor');
    
    areaProfessor.innerHTML = `
        <img src="${imagemProfessor}" alt="Professor Dica" id="professor-img">
        <div id="professor-balao">
            <p><strong>Professor diz:</strong> ${dicaTexto}</p>
        </div>
    `;
    
    areaProfessor.style.display = 'flex'; 
    
    falar(`O professor diz: ${dicaTexto}`);

    setTimeout(() => {
        areaProfessor.style.display = 'none';
        areaProfessor.innerHTML = '';
    }, 4000);
}


// --- Funções de Leitura de Voz (Text-to-Speech) - NARRADOR MUDADO ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        
        // 💡 MUDANÇA DO NARRADOR: Tentativa de forçar uma voz masculina
        // A disponibilidade depende do seu navegador/OS.
        const voices = speechSynthesis.getVoices();
        const vozMasculina = voices.find(voice => 
            voice.lang === 'pt-BR' && 
            (voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('bruno'))
        );
        
        if (vozMasculina) {
            utterance.voice = vozMasculina;
        } else {
            // Fallback: Tenta encontrar qualquer voz pt-BR
            const vozPtBr = voices.find(voice => voice.lang === 'pt-BR');
            if (vozPtBr) {
                utterance.voice = vozPtBr;
            }
        }
        
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    // Usa a mesma lógica de voz do 'falar()'
    let textoCompleto = "As opções são: ";
    opcoes.forEach((opcao, index) => {
        textoCompleto += `Opção ${index + 1}: ${opcao}. `;
    });
    falar(textoCompleto);
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
    document.getElementById('area-professor').style.display = 'none'; // Garante que o professor suma
}

function mostrarSelecao() {
    ocultarTodas();
    
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';

    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) {
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(
            PERGUNTAS_MAT_NIVEL_1, 
            PERGUNTAS_MAT_NIVEL_2_E_3, 
            BOSS_MAT_1, 
            BOSS_MAT_2
        );
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(
            PERGUNTAS_PORT_NIVEL_1, 
            PERGUNTAS_PORT_NIVEL_2_E_3, 
            BOSS_PORT_1, 
            BOSS_PORT_2
        );
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso e Batalha (Inalteradas, mas completas) ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome}`;

    estagiosDoMundoAtual.forEach((estagio, index) => {
        const isAtual = index === estagioAtualIndex;
        const isConcluido = estagio.concluido;
        const isBoss = estagio.tipo === 'boss';

        const node = document.createElement('div');
        node.className = 'mapa-node';
        node.style.cssText = `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            color: white; 
        `;

        if (index > 4) {
            node.style.border = '3px dashed #FFD700'; 
        }

        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; 
            node.textContent = '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; 
            node.textContent = isBoss ? 'B' : (index + 1); 
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; 
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${isConcluido ? '#2ecc71' : '#bdc3c7'};
            `;
            mapaContainer.appendChild(node);
            mapaContainer.appendChild(linha);
        } else {
             mapaContainer.appendChild(node);
        }
    });

    document.getElementById('botao-mapa-iniciar').textContent = `INICIAR ESTÁGIO ${estagioAtualIndex + 1}`;
}


function iniciarEstagioAtual() {
    ocultarTodas();
    document.getElementById('tela-batalha').style.display = 'block';
    document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];

    proximaPergunta();
}


function proximaPergunta() {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (!estagio) {
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA! Você VENCEU O MUNDO! Pontuação Final: ${pontuacao} pontos!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        falar(`Parabéns! Você é um mestre da ${mundoAtual}.`);
        return;
    }
    
    let dadosDaPergunta;
    let vidaInimigoAtual, vidaInimigoMax;
    
    if (estagio.tipo === 'boss') {
        const faseIndex = estagio.data.vida - estagio.vidaAtual;
        dadosDaPergunta = estagio.data.perguntasFases[faseIndex];
        
        dadosDaPergunta.inimigo = estagio.data.inimigo;
        dadosDaPergunta.inimigoImg = estagio.data.inimigoImg;
        dadosDaPergunta.vidaBoss = estagio.vidaAtual;
        dadosDaPergunta.vidaBossMax = estagio.vidaMax;
        
        vidaInimigoAtual = estagio.vidaAtual;
        vidaInimigoMax = estagio.vidaMax;
    } else {
        dadosDaPergunta = estagio.data;
        dadosDaPergunta.vidaBoss = estagio.data.vida; 
        dadosDaPergunta.vidaBossMax = estagio.data.vida; 
        
        vidaInimigoAtual = estagio.data.vida;
        vidaInimigoMax = estagio.data.vida;
    }
    
    perguntaAtual = dadosDaPergunta;

    pararCronometro();
    speechSynthesis.cancel();
    
    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesDiv = document.getElementById('opcoes-resposta');

    document.getElementById('nome-inimigo').textContent = perguntaAtual.inimigo;
    document.getElementById('inimigo-img').src = perguntaAtual.inimigoImg || IMAGENS_HEROI[mundoAtual];

    document.getElementById('vida-inimigo-texto').textContent = vidaInimigoAtual + ' / ' + vidaInimigoMax;
    const barraInimigo = document.getElementById('vida-inimigo-bar');
    const percentualInimigo = vidaInimigoMax > 0 ? (vidaInimigoAtual / vidaInimigoMax) * 100 : 0;
    barraInimigo.style.width = percentualInimigo + '%';
    
    atualizarStatus();
    document.getElementById('mensagem').className = 'msg-neutra';
    document.getElementById('mensagem').textContent = `Enfrentando: ${perguntaAtual.inimigo}. Clique para ouvir a pergunta!`;
    
    perguntaTexto.textContent = perguntaAtual.pergunta;
    opcoesDiv.innerHTML = '';
    
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);
    
    const btnOuvirPergunta = document.createElement('button');
    btnOuvirPergunta.textContent = '🔊 Ouvir Pergunta';
    btnOuvirPergunta.style.marginBottom = '15px';
    btnOuvirPergunta.onclick = () => falar(perguntaAtual.pergunta);
    opcoesDiv.appendChild(btnOuvirPergunta);
    
    const btnOuvirOpcoes = document.createElement('button');
    btnOuvirOpcoes.textContent = '🗣️ Ouvir Opções';
    btnOuvirOpcoes.style.marginBottom = '15px';
    btnOuvirOpcoes.style.marginLeft = '10px';
    btnOuvirOpcoes.onclick = () => lerOpcoesDeResposta(respostasEmbaralhadas);
    opcoesDiv.appendChild(btnOuvirOpcoes);
    
    opcoesDiv.appendChild(document.createElement('br')); 

    falar(perguntaAtual.pergunta);
    
    respostasEmbaralhadas.forEach(resposta => {
        const btn = document.createElement('button');
        btn.textContent = resposta;
        btn.onclick = () => verificarResposta(resposta);
        opcoesDiv.appendChild(btn);
    });

    iniciarCronometro();
}


function verificarResposta(respostaSelecionada) {
    pararCronometro();
    speechSynthesis.cancel();
    
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];
    const mensagemElemento = document.getElementById('mensagem');
    
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;

    if (acertou) {
        if (estagio.tipo === 'boss') {
            estagio.vidaAtual--;
            adicionarPontuacao(true);
            mensagemElemento.textContent = `🎉 Acertou! Dano no ${perguntaAtual.inimigo}! O Boss perdeu uma vida!`;
        } else {
            estagio.data.vida--; 
            adicionarPontuacao(false);
            mensagemElemento.textContent = `🎉 Acertou! ${perguntaAtual.inimigo} derrotado!`;
        }
        
        mensagemElemento.className = 'msg-acerto';
        falar("Você acertou! Muito bem!");
        
    } else {
        vidaJogador--;
        
        if (timeout) {
            mensagemElemento.className = 'msg-erro';
            mensagemElemento.textContent = `⏰ Tempo Esgotado! O ${perguntaAtual.inimigo} te atacou!`;
            falar("Tempo esgotado! Você perdeu vida.");
        } else {
            mensagemElemento.className = 'msg-erro';
            mensagemElemento.textContent = `❌ Ops! O ${perguntaAtual.inimigo} te atacou!`;
            falar("Resposta errada. Você perdeu vida.");
        }
        
        if (vidaJogador > 0) {
            mostrarProfessorDica();
        }
    }

    atualizarStatus();

    // Sempre chama verificarFimTurno após o timeout (agora 1.5s)
    setTimeout(() => {
        verificarFimTurno(true); 
    }, 1500); 
}


function verificarFimTurno(turnoFinalizado) {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (vidaJogador <= 0) {
        speechSynthesis.cancel();
        document.getElementById('mensagem').className = 'msg-erro';
        document.getElementById('mensagem').textContent = `GAME OVER! Pontuação: ${pontuacao}. Tente de novo!`;
        document.getElementById('area-pergunta').innerHTML = '<button onclick="mostrarSelecao()">Tentar Novamente</button>'; 
        document.getElementById('inimigo-img').src = IMG_GAME_OVER;
        document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual]; 
        falar("Fim de jogo. Não desista! Tente de novo.");
        return;

    } 
    
    const inimigoDerrotado = estagio.tipo === 'boss' ? estagio.vidaAtual <= 0 : estagio.data.vida <= 0;

    if (inimigoDerrotado) {
        estagio.concluido = true;
        
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🌟 ${perguntaAtual.inimigo} derrotado! Próxima aventura...`;
        falar(`Inimigo derrotado! Você é demais!`);

        estagioAtualIndex++; 

        setTimeout(() => {
            if (estagioAtualIndex < estagiosDoMundoAtual.length) {
                mostrarMapa(); 
            } else {
                proximaPergunta(); 
            }
        }, 1500); 

    } 
    // 💡 CORREÇÃO APLICADA AQUI: Se o inimigo não foi derrotado e o jogador tem vida, reabilita e reinicia
    else if (inimigoDerrotado === false && vidaJogador > 0) {
        
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = "Sua vez! Tente a resposta correta para atacar!";
        falar("Tente de novo!");

        // Reabilita todos os botões de resposta
        const opcoesRespostaDiv = document.getElementById('opcoes-resposta');
        if (opcoesRespostaDiv) {
            Array.from(opcoesRespostaDiv.querySelectorAll('button')).forEach(btn => {
                btn.disabled = false;
            });
        }

        iniciarCronometro();

    }
}


// --- Funções Auxiliares (Pontuação, Status, Tempo) ---

function atualizarStatus() {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];
    let vidaInimigoAtual = 0;
    let vidaInimigoMax = 1; 

    if (estagio) {
        if (estagio.tipo === 'boss') {
            vidaInimigoAtual = estagio.vidaAtual;
            vidaInimigoMax = estagio.vidaMax;
        } else {
            vidaInimigoAtual = estagio.data.vida;
            vidaInimigoMax = 1; 
        }
    }


    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = vidaInimigoAtual + ' / ' + vidaInimigoMax;

    const barraJogador = document.getElementById('vida-jogador-bar');
    barraJogador.style.width = (vidaJogador / vidaJogadorMax) * 100 + '%';
    barraJogador.style.backgroundColor = vidaJogador > (vidaJogadorMax / 2) ? '#2ecc71' : (vidaJogador > 0 ? '#f1c40f' : '#e74c3c'); 

    const barraInimigo = document.getElementById('vida-inimigo-bar');
    const percentualInimigo = vidaInimigoMax > 0 ? (vidaInimigoAtual / vidaInimigoMax) * 100 : 0;
    barraInimigo.style.width = percentualInimigo + '%';
    barraInimigo.style.backgroundColor = vidaInimigoAtual > (vidaInimigoMax / 2) ? '#e74c3c' : (vidaInimigoAtual > 0 ? '#e67e22' : '#c0392b'); 
}

function iniciarCronometro() {
    pararCronometro();
    let tempoRestante = TEMPO_LIMITE;
    document.getElementById('tempo-display').textContent = tempoRestante;

    cronometro = setInterval(() => {
        tempoRestante--;
        document.getElementById('tempo-display').textContent = tempoRestante;

        if (tempoRestante <= 0) {
            pararCronometro();
            verificarResposta(null); 
        }
    }, 1000);
}

function pararCronometro() {
    if (cronometro) {
        clearInterval(cronometro);
        cronometro = null;
    }
}

function adicionarPontuacao(eUmBoss) {
    if (eUmBoss) {
        pontuacao += PONTOS_POR_BOSS;
    } else {
        const tempoRestante = parseInt(document.getElementById('tempo-display').textContent) || 0;
        pontuacao += PONTOS_POR_ACERTO + (tempoRestante > 0 ? tempoRestante * 5 : 0);
    }
    document.getElementById('pontuacao-display').textContent = pontuacao;
}


// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // 💡 Chamada inicial para preencher as vozes antes do primeiro uso
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = () => {
            console.log("Vozes TTS carregadas.");
        };
    }
    
    ocultarTodas();
    document.getElementById('menu-inicial').style.display = 'block'; 

    const botaoComecar = document.getElementById('btn-comecar') || document.getElementById('botao-comecar'); 
    if (botaoComecar) {
        botaoComecar.addEventListener('click', mostrarSelecao);
    }
});
