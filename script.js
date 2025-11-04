// =================================================================
//                 CÓDIGO JAVASCRIPT COMPLETO (FINAL)
//   (Todos os inimigos da mesma matéria usam a mesma imagem)
// =================================================================

// --- Variáveis Globais de Jogo ---
let vidaJogador = 3;
const vidaJogadorMax = 3; 
let mundoAtual = '';
let perguntaAtual = {};
let pontuacao = 0;
let cronometro;
const TEMPO_LIMITE = 30; // 25 segundos para responder
const PONTOS_POR_ACERTO = 100;
const PONTOS_POR_BOSS = 300;
let estagioAtualIndex = 0; 
let estagiosDoMundoAtual = []; 

// --- VARIÁVEIS GLOBAIS DE OPÇÕES DE JOGO ---
let vozSelecionada = 'feminina'; 
let narracaoPerguntaAtiva = true; 
let narracaoAlternativasAtiva = false; 

// --- IMAGENS PRÉ-DEFINIDAS (USANDO URLs DA WEB FUNCIONAIS E ESTÁVEIS) ---

// Imagens do Herói (Player)
const IMAGENS_HEROI = {
    matematica: "./img/gato.png", 
    portugues: "./img/gato.png" 
};
// Imagens de Inimigos GENÉRICAS (NOVAS IMAGENS)
const IMG_MONSTRO_MAT = "./img/inimigo-mat.png"; // Um ícone de número (Matemática)
const IMG_MONSTRO_PORT = "./img/inimigo-portugues.png"; // Um ícone de livro (Português)

// Imagens de Fim de Jogo
const IMG_GAME_OVER = "https://cdn.pixabay.com/photo/2014/12/10/11/17/game-over-562947_1280.png";
const IMG_VITORIA = "https://cdn.pixabay.com/photo/2016/09/08/11/49/trophy-1654160_1280.png";
// Professor e Dicas
const IMG_PROFESSOR_MAT = "./img/macaco.png"; 
const IMG_PROFESSOR_PORT = "./img/coruja.png"; 

// DICAS ANIMADAS E SIMPLES
const DICAS_PROFESSORES = {
    matematica: "Professor diz: Uhu! Se liga nas continhas, meu pequeno herói! Para somar e subtrair, use seus dedos, ou desenhe bolinhas! Você consegue!",
    portugues: "Professor diz: Preste atenção! Fale a palavrinha bem alto! Veja o som de cada letra. Qual letrinha está no começo? Tente de novo!"
};


// --- CONTEÚDO: PERGUNTAS E INIMIGOS (NÍVEL 1: 5-6 ANOS) ---

// ################### MATEMÁTICA ###################
const PERGUNTAS_MAT_NIVEL_1 = [ 
    // Conteúdo 5-6 anos
    // REMOVIDO: inimigoImg
    { pergunta: "Quantas rodinhas o carro tem? (Conte nos dedos!)", respostas: ["2", "3", "4", "5"], correta: "4", inimigo: "Monstro da Contagem Simples", vida: 1 },
    { pergunta: "Quanto é 2 + 1? (Dois mais um!)", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Somador Amigo", vida: 1 },
    { pergunta: "Qual forma parece um telhado de casinha?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", vida: 1 },
    { pergunta: "Qual número vem ANTES do número 5?", respostas: ["3", "4", "6", "7"], correta: "4", inimigo: "Antecessor Rápido", vida: 1 },
];

// --- CONTEÚDO: PERGUNTAS E INIMIGOS (NÍVEL 2/3: 7-8 ANOS) ---
const PERGUNTAS_MAT_NIVEL_2_E_3 = [ 
    // Conteúdo 7-8 anos
    // REMOVIDO: inimigoImg
    { pergunta: "Quanto é 7 + 4? (Sete mais quatro!)", respostas: ["10", "11", "12", "13"], correta: "11", inimigo: "Somador Maior", vida: 1 },
    { pergunta: "Quanto é 15 menos 5? (Quinze tira cinco!)", respostas: ["8", "9", "10", "11"], correta: "10", inimigo: "Subtrador Experiente", vida: 1 },
    { pergunta: "Se o seu time fez 5 pontos e o outro fez 7, quem está ganhando?", respostas: ["Seu Time", "O Outro Time", "Estão Empatados", "Ninguém"], correta: "O Outro Time", inimigo: "Duende da Comparação", vida: 1 },
    { pergunta: "Quanto é 2 vezes 3? (É o mesmo que 3 + 3!)", respostas: ["4", "5", "6", "7"], correta: "6", inimigo: "Multiplicador Aprendiz", vida: 1 },
];

// ESTRUTURA DOS BOSSES (Matemática) - 7-8 ANOS
const BOSS_MAT_1 = { 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    // REMOVIDO: inimigoImg
    vida: 3, 
    perguntasFases: [
        { pergunta: "Fase 1: Quanto é 12 + 6?", respostas: ["16", "17", "18", "19"], correta: "18" },
        { pergunta: "Fase 2: Calcule: 10 - 3 + 1", respostas: ["8", "7", "6", "9"], correta: "8" },
        { pergunta: "Fase 3: Se o lápis custa R$ 2,00, quanto custam 3 lápis?", respostas: ["R$ 4,00", "R$ 6,00", "R$ 5,00", "R$ 8,00"], correta: "R$ 6,00" }
    ]
};

const BOSS_MAT_2 = { 
    inimigo: "TITÃ DA MATEMÁTICA AVANÇADA (BOSS 2)", 
    // REMOVIDO: inimigoImg
    vida: 3,
    perguntasFases: [
        { pergunta: "Fase 1: Qual o resultado de 4 x 4?", respostas: ["8", "12", "16", "20"], correta: "16" },
        { pergunta: "Fase 2: Se 20 / 4 é 5, quanto é 4 x 5?", respostas: ["16", "20", "24", "10"], correta: "20" },
        { pergunta: "Fase 3: Qual é o número 'trinta e cinco'?", respostas: ["305", "35", "53", "503"], correta: "35" }
    ]
};

// ################### PORTUGUÊS ###################
const PERGUNTAS_PORT_NIVEL_1 = [ 
    // Conteúdo 5-6 anos
    // REMOVIDO: inimigoImg
    { pergunta: "Qual é a primeira letra da palavra 'BOLA'?", respostas: ["P", "C", "B", "M"], correta: "B", inimigo: "Serpente da Letra", vida: 1 },
    { pergunta: "Qual vogal (A, E, I, O, U) começa a palavra 'URSO'?", respostas: ["A", "U", "E", "O"], correta: "U", inimigo: "Ogro das Vogais", vida: 1 },
    { pergunta: "Qual palavra RIMA com 'FOGÃO'?", respostas: ["PÃO", "DEDO", "PATO", "RUA"], correta: "PÃO", inimigo: "Rima Risonha", vida: 1 },
    { pergunta: "Qual palavra tem a letra 'V' no começo?", respostas: ["CASA", "MALA", "VACA", "BOLA"], correta: "VACA", inimigo: "Caçador de Letras", vida: 1 },
];

// --- CONTEÚDO: PERGUNTAS E INIMIGOS (NÍVEL 2/3: 7-8 ANOS) ---
const PERGUNTAS_PORT_NIVEL_2_E_3 = [ 
    // Conteúdo 7-8 anos
    // REMOVIDO: inimigoImg
    { pergunta: "Quantas sílabas tem a palavra 'SAPATO'?", respostas: ["2", "3", "4", "5"], correta: "3", inimigo: "Mestre das Sílabas", vida: 1 },
    { pergunta: "O que usamos para terminar uma frase?", respostas: ["Vírgula", "Ponto Final", "Dois Pontos", "Interrogação"], correta: "Ponto Final", inimigo: "Pontuador Maluco", vida: 1 },
    { pergunta: "Qual é o plural (mais de um) de 'CÃO'?", respostas: ["Cãoes", "Cães", "Cano", "Cãs"], correta: "Cães", inimigo: "Rei do Plural", vida: 1 },
    { pergunta: "Qual palavra é um 'nome' (substantivo)?", respostas: ["Correr", "Lindo", "ESCOLA", "Dez"], correta: "ESCOLA", inimigo: "Feiticeiro dos Nomes", vida: 1 },
];

// ESTRUTURA DOS BOSSES (Português) - 7-8 ANOS
const BOSS_PORT_1 = { 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    // REMOVIDO: inimigoImg
    vida: 3, 
    perguntasFases: [
        { pergunta: "Fase 1: O que é 'adjetivo' em: 'A flor é CHEIROSA'?", respostas: ["A", "flor", "cheirosa", "é"], correta: "cheirosa" },
        { pergunta: "Fase 2: Quantas sílabas tem a palavra 'BORBOLETA'?", respostas: ["3", "4", "5", "6"], correta: "4" },
        { pergunta: "Fase 3: Qual é o nome correto do sinal '?'?", respostas: ["Ponto Final", "Vírgula", "Exclamação", "Interrogação"], correta: "Interrogação" }
    ]
};

const BOSS_PORT_2 = { 
    inimigo: "ARQUI-DEMÔNIO DA SINTAXE (BOSS 2)", 
    // REMOVIDO: inimigoImg
    vida: 3,
    perguntasFases: [
        { pergunta: "Fase 1: O que é o 'verbo' (ação) nesta frase: 'O gato COMEU a ração'?", respostas: ["gato", "comeu", "ração", "o"], correta: "comeu" },
        { pergunta: "Fase 2: Qual é o diminutivo (pequeno) de 'LIVRO'?", respostas: ["Livrinho", "Livrão", "Livrito", "Livrete"], correta: "Livrinho" },
        { pergunta: "Fase 3: O que usamos para separar itens em uma lista?", respostas: ["Ponto final", "Vírgula", "Interrogação", "Travessão"], correta: "Vírgula" }
    ]
};


/**
 * CRIAÇÃO DE ESTÁGIOS
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


// --- Funções de Dicas do Professor ---

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
    
    falar(`${dicaTexto}`);

    setTimeout(() => {
        areaProfessor.style.display = 'none';
        areaProfessor.innerHTML = '';
    }, 4000);
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

/**
 * Fala o texto e executa um callback (função) ao terminar.
 * @param {string} texto O texto a ser lido.
 * @param {function} [callback] A função a ser executada ao final da leitura.
 */
function falar(texto, callback) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        
        const voices = speechSynthesis.getVoices();
        
        let targetVoice;

        if (vozSelecionada === 'feminina') {
             targetVoice = voices.find(voice => 
                voice.lang === 'pt-BR' && 
                (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('alice'))
            );
        } else { // 'masculina'
            targetVoice = voices.find(voice => 
                voice.lang === 'pt-BR' && 
                (voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('bruno'))
            );
        }
        
        const vozPtBr = voices.find(voice => voice.lang === 'pt-BR');
        
        if (targetVoice) {
            utterance.voice = targetVoice;
        } else if (vozPtBr) {
            utterance.voice = vozPtBr;
        }
        
        // Executa o callback quando a narração terminar
        if (callback && typeof callback === 'function') {
            utterance.onend = () => {
                // Pequena verificação para evitar bugs de cancelamento em alguns navegadores (Chrome)
                if (speechSynthesis.speaking === false || utterance.text === texto) {
                     callback();
                }
            };
        }
        
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
        if (callback) callback(); // Garante que o jogo prossiga mesmo sem narração
    }
}

function lerOpcoesDeResposta(opcoes) {
    let textoCompleto = "As opções são: ";
    opcoes.forEach((opcao, index) => {
        textoCompleto += `Opção ${index + 1}: ${opcao}. `;
    });
    falar(textoCompleto);
}

// --- Funções de Navegação e Batalha ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
    document.getElementById('area-professor').style.display = 'none';
    
    const telaOpcoes = document.getElementById('tela-opcoes');
    if (telaOpcoes) telaOpcoes.style.display = 'none';
}

function mostrarOpcoes() {
    ocultarTodas();
    const telaOpcoes = document.getElementById('tela-opcoes');
    
    if (!telaOpcoes.innerHTML.trim()) {
        renderizarMenuOpcoes();
    }
    
    document.getElementById('toggle-voz-btn').textContent = `Voz: ${vozSelecionada === 'feminina' ? 'Feminina 👧' : 'Masculina 🧑'}`;
    document.getElementById('toggle-pergunta-btn').textContent = `Narração Pergunta: ${narracaoPerguntaAtiva ? 'LIGADA ✅' : 'DESLIGADA ❌'}`;
    document.getElementById('toggle-alternativas-btn').textContent = `Narração Alternativas: ${narracaoAlternativasAtiva ? 'LIGADA ✅' : 'DESLIGADA ❌'}`;


    telaOpcoes.style.display = 'block';
}

function renderizarMenuOpcoes() {
    const telaOpcoes = document.getElementById('tela-opcoes');
    
    if (!telaOpcoes) return; 
    
    telaOpcoes.innerHTML = `
        <h2>⚙️ Opções de Narração ⚙️</h2>
        <div class="opcoes-container">
            <button id="toggle-voz-btn" onclick="toggleVoz()">Voz: Feminina 👧</button>
            <button id="toggle-pergunta-btn" onclick="toggleNarracaoPergunta()">Narração Pergunta: LIGADA ✅</button>
            <button id="toggle-alternativas-btn" onclick="toggleNarracaoAlternativas()">Narração Alternativas: DESLIGADA ❌</button>
        </div>
        <button onclick="voltarParaMenuPrincipal()">Voltar ao Menu Principal</button>
    `;
}

function toggleVoz() {
    vozSelecionada = vozSelecionada === 'feminina' ? 'masculina' : 'feminina';
    document.getElementById('toggle-voz-btn').textContent = `Voz: ${vozSelecionada === 'feminina' ? 'Feminina 👧' : 'Masculina 🧑'}`;
    falar(`Voz ${vozSelecionada} selecionada!`);
}

function toggleNarracaoPergunta() {
    narracaoPerguntaAtiva = !narracaoPerguntaAtiva;
    document.getElementById('toggle-pergunta-btn').textContent = `Narração Pergunta: ${narracaoPerguntaAtiva ? 'LIGADA ✅' : 'DESLIGADA ❌'}`;
    falar(`Narração da pergunta agora está ${narracaoPerguntaAtiva ? 'ligada' : 'desligada'}.`);
}

function toggleNarracaoAlternativas() {
    narracaoAlternativasAtiva = !narracaoAlternativasAtiva;
    document.getElementById('toggle-alternativas-btn').textContent = `Narração Alternativas: ${narracaoAlternativasAtiva ? 'LIGADA ✅' : 'DESLIGADA ❌'}`;
    falar(`Narração das alternativas agora está ${narracaoAlternativasAtiva ? 'ligada' : 'desligada'}.`);
}

function voltarParaMenuPrincipal() {
    ocultarTodas();
    document.getElementById('menu-inicial').style.display = 'block';
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
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a aventura!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';

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
    // DETERMINA A IMAGEM DO INIMIGO AQUI
    const imagemDoInimigo = mundoAtual === 'matematica' ? IMG_MONSTRO_MAT : IMG_MONSTRO_PORT; 


    if (!estagio) {
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA! Você VENCEU O MUNDO! Pontuação Final: ${pontuacao} pontos! Você é um MESTRE!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        falar(`UAU! Parabéns! Você é o Mestre da ${mundoAtual}! Que herói incrível!`);
        return;
    }
    
    let dadosDaPergunta;
    let vidaInimigoAtual, vidaInimigoMax;
    const estagioEhBoss = estagio.tipo === 'boss';

    
    if (estagioEhBoss) {
        // A fase atual do boss é determinada por quantas vidas faltam
        const faseIndex = estagio.data.vida - estagio.vidaAtual; 
        
        // Verifica se ainda há fases (perguntas) restantes
        if (faseIndex >= estagio.data.perguntasFases.length || estagio.vidaAtual <= 0) {
            // Este caso deve ser tratado por verificarFimTurno, mas é uma salvaguarda
            estagio.concluido = true;
            estagioAtualIndex++;
            proximaPergunta();
            return;
        }

        // Pega a pergunta correta para a fase
        dadosDaPergunta = estagio.data.perguntasFases[faseIndex];
        
        // Adiciona informações do Boss à pergunta atual
        dadosDaPergunta.inimigo = estagio.data.inimigo;
        // ATRIBUI A IMAGEM GENÉRICA DO MUNDO PARA O BOSS
        dadosDaPergunta.inimigoImg = imagemDoInimigo;
        dadosDaPergunta.vidaBoss = estagio.vidaAtual;
        dadosDaPergunta.vidaBossMax = estagio.vidaMax;
        
        vidaInimigoAtual = estagio.vidaAtual;
        vidaInimigoMax = estagio.vidaMax;
    } else {
        // Inimigo normal (com uma única vida/pergunta)
        dadosDaPergunta = estagio.data;
        // ATRIBUI A IMAGEM GENÉRICA DO MUNDO PARA O INIMIGO NORMAL
        dadosDaPergunta.inimigoImg = imagemDoInimigo;
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
    // Usa a imagem atribuída acima
    document.getElementById('inimigo-img').src = perguntaAtual.inimigoImg;

    document.getElementById('vida-inimigo-texto').textContent = vidaInimigoAtual + ' / ' + vidaInimigoMax;
    const barraInimigo = document.getElementById('vida-inimigo-bar');
    const percentualInimigo = vidaInimigoMax > 0 ? (vidaInimigoAtual / vidaInimigoMax) * 100 : 0;
    barraInimigo.style.width = percentualInimigo + '%';
    
    atualizarStatus();
    document.getElementById('mensagem').className = 'msg-neutra';
    document.getElementById('mensagem').textContent = `Enfrentando: ${perguntaAtual.inimigo}! Vamos lá, pequeno herói!`;
    
    // Se for Boss, mostra a fase:
    if (estagioEhBoss) {
        const fase = estagio.data.perguntasFases.length - (estagio.vidaAtual - 1);
        perguntaTexto.textContent = `Fase ${fase}: ${perguntaAtual.pergunta}`;
    } else {
        perguntaTexto.textContent = perguntaAtual.pergunta;
    }
    
    opcoesDiv.innerHTML = '';
    
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);
    
    // Cria botões de narração
    const btnOuvirPergunta = document.createElement('button');
    btnOuvirPergunta.textContent = '🔊 Ouvir Pergunta';
    btnOuvirPergunta.style.marginBottom = '15px';
    btnOuvirPergunta.onclick = () => falar(perguntaAtual.pergunta, narracaoAlternativasAtiva ? () => lerOpcoesDeResposta(respostasEmbaralhadas) : null);
    opcoesDiv.appendChild(btnOuvirPergunta);
    
    const btnOuvirOpcoes = document.createElement('button');
    btnOuvirOpcoes.textContent = '🗣️ Ouvir Opções';
    btnOuvirOpcoes.style.marginBottom = '15px';
    btnOuvirOpcoes.style.marginLeft = '10px';
    btnOuvirOpcoes.onclick = () => lerOpcoesDeResposta(respostasEmbaralhadas);
    opcoesDiv.appendChild(btnOuvirOpcoes);
    
    opcoesDiv.appendChild(document.createElement('br')); 

    // Narração automática da pergunta com o callback das opções
    if (narracaoPerguntaAtiva) {
        let textoPerguntaCompleto = perguntaAtual.pergunta;
        if (estagioEhBoss) {
            const fase = estagio.data.perguntasFases.length - (estagio.vidaAtual - 1);
            textoPerguntaCompleto = `Fase ${fase}. ${perguntaAtual.inimigo} te espera! Escute o desafio: ${perguntaAtual.pergunta}`;
        }
        
        if (narracaoAlternativasAtiva) {
             // Passamos a narração das opções como um callback da narração da pergunta
            falar(textoPerguntaCompleto, () => lerOpcoesDeResposta(respostasEmbaralhadas));
        } else {
            // Se só a pergunta estiver ativa, não há callback
            falar(textoPerguntaCompleto);
        }
        
    } else {
        falar(`Prepare-se para o desafio!`);
    }

    
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
            estagio.vidaAtual--; // Só decrementa se for Boss
            adicionarPontuacao(true);
            mensagemElemento.textContent = `🎉 ACERTOU! Super Dano no ${perguntaAtual.inimigo}! O Boss perdeu uma vida! Mantenha o foco!`;
            falar("UAU! Que golpe poderoso! O Boss sentiu!");
        } else {
            estagio.data.vida--; 
            adicionarPontuacao(false);
            mensagemElemento.textContent = `🎉 UAU! Você ACERTOU! ${perguntaAtual.inimigo} derrotado! Avance!`;
            falar("PARABÉNS! Que inteligência! Você acertou!");
        }
        
        mensagemElemento.className = 'msg-acerto';
        
    } else {
        vidaJogador--;
        
        if (timeout) {
            mensagemElemento.className = 'msg-erro';
            mensagemElemento.textContent = `⏰ ACABOU O TEMPO! O ${perguntaAtual.inimigo} te atacou! Mas não desista!`;
            falar("Aah, o tempo acabou! Você perdeu um coração, mas vamos tentar de novo!");
        } else {
            mensagemElemento.className = 'msg-erro';
            mensagemElemento.textContent = `❌ Ah não! O ${perguntaAtual.inimigo} te acertou! Vamos pedir ajuda ao professor!`;
            falar("Ops! Resposta errada! Você perdeu um coração! Que tal uma dica?");
        }
        
        if (vidaJogador > 0) {
            mostrarProfessorDica();
        }
    }

    atualizarStatus();

    setTimeout(() => {
        verificarFimTurno(true); 
    }, 2000); 
}


function verificarFimTurno(turnoFinalizado) {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (vidaJogador <= 0) {
        speechSynthesis.cancel();
        document.getElementById('mensagem').className = 'msg-erro';
        document.getElementById('mensagem').textContent = `FIM DE JOGO, pequeno herói! Pontuação: ${pontuacao}. Não desista! Tente de novo!`;
        document.getElementById('area-pergunta').innerHTML = '<button onclick="mostrarSelecao()">Tentar Novamente</button>'; 
        document.getElementById('inimigo-img').src = IMG_GAME_OVER;
        document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual]; 
        falar("Ahhh, fim de jogo! Mas você foi muito corajoso! Tente de novo.");
        return;

    } 
    
    // Lógica de avanço para Bosses e inimigos normais
    const inimigoDerrotado = estagio.tipo === 'boss' ? estagio.vidaAtual <= 0 : estagio.data.vida <= 0;

    if (inimigoDerrotado) {
        // Derrotou o Boss ou o Inimigo normal
        estagio.concluido = true;
        
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🌟 ${perguntaAtual.inimigo} DERROTADO! Você é demais! Próxima aventura...`;
        falar(`Vitória! Você venceu esse desafio! Rumo ao próximo!`);

        estagioAtualIndex++; 

        setTimeout(() => {
            if (estagioAtualIndex < estagiosDoMundoAtual.length) {
                mostrarMapa(); 
            } else {
                proximaPergunta(); // Chama a vitória final se for o último
            }
        }, 1500); 

    } else if (estagio.tipo === 'boss' && estagio.vidaAtual > 0) {
        // Boss ainda está vivo, mas uma fase (pergunta) foi respondida corretamente
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = "ACERTOU! Boss recua, mas ainda te desafia! Próxima fase!";
        falar("Excelente! Acerte de novo para acabar com ele!");

        setTimeout(() => {
            proximaPergunta(); // Continua para a próxima fase (pergunta) do Boss
        }, 1500);
        
    } else if (inimigoDerrotado === false && vidaJogador > 0) {
        // Inimigo normal não derrotado (ou seja, errou a resposta) - Recarrega a mesma pergunta
        
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = "Sua vez de tentar de novo! Mostre sua força, pequeno herói!";
        falar("Vamos lá, pequeno herói! Tente de novo!");

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
            vidaInimigoMax = estagio.data.vidaMax; 
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
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = () => {
            console.log("Vozes TTS carregadas.");
        };
    }
    
    // Adicionar botão de opções ao menu inicial
    const menuInicial = document.getElementById('menu-inicial');
    if (menuInicial) {
        // Verifica se o botão de opções já existe para não duplicar
        if (!document.getElementById('btn-opcoes')) {
             menuInicial.innerHTML += '<button id="btn-opcoes" onclick="mostrarOpcoes()">⚙️ Opções</button>';
        }
    }

    // Inicializar a tela de opções (deve estar no HTML)
    let telaOpcoesDiv = document.getElementById('tela-opcoes');
    if (!telaOpcoesDiv) {
        telaOpcoesDiv = document.createElement('div');
        telaOpcoesDiv.id = 'tela-opcoes';
        telaOpcoesDiv.className = 'tela';
        document.body.appendChild(telaOpcoesDiv);
    }
    
    ocultarTodas();
    document.getElementById('menu-inicial').style.display = 'block'; 

    const botaoComecar = document.getElementById('btn-comecar') || document.getElementById('botao-comecar'); 
    if (botaoComecar) {
        botaoComecar.addEventListener('click', mostrarSelecao);
    }
});


