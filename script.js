// ========================================================================
// BLOCO 1: VARIÁVEIS GLOBAIS E CONSTANTES (Estado do Jogo)
// ========================================================================
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
let perguntaAtualIndexBoss = 0; // Rastreia a pergunta atual dentro de um estágio BOSS

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
const IMG_BOSS_ULTIMATE = "https://via.placeholder.com/150/000080/FFFFFF?text=BOSS-ULTIMATE";
// Imagens de Inimigos de Nível 3 (Placeholders específicos)
const IMG_RAIZ = "https://via.placeholder.com/150/ff00ff/FFFFFF?text=Raiz-1";
const IMG_ALGEBRA = "https://via.placeholder.com/150/00ffff/FFFFFF?text=Alg-2";
const IMG_GEOMETRIA = "https://via.placeholder.com/150/ffff00/FFFFFF?text=Geo-3";
const IMG_RITMO = "https://via.placeholder.com/150/f0f0f0/FFFFFF?text=Rit-4";
const IMG_VERBO = "https://via.placeholder.com/150/ff00ff/FFFFFF?text=Verb-1";
const IMG_SILABA = "https://via.placeholder.com/150/00ffff/FFFFFF?text=Sil-2";
const IMG_MIMICO = "https://via.placeholder.com/150/ffff00/FFFFFF?text=Mim-3";
const IMG_COLETIVO = "https://via.placeholder.com/150/f0f0f0/FFFFFF?text=Col-4"; 

// ========================================================================
// BLOCO 2: CONTEÚDO (PERGUNTAS DE MATEMÁTICA)
// ========================================================================
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
    NIVEL_3: [
        { pergunta: "Qual é a raiz quadrada de 16?", respostas: ["2", "8", "4", "16"], correta: "4", inimigo: "Mestre da Raiz", inimigoImg: IMG_RAIZ },
        { pergunta: "Se $3x = 21$, qual o valor de x?", respostas: ["6", "7", "8", "9"], correta: "7", inimigo: "Guerreiro da Álgebra", inimigoImg: IMG_ALGEBRA },
        { pergunta: "Qual a área de um quadrado com lado 5?", respostas: ["10", "20", "25", "30"], correta: "25", inimigo: "Monstro da Geometria", inimigoImg: IMG_GEOMETRIA },
        { pergunta: "O que vem depois do 100 em contagem de 10 em 10?", respostas: ["101", "110", "1000", "90"], correta: "110", inimigo: "Ancião do Ritmo", inimigoImg: IMG_RITMO }
    ],
};

const PERGUNTAS_BOSS_MAT_1 = [
    { pergunta: "Quanto é 1 + 1 + 1 + 1 + 1?", respostas: ["4", "5", "6", "3"], correta: "5" },
    { pergunta: "Qual é o triplo de 5?", respostas: ["10", "15", "8", "20"], correta: "15" },
    { pergunta: "Qual número está faltando: 2, 4, 6, _, 10?", respostas: ["7", "8", "9", "5"], correta: "8" }
];
const BOSS_MAT_1 = { perguntas: PERGUNTAS_BOSS_MAT_1, inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", inimigoImg: IMG_BOSS_1, proximoNivel: 'NIVEL_2' };

const PERGUNTAS_BOSS_MAT_2 = [
    { pergunta: "Qual o valor de 'x' na equação: $x + 5 = 12$?", respostas: ["5", "7", "6", "17"], correta: "7" },
    { pergunta: "Quanto é $4^2$ (quatro ao quadrado)?", respostas: ["8", "16", "4", "24"], correta: "16" },
    { pergunta: "Se $\\frac{1}{2}$ de uma pizza custa R$ 10,00, quanto custa a pizza inteira?", respostas: ["R$ 15,00", "R$ 20,00", "R$ 5,00", "R$ 10,00"], correta: "R$ 20,00" }
];
const BOSS_MAT_2 = { perguntas: PERGUNTAS_BOSS_MAT_2, inimigo: "KRATOS, O DEUS DA ÁLGEBRA (BOSS 2)", inimigoImg: IMG_BOSS_2_MAT, proximoNivel: 'NIVEL_3' };

const PERGUNTAS_BOSS_MAT_3 = [
    { pergunta: "Resolva: $\\sqrt{49} + 3 \\times 2$", respostas: ["13", "14", "16", "20"], correta: "13" },
    { pergunta: "Qual a porcentagem: 50% de 80?", respostas: ["20", "30", "40", "50"], correta: "40" },
    { pergunta: "A soma dos ângulos internos de um triângulo é:", respostas: ["90°", "180°", "270°", "360°"], correta: "180°" },
    { pergunta: "O que é um número primo?", respostas: ["Divisível por 2", "Par", "Divisível apenas por 1 e por ele mesmo", "Maior que 10"], correta: "Divisível apenas por 1 e por ele mesmo" }
];
const BOSS_MAT_3 = { perguntas: PERGUNTAS_BOSS_MAT_3, inimigo: "O TODO PODEROSO DA MATEMÁTICA (BOSS FINAL)", inimigoImg: IMG_BOSS_ULTIMATE, proximoNivel: null };

// ========================================================================
// BLOCO 3: CONTEÚDO (PERGUNTAS DE PORTUGUÊS)
// ========================================================================
const PERGUNTAS_PORT = {
    NIVEL_1: [
        { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B" },
        { pergunta: "Qual é a vogal de 'PÉ'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E" },
        { pergunta: "O que rima com 'MÃO'?", respostas: ["CARRO", "PÃO", "BIKE", "BALDE"], correta: "PÃO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2" },
        { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3" }
    ],
    NIVEL_2: [
        { pergunta: "Qual é o plural de 'cão'?", respostas: ["cãe", "cãos", "cachorros", "cães"], correta: "cães", inimigo: "Dragão do Plural", inimigoImg: "https://via.placeholder.com/150/e84393/FFFFFF?text=Plural-1" },
        { pergunta: "Qual é o sinônimo de 'alegre'?", respostas: ["triste", "feliz", "bravo", "lento"], correta: "feliz", inimigo: "Gênio dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Sino-2" },
        { pergunta: "Qual palavra é um 'substantivo próprio'?", respostas: ["mesa", "cachorro", "Brasil", "flor"], correta: "Brasil", inimigo: "Guardião da Gramática", inimigoImg: "https://via.placeholder.com/150/2c3e50/FFFFFF?text=Gram-3" },
        { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["exemplo", "ezemplo", "ezempro", "esemplo"], correta: "exemplo", inimigo: "Feiticeiro da Escrita", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Ort-4" }
    ],
    NIVEL_3: [
        { pergunta: "Qual é o pretérito imperfeito do verbo 'ser' na 1ª pessoa do singular?", respostas: ["Eu fui", "Eu era", "Eu serei", "Eu sou"], correta: "Eu era", inimigo: "Bruxa dos Verbos", inimigoImg: IMG_VERBO },
        { pergunta: "O que é uma 'oxítona'?", respostas: ["Sílaba forte no meio", "Sílaba forte na última posição", "Sílaba forte na penúltima", "Não tem sílaba forte"], correta: "Sílaba forte na última posição", inimigo: "Duende da Sílaba", inimigoImg: IMG_SILABA },
        { pergunta: "Em qual palavra o 'H' é um dígrafo?", respostas: ["Hotel", "Homem", "Chave", "Honra"], correta: "Chave", inimigo: "Mímico da Letra", inimigoImg: IMG_MIMICO },
        { pergunta: "Qual o substantivo coletivo de 'peixes'?", respostas: ["Nuvem", "Bando", "Cardume", "Colmeia"], correta: "Cardume", inimigo: "Pescador Esperto", inimigoImg: IMG_COLETIVO }
    ],
};

const PERGUNTAS_BOSS_PORT_1 = [
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa" },
    { pergunta: "Em qual frase a pontuação está correta?", respostas: ["Eu, comi bolo", "Eu comi bolo!", "Eu, comi, bolo", "Eu comi, bolo"], correta: "Eu comi bolo!" },
    { pergunta: "Qual é o antônimo de 'claro'?", respostas: ["luminoso", "brilhante", "escuro", "transparente"], correta: "escuro" }
];
const BOSS_PORT_1 = { perguntas: PERGUNTAS_BOSS_PORT_1, inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", inimigoImg: IMG_BOSS_1, proximoNivel: 'NIVEL_2' };

const PERGUNTAS_BOSS_PORT_2 = [
    { pergunta: "Qual é a classe gramatical de 'rapidamente'?", respostas: ["Substantivo", "Verbo", "Adjetivo", "Advérbio"] , correta: "Advérbio"},
    { pergunta: "Qual palavra NÃO tem acento tônico na última sílaba?", respostas: ["sofá", "avô", "pássaro", "parabéns"], correta: "pássaro" },
    { pergunta: "Na frase 'O cão e o gato são amigos.', qual é o 'sujeito'?", respostas: ["O cão e o gato", "amigos", "são", "o gato"], correta: "O cão e o gato" }
];
const BOSS_PORT_2 = { perguntas: PERGUNTAS_BOSS_PORT_2, inimigo: "MINERVA, A DEUSA DA SINTAXE (BOSS 2)", inimigoImg: IMG_BOSS_2_PORT, proximoNivel: 'NIVEL_3' };

const PERGUNTAS_BOSS_PORT_3 = [
    { pergunta: "Qual a função sintática da palavra 'muito' na frase: 'Ele é muito inteligente'?", respostas: ["Objeto direto", "Predicativo do sujeito", "Adjunto adverbial de intensidade", "Aposto"], correta: "Adjunto adverbial de intensidade" },
    { pergunta: "Qual palavra está incorreta no plural?", respostas: ["Capitães", "Pães", "Cidadões", "Degraus"], correta: "Cidadões" },
    { pergunta: "A oração 'Onde você mora?' é classificada como:", respostas: ["Declarativa", "Imperativa", "Exclamativa", "Interrogativa"], correta: "Interrogativa" },
    { pergunta: "Qual destas palavras é um 'adjetivo pátrio'?", respostas: ["Pessoa", "Brasileiro", "Amigo", "Rápido"], correta: "Brasileiro" }
];
const BOSS_PORT_3 = { perguntas: PERGUNTAS_BOSS_PORT_3, inimigo: "O GUARDIÃO DA LÍNGUA PORTUGUESA (BOSS FINAL)", inimigoImg: IMG_BOSS_ULTIMATE, proximoNivel: null };

// ========================================================================
// BLOCO 4: FUNÇÕES DE ESTRUTURA (Criação de Estágios)
// ========================================================================
/**
 * Cria a estrutura de estágios (pool de perguntas) para o mapa.
 */
function criarEstagios(perguntasPorNivel, boss1, boss2, boss3) { 
    let estagios = [];

    // NÍVEL 1 (com 4 perguntas aleatórias)
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

    // NÍVEL 2 (com 4 perguntas aleatórias)
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
            proximoNivel: boss2.proximoNivel 
        },
        concluido: false
    });

    // NÍVEL 3 (com 4 perguntas aleatórias)
    const nivel3Estagios = perguntasPorNivel.NIVEL_3
        .map(p => ({
            tipo: 'pergunta',
            data: { ...JSON.parse(JSON.stringify(p)), vidaMax: 1, vidaAtual: 1, nivel: 'NIVEL_3' }, 
            concluido: false
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, ESTAGIOS_POR_NIVEL); 
    
    estagios.push(...nivel3Estagios);

    // BOSS 3 (FINAL)
    estagios.push({
        tipo: 'boss',
        data: { 
            inimigo: boss3.inimigo,           
            inimigoImg: boss3.inimigoImg,     
            perguntas: boss3.perguntas.map((p, index) => ({...p, id: index})),
            vidaMax: boss3.perguntas.length,
            vidaAtual: boss3.perguntas.length,
            proximoNivel: boss3.proximoNivel
        },
        concluido: false
    });

    return estagios;
}

// ========================================================================
// BLOCO 5: FUNÇÕES DE ACESSIBILIDADE (Text-to-Speech)
// ========================================================================

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

// ========================================================================
// BLOCO 6: FUNÇÕES DE NAVEGAÇÃO E MENU (Chamadas pelo HTML)
// ========================================================================

function ocultarTodas() {
    speechSynthesis.cancel();
    pararCronometro();

    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('selecao-mundo').style.display = 'none';
    document.getElementById('tela-batalha').style.display = 'none';
    document.getElementById('tela-mapa').style.display = 'none'; 
}

function mostrarMenuInicial() {
    ocultarTodas();
    // Reseta estado do jogo para um novo começo
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
    
    // Garante que a área de pergunta volte ao estado inicial
    const areaPergunta = document.getElementById('area-pergunta');
    areaPergunta.innerHTML = '<div id="mensagem" class="msg-neutra">Selecione uma resposta para começar a batalha!</div><p id="pergunta-texto">Qual é a pergunta?</p><div id="opcoes-resposta"></div>';
    
    document.getElementById('menu-inicial').style.display = 'block';
}

function mostrarSelecao() {
    ocultarTodas();
    // Reutiliza o reset do menu inicial para garantir que o estado do jogo está limpo
    mostrarMenuInicial(); 
    document.getElementById('selecao-mundo').style.display = 'block';
}


function iniciarMundo(mundo) { 
    mundoAtual = mundo;
    
    if (mundo === 'matematica') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_MAT, BOSS_MAT_1, BOSS_MAT_2, BOSS_MAT_3); 
    } else if (mundo === 'portugues') {
        estagiosDoMundoAtual = criarEstagios(PERGUNTAS_PORT, BOSS_PORT_1, BOSS_PORT_2, BOSS_PORT_3);
    }

    estagioAtualIndex = 0; 
    mostrarMapa();
}

// ========================================================================
// BLOCO 7: FUNÇÕES DO MAPA DE PROGRESSO
// ========================================================================

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
            background-color: ${isConcluido ? '#2ecc71' : (isAtual ? (isBoss ? '#e74c3c' : '#f39c12') : '#bdc3c7')};
            box-shadow: ${isAtual ? '0 0 10px #f1c40f' : 'none'};
        `;
        node.textContent = isConcluido ? '✅' : (isBoss ? '🔥' : (index + 1));
        
        if (isAtual) {
            node.onclick = iniciarEstagioAtual; 
        } else {
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

    // Atualiza o botão para o estágio atual
    document.getElementById('botao-mapa-iniciar').textContent = estagioAtualIndex < estagiosDoMundoAtual.length ? `INICIAR ESTÁGIO ${estagioAtualIndex + 1}` : 'FIM DE MUNDO';
}


function iniciarEstagioAtual() {
    ocultarTodas();
    document.getElementById('tela-batalha').style.display = 'block';
    
    // Define a imagem do herói com base no mundo
    document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];

    perguntaAtualIndexBoss = 0; 
    proximaPergunta();
}

// ========================================================================
// BLOCO 8: FUNÇÕES DE BATALHA (Lógica Central do Quiz)
// ========================================================================

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
    
    // Desabilita os botões
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;
    const isBoss = estagio.tipo === 'boss';

    if (acertou) {
        if (isBoss) {
            estagio.data.vidaAtual--;
            perguntaAtualIndexBoss++;
        }
        
        adicionarPontuacao(isBoss);
        mensagemElemento.className = 'msg-acerto';
        mensagemElemento.textContent = `🎉 Acertou! ${isBoss ? `Boss perdeu uma vida! (${estagio.data.vidaAtual} restantes)` : 'Inimigo derrotado!'}`;
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
        verificarFimTurno(acertou);
    }, 1500); 
}

// ========================================================================
// BLOCO 9: FUNÇÕES DE FIM DE TURNO E PROGRESSO
// ========================================================================

/**
 * Verifica se o jogo acabou, se o estágio foi concluído ou se precisa continuar.
 */
function verificarFimTurno(acertou) {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];
    const isBoss = estagio.tipo === 'boss';
    let inimigoDerrotado = false;
    
    if (isBoss) {
        inimigoDerrotado = estagio.data.vidaAtual <= 0;
    } else {
        inimigoDerrotado = acertou;
    }

    if (vidaJogador <= 0) {
        // GAME OVER
        speechSynthesis.cancel();
        document.getElementById('mensagem').className = 'msg-erro';
        document.getElementById('mensagem').textContent = `GAME OVER! Pontuação: ${pontuacao}. Tente de novo!`;
        document.getElementById('area-pergunta').innerHTML = '<button onclick="mostrarSelecao()">Tentar Novamente</button>'; 
        document.getElementById('inimigo-img').src = IMG_GAME_OVER;
        document.getElementById('jogador-img').src = IMG_GAME_OVER;
        falar("Fim de jogo. Não desista! Tente de novo.");

    } else if (inimigoDerrotado) {
        // ESTÁGIO/BOSS COMPLETAMENTE DERROTADO
        estagio.concluido = true;
        
        if (isBoss && estagio.data.proximoNivel) {
            dificuldadeAtual = estagio.data.proximoNivel;
            document.getElementById('mensagem').textContent = `🌟 ${estagio.data.inimigo} derrotado! DIFICULDADE AUMENTADA para ${dificuldadeAtual.replace('_', ' ')}!`;
        } else {
            document.getElementById('mensagem').textContent = `🌟 ${isBoss ? estagio.data.inimigo : perguntaAtual.inimigo} derrotado! Próxima aventura...`;
        }

        falar(`Inimigo derrotado! Você é demais!`);

        estagioAtualIndex++; 
        perguntaAtualIndexBoss = 0;

        setTimeout(() => {
            if (estagioAtualIndex < estagiosDoMundoAtual.length) {
                mostrarMapa();
            } else {
                proximaPergunta(); // Chama para exibir a tela de vitória final
            }
        }, 1500); 
        
    } else if (isBoss && acertou) {
        // BOSS VIVO, MAS JOGADOR ACERTOU: Próxima Pergunta do Boss
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = `BOSS levou dano! Prepare-se para a próxima pergunta! (Vida ${estagio.data.vidaAtual})`;
        
        setTimeout(() => {
            proximaPergunta();
        }, 1000);

    } else {
        // INIMIGO VIVO (Jogador errou): Mantém a mesma pergunta
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = "Sua vez! Tente a resposta correta para atacar!";
        
        // Reabilita os botões
        Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = false);
        iniciarCronometro();
    }
}

// ========================================================================
// BLOCO 10: FUNÇÕES AUXILIARES E INICIALIZAÇÃO
// ========================================================================

/**
 * Atualiza as barras de vida e textos.
 */
function atualizarStatus() {
    const estagio = estagiosDoMundoAtual[estagioAtualIndex];
    let vidaInimigoAtual, vidaInimigoMax;

    if (estagio && estagio.tipo === 'boss') {
        vidaInimigoAtual = estagio.data.vidaAtual;
        vidaInimigoMax = estagio.data.vidaMax;
    } else if (estagio) {
        vidaInimigoAtual = estagio.data.vidaAtual || 1;
        vidaInimigoMax = estagio.data.vidaMax || 1; 
    } else {
        vidaInimigoAtual = 0;
        vidaInimigoMax = 0;
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
    let multiplicadorDificuldade = 1;
    if (dificuldadeAtual === 'NIVEL_2') {
        multiplicadorDificuldade = 1.5;
    } else if (dificuldadeAtual === 'NIVEL_3') {
        multiplicadorDificuldade = 2;
    }
    
    let pontosBase = eUmBoss ? PONTOS_POR_BOSS : PONTOS_POR_ACERTO;

    const tempoRestante = parseInt(document.getElementById('tempo-display').textContent) || 0;
    
    pontosBase += (tempoRestante * 5);
    
    pontuacao += Math.round(pontosBase * multiplicadorDificuldade);

    document.getElementById('pontuacao-display').textContent = pontuacao;
}


// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Apenas garante que a função de iniciar o menu é chamada ao carregar
    mostrarMenuInicial();
});
                                                    }
