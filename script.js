// Lista de palavras para o jogo
const palavras = ['morango', 'abacaxi', 'laranja', 'uva', 'melancia'];
let palavraSelecionada = '';
let letrasTentadas = [];
let tentativasRestantes = 6;
let palavraMostrada = [];

// Função para selecionar uma palavra aleatória
function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraSelecionada = palavras[indice];
    palavraMostrada = Array(palavraSelecionada.length).fill('_');
    document.getElementById('word-display').textContent = palavraMostrada.join(' ');
    atualizarLetrasTentadas();
    atualizarHangman();
}

// Função para atualizar as letras já tentadas
function atualizarLetrasTentadas() {
    document.getElementById('guesses').textContent = `Letras já tentadas: ${letrasTentadas.join(', ')}`;
    criarBotoesDeLetras();
}

// Função para criar os botões de letras
function criarBotoesDeLetras() {
    const container = document.getElementById('letters-container');
    container.innerHTML = ''; // Limpar os botões antigos
    for (let i = 97; i <= 122; i++) {
        const letra = String.fromCharCode(i);
        const botao = document.createElement('button');
        botao.textContent = letra;
        botao.onclick = () => tentarLetra(letra);
        if (letrasTentadas.includes(letra)) {
            botao.disabled = true;
        }
        container.appendChild(botao);
    }
}

// Função para tentar uma letra
function tentarLetra(letra) {
    letrasTentadas.push(letra);
    if (palavraSelecionada.includes(letra)) {
        // Atualizar a palavra mostrada
        for (let i = 0; i < palavraSelecionada.length; i++) {
            if (palavraSelecionada[i] === letra) {
                palavraMostrada[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
    }

    // Atualizar a interface
    document.getElementById('word-display').textContent = palavraMostrada.join(' ');
    document.getElementById('hangman-status').textContent = `Tentativas restantes: ${tentativasRestantes}`;
    atualizarHangman();
    atualizarLetrasTentadas();

    // Verificar vitória ou derrota
    if (palavraMostrada.join('') === palavraSelecionada) {
        document.getElementById('message').textContent = 'Você venceu!';
    } else if (tentativasRestantes <= 0) {
        document.getElementById('message').textContent = 'Você perdeu! A palavra era: ' + palavraSelecionada;
    }
}

// Função para atualizar o desenho da forca
function atualizarHangman() {
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.style.backgroundPositionY = `${(6 - tentativasRestantes) * -20}px`;
}

// Iniciar o jogo ao carregar a página
window.onload = escolherPalavra;

// Função para tentar uma letra
function tentarLetra(letra) {
    letrasTentadas.push(letra);
    if (palavraSelecionada.includes(letra)) {
        // Atualizar a palavra mostrada
        for (let i = 0; i < palavraSelecionada.length; i++) {
            if (palavraSelecionada[i] === letra) {
                palavraMostrada[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
    }

    // Atualizar a interface
    document.getElementById('word-display').textContent = palavraMostrada.join(' ');
    document.getElementById('hangman-status').textContent = `Tentativas restantes: ${tentativasRestantes}`;
    atualizarHangman();
    atualizarLetrasTentadas();

    // Verificar vitória ou derrota
    if (palavraMostrada.join('') === palavraSelecionada) {
        document.getElementById('message').textContent = 'Você venceu!';
        document.getElementById('message').classList.add('fade-in'); // Adiciona a animação
    } else if (tentativasRestantes <= 0) {
        document.getElementById('message').textContent = 'Você perdeu! A palavra era: ' + palavraSelecionada;
    }
}

