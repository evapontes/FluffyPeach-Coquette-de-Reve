// Função para adicionar produto aos favoritos
function adicionarAosFavoritos(produto) {
  // Verificar se o produto já está nos favoritos
  const produtoExistente = pastinhas["Favoritos"].find(item => item.nome === produto.nome);
  
  if (!produtoExistente) {
    // Adicionar o produto à pastinha de Favoritos
    pastinhas["Favoritos"].push(produto);
    
    // Atualizar a interface
    atualizarCarrinho();
    
    // Abrir a sidebar do carrinho e mostrar a pastinha de favoritos
    document.getElementById('carrinhoSidebar').classList.add('active');
    
    // Encontrar e ativar a pastinha de favoritos
    const pastinhasFavoritos = document.querySelectorAll('.pastinha');
    if (pastinhasFavoritos.length > 1) {
      const favoritosHeader = pastinhasFavoritos[1].querySelector('.pastinha-header');
      const favoritosContent = pastinhasFavoritos[1].querySelector('.pastinha-content');
      favoritosContent.classList.add('active');
      if (favoritosHeader.querySelector('.toggle-pastinha')) {
        favoritosHeader.querySelector('.toggle-pastinha').textContent = '▼';
      }
    }
    
    // Reproduzir som de confirmação
    if (typeof playPlimSound === 'function') {
      playPlimSound();
    }
    
    // Mostrar mensagem de confirmação
    alert('Produto adicionado aos favoritos!');
  } else {
    alert('Este produto já está nos seus favoritos!');
  }
}

// Configurar os ícones de coração para adicionar aos favoritos
document.addEventListener('DOMContentLoaded', function() {
  const wishlistIcons = document.querySelectorAll('.wishlist-icon');
  const produtos = document.querySelectorAll('.produto');
  
  wishlistIcons.forEach((icon, index) => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation(); // Evitar que o clique se propague para outros elementos
      
      // Mudar o ícone para coração preenchido
      this.textContent = '❤️';
      this.style.opacity = '1';
      
      // Obter informações do produto
      const produtoElement = produtos[index];
      const nome = produtoElement.querySelector('h3').textContent;
      const preco = produtoElement.querySelector('p').textContent;
      const imagem = produtoElement.querySelector('img').src;
      
      // Criar objeto do produto
      const produto = {
        nome: nome,
        preco: preco,
        imagem: imagem
      };
      
      // Adicionar aos favoritos
      adicionarAosFavoritos(produto);
    });
  });
});
