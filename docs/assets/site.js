const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
  document.documentElement.classList.add('has-menu');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    navigation.classList.toggle('is-open', expanded);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      menuButton.focus();
    }
  });
}

const aiFilters = Array.from(document.querySelectorAll('[data-ai-filter]'));
const aiCards = Array.from(document.querySelectorAll('[data-ai-category]'));
aiFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.aiFilter;
    aiFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    aiCards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.aiCategory !== category;
    });
    const count = aiCards.filter((card) => !card.hidden).length;
    const status = document.querySelector('.filter-count');
    if (status) status.textContent = category === 'all'
      ? `显示全部 ${count} 个 AI 模块`
      : `${button.textContent}：${count} 个 AI 模块`;
  });
});

const screenshotDialog = document.querySelector('.screenshot-dialog');
if (screenshotDialog) {
  const image = screenshotDialog.querySelector('img');
  const caption = screenshotDialog.querySelector('p');
  document.querySelectorAll('[data-screen]').forEach((button) => {
    button.addEventListener('click', () => {
      image.src = button.dataset.screen;
      image.alt = button.querySelector('img').alt;
      caption.textContent = button.dataset.caption;
      screenshotDialog.showModal();
    });
  });
  screenshotDialog.querySelector('.dialog-close').addEventListener('click', () => screenshotDialog.close());
  screenshotDialog.addEventListener('click', (event) => {
    if (event.target === screenshotDialog) screenshotDialog.close();
  });
}
