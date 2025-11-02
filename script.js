// --- Variáveis Globais de Jogo ---
let vidaJogador = 3;
const vidaJogadorMax = 3;
let mundoAtual = '';
let perguntaAtual = {};
let pontuacao = 0;
let cronometro;
const TEMPO_LIMITE = 15; // 15 segundos para responder
const PONTOS_POR_ACERTO = 100;
const PONTOS_POR_BOSS = 300;
let estagioAtualIndex = 0; // Rastreia o estágio atual no mapa
let estagiosDoMundoAtual = []; // Array de estágios do mundo escolhido
let dificuldadeAtual = 'NIVEL_1'; // Controla a dificuldade das perguntas
const ESTAGIOS_POR_NIVEL = 4; // Quantidade de perguntas padrão por nível antes de um Boss

// Rastreia a pergunta atual dentro de um estágio BOSS de múltiplas perguntas
let perguntaAtualIndexBoss = 0; 


// --- IMAGENS PRÉ-DEFINIDAS ---
const IMAGENS_HEROI = {
    matematica: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Herói_Mat",
    portugues: "https://via.placeholder.com/150/3498db/FFFFFF?text=Herói_Port"
};
const IMG_GAME_OVER = "https://via.placeholder.com/150/000000/FFFFFF?text=GAME_OVER";
const IMG_VITORIA = "https://via.placeholder.com/150/f1c40f/FFFFFF?text=VITORIA";
const IMG_INIMIGO_PADRAO = "https://via.placeholder.com/150/e74c3c/FFFFFF?text=INIMIGO";
const IMG_BOSS_1 = "https://via.placeholder.com/150/8e44ad/FFFFFF?text=BOSS-M1";
const IMG_BOSS_2_MAT = "https://via.placeholder.com/150/ff5733/FFFFFF?text=BOSS-M2"; 
const IMG_BOSS_2_PORT = "https://via.placeholder.com/150/c0392b/FFFFFF?text=BOSS-P2"; 

// --- NOVAS IMAGENS PARA NÍVEL 3 E BOSS FINAL
const IMG_BOSS_ULTIMATE = "https://via.placeholder.com/150/000080/FFFFFF?text=BOSS-ULTIMATE";
const IMG_RAIZ = "https://via.placeholder.com/150/ff00ff/FFFFFF?text=Raiz-1";
const IMG_ALGEBRA = "https://via.placeholder.com/150/00ffff/FFFFFF?text=Alg-2";
const IMG_GEOMETRIA = "https://via.placeholder.com/150/ffff00/FFFFFF?text=Geo-3";
const IMG_RITMO = "https://via.placeholder.com/150/f0f0f0/FFFFFF?text=Rit-4";

const IMG_VERBO = "https://via.placeholder.com/150/ff00ff/FFFFFF?text=Verb-1";
const IMG_SILABA = "https://via.placeholder.com/150/00ffff/FFFFFF?text=Sil-2";
const IMG_MIMICO = "https://via.placeholder.com/150/ffff00/FFFFFF?text=Mim-3";
const IMG_COLETIVO = "https://via.placeholder.com/150/f0f0f0/FFFFFF?text=Col-4";


// --- CONTEÚDO: PERGUNTAS DE MATEMÁTICA ---
const PERGUNTAS_MAT = {
    NIVEL_1: [
        { pergunta: "Quanto é 3 + 1?", respostas: ["1", "3", "4", "2"], correta: "4", inimigo: "Monstro da Adição", inimigoImg: "https://via.placeholder.com/150/e74c3c/FFFFFF?text=Add-1" },
        { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Cont-2" },
        { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Forma-3" },
        { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Add-4" }
    ],
    NIVEL_2: [
        { pergunta: "Quanto é 5 x 3?", respostas: ["10", "15", "8", "20"], correta: "15", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Mult-1" },
        { pergunta: "Qual é o dobro de 7?", respostas: ["12", "16", "14", "21"], correta: "14", inimigo: "Gênio do Dobro", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Dob-2" },
        { pergunta: "Qual o resultado de 10 - 2 x 4?", respostas: ["32", "2", "8", "4"], correta: "2", inimigo: "Mago das Operações", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Op-3" },
        { pergunta: "Se um lápis custa R$ 2,00, quanto custam 5 lápis?", respostas: ["R$ 8,00", "R$ 12,00", "R$ 10,00", "R$ 5,00"], correta: "R$ 10,00", inimigo: "Mercador Trapaceiro", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Merc-4" }
    ],
    // NOVO NÍVEL
    NIVEL_3: [
        { pergunta: "Qual é a raiz quadrada de 16?", respostas: ["2", "8", "4", "16"], correta: "4", inimigo: "Mestre da Raiz", inimigoImg: IMG_RAIZ },
        { pergunta: "Se $3x = 21$, qual o valor de x?", respostas: ["6", "7", "8", "9"], correta: "7", inimigo: "Guerreiro da Álgebra", inimigoImg: IMG_ALGEBRA },
        { pergunta: "Qual a área de um quadrado com lado 5?", respostas: ["10", "20", "25", "30"], correta: "25", inimigo: "Monstro da Geometria", inimigoImg: IMG_GEOMETRIA },
        { pergunta: "O que vem depois do 100 em contagem de 10 em 10?", respostas: ["101", "110", "1000", "90"], correta: "110", inimigo: "Ancião do Ritmo", inimigoImg: IMG_RITMO }
    ],
};

// --- CONTEÚDO: BOSSES DE MATEMÁTICA ---
const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5" },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15" },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8" }
];

const BOSS_MAT_1 = { 
    perguntas: PERGUNTAS_BOSS_MAT_1, 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: $x + 5 = 12$?", respostas: ["5", "7", "6", "17"], correta: "7" },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16" },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00" }
];

const BOSS_MAT_2 = { 
    perguntas: PERGUNTAS_BOSS_MAT_2, 
    inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS 2)", 
    inimigoImg: IMG_BOSS_2_MAT, 
    proximoNivel: 'NIVEL_3' // MUDANÇA: AGORA LEVA PARA O NÍVEL 3
};

// NOVO BOSS FINAL DE MATEMÁTICA
const PERGUNTAS_BOSS_MAT_3 = [
    { pergunta: "Resolva: $\\sqrt{49} + 3 \\times 2$", respostas: ["13", "14", "16", "20"], correta: "13" },
    { pergunta: "Qual a porcentagem: 50% de 80?", respostas: ["20", "30", "40", "50"], correta: "40" },
    { pergunta: "A soma dos ângulos internos de um triângulo é:", respostas: ["90°", "180°", "270°", "360°"], correta: "180°" },
    { pergunta: "O que é um número primo?", respostas: ["Divisível por 2", "Par", "Divisível apenas por 1 e por ele mesmo", "Maior que 10"], correta: "Divisível apenas por 1 e por ele mesmo" }
];

const BOSS_MAT_3 = { 
    perguntas: PERGUNTAS_BOSS_MAT_3, 
    inimigo: "O TODO PODEROSO DA MATEMÁTICA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_ULTIMATE, 
    proximoNivel: null 
};


// --- CONTEÚDO: PERGUNTAS DE PORTUGUÊS ---
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B" },
        { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E" },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2" },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3" }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1" },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2" },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3" },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4" }
    ],
    // NOVO NÍVEL
    NIVEL_3: [
        { pergunta: "Qual é o pretérito imperfeito do verbo 'ser' na 1ª pessoa do singular?", respostas: ["Eu fui", "Eu era", "Eu serei", "Eu sou"], correta: "Eu era", inimigo: "Bruxa dos Verbos", inimigoImg: IMG_VERBO },
        { pergunta: "O que é uma 'oxítona'?", respostas: ["Sílaba forte no meio", "Sílaba forte na última posição", "Sílaba forte na penúltima", "Não tem sílaba forte"], correta: "Sílaba forte na última posição", inimigo: "Duende da Sílaba", inimigoImg: IMG_SILABA },
        { pergunta: "Em qual palavra o 'H' é um dígrafo?", respostas: ["Hotel", "Homem", "Chave", "Honra"], correta: "Chave", inimigo: "Mímico da Letra", inimigoImg: IMG_MIMICO },
        { pergunta: "Qual o substantivo coletivo de 'peixes'?", respostas: ["Nuvem", "Bando", "Cardume", "Colmeia"], correta: "Cardume", inimigo: "Pescador Esperto", inimigoImg: IMG_COLETIVO }
    ],
};

// --- CONTEÚDO: BOSSES DE PORTUGUÊS ---

const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa" },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!" },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro" }
];

const BOSS_PORT_1 = { 
    perguntas: PERGUNTAS_BOSS_PORT_1, 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"] , correta: "Advérbio"},
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro" },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato" }
];

const BOSS_PORT_2 = { 
    perguntas: PERGUNTAS_BOSS_PORT_2, 
    inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS 2)", 
    inimigoImg: IMG_BOSS_2_PORT, 
    proximoNivel: 'NIVEL_3' // MUDANÇA: AGORA LEVA PARA O NÍVEL 3
};

// NOVO BOSS FINAL DE PORTUGUÊS
const PERGUNTAS_BOSS_PORT_3 = [
    { pergunta: "Qual a função sintática da palavra 'muito' na frase: 'Ele é muito inteligente'?", respostas: ["Objeto direto", "Predicativo do sujeito", "Adjunto adverbial de intensidade", "Aposto"], correta: "Adjunto adverbial de intensidade" },
    { pergunta: "Qual palavra está incorreta no plural?", respostas: ["Capitães", "Pães", "Cidadões", "Degraus"], correta: "Cidadões" },
    { pergunta: "A oração 'Onde você mora?' é classificada como:", respostas: ["Declarativa", "Imperativa", "Exclamativa", "Interrogativa"], correta: "Interrogativa" },
    { pergunta: "Qual destas palavras é um 'adjetivo pátrio'?", respostas: ["Pessoa", "Brasileiro", "Amigo", "Rápido"], correta: "Brasileiro" }
];

const BOSS_PORT_3 = { 
    perguntas: PERGUNTAS_BOSS_PORT_3, 
    inimigo: "O GUARDIÃO DA LÍNGUA PORTUGUESA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_ULTIMATE, 
    proximoNivel: null 
};


/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para 3 níveis e 3 Bosses.**
 */
function criarEstagios(perguntasPorNivel, boss1, boss2, boss3) { // NOVO PARÂMETRO
    let estagios = [];

    // NÍVEL 1
    const nivel1Estagios = perguntasPorNivel.NIVEL_1
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_1' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel1Estagios);

    // BOSS 1
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss1.inimigo,           
            inimigoImg: boss1.inimigoImg,     
            perguntas: boss1.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss1.perguntas.length, 
            vidaAtual: boss1.perguntas.length,
            proximoNivel: boss1.proximoNivel
        },
        concluido: false
    });

    // NÍVEL 2
    const nivel2Estagios = perguntasPorNivel.NIVEL_2
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_2' }, 
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel2Estagios);

    // BOSS 2
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss2.inimigo,           
            inimigoImg: boss2.inimigoImg,     
            perguntas: boss2.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss2.perguntas.length,
            vidaAtual: boss2.perguntas.length,
            proximoNivel: boss2.proximoNivel // Leva para NIVEL_3
        },
        concluido: false
    });

    // NOVO: NÍVEL 3
    const nivel3Estagios = perguntasPorNivel.NIVEL_3
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_3' }, 
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel3Estagios);

    // NOVO: BOSS 3 (FINAL)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss3.inimigo,           
            inimigoImg: boss3.inimigoImg,     
            perguntas: boss3.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss3.perguntas.length,
            vidaAtual: boss3.perguntas.length,
            proximoNivel: boss3.proximoNivel // Será 'null' (Fim de Jogo)
        },
        concluido: false
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    dificuldadeAtual = 'NIVEL_1'; 
    perguntaAtualIndexBoss = 0; 
    
    // Atualiza o display visual (manter esta parte fora do DOM substituível)
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) { // ATUALIZADO: Inclui BOSS 3
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2, BOSS_MAT_3); 
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2, BOSS_PORT_3);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome} - Nível: ${dificuldadeAtual.replace('_', ' ')}`;

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
            font-size: 14px;
        `;

        // Define a cor e o texto do nó
        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; 
            node.textContent = isBoss ? '🏆' : '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; 
            node.textContent = isBoss ? '🔥' : (index + 1); 
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; 
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${estagiosDoMundoAtual[index].concluido ? '#2ecc71' : '#bdc3c7'};
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
    
    // Define a imagem do herói com base no mundo
    document.getElementById('        { pergunta: "Quanto é 3 + 1?", respostas: ["1", "3", "4", "2"], correta: "4", inimigo: "Monstro da Adição", inimigoImg: "https://via.placeholder.com/150/e74c3c/FFFFFF?text=Add-1" },
        { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Cont-2" },
        { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Forma-3" },
        { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Add-4" }
    ],
    NIVEL_2: [
        { pergunta: "Quanto é 5 x 3?", respostas: ["10", "15", "8", "20"], correta: "15", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Mult-1" },
        { pergunta: "Qual é o dobro de 7?", respostas: ["12", "16", "14", "21"], correta: "14", inimigo: "Gênio do Dobro", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Dob-2" },
        { pergunta: "Qual o resultado de 10 - 2 x 4?", respostas: ["32", "2", "8", "4"], correta: "2", inimigo: "Mago das Operações", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Op-3" },
        { pergunta: "Se um lápis custa R$ 2,00, quanto custam 5 lápis?", respostas: ["R$ 8,00", "R$ 12,00", "R$ 10,00", "R$ 5,00"], correta: "R$ 10,00", inimigo: "Mercador Trapaceiro", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Merc-4" }
    ],
    // NOVO NÍVEL
    NIVEL_3: [
        { pergunta: "Qual é a raiz quadrada de 16?", respostas: ["2", "8", "4", "16"], correta: "4", inimigo: "Mestre da Raiz", inimigoImg: IMG_RAIZ },
        { pergunta: "Se $3x = 21$, qual o valor de x?", respostas: ["6", "7", "8", "9"], correta: "7", inimigo: "Guerreiro da Álgebra", inimigoImg: IMG_ALGEBRA },
        { pergunta: "Qual a área de um quadrado com lado 5?", respostas: ["10", "20", "25", "30"], correta: "25", inimigo: "Monstro da Geometria", inimigoImg: IMG_GEOMETRIA },
        { pergunta: "O que vem depois do 100 em contagem de 10 em 10?", respostas: ["101", "110", "1000", "90"], correta: "110", inimigo: "Ancião do Ritmo", inimigoImg: IMG_RITMO }
    ],
};

// --- CONTEÚDO: BOSSES DE MATEMÁTICA ---
const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5" },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15" },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8" }
];

const BOSS_MAT_1 = { 
    perguntas: PERGUNTAS_BOSS_MAT_1, 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: $x + 5 = 12$?", respostas: ["5", "7", "6", "17"], correta: "7" },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16" },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00" }
];

const BOSS_MAT_2 = { 
    perguntas: PERGUNTAS_BOSS_MAT_2, 
    inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS 2)", 
    inimigoImg: IMG_BOSS_2_MAT, 
    proximoNivel: 'NIVEL_3' // MUDANÇA: AGORA LEVA PARA O NÍVEL 3
};

// NOVO BOSS FINAL DE MATEMÁTICA
const PERGUNTAS_BOSS_MAT_3 = [
    { pergunta: "Resolva: $\\sqrt{49} + 3 \\times 2$", respostas: ["13", "14", "16", "20"], correta: "13" },
    { pergunta: "Qual a porcentagem: 50% de 80?", respostas: ["20", "30", "40", "50"], correta: "40" },
    { pergunta: "A soma dos ângulos internos de um triângulo é:", respostas: ["90°", "180°", "270°", "360°"], correta: "180°" },
    { pergunta: "O que é um número primo?", respostas: ["Divisível por 2", "Par", "Divisível apenas por 1 e por ele mesmo", "Maior que 10"], correta: "Divisível apenas por 1 e por ele mesmo" }
];

const BOSS_MAT_3 = { 
    perguntas: PERGUNTAS_BOSS_MAT_3, 
    inimigo: "O TODO PODEROSO DA MATEMÁTICA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_ULTIMATE, 
    proximoNivel: null 
};


// --- CONTEÚDO: PERGUNTAS DE PORTUGUÊS ---
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B" },
        { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E" },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2" },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3" }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1" },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2" },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3" },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4" }
    ],
    // NOVO NÍVEL
    NIVEL_3: [
        { pergunta: "Qual é o pretérito imperfeito do verbo 'ser' na 1ª pessoa do singular?", respostas: ["Eu fui", "Eu era", "Eu serei", "Eu sou"], correta: "Eu era", inimigo: "Bruxa dos Verbos", inimigoImg: IMG_VERBO },
        { pergunta: "O que é uma 'oxítona'?", respostas: ["Sílaba forte no meio", "Sílaba forte na última posição", "Sílaba forte na penúltima", "Não tem sílaba forte"], correta: "Sílaba forte na última posição", inimigo: "Duende da Sílaba", inimigoImg: IMG_SILABA },
        { pergunta: "Em qual palavra o 'H' é um dígrafo?", respostas: ["Hotel", "Homem", "Chave", "Honra"], correta: "Chave", inimigo: "Mímico da Letra", inimigoImg: IMG_MIMICO },
        { pergunta: "Qual o substantivo coletivo de 'peixes'?", respostas: ["Nuvem", "Bando", "Cardume", "Colmeia"], correta: "Cardume", inimigo: "Pescador Esperto", inimigoImg: IMG_COLETIVO }
    ],
};

// --- CONTEÚDO: BOSSES DE PORTUGUÊS ---

const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa" },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!" },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro" }
];

const BOSS_PORT_1 = { 
    perguntas: PERGUNTAS_BOSS_PORT_1, 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"] , correta: "Advérbio"},
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro" },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato" }
];

const BOSS_PORT_2 = { 
    perguntas: PERGUNTAS_BOSS_PORT_2, 
    inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS 2)", 
    inimigoImg: IMG_BOSS_2_PORT, 
    proximoNivel: 'NIVEL_3' // MUDANÇA: AGORA LEVA PARA O NÍVEL 3
};

// NOVO BOSS FINAL DE PORTUGUÊS
const PERGUNTAS_BOSS_PORT_3 = [
    { pergunta: "Qual a função sintática da palavra 'muito' na frase: 'Ele é muito inteligente'?", respostas: ["Objeto direto", "Predicativo do sujeito", "Adjunto adverbial de intensidade", "Aposto"], correta: "Adjunto adverbial de intensidade" },
    { pergunta: "Qual palavra está incorreta no plural?", respostas: ["Capitães", "Pães", "Cidadões", "Degraus"], correta: "Cidadões" },
    { pergunta: "A oração 'Onde você mora?' é classificada como:", respostas: ["Declarativa", "Imperativa", "Exclamativa", "Interrogativa"], correta: "Interrogativa" },
    { pergunta: "Qual destas palavras é um 'adjetivo pátrio'?", respostas: ["Pessoa", "Brasileiro", "Amigo", "Rápido"], correta: "Brasileiro" }
];

const BOSS_PORT_3 = { 
    perguntas: PERGUNTAS_BOSS_PORT_3, 
    inimigo: "O GUARDIÃO DA LÍNGUA PORTUGUESA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_ULTIMATE, 
    proximoNivel: null 
};


/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para 3 níveis e 3 Bosses.**
 */
function criarEstagios(perguntasPorNivel, boss1, boss2, boss3) { // NOVO PARÂMETRO
    let estagios = [];

    // NÍVEL 1
    const nivel1Estagios = perguntasPorNivel.NIVEL_1
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_1' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel1Estagios);

    // BOSS 1
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss1.inimigo,           
            inimigoImg: boss1.inimigoImg,     
            perguntas: boss1.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss1.perguntas.length, 
            vidaAtual: boss1.perguntas.length,
            proximoNivel: boss1.proximoNivel
        },
        concluido: false
    });

    // NÍVEL 2
    const nivel2Estagios = perguntasPorNivel.NIVEL_2
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_2' }, 
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel2Estagios);

    // BOSS 2
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss2.inimigo,           
            inimigoImg: boss2.inimigoImg,     
            perguntas: boss2.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss2.perguntas.length,
            vidaAtual: boss2.perguntas.length,
            proximoNivel: boss2.proximoNivel // Leva para NIVEL_3
        },
        concluido: false
    });

    // NOVO: NÍVEL 3
    const nivel3Estagios = perguntasPorNivel.NIVEL_3
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_3' }, 
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel3Estagios);

    // NOVO: BOSS 3 (FINAL)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss3.inimigo,           
            inimigoImg: boss3.inimigoImg,     
            perguntas: boss3.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss3.perguntas.length,
            vidaAtual: boss3.perguntas.length,
            proximoNivel: boss3.proximoNivel // Será 'null' (Fim de Jogo)
        },
        concluido: false
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    dificuldadeAtual = 'NIVEL_1'; 
    perguntaAtualIndexBoss = 0; 
    
    // Atualiza o display visual (manter esta parte fora do DOM substituível)
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) { // ATUALIZADO: Inclui BOSS 3
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2, BOSS_MAT_3); 
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2, BOSS_PORT_3);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome} - Nível: ${dificuldadeAtual.replace('_', ' ')}`;

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
            font-size: 14px;
        `;

        // Define a cor e o texto do nó
        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; 
            node.textContent = isBoss ? '🏆' : '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; 
            node.textContent = isBoss ? '🔥' : (index + 1); 
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; 
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${estagiosDoMundoAtual[index].concluido ? '#2ecc71' : '#bdc3c7'};
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
    
    // Define a imagem do herói com base no mundo
    document.getElementById('        { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Cont-2" },
        { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Forma-3" },
        { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Add-4" }
    ],
    NIVEL_2: [
        { pergunta: "Quanto é 5 x 3?", respostas: ["10", "15", "8", "20"], correta: "15", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Mult-1" },
        { pergunta: "Qual é o dobro de 7?", respostas: ["12", "16", "14", "21"], correta: "14", inimigo: "Gênio do Dobro", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Dob-2" },
        { pergunta: "Qual o resultado de 10 - 2 x 4?", respostas: ["32", "2", "8", "4"], correta: "2", inimigo: "Mago das Operações", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Op-3" },
        { pergunta: "Se um lápis custa R$ 2,00, quanto custam 5 lápis?", respostas: ["R$ 8,00", "R$ 12,00", "R$ 10,00", "R$ 5,00"], correta: "R$ 10,00", inimigo: "Mercador Trapaceiro", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Merc-4" }
    ],
};

// --- CONTEÚDO: BOSSES DE MATEMÁTICA ---
const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5" },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15" },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8" }
];

const BOSS_MAT_1 = { 
    perguntas: PERGUNTAS_BOSS_MAT_1, // 3 perguntas = 3 vidas
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: x + 5 = 12?", respostas: ["5", "7", "6", "17"], correta: "7" },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16" },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00" }
];

const BOSS_MAT_2 = { 
    perguntas: PERGUNTAS_BOSS_MAT_2, // 3 perguntas = 3 vidas
    inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_MAT, 
    proximoNivel: null 
};

// --- CONTEÚDO: PERGUNTAS DE PORTUGUÊS ---
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B" },
        { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E" },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2" },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3" }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1" },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2" },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3" },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4" }
    ],
};

// --- CONTEÚDO: BOSSES DE PORTUGUÊS ---

const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa" },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!" },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro" }
];

const BOSS_PORT_1 = { 
    perguntas: PERGUNTAS_BOSS_PORT_1, // 3 perguntas = 3 vidas
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"] , correta: "Advérbio"},
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro" },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato" }
];

const BOSS_PORT_2 = { 
    perguntas: PERGUNTAS_BOSS_PORT_2, // 3 perguntas = 3 vidas
    inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_PORT, 
    proximoNivel: null 
};

/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para gerar APENAS UM ESTÁGIO de Boss com múltiplas vidas.**
 */
function criarEstagios(perguntasPorNivel, boss1, boss2) {
    let estagios = [];

    // NÍVEL 1 (Estágios 1 a ESTAGIOS_POR_NIVEL)
    const nivel1Estagios = perguntasPorNivel.NIVEL_1
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_1' }, // Garante vida 1 para inimigo normal
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel1Estagios);

    // BOSS 1 (AGORA APENAS UM ESTÁGIO)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss1.inimigo,           
            inimigoImg: boss1.inimigoImg,     
            perguntas: boss1.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss1.perguntas.length, // Vida do Boss = número de perguntas
            vidaAtual: boss1.perguntas.length,
            proximoNivel: boss1.proximoNivel
        },
        concluido: false
    });

    // NÍVEL 2 (Estágios N+1 a N+4) - Após o Boss 1
    const nivel2Estagios = perguntasPorNivel.NIVEL_2
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_2' }, // Garante vida 1 para inimigo normal
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel2Estagios);

    // BOSS 2 (FINAL) (AGORA APENAS UM ESTÁGIO)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss2.inimigo,           
            inimigoImg: boss2.inimigoImg,     
            perguntas: boss2.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss2.perguntas.length,
            vidaAtual: boss2.perguntas.length,
            proximoNivel: boss2.proximoNivel
        },
        concluido: false
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    dificuldadeAtual = 'NIVEL_1'; 
    perguntaAtualIndexBoss = 0; 
    
    // Atualiza o display visual
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) {
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2);
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome} - Nível: ${dificuldadeAtual.replace('_', ' ')}`;

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
            font-size: 14px;
        `;

        // Define a cor e o texto do nó
        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; 
            node.textContent = isBoss ? '🏆' : '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; 
            node.textContent = isBoss ? '🔥' : (index + 1); 
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; 
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${estagiosDoMundoAtual[index].concluido ? '#2ecc71' : '#bdc3c7'};        { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Cont-2", vida: 1 },
        { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Forma-3", vida: 1 },
        { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Add-4", vida: 1 }
    ],
    NIVEL_2: [
        { pergunta: "Quanto é 5 x 3?", respostas: ["10", "15", "8", "20"], correta: "15", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Mult-1", vida: 1 },
        { pergunta: "Qual é o dobro de 7?", respostas: ["12", "16", "14", "21"], correta: "14", inimigo: "Gênio do Dobro", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Dob-2", vida: 1 },
        { pergunta: "Qual o resultado de 10 - 2 x 4?", respostas: ["32", "2", "8", "4"], correta: "2", inimigo: "Mago das Operações", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Op-3", vida: 1 },
        { pergunta: "Se um lápis custa R$ 2,00, quanto custam 5 lápis?", respostas: ["R$ 8,00", "R$ 12,00", "R$ 10,00", "R$ 5,00"], correta: "R$ 10,00", inimigo: "Mercador Trapaceiro", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Merc-4", vida: 1 }
    ],
};

// --- CONTEÚDO: BOSSES DE MATEMÁTICA ---

// Bosses mantêm o array de perguntas, que agora será a 'vida' do Boss
const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5" },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15" },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8" }
];

const BOSS_MAT_1 = { 
    perguntas: PERGUNTAS_BOSS_MAT_1, // 3 perguntas = 3 vidas
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: x + 5 = 12?", respostas: ["5", "7", "6", "17"], correta: "7" },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16" },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00" }
];

const BOSS_MAT_2 = { 
    perguntas: PERGUNTAS_BOSS_MAT_2, // 3 perguntas = 3 vidas
    inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_MAT, 
    proximoNivel: null 
};

// --- CONTEÚDO: PERGUNTAS DE PORTUGUÊS ---
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B", vida: 1 },
        { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E", vida: 1 },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2", vida: 1 },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3", vida: 1 }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1", vida: 1 },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2", vida: 1 },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3", vida: 1 },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4", vida: 1 }
    ],
};

// --- CONTEÚDO: BOSSES DE PORTUGUÊS ---

const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa" },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!" },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro" }
];

const BOSS_PORT_1 = { 
    perguntas: PERGUNTAS_BOSS_PORT_1, // 3 perguntas = 3 vidas
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"] , correta: "Advérbio"},
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro" },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato" }
];

const BOSS_PORT_2 = { 
    perguntas: PERGUNTAS_BOSS_PORT_2, // 3 perguntas = 3 vidas
    inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_PORT, 
    proximoNivel: null 
};

/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para gerar APENAS UM ESTÁGIO de Boss com múltiplas vidas.**
 */
function criarEstagios(perguntasPorNivel, boss1, boss2) {
    let estagios = [];

    // NÍVEL 1 (Estágios 1 a ESTAGIOS_POR_NIVEL)
    const nivel1Estagios = perguntasPorNivel.NIVEL_1
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_1' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel1Estagios);

    // BOSS 1 (AGORA APENAS UM ESTÁGIO)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss1.inimigo,           
            inimigoImg: boss1.inimigoImg,     
            perguntas: boss1.perguntas.map((p, index) => ({...p, id: index})), // Adiciona ID às perguntas
            vidaMax: boss1.perguntas.length, // Vida do Boss = número de perguntas
            vidaAtual: boss1.perguntas.length,
            proximoNivel: boss1.proximoNivel
        },
        concluido: false
    });

    // NÍVEL 2 (Estágios N+1 a N+4) - Após o Boss 1
    const nivel2Estagios = perguntasPorNivel.NIVEL_2
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_2' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel2Estagios);

    // BOSS 2 (FINAL) (AGORA APENAS UM ESTÁGIO)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss2.inimigo,           
            inimigoImg: boss2.inimigoImg,     
            perguntas: boss2.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss2.perguntas.length,
            vidaAtual: boss2.perguntas.length,
            proximoNivel: boss2.proximoNivel
        },
        concluido: false
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    dificuldadeAtual = 'NIVEL_1'; 
    perguntaAtualIndexBoss = 0; // NOVO: Resetar o índice da pergunta do Boss
    
    // Atualiza o display visual
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) {
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2);
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome} - Nível: ${dificuldadeAtual.replace('_', ' ')}`;

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
            font-size: 14px;
        `;

        // Define a cor e o texto do nó
        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; 
            node.textContent = isBoss ? '🏆' : '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; 
            node.textContent = isBoss ? '🔥' : (index + 1); 
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; 
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${estagiosDoMundoAtual[index].concluido ? '#2ecc71' : '#bdc3c7'};
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
    
    // Define a imagem do herói com base no mundo
    document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];

    perguntaAtualIndexBoss = 0; // Inicia o contador de perguntas do Boss
    proximaPergunta();
}

// --- Funções de Batalha (Core) ---

function proximaPergunta() {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (!estagio) {
        // Se o estágio não existir (todos concluídos)
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA FINAL! Você CONCLUIU O MUNDO! Pontuação Final: ${pontuacao} pontos!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        return;
    }
    
    // Se for um estágio de Boss, usa a pergunta atual do array do Boss.
    if (estagio.tipo === 'boss') {
        // PERGUNTA ATUAL É O ESTÁGIO DE COMBATE ATUAL
        perguntaAtual = estagio.data.perguntas[perguntaAtualIndexBoss];
        
        // ADICIONA DADOS DO BOSS À PERGUNTA PARA DISPLAY
        perguntaAtual.inimigo = estagio.data.inimigo;
        perguntaAtual.inimigoImg = estagio.data.inimigoImg;
        perguntaAtual.vidaMax = estagio.data.vidaMax;
        perguntaAtual.vidaAtual = estagio.data.vidaAtual;
        perguntaAtual.proximoNivel = estagio.data.proximoNivel;

    } else {
        // Se for uma pergunta normal
        perguntaAtual = estagio.data;
    }

    pararCronometro();
    speechSynthesis.cancel();
    
    // Elementos de display
    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesDiv = document.getElementById('opcoes-resposta');
    if (!perguntaTexto || !opcoesDiv) {
        console.error("Erro fatal: Elementos de pergunta ou opções não encontrados. Reiniciando...");
        mostrarSelecao(); 
        return;
    }

    document.getElementById('nome-inimigo').textContent = perguntaAtual.inimigo;
    document.getElementById('inimigo-img').src = perguntaAtual.inimigoImg || IMG_INIMIGO_PADRAO;

    atualizarStatus();
    
    // Mensagem de Introdução/Turno
    let msg = `Estágio ${estagioAtualIndex + 1}`;
    if (estagio.tipo === 'boss') {
        msg += ` - BOSS: ${perguntaAtual.inimigo} (Vida ${estagio.data.vidaAtual} de ${estagio.data.vidaMax})`;
    } else {
        msg += ` - Enfrentando: ${perguntaAtual.inimigo}`;
    }
    document.getElementById('mensagem').className = 'msg-neutra';
    document.getElementById('mensagem').textContent = msg + '. Clique para ouvir a pergunta!';
    
    // PREENCHE OS ELEMENTOS:
    perguntaTexto.textContent = perguntaAtual.pergunta;
    opcoesDiv.innerHTML = '';
    
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);
    
    // Botões de Ouvir
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
    
    // Botões de Resposta
    respostasEmbaralhadas.forEach(resposta => {
        const btn = document.createElement('button');
        btn.textContent = resposta;
        btn.onclick = () => verificarResposta(resposta);
        opcoesDiv.appendChild(btn);
    });

    iniciarCronometro();
}


/**
 * Verifica a resposta do jogador e atualiza a vida do jogador e do estágio.
 */
function verificarResposta(respostaSelecionada) {
    pararCronometro();
    speechSynthesis.cancel();
    
    const mensagemElemento = document.getElementById('mensagem');
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];
    
    // Desabilita os botões para evitar cliques duplos
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;
    const isBoss = estagio.tipo === 'boss';

    if (acertou) {
        // Dano ao Boss ou inimigo normal
        if (isBoss) {
            estagio.data.vidaAtual--; // Tira 1 vida/pergunta do Boss
               { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Cont-2", vida: 1 },
        { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Forma-3", vida: 1 },
        { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Add-4", vida: 1 }
    ],
    NIVEL_2: [
        { pergunta: "Quanto é 5 x 3?", respostas: ["10", "15", "8", "20"], correta: "15", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Mult-1", vida: 1 },
        { pergunta: "Qual é o dobro de 7?", respostas: ["12", "16", "14", "21"], correta: "14", inimigo: "Gênio do Dobro", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Dob-2", vida: 1 },
        { pergunta: "Qual o resultado de 10 - 2 x 4?", respostas: ["32", "2", "8", "4"], correta: "2", inimigo: "Mago das Operações", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Op-3", vida: 1 },
        { pergunta: "Se um lápis custa R$ 2,00, quanto custam 5 lápis?", respostas: ["R$ 8,00", "R$ 12,00", "R$ 10,00", "R$ 5,00"], correta: "R$ 10,00", inimigo: "Mercador Trapaceiro", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Merc-4", vida: 1 }
    ],
};

// --- CONTEÚDO: BOSSES DE MATEMÁTICA ---

// Bosses mantêm o array de perguntas, que agora será a 'vida' do Boss
const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5" },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15" },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8" }
];

const BOSS_MAT_1 = { 
    perguntas: PERGUNTAS_BOSS_MAT_1, // 3 perguntas = 3 vidas
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: x + 5 = 12?", respostas: ["5", "7", "6", "17"], correta: "7" },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16" },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00" }
];

const BOSS_MAT_2 = { 
    perguntas: PERGUNTAS_BOSS_MAT_2, // 3 perguntas = 3 vidas
    inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_MAT, 
    proximoNivel: null 
};

// --- CONTEÚDO: PERGUNTAS DE PORTUGUÊS ---
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B", vida: 1 },
        { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E", vida: 1 },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2", vida: 1 },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3", vida: 1 }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1", vida: 1 },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2", vida: 1 },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3", vida: 1 },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4", vida: 1 }
    ],
};

// --- CONTEÚDO: BOSSES DE PORTUGUÊS ---

const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa" },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!" },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro" }
];

const BOSS_PORT_1 = { 
    perguntas: PERGUNTAS_BOSS_PORT_1, // 3 perguntas = 3 vidas
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"] , correta: "Advérbio"},
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro" },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato" }
];

const BOSS_PORT_2 = { 
    perguntas: PERGUNTAS_BOSS_PORT_2, // 3 perguntas = 3 vidas
    inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_PORT, 
    proximoNivel: null 
};

/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para gerar APENAS UM ESTÁGIO de Boss com múltiplas vidas.**
 */
function criarEstagios(perguntasPorNivel, boss1, boss2) {
    let estagios = [];

    // NÍVEL 1 (Estágios 1 a ESTAGIOS_POR_NIVEL)
    const nivel1Estagios = perguntasPorNivel.NIVEL_1
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_1' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel1Estagios);

    // BOSS 1 (AGORA APENAS UM ESTÁGIO)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss1.inimigo,           
            inimigoImg: boss1.inimigoImg,     
            perguntas: boss1.perguntas.map((p, index) => ({...p, id: index})), // Adiciona ID às perguntas
            vidaMax: boss1.perguntas.length, // Vida do Boss = número de perguntas
            vidaAtual: boss1.perguntas.length,
            proximoNivel: boss1.proximoNivel
        },
        concluido: false
    });

    // NÍVEL 2 (Estágios N+1 a N+4) - Após o Boss 1
    const nivel2Estagios = perguntasPorNivel.NIVEL_2
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_2' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel2Estagios);

    // BOSS 2 (FINAL) (AGORA APENAS UM ESTÁGIO)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss2.inimigo,           
            inimigoImg: boss2.inimigoImg,     
            perguntas: boss2.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss2.perguntas.length,
            vidaAtual: boss2.perguntas.length,
            proximoNivel: boss2.proximoNivel
        },
        concluido: false
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    dificuldadeAtual = 'NIVEL_1'; 
    perguntaAtualIndexBoss = 0; // NOVO: Resetar o índice da pergunta do Boss
    
    // Atualiza o display visual
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) {
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2);
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome} - Nível: ${dificuldadeAtual.replace('_', ' ')}`;

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
            font-size: 14px;
        `;

        // Define a cor e o texto do nó
        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; 
            node.textContent = isBoss ? '🏆' : '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; 
            node.textContent = isBoss ? '🔥' : (index + 1); 
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; 
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${estagiosDoMundoAtual[index].concluido ? '#2ecc71' : '#bdc3c7'};
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
    
    // Define a imagem do herói com base no mundo
    document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];

    perguntaAtualIndexBoss = 0; // Inicia o contador de perguntas do Boss
    proximaPergunta();
}

// --- Funções de Batalha (Core) ---

function proximaPergunta() {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (!estagio) {
        // Se o estágio não existir (todos concluídos)
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA FINAL! Você CONCLUIU O MUNDO! Pontuação Final: ${pontuacao} pontos!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        return;
    }
    
    // Se for um estágio de Boss, usa a pergunta atual do array do Boss.
    if (estagio.tipo === 'boss') {
        // PERGUNTA ATUAL É O ESTÁGIO DE COMBATE ATUAL
        perguntaAtual = estagio.data.perguntas[perguntaAtualIndexBoss];
        
        // ADICIONA DADOS DO BOSS À PERGUNTA PARA DISPLAY
        perguntaAtual.inimigo = estagio.data.inimigo;
        perguntaAtual.inimigoImg = estagio.data.inimigoImg;
        perguntaAtual.vidaMax = estagio.data.vidaMax;
        perguntaAtual.vidaAtual = estagio.data.vidaAtual;
        perguntaAtual.proximoNivel = estagio.data.proximoNivel;

    } else {
        // Se for uma pergunta normal
        perguntaAtual = estagio.data;
    }

    pararCronometro();
    speechSynthesis.cancel();
    
    // Elementos de display
    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesDiv = document.getElementById('opcoes-resposta');
    if (!perguntaTexto || !opcoesDiv) {
        console.error("Erro fatal: Elementos de pergunta ou opções não encontrados. Reiniciando...");
        mostrarSelecao(); 
        return;
    }

    document.getElementById('nome-inimigo').textContent = perguntaAtual.inimigo;
    document.getElementById('inimigo-img').src = perguntaAtual.inimigoImg || IMG_INIMIGO_PADRAO;

    atualizarStatus();
    
    // Mensagem de Introdução/Turno
    let msg = `Estágio ${estagioAtualIndex + 1}`;
    if (estagio.tipo === 'boss') {
        msg += ` - BOSS: ${perguntaAtual.inimigo} (Vida ${estagio.data.vidaAtual} de ${estagio.data.vidaMax})`;
    } else {
        msg += ` - Enfrentando: ${perguntaAtual.inimigo}`;
    }
    document.getElementById('mensagem').className = 'msg-neutra';
    document.getElementById('mensagem').textContent = msg + '. Clique para ouvir a pergunta!';
    
    // PREENCHE OS ELEMENTOS:
    perguntaTexto.textContent = perguntaAtual.pergunta;
    opcoesDiv.innerHTML = '';
    
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);
    
    // Botões de Ouvir
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
    
    // Botões de Resposta
    respostasEmbaralhadas.forEach(resposta => {
        const btn = document.createElement('button');
        btn.textContent = resposta;
        btn.onclick = () => verificarResposta(resposta);
        opcoesDiv.appendChild(btn);
    });

    iniciarCronometro();
}


/**
 * Verifica a resposta do jogador e atualiza a vida do jogador e do estágio.
 */
function verificarResposta(respostaSelecionada) {
    pararCronometro();
    speechSynthesis.cancel();
    
    const mensagemElemento = document.getElementById('mensagem');
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];
    
    // Desabilita os botões para evitar cliques duplos
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;
    const isBoss = estagio.tipo === 'boss';

    if (acertou) {
        // Dano ao Boss ou inimigo normal
        if (isBoss) {
            estagio.data.vidaAtual--; // Tira 1 vida/pergunta do Boss
           ],
    NIVEL_2: [
        { pergunta: "Quanto é 5 x 3?", respostas: ["10", "15", "8", "20"], correta: "15", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Mult-1", vida: 1 },
        { pergunta: "Qual é o dobro de 7?", respostas: ["12", "16", "14", "21"], correta: "14", inimigo: "Gênio do Dobro", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Dob-2", vida: 1 },
        { pergunta: "Qual o resultado de 10 - 2 x 4?", respostas: ["32", "2", "8", "4"], correta: "2", inimigo: "Mago das Operações", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Op-3", vida: 1 },
        { pergunta: "Se um lápis custa R$ 2,00, quanto custam 5 lápis?", respostas: ["R$ 8,00", "R$ 12,00", "R$ 10,00", "R$ 5,00"], correta: "R$ 10,00", inimigo: "Mercador Trapaceiro", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Merc-4", vida: 1 }
    ],
};

// --- CONTEÚDO: BOSSES DE MATEMÁTICA ---

// BOSS 1 de Matemática
const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5", vida: 1 },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15", vida: 1 },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8", vida: 1 }
];

const BOSS_MAT_1 = { 
    perguntas: PERGUNTAS_BOSS_MAT_1, 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

// BOSS 2 de Matemática (NOVO)
const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: x + 5 = 12?", respostas: ["5", "7", "6", "17"], correta: "7", vida: 1 },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16", vida: 1 },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00", vida: 1 }
];

const BOSS_MAT_2 = { 
    perguntas: PERGUNTAS_BOSS_MAT_2, 
    inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_MAT, 
    proximoNivel: null // Fim do mundo
};

// --- CONTEÚDO: PERGUNTAS DE PORTUGUÊS ---
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B", vida: 1 },
        { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E", vida: 1 },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2", vida: 1 },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3", vida: 1 }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1", vida: 1 },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2", vida: 1 },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3", vida: 1 },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4", vida: 1 }
    ],
};

// --- CONTEÚDO: BOSSES DE PORTUGUÊS ---

// BOSS 1 de Português
const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa", vida: 1 },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!", vida: 1 },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro", vida: 1 }
];

const BOSS_PORT_1 = { 
    perguntas: PERGUNTAS_BOSS_PORT_1, 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: IMG_BOSS_1, 
    proximoNivel: 'NIVEL_2'
};

// BOSS 2 de Português (NOVO)
const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"], correta: "Advérbio", vida: 1 },
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro", vida: 1 },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato", vida: 1 }
];

const BOSS_PORT_2 = { 
    perguntas: PERGUNTAS_BOSS_PORT_2, 
    inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS FINAL)", 
    inimigoImg: IMG_BOSS_2_PORT, 
    proximoNivel: null // Fim do mundo
};

/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para incluir Bosses e alternar entre Níveis de Dificuldade.**
 */
function criarEstagios(perguntasPorNivel, boss1, boss2) {
    let estagios = [];
    let contadorEstagio = 1;

    // NÍVEL 1 (Estágios 1 a ESTAGIOS_POR_NIVEL)
    const nivel1Estagios = perguntasPorNivel.NIVEL_1
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), nivel: 'NIVEL_1' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); // Garante o número correto de estágios
    
    estagios.push(...nivel1Estagios);
    contadorEstagio += nivel1Estagios.length;

    // BOSS 1 (Estágios N+1 a N+3)
    boss1.perguntas.forEach(p => {
        estagios.push({
            tipo: 'boss',
            data: { 
                ...JSON.parse(JSON.stringify(p)), 
                inimigo: boss1.inimigo,           
                inimigoImg: boss1.inimigoImg,     
                vida: 1,
                proximoNivel: boss1.proximoNivel
            },
            concluido: false
        });
    });
    contadorEstagio += boss1.perguntas.length;

    // NÍVEL 2 (Estágios N+4 a N+7) - Adicionado após o Boss 1
    const nivel2Estagios = perguntasPorNivel.NIVEL_2
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), nivel: 'NIVEL_2' },
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); // Garante o número correto de estágios
    
    estagios.push(...nivel2Estagios);
    contadorEstagio += nivel2Estagios.length;

    // BOSS 2 (FINAL) (Estágios N+8 a N+10)
    boss2.perguntas.forEach(p => {
        estagios.push({
            tipo: 'boss',
            data: { 
                ...JSON.parse(JSON.stringify(p)), 
                inimigo: boss2.inimigo,           
                inimigoImg: boss2.inimigoImg,     
                vida: 1,
                proximoNivel: boss2.proximoNivel
            },
            concluido: false
        });
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    dificuldadeAtual = 'NIVEL_1'; // Garante que a dificuldade comece no Nível 1
    
    // Atualiza o display visual
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) {
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2);
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

function mostrarMapa() {
    ocultarTodas();
    document.getElementById('tela-mapa').style.display = 'block';
    
    const mapaContainer = document.getElementById('mapa-container');
    mapaContainer.innerHTML = ''; 
    
    const mundoNome = mundoAtual === 'matematica' ? 'Matemática' : 'Português';
    document.getElementById('mapa-titulo').textContent = `Mundo da ${mundoNome} - Nível: ${dificuldadeAtual.replace('_', ' ')}`;

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
            color: white; /* Garante que o texto dentro do nó seja branco */
            font-size: 14px;
        `;

        // Define a cor e o texto do nó
        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; /* Verde para concluído */
            node.textContent = isBoss ? '🏆' : '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; /* Laranja/Vermelho para atual */
            node.textContent = isBoss ? '🔥' : (index + 1); // "B" para Boss
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; /* Cinza para futuro */
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
        if (index < estagiosDoMundoAtual.length - 1) {
            const linha = document.createElement('div');
            linha.style.cssText = `
                width: 50px;
                height: 5px;
                background-color: ${estagiosDoMundoAtual[index].concluido ? '#2ecc71' : '#bdc3c7'};
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
    
    // Define a imagem do herói com base no mundo
    document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];

    proximaPergunta();
}

// --- Funções de Batalha (Core) ---

function proximaPergunta() {
    // Pega a pergunta do estágio atual
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (!estagio) {
        // Se o estágio não existir (todos concluídos)
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA FINAL! Você CONCLUIU O MUNDO! Pontuação Final: ${pontuacao} pontos!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        return;
    }
    
    perguntaAtual = estagio.data;

    pararCronometro();
    speechSynthesis.cancel();
    
    // VERIFICAÇÃO DE SEGURANÇA
    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesDiv = document.getElementById('opcoes-resposta');
    if (!perguntaTexto || !opcoesDiv) {
        console.error("Erro fatal: Elementos de pergunta ou opções não encontrados. Reiniciando...");
        mostrarSelecao(); 
        return;
    }

    // Inicializa a vida do inimigo para o novo combate (Sempre 1)
    perguntaAtual.vidaMax = 1; 
    perguntaAtual.vidaAtual = 1; 
    
    document.getElementById('nome-inimigo').textContent = perguntaAtual.inimigo;
    document.getElementById('inimigo-img').src = perguntaAtual.inimigoImg || IMG_INIMIGO_PADRAO;

    atualizarStatus();
    document.getElementById('mensagem').className = 'msg-neutra';
    document.getElementById('mensagem').textContent = `Estágio ${estagioAtualIndex + 1} - Enfrentando: ${perguntaAtual.inimigo}. Clique para ouvir a pergunta!`;
    
    // PREENCHE OS ELEMENTOS:
    perguntaTexto.textContent = perguntaAtual.pergunta;
    opcoesDiv.innerHTML = '';
    
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);
    
    // Botões de Ouvir
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
    
    // Botões de Resposta
    respostasEmbaralhadas.forEach(resposta => {
        const btn = document.createElement('button');
        btn.textContent = resposta;
        btn.onclick = () => verificarResposta(resposta);
        opcoesDiv.appendChild(btn);
    });

    iniciarCronometro();
}


/**
 * Verifica a resposta do jogador e atualiza a vida do jogador e do estágio.
 */
function verificarResposta(respostaSelecionada) {
    pararCronometro();
    speechSynthesis.cancel();
    
    const mensagemElemento = document.getElementById('mensagem');
    
    // Desabilita os botões para evitar cliques duplos
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;
    const isBossStage = estagiosDoMundoAtual[estagioAtualIndex].tipo === 'boss';

    if (acertou) {
        perguntaAtual.vidaAtual = 0; // Derrota o inimigo/estágio atual
        adicionarPontuacao(isBossStage);
        mensagemElemento.className = 'msg-acerto';
        mensagemElemento.textContent = `🎉 Acertou! ${isBossStage ? 'Boss levou dano!' : 'Inimigo derrotado!'}`;
        falar("Você acertou! Muito bem!");
    } else if (timeout) {
        vidaJogador--;
        mensagemElemento.className = 'msg-erro';
        mensagemElemento.textContent = `⏰ Tempo Esgotado! O ${perguntaAtual.inimigo} te atacou!`;
        falar("Tempo esgotado! Você perdeu vida.");
    } 
    else {
        vidaJogador--;
        mensagemElemento.className = 'msg-erro';
        mensagemElemento.textContent = `❌ Ops! O ${perguntaAtual.inim    { pergunta: "Quanto é 1 + 1 + 1 + 1?", respostas: ["2", "3", "4", "5"], correta: "4", vida: 1 },
    { pergunta: "Quanto é 5x3?", respostas: ["10", "15", "8", "35"], correta: "15", vida: 1 },
    { pergunta: "Qual é o dobro de 8?", respostas: ["16", "10", "18", "4"], correta: "16", vida: 1 }
];

// NOVO: Boss de Matemática agora contém o array de perguntas
const BOSS_MAT = { 
    perguntas: PERGUNTAS_BOSS_MAT, 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS)", 
    inimigoImg: IMG_BOSS, 
};

const PERGUNTAS_PORT = [
    { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B", vida: 1 },
    { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E", vida: 1 },
    { pergunta: "O que rima com 'FOGUETE'?", respostas: ["CARRO", "MOTO", "BIKE", "BALDE"], correta: "MOTO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2", vida: 1 },
    { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3", vida: 1 }
];

// NOVO: Array de perguntas do Boss de Português
const PERGUNTAS_BOSS_PORT = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa", vida: 1 },
    { pergunta: "Qual o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", vida: 1 },
    { pergunta: "Qual o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", vida: 1 }
];

// NOVO: Boss de Português agora contém o array de perguntas
const BOSS_PORT = { 
    perguntas: PERGUNTAS_BOSS_PORT, 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS)", 
    inimigoImg: "https://via.placeholder.com/150/c0392b/FFFFFF?text=BOSS-P", 
};


/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 * **ATUALIZADO para tratar o Boss como múltiplos estágios.**
 */
function criarEstagios(perguntas, boss) {
    const estagios = perguntas.map(p => ({
        tipo: 'pergunta',
        data: JSON.parse(JSON.stringify(p)), // Cópia profunda
        concluido: false
    })).sort(() => Math.random() - 0.5); // Embaralha as perguntas padrão

    // Adiciona CADA pergunta do Boss como um estágio separado
    boss.perguntas.forEach((p, index) => {
        estagios.push({
            tipo: 'boss',
            data: { 
                ...JSON.parse(JSON.stringify(p)), // Copia os dados da pergunta do Boss
                inimigo: boss.inimigo,           // Adiciona o nome do Boss
                inimigoImg: boss.inimigoImg,     // Adiciona a imagem do Boss
                vida: 1 // Cada estágio do Boss tem vida 1
            },
            concluido: false
        });
    });

    return estagios;
}


// --- Funções de Leitura de Voz (Text-to-Speech) ---

function falar(texto) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.9; 
        speechSynthesis.speak(utterance);
    } else {
        console.warn("API de Síntese de Fala não suportada neste navegador.");
    }
}

function lerOpcoesDeResposta(opcoes) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); 
        let textoCompleto = "As opções são: ";
        opcoes.forEach((opcao, index) => {
            textoCompleto += `Opção ${index + 1}: ${opcao}. `;
        });
        falar(textoCompleto);
    }
}

// --- Funções de Navegação e Reset ---

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarSelecao() {
    ocultarTodas();
    
    // Reseta estado do jogo globalmente
    vidaJogador = vidaJogadorMax;
    pontuacao = 0;
    estagioAtualIndex = 0;
    estagiosDoMundoAtual = [];
    mundoAtual = '';
    
    // Atualiza o display visual
    document.getElementById('pontuacao-display').textContent = pontuacao;
    document.getElementById('vida-jogador-texto').textContent = vidaJogador + ' / ' + vidaJogadorMax;
    document.getElementById('vida-inimigo-texto').textContent = '0 / 0';
    document.getElementById('vida-inimigo-bar').style.width = '0%';
    document.getElementById('tempo-display').textContent = '--';
    
    // CORREÇÃO CRÍTICA: Garante que a estrutura da pergunta exista antes de usá-la.
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';


    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) {
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT);
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}


// --- Funções do Mapa de Progresso ---

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
            color: white; /* Garante que o texto dentro do nó seja branco */
        `;

        if (isConcluido) {
            node.style.backgroundColor = '#2ecc71'; /* Verde para concluído */
            node.textContent = '✅';
        } else if (isAtual) {
            node.style.backgroundColor = isBoss ? '#e74c3c' : '#f39c12'; /* Laranja/Vermelho para atual */
            node.textContent = isBoss ? 'B' : (index + 1); // "B" para Boss
            node.onclick = iniciarEstagioAtual; 
        } else {
            node.style.backgroundColor = '#bdc3c7'; /* Cinza para futuro */
            node.textContent = isBoss ? 'B' : (index + 1);
            node.style.cursor = 'default';
        }
        
        // Adiciona um conector (linha)
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
    
    // Define a imagem do herói com base no mundo
    document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];

    proximaPergunta();
}

// --- Funções de Batalha (Core) ---

function proximaPergunta() {
    // Pega a pergunta do estágio atual
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];

    if (!estagio) {
        // Se o estágio não existir (todos concluídos)
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA! Você VENCEU TUDO! Pontuação Final: ${pontuacao} pontos!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        return;
    }
    
    perguntaAtual = estagio.data;

    pararCronometro();
    speechSynthesis.cancel();
    
    // VERIFICAÇÃO DE SEGURANÇA (Para evitar o bug de elementos nulos)
    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesDiv = document.getElementById('opcoes-resposta');
    if (!perguntaTexto || !opcoesDiv) {
        console.error("Erro fatal: Elementos de pergunta ou opções não encontrados. Reiniciando...");
        mostrarSelecao(); 
        return;
    }

    // Inicializa a vida do inimigo para o novo combate (Sempre 1, pois o Boss foi dividido em estágios de vida 1)
    perguntaAtual.vidaMax = 1; 
    perguntaAtual.vidaAtual = 1; 
    
    document.getElementById('nome-inimigo').textContent = perguntaAtual.inimigo;
    document.getElementById('inimigo-img').src = perguntaAtual.inimigoImg || IMG_INIMIGO_PADRAO;

    atualizarStatus();
    document.getElementById('mensagem').className = 'msg-neutra';
    document.getElementById('mensagem').textContent = `Enfrentando: ${perguntaAtual.inimigo}. Clique para ouvir a pergunta!`;
    
    // PREENCHE OS ELEMENTOS:
    perguntaTexto.textContent = perguntaAtual.pergunta;
    opcoesDiv.innerHTML = '';
    
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);
    
    // Botões de Ouvir
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
    
    // Botões de Resposta
    respostasEmbaralhadas.forEach(resposta => {
        const btn = document.createElement('button');
        btn.textContent = resposta;
        btn.onclick = () => verificarResposta(resposta);
        opcoesDiv.appendChild(btn);
    });

    iniciarCronometro();
}


/**
 * Verifica a resposta do jogador e atualiza a vida do jogador e do estágio.
 * **ATUALIZADO para simplificar a derrota do estágio.**
 */
function verificarResposta(respostaSelecionada) {
    pararCronometro();
    speechSynthesis.cancel();
    
    const mensagemElemento = document.getElementById('mensagem');
    
    // Desabilita os botões para evitar cliques duplos
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;
    const isBossStage = estagiosDoMundoAtual[estagioAtualIndex].tipo === 'boss';

    if (acertou) {
        perguntaAtual.vidaAtual = 0; // Derrota o inimigo/estágio atual
        adicionarPontuacao(isBossStage);
        mensagemElemento.className = 'msg-acerto';
        mensagemElemento.textContent = `🎉 Acertou! ${isBossStage ? 'Boss levou dano!' : 'Inimigo derrotado!'}`;
        falar("Você acertou! Muito bem!");
    } else if (timeout) {
        vidaJogador--;
        mensagemElemento.className = 'msg-erro';
        mensagemElemento.textContent = `⏰ Tempo Esgotado! O ${perguntaAtual.inimigo} te atacou!`;
        falar("Tempo esgotado! Você perdeu vida.");
    } 
    else {
        vidaJogador--;
        mensagemElemento.className = 'msg-erro';
        mensagemElemento.textContent = `❌ Ops! O ${perguntaAtual.inimigo} te atacou!`;
        falar("Resposta errada. Você perdeu vida.");
    }

    atualizarStatus();

    setTimeout(() => {
        verificarFimTurno(acertou || timeout);
    }, 1500); 
}


/**
 * Verifica se o jogo acabou, se o estágio foi concluído ou se precisa continuar no mesmo estágio.
 * **ATUALIZADO: Remoção da lógica de Boss com múltiplas vidas/turnos, agora ele é derrotado no primeiro acerto.**
 */
function verificarFimTurno(turnoFinalizado) {
    if (vidaJogador <= 0) {
        // GAME OVER
        speechSynthesis.cancel();
        document.getElementById('mensagem').className = 'msg-erro';
        document.getElementById('mensagem').textContent = `GAME OVER! Pontuação: ${pontuacao}. Tente de novo!`;
        document.getElementById('area-pergunta').innerHTML = '<button onclick="mostrarSelecao()">Tentar Novamente</button>'; 
        document.getElementById('inimigo-img').src = IMG_GAME_OVER;
        document.getElementById('jogador-img').src = IMG_GAME_OVER;
        falar("Fim de jogo. Não desista! Tente de novo.");

    } else if (perguntaAtual.vidaAtual <= 0) {
        // INIMIGO/ESTÁGIO DERROTADO
        estagiosDoMundoAtual[estagioAtualIndex].concluido = true;
        
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🌟 ${perguntaAtual.inimigo} derrotado! Próxima aventura...`;
        falar(`Inimigo derrotado! Você é demais!`);

        estagioAtualIndex++; 

        setTimeout(() => {
            if (estagioAtualIndex < estagiosDoMundoAtual.length) {
                mostrarMapa();
            } else {
                proximaPergunta(); // Chama para exibir a tela de vitória final
            }
        }, 1500); 
        
    } else {
        // INIMIGO VIVO (Jogador errou): Mantém a mesma pergunta
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = "Sua vez! Tente a resposta correta para atacar!";
        
        // Reabilita os botões para que o jogador tente novamente
        if (turnoFinalizado === false) { 
            Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = false);
        }
        iniciarCronometro();
    }
}


// --- Funções Auxiliares (Pontuação, Status, Tempo) ---

function atualizarStatus() {
    const vidaInimigoAtual = perguntaAtual.vidaAtual || 0;
    const vidaInimigoMax = perguntaAtual.vidaMax || 1; 

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
        const tempoRestante = parseInt(document.getElementById('tempo-display').textContent);
        pontuacao += PONTOS_POR_ACERTO + (tempoRestante * 5);
    }
    document.getElementById('pontuacao-display').textContent = pontuacao;
}


// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    ocultarTodas();
    document.getElementById('menu-inicial').style.display = 'block'; 
});





