const galerias = document.querySelectorAll('.galeria');

const descricoes = {
  g1: 'As catedrais representam a grandiosidade da arquitetura religiosa, com estruturas imponentes, vitrais e detalhes históricos marcantes.',

  g2: 'As capelinhas simbolizam locais menores de oração e reflexão, trazendo simplicidade, paz e espiritualidade.',

  g3: 'As missas representam momentos de celebração, união e fé, reunindo pessoas em cerimônias religiosas importantes.'
};

let imagemAtual = null;
let galeriaAtual = null;
let indiceAtual = 0;

// CRIA O PARÁGRAFO DE DESCRIÇÃO
function criarDescricao(galeria) {
  let descricao = galeria.querySelector('.descricao-galeria');

  if (!descricao) {
    descricao = document.createElement('p');
    descricao.classList.add('descricao-galeria');

    descricao.textContent = descricoes[galeria.id];

    galeria.appendChild(descricao);
  }

  descricao.style.display = 'block';
}

// REMOVE DESCRIÇÃO
function removerDescricao(galeria) {
  const descricao = galeria.querySelector('.descricao-galeria');

  if (descricao) {
    descricao.style.display = 'none';
  }
}

// CRIA SETAS
function criarSetas(galeria) {
  if (galeria.querySelector('.seta-esquerda')) return;

  const setaEsquerda = document.createElement('button');
  setaEsquerda.innerHTML = '❮';
  setaEsquerda.classList.add('seta', 'seta-esquerda');

  const setaDireita = document.createElement('button');
  setaDireita.innerHTML = '❯';
  setaDireita.classList.add('seta', 'seta-direita');

  galeria.appendChild(setaEsquerda);
  galeria.appendChild(setaDireita);

  setaEsquerda.addEventListener('click', () => {
    navegarImagem(-1);
  });

  setaDireita.addEventListener('click', () => {
    navegarImagem(1);
  });
}

// MOSTRA IMAGEM EM FOCO
function focarImagem(galeria, imagem) {
  const imagens = galeria.querySelectorAll('img');

  imagens.forEach((img, index) => {
    img.classList.remove('imagem-foco');
    img.style.display = 'none';

    if (img === imagem) {
      img.classList.add('imagem-foco');
      img.style.display = 'block';
      indiceAtual = index;
    }
  });

  imagemAtual = imagem;
  galeriaAtual = galeria;

  criarSetas(galeria);
}

// NAVEGA ENTRE IMAGENS
function navegarImagem(direcao) {
  if (!galeriaAtual) return;

  const imagens = galeriaAtual.querySelectorAll('img');

  indiceAtual += direcao;

  if (indiceAtual < 0) {
    indiceAtual = imagens.length - 1;
  }

  if (indiceAtual >= imagens.length) {
    indiceAtual = 0;
  }

  focarImagem(galeriaAtual, imagens[indiceAtual]);
}

// EVENTOS DAS GALERIAS

 galerias.forEach((galeria) => {
  const container = galeria.querySelector('.container-imgs');
  const imagens = galeria.querySelectorAll('img');

  let expandida = false;

  // CLIQUE NO CONTAINER
  container.addEventListener('click', (evento) => {

    // EVITA CONFLITO COM CLIQUE DA IMAGEM
    if (evento.target.tagName === 'IMG') return;

    expandida = !expandida;

    if (expandida) {
      galeria.classList.add('galeria-expandida');

      imagens.forEach((img) => {
        img.style.display = 'block';
        img.classList.remove('imagem-foco');
      });

      criarDescricao(galeria);

    } else {
      galeria.classList.remove('galeria-expandida');

      imagens.forEach((img) => {
        img.style.display = 'block';
        img.classList.remove('imagem-foco');
      });

      removerDescricao(galeria);

      const setas = galeria.querySelectorAll('.seta');
      setas.forEach((seta) => seta.remove());
    }
  });

  // CLIQUE NAS IMAGENS
  imagens.forEach((imagem) => {
    imagem.addEventListener('click', (evento) => {
      evento.stopPropagation();

      if (!expandida) return;

      focarImagem(galeria, imagem);
    });
  });
});

// NAVEGAÇÃO PELO TECLADO

document.addEventListener('keydown', (evento) => {
  if (!galeriaAtual) return;

  if (evento.key === 'ArrowLeft') {
    navegarImagem(-1);
  }

  if (evento.key === 'ArrowRight') {
    navegarImagem(1);
  }
});