function verificarLogin() {
  var usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    window.location.href = 'autenticacao.html';
  }
}