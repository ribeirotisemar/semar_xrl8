// script.js — controle simples de abas + deep-link via hash
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));

  // função para ativar uma aba por id (ex: "agenda", "lojas", ...)
  function activate(targetId, push = false) {
    tabs.forEach(tab => {
      const t = tab.dataset.target;
      const selected = (t === targetId);
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    });

    panels.forEach(panel => {
      const id = panel.id.replace('panel-', '');
      if (id === targetId) {
        panel.hidden = false;
        panel.scrollIntoView({behavior: 'smooth', block: 'start'});
      } else {
        panel.hidden = true;
      }
    });

    // atualiza hash sem quebrar o fallback (se push=false, substitui)
    if (push) {
      history.pushState(null, '', `#${targetId}`);
    } else {
      history.replaceState(null, '', `#${targetId}`);
    }
  }

  // click nas tabs: previne navegação quando possível e mostra painel
  tabs.forEach(tab => {
    tab.addEventListener('click', (ev) => {
      const target = tab.dataset.target;
      // se o link aponta para outra página (agenda.html etc.) e queremos usar fallback,
      // permitimos comportamento normal quando o usuário usa toque longo / abrir em nova aba.
      // Mas para clicks normais, interceptamos e atualizamos a aba.
      if (target) {
        ev.preventDefault();
        activate(target, true);
      }
    });

    // acessibilidade: suportar Enter/Space
    tab.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        tab.click();
      }
    });
  });

  // Ao carregar, verifica hash da URL e ativa a aba correta (ou agenda por padrão)
  const initial = (location.hash && location.hash.slice(1)) || 'agenda';
  activate(initial, false);

  // Suportar navegação com botao voltar / forward do browser
  window.addEventListener('popstate', () => {
    const current = (location.hash && location.hash.slice(1)) || 'agenda';
    activate(current, false);
  });
});
