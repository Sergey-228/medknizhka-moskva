// Плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Модальное окно (создаётся динамически)
function openModal(message) {
  const existing = document.querySelector('.modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal-content">
      <h3>Спасибо!</h3>
      <p>${message}</p>
      <button id="closeModal">Закрыть</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('closeModal').addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Обработка формы
document.getElementById('orderForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const phone = this.phone.value.trim();

  if (!name || !phone) {
    openModal('Пожалуйста, заполните все поля.');
    return;
  }

  console.log('Форма отправлена:', { name, phone });
  this.reset();

  openModal('Ваша заявка принята! Мы перезвоним вам в течение 15 минут.');
});
