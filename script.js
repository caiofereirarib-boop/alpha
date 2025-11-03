// =================================================================
//                 NOVO CÓDIGO JAVASCRIPT COMPLETO
// =================================================================

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


// --- IMAGENS PRÉ-DEFINIDAS ---
const IMAGENS_HEROI = {
    matematica: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Herói_Mat",
    portugues: "https://via.placeholder.com/150/3498db/FFFFFF?text=Herói_Port"
};
const IMG_GAME_OVER = "https://via.placeholder.com/150/000000/FFFFFF?text=GAME_OVER";
const IMG_VITORIA = "https://via.placeholder.com/150/f1c40f/FFFFFF?text=VITORIA";
const IMG_INIMIGO_PADRAO = "https://via.placeholder.com/150/e74c3c/FFFFFF?text=INIMIGO";
const IMG_BOSS = "https://via.placeholder.com/150/8e44ad/FFFFFF?text=BOSS-M";


// --- CONTEÚDO: PERGUNTAS E INIMIGOS (EM FORMATO DE ESTÁGIO) ---

// ################### MATEMÁTICA (20 Perguntas + 2 Bosses) ###################
const PERGUNTAS_MAT_NIVEL_1 = [ // FÁCEIS (10 Perguntas Iniciais)
    { pergunta: "Quanto é 3 + 1?", respostas: ["1", "3", "2", "4"], correta: "4", inimigo: "Monstro da Adição Simples", inimigoImg: "https://via.placeholder.com/150/e74c3c/FFFFFF?text=Add-1", vida: 1 },
    { pergunta: "Qual vem depois do número 9?", respostas: ["8", "10", "11", "90"], correta: "10", inimigo: "Contador Rápido", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Cont-2", vida: 1 },
    { pergunta: "Qual forma tem 3 pontas (lados)?", respostas: ["Círculo", "Quadrado", "Triângulo", "Estrela"], correta: "Triângulo", inimigo: "Geometra Maluco", inimigoImg: "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Forma-3", vida: 1 },
    { pergunta: "Se tenho 2 bonecas e ganho mais 2, com quantas eu fico?", respostas: ["3", "5", "4", "2"], correta: "4", inimigo: "Fada da Adição", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Add-4", vida: 1 },
    { pergunta: "Quanto é 5 - 2?", respostas: ["2", "4", "3", "1"], correta: "3", inimigo: "Gênio da Subtração", inimigoImg: "https://via.placeholder.com/150/007bff/FFFFFF?text=Sub-2", vida: 1 },
    { pergunta: "Número 6 mais 3 é?", respostas: ["8", "9", "10", "12"], correta: "9", inimigo: "Gnomo da Soma", inimigoImg: "https://via.placeholder.com/150/28a745/FFFFFF?text=Add-5", vida: 1 },
    { pergunta: "Qual o maior número: 1, 5 ou 3?", respostas: ["1", "3", "5", "Todos"], correta: "5", inimigo: "Troll da Ordem", inimigoImg: "https://via.placeholder.com/150/ffc107/FFFFFF?text=Maior-1", vida: 1 },
    { pergunta: "Quantos dedos tem em uma mão?", respostas: ["4", "6", "5", "10"], correta: "5", inimigo: "Bruxa dos Múltiplos", inimigoImg: "https://via.placeholder.com/150/dc3545/FFFFFF?text=Dedos-5", vida: 1 },
    { pergunta: "Quanto é 10 menos 5?", respostas: ["4", "5", "6", "7"], correta: "5", inimigo: "Esqueleto Subtrator", inimigoImg: "https://via.placeholder.com/150/6c757d/FFFFFF?text=Sub-3", vida: 1 },
    { pergunta: "O que vem antes do 5?", respostas: ["6", "4", "3", "7"], correta: "4", inimigo: "Relojoeiro do Tempo", inimigoImg: "https://via.placeholder.com/150/17a2b8/FFFFFF?text=Antes-5", vida: 1 }
];

const PERGUNTAS_MAT_NIVEL_2_E_3 = [ // MÉDIAS/DIFÍCEIS (10 Perguntas Pós-Boss 1)
    { pergunta: "Quanto é 2 x 3?", respostas: ["4", "5", "6", "7"], correta: "6", inimigo: "Multiplicador Fantasma", inimigoImg: "https://via.placeholder.com/150/6f42c1/FFFFFF?text=Mult-1", vida: 1 },
    { pergunta: "Qual é o resultado de 10 / 2?", respostas: ["3", "4", "5", "6"], correta: "5", inimigo: "Divisor Místico", inimigoImg: "https://via.placeholder.com/150/fd7e14/FFFFFF?text=Div-1", vida: 1 },
    { pergunta: "O que é um número par?", respostas: ["Ímpar", "Um número que divide por 2", "Um número que não divide por 2", "Zero"], correta: "Um número que divide por 2", inimigo: "Duende da Paridade", inimigoImg: "https://via.placeholder.com/150/e83e8c/FFFFFF?text=Par", vida: 1 },
    { pergunta: "Qual o resultado de 4 + 4 - 2?", respostas: ["8", "6", "7", "5"], correta: "6", inimigo: "Mago dos Cálculos Avançados", inimigoImg: "https://via.placeholder.com/150/000000/FFFFFF?text=Calc-4", vida: 1 },
    { pergunta: "Se você tem 3 maçãs e come 1/3, quantas sobraram?", respostas: ["2", "3", "1", "4"], correta: "2", inimigo: "Feiticeira das Frações", inimigoImg: "https://via.placeholder.com/150/6610f2/FFFFFF?text=Fracao", vida: 1 },
    { pergunta: "Quanto é 5 x 5?", respostas: ["10", "20", "25", "30"], correta: "25", inimigo: "Guardião da Tabuada", inimigoImg: "https://via.placeholder.com/150/ff007f/FFFFFF?text=Tab-5", vida: 1 },
    { pergunta: "Qual o dobro de 8?", respostas: ["14", "16", "18", "20"], correta: "16", inimigo: "Esfinge dos Dobros", inimigoImg: "https://via.placeholder.com/150/00c0b8/FFFFFF?text=Dobro", vida: 1 },
    { pergunta: "Quanto é 15 / 3?", respostas: ["4", "5", "6", "7"], correta: "5", inimigo: "Monstro da Divisão", inimigoImg: "https://via.placeholder.com/150/ff4500/FFFFFF?text=Div-2", vida: 1 },
    { pergunta: "Qual a metade de 12?", respostas: ["5", "6", "7", "8"], correta: "6", inimigo: "Elemental da Metade", inimigoImg: "https://via.placeholder.com/150/ffa500/FFFFFF?text=Metade", vida: 1 },
    { pergunta: "Calcule: 20 - 5 + 3", respostas: ["12", "18", "28", "20"], correta: "18", inimigo: "Cavaleiro das Operações", inimigoImg: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=Ordem", vida: 1 }
];

const BOSS_MAT_1 = { 
    pergunta: "Quanto é 10 + 10 + 10?", 
    respostas: ["20", "30", "40", "50"], 
    correta: "30", 
    inimigo: "DRAGÃO DOS CÁLCULOS (BOSS 1)", 
    inimigoImg: IMG_BOSS, 
    vida: 3 
};

const BOSS_MAT_2 = { 
    pergunta: "Quanto é 8 x 4 + 2?", 
    respostas: ["34", "30", "32", "40"], 
    correta: "34", 
    inimigo: "TITÃ DA MATEMÁTICA AVANÇADA (BOSS 2)", 
    inimigoImg: "https://via.placeholder.com/150/8e44ad/FFFFFF?text=BOSS-MAT2", 
    vida: 3 
};

// ################### PORTUGUÊS (20 Perguntas + 2 Bosses) ###################
const PERGUNTAS_PORT_NIVEL_1 = [ // FÁCEIS (10 Perguntas Iniciais)
    { pergunta: "Qual palavra começa com a letra 'B'?", respostas: ["Casa", "Bola", "Pato", "Rato"], correta: "Bola", inimigo: "Serpente da Palavra", inimigoImg: "https://via.placeholder.com/150/3498db/FFFFFF?text=Letra-B", vida: 1 },
    { pergunta: "Qual é a vogal de 'P É'?", respostas: ["A", "U", "E", "O"], correta: "E", inimigo: "Ogro das Vogais", inimigoImg: "https://via.placeholder.com/150/e67e22/FFFFFF?text=Vogal-E", vida: 1 },
    { pergunta: "O que rima com 'SAPATO'?", respostas: ["MÃO", "DEDO", "PATO", "RUA"], correta: "PATO", inimigo: "Rima Risonha", inimigoImg: "https://via.placeholder.com/150/1abc9c/FFFFFF?text=Rima-2", vida: 1 },
    { pergunta: "Quantas letras tem a palavra 'SOL'?", respostas: ["1", "2", "3", "4"], correta: "3", inimigo: "Sombra da Ortografia", inimigoImg: "https://via.placeholder.com/150/bdc3c7/FFFFFF?text=SOL-3", vida: 1 },
    { pergunta: "Qual a primeira letra do alfabeto?", respostas: ["B", "C", "A", "D"], correta: "A", inimigo: "Guardião do Alfabeto", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Alfabeto", vida: 1 },
    { pergunta: "Qual palavra tem 2 letras?", respostas: ["VAI", "EU", "LUA", "MALA"], correta: "EU", inimigo: "Gnomo das Sílabas", inimigoImg: "https://via.placeholder.com/150/7f8c8d/FFFFFF?text=Duas-L", vida: 1 },
    { pergunta: "Qual o som da letra 'M'?", respostas: ["Áá", "Fff", "Mmm", "Zzz"], correta: "Mmm", inimigo: "Fonoaudiólogo Maligno", inimigoImg: "https://via.placeholder.com/150/95a5a6/FFFFFF?text=Som-M", vida: 1 },
    { pergunta: "O que rima com 'BOLA'?", respostas: ["CASA", "MALA", "RUA", "PÉ"], correta: "MALA", inimigo: "Rima Feroz", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Rima-3", vida: 1 },
    { pergunta: "Qual a cor do 'SOL'?", respostas: ["Azul", "Verde", "Amarelo", "Roxo"], correta: "Amarelo", inimigo: "Maga das Cores", inimigoImg: "https://via.placeholder.com/150/f0b740/FFFFFF?text=Cor-S", vida: 1 },
    { pergunta: "O que é um 'substantivo'?", respostas: ["Ação", "Qualidade", "Nome", "Número"], correta: "Nome", inimigo: "Dragão da Gramática", inimigoImg: "https://via.placeholder.com/150/c0392b/FFFFFF?text=Substantivo", vida: 1 }
];

const PERGUNTAS_PORT_NIVEL_2_E_3 = [ // MÉDIAS/DIFÍCEIS (10 Perguntas Pós-Boss 1)
    { pergunta: "Qual palavra está escrita de forma correta?", respostas: ["kaza", "caza", "casa", "kassa"], correta: "casa", inimigo: "Copiador Inimigo", inimigoImg: "https://via.placeholder.com/150/e74c3c/FFFFFF?text=Ortografia", vida: 1 },
    { pergunta: "Qual palavra tem 3 vogais?", respostas: ["ARARA", "ARCO", "CASA", "PORTA"], correta: "ARARA", inimigo: "Caçador de Vogais", inimigoImg: "https://via.placeholder.com/150/34495e/FFFFFF?text=Vogais-3", vida: 1 },
    { pergunta: "Qual é o plural de 'CARRO'?", respostas: ["CARROS", "CARROES", "CARRA", "CARRO"], correta: "CARROS", inimigo: "Rei do Plural", inimigoImg: "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Plural", vida: 1 },
    { pergunta: "Qual palavra é um 'adjetivo'?", respostas: ["Correr", "Bonito", "Mesa", "Dois"], correta: "Bonito", inimigo: "Feiticeiro dos Adjetivos", inimigoImg: "https://via.placeholder.com/150/16a085/FFFFFF?text=Adj", vida: 1 },
    { pergunta: "Qual o sinônimo de 'RÁPIDO'?", respostas: ["Lento", "Devagar", "Veloz", "Parado"], correta: "Veloz", inimigo: "Mestre dos Sinônimos", inimigoImg: "https://via.placeholder.com/150/2980b9/FFFFFF?text=Sin", vida: 1 },
    { pergunta: "Quantas sílabas tem a palavra 'ELEFANTE'?", respostas: ["3", "4", "5", "6"], correta: "4", inimigo: "Demônio da Separação Silábica", inimigoImg: "https://via.placeholder.com/150/f39c12/FFFFFF?text=Silaba-4", vida: 1 },
    { pergunta: "Qual palavra completa a frase: 'Eu ___ feliz'?", respostas: ["sou", "estou", "tem", "come"], correta: "estou", inimigo: "Verbo Vírus", inimigoImg: "https://via.placeholder.com/150/d35400/FFFFFF?text=Verbo", vida: 1 },
    { pergunta: "O que é uma 'frase interrogativa'?", respostas: ["Pergunta", "Ordem", "Afirmação", "Surpresa"], correta: "Pergunta", inimigo: "Opressor da Pontuação", inimigoImg: "https://via.placeholder.com/150/e74c3c/FFFFFF?text=Inter", vida: 1 },
    { pergunta: "Qual palavra está no 'passado'?", respostas: ["Comer", "Dormiu", "Dormir", "Jogar"], correta: "Dormiu", inimigo: "Monstro do Tempo Verbal", inimigoImg: "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Passado", vida: 1 },
    { pergunta: "Qual o antônimo (oposto) de 'DIA'?", respostas: ["SOL", "NOITE", "MANHÃ", "TARDE"], correta: "NOITE", inimigo: "Oponente das Palavras", inimigoImg: "https://via.placeholder.com/150/808080/FFFFFF?text=Ant", vida: 1 }
];

const BOSS_PORT_1 = { 
    pergunta: "Qual palavra tem a letra 'R' no meio?", 
    respostas: ["ARROZ", "RATO", "PATO", "SOL"], 
    correta: "ARROZ", 
    inimigo: "GRANDE FANTASMA DA GRAMÁTICA (BOSS 1)", 
    inimigoImg: "https://via.placeholder.com/150/c0392b/FFFFFF?text=BOSS-P1", 
    vida: 3 
};

const BOSS_PORT_2 = { 
    pergunta: "Qual é o substantivo próprio desta lista?", 
    respostas: ["cadeira", "cachorro", "brasil", "mesa"], 
    correta: "brasil", 
    inimigo: "ARQUI-DEMÔNIO DA SINTAXE (BOSS 2)", 
    inimigoImg: "https://via.placeholder.com/150/c0392b/FFFFFF?text=BOSS-P2", 
    vida: 3 
};


/**
 * CRIAÇÃO DE ESTÁGIOS APRIMORADA
 * Cria a estrutura de 22 estágios (20 perguntas + 2 Bosses).
 * Padrão: 10 Perguntas Nível 1 -> BOSS 1 -> 10 Perguntas Nível 2/3 -> BOSS 2
 */
function criarEstagios(perguntasN1, perguntasN2e3, boss1, boss2) {
    
    // 1. Embaralha e seleciona as 10 perguntas do Nível 1 (Fácil)
    const poolN1 = perguntasN1
        .map(p => ({ tipo: 'pergunta', data: JSON.parse(JSON.stringify(p)), concluido: false }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); 

    // 2. Embaralha e seleciona as 10 perguntas dos Níveis 2/3 (Médio/Difícil)
    const poolN2e3 = perguntasN2e3
        .map(p => ({ tipo: 'pergunta', data: JSON.parse(JSON.stringify(p)), concluido: false }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); 

    // 3. Monta o mapa completo (Total: 22 estágios)
    const estagios = [
        ...poolN1, // Estágios 1-10 (Fácil)
        { tipo: 'boss', data: JSON.parse(JSON.stringify(boss1)), concluido: false }, // BOSS 1 (Estágio 11)
        ...poolN2e3, // Estágios 12-21 (Médio/Difícil)
        { tipo: 'boss', data: JSON.parse(JSON.stringify(boss2)), concluido: false } // BOSS 2 (Estágio 22)
    ];
    
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
    
    // Garante que a estrutura da pergunta exista antes de usá-la.
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
        // Se o estágio não existir (todos concluídos) - Vitória Final
        document.getElementById('inimigo-img').src = IMG_VITORIA;
        document.getElementById('jogador-img').src = IMAGENS_HEROI[mundoAtual];
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🏆 VITÓRIA! Você VENCEU O MUNDO! Pontuação Final: ${pontuacao} pontos!`;
        document.getElementById('area-pergunta').innerHTML = `<button onclick="mostrarSelecao()">Jogar Novamente</button>`;
        falar(`Parabéns! Você é um mestre da ${mundoAtual}.`);
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

    // Inicializa a vida do inimigo para o novo combate
    perguntaAtual.vidaMax = perguntaAtual.vida; 
    perguntaAtual.vidaAtual = perguntaAtual.vida; 
    
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


function verificarResposta(respostaSelecionada) {
    pararCronometro();
    speechSynthesis.cancel();
    
    const mensagemElemento = document.getElementById('mensagem');
    
    // Desabilita os botões para evitar cliques duplos
    Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = true);

    const acertou = respostaSelecionada === perguntaAtual.correta;
    const timeout = respostaSelecionada === null;

    if (acertou) {
        perguntaAtual.vidaAtual--; 
        adicionarPontuacao(perguntaAtual.vidaMax > 1);
        mensagemElemento.className = 'msg-acerto';
        mensagemElemento.textContent = `🎉 Acertou! Dano no ${perguntaAtual.inimigo}!`;
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
        // INIMIGO DERROTADO
        estagiosDoMundoAtual[estagioAtualIndex].concluido = true;
        
        document.getElementById('mensagem').className = 'msg-acerto';
        document.getElementById('mensagem').textContent = `🌟 ${perguntaAtual.inimigo} derrotado! Próxima aventura...`;
        falar(`Inimigo derrotado! Você é demais!`);

        estagioAtualIndex++; 

        setTimeout(() => {
            if (estagioAtualIndex < estagiosDoMundoAtual.length) {
                mostrarMapa();
            } else {
                proximaPergunta(); // Chama para exibir a tela de vitória final (BOSS 2 derrotado)
            }
        }, 1500); 
    } else if (perguntaAtual.vidaMax > 1 && turnoFinalizado && perguntaAtual.vidaAtual > 0) {
        // BOSS VIVO, JOGADOR ACERTOU OU ERROU (e não morreu)
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = `O Boss ainda está forte! Ataque de novo! (Vida: ${perguntaAtual.vidaAtual})`;
        falar("O chefe resistiu! Qual a próxima resposta?");
        
        // Recria os botões do Boss (necessário para reativar o clique)
        const opcoesDiv = document.getElementById('opcoes-resposta');
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

        respostasEmbaralhadas.forEach(resposta => {
            const btn = document.createElement('button');
            btn.textContent = resposta;
            btn.onclick = () => verificarResposta(resposta);
            opcoesDiv.appendChild(btn);
        });

        iniciarCronometro();

    } else if (turnoFinalizado === false && vidaJogador > 0) {
        // INIMIGO VIVO (Jogador errou): Mantém a mesma pergunta
        document.getElementById('mensagem').className = 'msg-neutra';
        document.getElementById('mensagem').textContent = "Sua vez! Tente a resposta correta para atacar!";
        // Reabilita os botões para que o jogador tente novamente
        Array.from(document.getElementById('opcoes-resposta').children).forEach(btn => btn.disabled = false);
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
        // Adiciona bônus por tempo para perguntas normais
        pontuacao += PONTOS_POR_ACERTO + (tempoRestante > 0 ? tempoRestante * 5 : 0);
    }
    document.getElementById('pontuacao-display').textContent = pontuacao;
}


// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    ocultarTodas();
    document.getElementById('menu-inicial').style.display = 'block'; 
});
