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

const tabs = Array.from(document.querySelectorAll('[data-tab]'));
if (tabs.length) {
  tabs[0].parentElement.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    const panel = document.getElementById(tab.dataset.tab);
    tab.id = 'tab-' + tab.dataset.tab;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    const activate = () => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.dataset.tab).hidden = !active;
      });
      const showcase = document.querySelector('.ai-screen');
      if (showcase && tab.dataset.aiImage) {
        const button = showcase.querySelector('.screen-button');
        const image = button.querySelector('img');
        image.src = tab.dataset.aiImage;
        image.alt = '页芽 ' + tab.dataset.aiTitle + '开发版真实界面';
        button.dataset.screen = tab.dataset.aiImage;
        button.dataset.caption = tab.dataset.aiTitle + ' · ' + tab.dataset.aiNote;
        button.setAttribute('aria-label', '放大' + tab.dataset.aiTitle + '截图');
        showcase.querySelector('[data-ai-title]').textContent = tab.dataset.aiTitle;
        showcase.querySelector('[data-ai-note]').textContent = tab.dataset.aiNote;
      }
    };
    tab.addEventListener('click', activate);
    tab.addEventListener('keydown', (event) => {
      const offsets = { ArrowRight: 1, ArrowLeft: -1 };
      let next = null;
      if (event.key in offsets) next = (index + offsets[event.key] + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        tabs[next].click();
        tabs[next].focus();
      }
    });
    if (index === 0) activate();
  });
}

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
