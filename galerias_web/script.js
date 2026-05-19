const galerias = document.querySelectorAll('.galeria');

const descricoes = {
  g1: 'As catedrais representam a grandiosidade da arquitetura religiosa, com estruturas imponentes, vitrais e detalhes históricos marcantes.',

  g2: 'As capelinhas simbolizam locais menores de oração e reflexão, trazendo simplicidade, paz e espiritualidade.',

  g3: 'As missas representam momentos de celebração, união e fé, reunindo pessoas em cerimônias religiosas importantes.'
};

const imagensExtras = {
  catedriais: [
    'Catedral-Brancamaior.jfif',
    'Catedral-gotica.jfif',
    'Catedral-goticamaior.jfif',
    'Catedral-Marromgrande.jfif',
    'Catedral-tijolinho.jfif'
  ],

  capelinhas: [
    'Capela-azulestranho.jfif',
    'Capela-brancaeazulescuro.jfif',
    'Capela-brancaemarroz.jfif',
    'Capela-brancaeverde.jfif',
    'Capela-tijolinho.jfif'
  ],

  missas: [
    'missa-aura.jfif',
    'missa-batismo.jfif',
    'missa-cruz-branco.jfif',
    'missa-microfones.jfif',
    'missa-pessoas.jfif'
  ]
};

let imagemAtual = null;
let galeriaAtual = null;
let indiceAtual = 0;

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

function removerDescricao(galeria) {
  const descricao = galeria.querySelector('.descricao-galeria');

  if (descricao) {
    descricao.style.display = 'none';
  }
}

function criarSetas(galeria) {

  let setaEsquerda = document.querySelector('.seta-esquerda');
  let setaDireita = document.querySelector('.seta-direita');

  if (!setaEsquerda) {

    setaEsquerda = document.createElement('button');

    setaEsquerda.innerHTML = '❮';

    setaEsquerda.classList.add('seta', 'seta-esquerda');

    document.body.appendChild(setaEsquerda);

    setaEsquerda.addEventListener('click', (evento) => {

      evento.stopPropagation();

      navegarImagem(-1);
    });
  }

  if (!setaDireita) {

    setaDireita = document.createElement('button');

    setaDireita.innerHTML = '❯';

    setaDireita.classList.add('seta', 'seta-direita');

    document.body.appendChild(setaDireita);

    setaDireita.addEventListener('click', (evento) => {

      evento.stopPropagation();

      navegarImagem(1);
    });
  }
}

function focarImagem(galeria, imagem) {
  const imagens = galeria.querySelectorAll('img');

  imagens.forEach((img, index) => {
    img.classList.remove('imagem-foco');

    if (img === imagem) {
      img.classList.add('imagem-foco');
      indiceAtual = index;
    }
  });

  imagemAtual = imagem;
  galeriaAtual = galeria;

  criarSetas(galeria);
}

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

function adicionarImagensExtras(galeria) {
  const pasta = galeria.dataset.pasta;
  const lista = galeria.querySelector('.imagens');

  if (galeria.dataset.extrasCarregadas === 'true') return;

  imagensExtras[pasta].forEach((nomeImagem) => {
    const li = document.createElement('li');

    li.classList.add('extra');

    li.innerHTML = `
      <img src="img/${pasta}/${nomeImagem}" alt="">
    `;

    lista.appendChild(li);
  });

  galeria.dataset.extrasCarregadas = 'true';
}

function removerImagensExtras(galeria) {
  const extras = galeria.querySelectorAll('.extra');

  extras.forEach((extra) => {
    extra.remove();
  });

  galeria.dataset.extrasCarregadas = 'false';
}

galerias.forEach((galeria) => {
  let expandida = false;

  galeria.addEventListener('click', (evento) => {

    if (evento.target.tagName === 'IMG') return;

    expandida = !expandida;

    if (expandida) {

      galeria.classList.add('galeria-expandida');

      adicionarImagensExtras(galeria);

      criarDescricao(galeria);

    } else {

      galeria.classList.remove('galeria-expandida');

      removerDescricao(galeria);

      removerImagensExtras(galeria);

      const imagens = galeria.querySelectorAll('img');

      imagens.forEach((img) => {
        img.classList.remove('imagem-foco');
      });

      document.querySelectorAll('.seta').forEach((seta) => {
        seta.remove();
      });
    }

    adicionarEventosImagens(galeria, expandida);
  });

  adicionarEventosImagens(galeria, expandida);
});

function adicionarEventosImagens(galeria, expandida) {
  const imagens = galeria.querySelectorAll('img');

  imagens.forEach((imagem) => {

    imagem.onclick = (evento) => {

      evento.stopPropagation();

      if (!expandida) return;

      focarImagem(galeria, imagem);
    };
  });
}

document.addEventListener('keydown', (evento) => {

  if (!galeriaAtual) return;

  if (evento.key === 'ArrowLeft') {
    navegarImagem(-1);
  }

  if (evento.key === 'ArrowRight') {
    navegarImagem(1);
  }
});
