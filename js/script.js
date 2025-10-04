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
// ===== AGENDA =====
document.addEventListener('DOMContentLoaded', () => {
  const hoje = new Date();
  const hojeStr = hoje.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const dataAtualDiv = document.getElementById('data-atual');
  if (dataAtualDiv) dataAtualDiv.textContent = hojeStr;

  // Variáveis principais
  let dataSelecionada = new Date();
  const calendario = document.getElementById('calendario');
  const textoAgenda = document.getElementById('texto-agenda');
  const dataSelEl = document.getElementById('data-selecionada');
  const btnSalvar = document.getElementById('btn-salvar');
  const historicoLista = document.getElementById('historico-lista');

  // === Gera calendário do mês atual ===
  function gerarCalendario(ano, mes) {
    calendario.innerHTML = '';
    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    diasSemana.forEach(d => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${d}</strong>`;
      calendario.appendChild(div);
    });

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {
      calendario.appendChild(document.createElement('div'));
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const div = document.createElement('div');
      div.textContent = dia;
      div.classList.add('dia');
      const dataTeste = new Date(ano, mes, dia);

      if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
        div.classList.add('hoje');
      }

      div.addEventListener('click', () => selecionarDia(dataTeste, div));
      calendario.appendChild(div);
    }
  }

  // === Selecionar um dia ===
  function selecionarDia(data, div) {
    dataSelecionada = data;
    document.querySelectorAll('.calendario .dia').forEach(d => d.classList.remove('selecionado'));
    div.classList.add('selecionado');
    const dataFmt = dataSelecionada.toLocaleDateString('pt-BR');
    dataSelEl.textContent = `Dia selecionado: ${dataFmt}`;
    carregarAnotacao();
  }

  // === Carregar e salvar anotações ===
  function chaveDia(date) {
    return 'agenda_' + date.toISOString().slice(0, 10);
  }

  function carregarAnotacao() {
    const chave = chaveDia(dataSelecionada);
    textoAgenda.value = localStorage.getItem(chave) || '';
  }

  function salvarAnotacao() {
    const chave = chaveDia(dataSelecionada);
    localStorage.setItem(chave, textoAgenda.value);
    atualizarHistorico();
  }

  // === Atualizar histórico dos últimos 7 dias ===
  function atualizarHistorico() {
    historicoLista.innerHTML = '';
    const hoje = new Date();
    for (let i = 0; i < 7; i++) {
      const dia = new Date();
      dia.setDate(hoje.getDate() - i);
      const chave = chaveDia(dia);
      const texto = localStorage.getItem(chave);
      if (texto && texto.trim() !== '') {
        const item = document.createElement('div');
        item.className = 'historico-item';
        item.innerHTML = `<small>${dia.toLocaleDateString('pt-BR')}</small><p>${texto}</p>`;
        historicoLista.appendChild(item);
      }
    }
  }

  // === Checklist (mantém igual) ===
  const checks = ['chk-chamados', 'chk-tinta', 'chk-pdv', 'chk-terminais', 'chk-internet'];
  checks.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const chave = 'check_' + id;
      const salvo = localStorage.getItem(chave);
      if (salvo === 'true') el.checked = true;
      el.addEventListener('change', () => {
        localStorage.setItem(chave, el.checked);
      });
    }
  });

  // Inicialização
  gerarCalendario(hoje.getFullYear(), hoje.getMonth());
  selecionarDia(hoje, calendario.querySelector('.hoje'));
  atualizarHistorico();

  // Eventos
  btnSalvar.addEventListener('click', salvarAnotacao);
});
// === DATA ATUAL ===
document.addEventListener('DOMContentLoaded', () => {
  const hoje = new Date();
  const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const texto = hoje.toLocaleDateString('pt-BR', opcoes);
  const dataEl = document.getElementById('data-atual');
  if (dataEl) dataEl.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
});

});

