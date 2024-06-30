// Variáveis globais
const cells = document.querySelectorAll('.cell');
const spinButton = document.getElementById('spinButton');
const newGameButton = document.getElementById('newGameButton');
const startGameButton = document.getElementById('startGameButton');
const playerNameInput = document.getElementById('playerName');
const walletAmountDisplay = document.getElementById('walletAmount');
const scoreList = document.getElementById('scoreList');
const slotMachine = document.querySelector('.slot-machine');
const playerEntry = document.querySelector('.player-entry');
const scoreboard = document.querySelector('.scoreboard');

let currentPlayer;
let wallet = 0;
let players = [];

// Carregar placar do armazenamento local
function loadScores() {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
        updateScoreboard();
    }
}

// Salvar placar no armazenamento local
function saveScores() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Atualizar placar exibido
function updateScoreboard() {
    scoreList.innerHTML = '';
    players.forEach(player => {
        const scoreEntry = document.createElement('div');
        scoreEntry.textContent = `${player.name}: R$ ${player.score.toFixed(2)}`;
        scoreList.appendChild(scoreEntry);
    });
}

// Evento ao clicar em "Iniciar Jogo"
startGameButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim() || 'Jogador';

    currentPlayer = {
        name: playerName,
        score: 0
    };
    wallet = 0;
    walletAmountDisplay.textContent = wallet.toFixed(2);

    playerNameInput.value = '';
    playerEntry.style.display = 'none';
    slotMachine.style.display = 'grid';
    spinButton.style.display = 'inline-block';
    newGameButton.style.display = 'inline-block';
    scoreboard.style.display = 'block';
});

// Evento ao clicar em "Girar"
spinButton.addEventListener('click', () => {
    // Simulação de resultados aleatórios
    const resultados = [];
    const frutas = ['🍒', '🍋', '🍉', '🍇', '🍓'];
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * frutas.length);
        resultados.push(frutas[randomIndex]);
    }

    // Exibir resultados nas células
    resultados.forEach((result, index) => {
        cells[index].textContent = result;
        cells[index].classList.remove('winning');
    });

    // Verificar combinações vencedoras
    checkWinningCombinations();
});

// Verificar combinações vencedoras
function checkWinningCombinations() {
    const winningCombinations = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];

    let hasWon = false;

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');

            // Aumentar o valor da carteira e atualizar exibição
            wallet += 100;
            walletAmountDisplay.textContent = wallet.toFixed(2);

            hasWon = true;
        }
    });

    // Se não ganhou, salvar pontuação e mostrar tela de entrada do jogador novamente
    if (!hasWon) {
        currentPlayer.score = wallet;
        players.push(currentPlayer);
        saveScores();
        updateScoreboard();
    }
}

// Evento ao clicar em "Novo Jogo"
newGameButton.addEventListener('click', () => {
    wallet = 0;
    walletAmountDisplay.textContent = wallet.toFixed(2);
    spinButton.style.display = 'inline-block';
    scoreboard.style.display = 'block';
});

// Carregar placar ao carregar a página
loadScores();
