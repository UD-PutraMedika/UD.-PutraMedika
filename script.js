// Tambah ke keranjang
function addToCart(button) {
  const productCard = button.closest('.product-card');
  const nama = productCard.getAttribute('data-nama');
  const harga = productCard.getAttribute('data-harga');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ nama, harga });
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
  showToast(`✅ <strong>${nama}</strong> ditambahkan ke keranjang`);
}

// Update jumlah keranjang
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

// Notifikasi toast
function showToast(message) {
  const toastContainer = document.getElementById('toast');
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = message;

  // Animasi masuk
  toast.style.opacity = 0;
  toast.style.transform = 'translateY(-20px)';
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = 1;
    toast.style.transform = 'translateY(0)';
  });

  // Hapus setelah 3 detik
  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = 'translateY(-20px)';
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

// Saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Fungsi pencarian real-time
  const searchInput = document.querySelector('.search-bar');
  const productCards = document.querySelectorAll('.product-card');

  if (searchInput && productCards.length > 0) {
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();

      productCards.forEach(card => {
        const namaProduk = card.getAttribute('data-nama').toLowerCase();
        const isVisible = namaProduk.includes(keyword);
        card.style.display = isVisible ? '' : 'none';
        card.style.opacity = isVisible ? '1' : '0';
      });
    });
  }
});


productCards.forEach(card => {
  const namaProduk = card.getAttribute('data-nama').toLowerCase();
  const isVisible = namaProduk.includes(keyword);

  if (isVisible) {
    card.style.display = '';
    card.style.opacity = '1';
    card.style.transition = 'opacity 0.3s';
  } else {
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      card.style.display = 'none';
    }, 300); // tunggu transisi selesai
  }
});
