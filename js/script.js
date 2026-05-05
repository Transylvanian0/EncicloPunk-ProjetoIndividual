// ================================================
// VETORES
// ================================================

let estilos = [
  'Punk Rock', 'Hardcore', 'Oi!', 'Riot Grrrl',
  'Crust', 'Street Punk', 'Post-Punk', 'Pop Punk',
  'Punk Brasileiro', 'Anarcho Punk', 'Skate Punk', 'UK82'
];

let bandasSugeridas = [
  'Ramones', 'Sex Pistols', 'The Clash', 'Black Flag',
  'Dead Kennedys', 'Misfits', 'Bikini Kill', 'Ratos de Porão',
  'Garotos Podres', 'Buzzcocks'
];

// ================================================
// PREENCHE OS CONTAINERS COM OS VETORES
// ================================================

let containerEstilos = document.getElementById('estilos-cloud');
estilos.forEach(function(estilo) {
  let botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'tag-btn';
  botao.textContent = estilo;
  botao.onclick = function() { selecionarTag(botao); };
  containerEstilos.appendChild(botao);
});

let containerBandas = document.getElementById('bandas-sugestoes');
bandasSugeridas.forEach(function(banda) {
  let botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'tag-btn';
  botao.textContent = banda;
  botao.onclick = function() { selecionarBanda(botao); };
  containerBandas.appendChild(botao);
});

// ================================================
// TROCAR ENTRE LOGIN E CADASTRO
// ================================================

function switchTab(qual) {
  let formLogin    = document.getElementById('form-login');
  let formCadastro = document.getElementById('form-cadastro');
  let aba1 = document.querySelectorAll('.tab')[0];
  let aba2 = document.querySelectorAll('.tab')[1];

  if (qual === 'login') {
    formLogin.style.display    = 'flex';
    formCadastro.style.display = 'none';
    aba1.classList.add('active');
    aba2.classList.remove('active');
  } else {
    formLogin.style.display    = 'none';
    formCadastro.style.display = 'flex';
    aba2.classList.add('active');
    aba1.classList.remove('active');
  }
}

// ================================================
// STEPS DO CADASTRO
// ================================================

let stepLabels = { 1: 'Conta', 2: 'Estilos', 3: 'Bandas' };

function goStep(numero) {

  // valida antes de ir pro step 2
  if (numero === 2) {
    let ok = validarStep1();
    if (!ok) return;
  }

  // esconde todos os steps
  document.querySelectorAll('.step').forEach(function(step) {
    step.classList.remove('active');
  });

  // mostra o step certo
  document.getElementById('step-' + numero).classList.add('active');

  // atualiza os pontinhos
  for (let i = 1; i <= 3; i++) {
    let dot = document.getElementById('dot-' + i);
    dot.classList.remove('active', 'done');
    if (i < numero)  dot.classList.add('done');
    if (i === numero) dot.classList.add('active');
  }

  document.getElementById('step-label').textContent = stepLabels[numero];
}

// ================================================
// VALIDAÇÕES
// ================================================

function mostrarErro(input, mensagem) {
  let erroVelho = input.parentNode.querySelector('.erro');
  if (erroVelho) erroVelho.remove();

  let erro = document.createElement('span');
  erro.className = 'erro';
  erro.textContent = mensagem;
  input.parentNode.appendChild(erro);
  input.style.borderBottomColor = '#cc1a1a';
}

function limparErro(input) {
  let erro = input.parentNode.querySelector('.erro');
  if (erro) erro.remove();
  input.style.borderBottomColor = '';
}

function validarStep1() {
  let nome        = document.querySelector('#step-1 input[type="text"]');
  let email       = document.querySelector('#step-1 input[type="email"]');
  let senha       = document.querySelectorAll('#step-1 input[type="password"]')[0];
  let confirmacao = document.querySelectorAll('#step-1 input[type="password"]')[1];
  let tudo_ok = true;

  if (nome.value.trim() === '') {
    mostrarErro(nome, 'Digite seu nome');
    tudo_ok = false;
  } else { limparErro(nome); }

  let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!emailValido) {
    mostrarErro(email, 'E-mail inválido — ex: nome@email.com');
    tudo_ok = false;
  } else { limparErro(email); }

  if (senha.value.length < 8) {
    mostrarErro(senha, 'Mínimo 8 caracteres');
    tudo_ok = false;
  } else if (!/[0-9]/.test(senha.value)) {
    mostrarErro(senha, 'Precisa ter pelo menos um número');
    tudo_ok = false;
  } else if (!/[!@#$%^&*]/.test(senha.value)) {
    mostrarErro(senha, 'Precisa ter um caractere especial: ! @ # $ % & *');
    tudo_ok = false;
  } else { limparErro(senha); }

  if (senha.value !== confirmacao.value) {
    mostrarErro(confirmacao, 'As senhas não coincidem');
    tudo_ok = false;
  } else { limparErro(confirmacao); }

  return tudo_ok;
}

// ================================================
// ESTILOS — selecionar/desselecionar
// ================================================

function selecionarTag(botao) {
  botao.classList.toggle('selected');
}

// ================================================
// BANDAS — adicionar e remover
// ================================================

let bandasAdicionadas = [];

function selecionarBanda(botao) {
  let nome = botao.textContent.trim();

  if (bandasAdicionadas.includes(nome)) {
    bandasAdicionadas = bandasAdicionadas.filter(function(b) { return b !== nome; });
    botao.classList.remove('selected');
    document.getElementById('tag-' + nome.replace(/\s/g, '-')).remove();
  } else {
    bandasAdicionadas.push(nome);
    botao.classList.add('selected');
    mostrarTagAdicionada(nome);
  }
}

function addBand() {
  let input = document.getElementById('banda-input');
  let nome  = input.value.trim();

  if (nome === '' || bandasAdicionadas.includes(nome)) {
    input.value = '';
    return;
  }

  bandasAdicionadas.push(nome);
  mostrarTagAdicionada(nome);
  input.value = '';
}

function mostrarTagAdicionada(nome) {
  let container = document.getElementById('added-bands');
  let tag = document.createElement('div');
  tag.className = 'added-tag';
  tag.id = 'tag-' + nome.replace(/\s/g, '-');
  tag.innerHTML = nome + ' <button onclick="removerBanda(\'' + nome + '\')" title="Remover">✕</button>';
  container.appendChild(tag);
}

function removerBanda(nome) {
  bandasAdicionadas = bandasAdicionadas.filter(function(b) { return b !== nome; });

  let tag = document.getElementById('tag-' + nome.replace(/\s/g, '-'));
  if (tag) tag.remove();

  document.querySelectorAll('#bandas-sugestoes .tag-btn').forEach(function(btn) {
    if (btn.textContent.trim() === nome) btn.classList.remove('selected');
  });
}

// ================================================
// FINALIZAR CADASTRO
// ================================================

function submitForm() {
  let termos = document.getElementById('termos');

  if (!termos.checked) {
    alert('Você precisa aceitar os termos!');
    return;
  }

  let novoUsuario = {
    nome:    document.querySelector('#step-1 input[type="text"]').value.trim(),
    email:   document.querySelector('#step-1 input[type="email"]').value.trim(),
    senha:   document.querySelectorAll('#step-1 input[type="password"]')[0].value,
    estilos: Array.from(document.querySelectorAll('#estilos-cloud .tag-btn.selected')).map(function(b) { return b.textContent; }),
    bandas:  bandasAdicionadas,
    desde:   new Date().getFullYear()
  };

  let usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

  let jaExiste = usuariosSalvos.find(function(u) { return u.email === novoUsuario.email; });
  if (jaExiste) {
    mostrarErro(document.querySelector('#step-1 input[type="email"]'), 'Esse e-mail já está cadastrado!');
    goStep(1);
    return;
  }

  usuariosSalvos.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
  localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
  window.location.href = 'index.html';
}

// ================================================
// LOGIN
// ================================================

function fazerLogin() {
  let email = document.querySelector('#form-login input[type="email"]');
  let senha = document.querySelector('#form-login input[type="password"]');
  let tudo_ok = true;

  let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!emailValido) {
    mostrarErro(email, 'E-mail inválido');
    tudo_ok = false;
  } else { limparErro(email); }

  if (senha.value === '') {
    mostrarErro(senha, 'Digite sua senha');
    tudo_ok = false;
  } else { limparErro(senha); }

  if (!tudo_ok) return;

  let usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
  let encontrado = usuariosSalvos.find(function(u) {
    return u.email === email.value.trim() && u.senha === senha.value;
  });

  if (!encontrado) {
    mostrarErro(senha, 'E-mail ou senha incorretos');
    return;
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(encontrado));
  window.location.href = 'index.html';
}
