/* Демо-версия сайта: формы ничего не отправляют, чат-кнопка — заглушка.
   Этот файл нужен только на превью для показа клиенту. На боевом сайте его не будет. */
(function () {
  'use strict';

  var NOTE = 'Демо-версия сайта: заявка никуда не отправлена. Форма заработает после запуска.';

  // Страница-анкета «Рассчитать стоимость» сама показывает «спасибо» — её не трогаем
  var skipForms = /rasschitat-stoimost/.test(location.pathname);

  function stop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  // Поисковые формы WordPress и т.п. — не заявки, их не глушим сообщением
  function isLeadForm(form) {
    if (!form || form.tagName !== 'FORM') return false;
    if (form.getAttribute('role') === 'search') return false;
    if (form.querySelector('input[name="s"]')) return false;
    return true;
  }

  function showNote(form) {
    var n = form.querySelector('.demo-note');
    if (!n) {
      n = document.createElement('div');
      n.className = 'demo-note';
      n.textContent = NOTE;
      form.appendChild(n);
    }
    n.style.display = 'block';
    clearTimeout(n._t);
    n._t = setTimeout(function () { n.style.display = 'none'; }, 6000);
  }

  // Ловим отправку в фазе перехвата — раньше, чем сработают скрипты плагинов форм
  window.addEventListener('submit', function (e) {
    if (skipForms || !isLeadForm(e.target)) return;
    stop(e);
    showNote(e.target);
  }, true);

  // Клики по кнопкам отправки (плагины иногда ловят именно клик, а не submit)
  window.addEventListener('click', function (e) {
    if (skipForms || !e.target.closest) return;
    var b = e.target.closest('button[type="submit"], input[type="submit"], .wpcf7-submit, .wpforms-submit');
    if (!b) return;
    var form = b.form || b.closest('form');
    if (!isLeadForm(form)) return;
    stop(e);
    showNote(form);
  }, true);

  // ---- Стили заглушек ----
  var css =
    '.demo-note{display:none;margin-top:10px;padding:10px 14px;background:#fff7e0;border:1px solid #e6c36a;' +
    'border-radius:8px;font:14px/1.4 Inter,Arial,sans-serif;color:#333}' +
    '.demo-chat{position:fixed;right:24px;bottom:24px;z-index:99999;font-family:Inter,Arial,sans-serif}' +
    '.demo-chat__btn{display:flex;align-items:center;gap:10px;border:0;cursor:pointer;background:#5cb87f;color:#fff;' +
    'border-radius:30px;padding:0 20px 0 14px;height:52px;font-size:15px;box-shadow:0 4px 14px rgba(0,0,0,.25)}' +
    '.demo-chat__panel{display:none;position:absolute;right:0;bottom:64px;width:270px;background:#fff;color:#333;' +
    'border-radius:12px;padding:16px;font-size:14px;line-height:1.45;box-shadow:0 8px 30px rgba(0,0,0,.25)}' +
    '.demo-chat.open .demo-chat__panel{display:block}' +
    '@media(max-width:600px){.demo-chat__label{display:none}.demo-chat__btn{padding:0 14px}}';

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var box = document.createElement('div');
    box.className = 'demo-chat';
    box.innerHTML =
      '<div class="demo-chat__panel">Демо-версия сайта. Онлайн-связь с менеджером ' +
      'подключим после запуска.</div>' +
      '<button type="button" class="demo-chat__btn" aria-label="Связаться с нами">' +
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z"/></svg>' +
      '<span class="demo-chat__label">Связаться с нами</span></button>';
    box.querySelector('button').addEventListener('click', function () {
      box.classList.toggle('open');
    });
    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
