// Função para atualizar a porcentagem de rolagem
function updateScrollPercentage(sliderId, percentId) {
  const slider = document.getElementById(sliderId);
  const percent = document.getElementById(percentId);
  const percentage = Math.round((slider.value / slider.max) * 100);
  percent.textContent = `${percentage}%`;
}

// Função para aplicar a rolagem nas impressoras
function applyScroll(sliderId, iframeId) {
  const slider = document.getElementById(sliderId);
  const iframe = document.getElementById(iframeId);
  const marginValue = -slider.value + 'px';
  iframe.style.marginTop = marginValue;
  iframe.style.marginLeft = marginValue;
}

// Função para inicializar os controles de rolagem
function initializeScrollControls() {
  const scrollControls = [
    { sliderId: 'scrollVertical_9735', percentId: 'verticalPercent_9735', iframeId: 'iframe_9735' },
    { sliderId: 'scrollHorizontal_9735', percentId: 'horizontalPercent_9735', iframeId: 'iframe_9735' },
    { sliderId: 'scrollVertical_9746', percentId: 'verticalPercent_9746', iframeId: 'iframe_9746' },
    { sliderId: 'scrollHorizontal_9746', percentId: 'horizontalPercent_9746', iframeId: 'iframe_9746' },
    { sliderId: 'scrollVertical_9755', percentId: 'verticalPercent_9755', iframeId: 'iframe_9755' },
    { sliderId: 'scrollHorizontal_9755', percentId: 'horizontalPercent_9755', iframeId: 'iframe_9755' },
    { sliderId: 'scrollVertical_10581', percentId: 'verticalPercent_10581', iframeId: 'iframe_10581' },
    { sliderId: 'scrollHorizontal_10581', percentId: 'horizontalPercent_10581', iframeId: 'iframe_10581' },
    { sliderId: 'scrollVertical_10571', percentId: 'verticalPercent_10571', iframeId: 'iframe_10571' },
    { sliderId: 'scrollHorizontal_10571', percentId: 'horizontalPercent_10571', iframeId: 'iframe_10571' },
    { sliderId: 'scrollVertical_10568', percentId: 'verticalPercent_10568', iframeId: 'iframe_10568' },
    { sliderId: 'scrollHorizontal_10568', percentId: 'horizontalPercent_10568', iframeId: 'iframe_10568' },
    { sliderId: 'scrollVertical_13702', percentId: 'verticalPercent_13702', iframeId: 'iframe_13702' },
    { sliderId: 'scrollHorizontal_13702', percentId: 'horizontalPercent_13702', iframeId: 'iframe_13702' },
    { sliderId: 'scrollVertical_9761', percentId: 'verticalPercent_9761', iframeId: 'iframe_9761' },
    { sliderId: 'scrollHorizontal_9761', percentId: 'horizontalPercent_9761', iframeId: 'iframe_9761' },
    { sliderId: 'scrollVertical_9730', percentId: 'verticalPercent_9730', iframeId: 'iframe_9730' },
    { sliderId: 'scrollHorizontal_9730', percentId: 'horizontalPercent_9730', iframeId: 'iframe_9730' },
    { sliderId: 'scrollVertical_10568', percentId: 'verticalPercent_10568', iframeId: 'iframe_10568' },
    { sliderId: 'scrollHorizontal_10568', percentId: 'horizontalPercent_10568', iframeId: 'iframe_10568' },
    { sliderId: 'scrollVertical_9745', percentId: 'verticalPercent_9745', iframeId: 'iframe_9745' },
    { sliderId: 'scrollHorizontal_9745', percentId: 'horizontalPercent_9745', iframeId: 'iframe_9745' }
  ];

  scrollControls.forEach(control => {
    const slider = document.getElementById(control.sliderId);
    slider.addEventListener('input', () => {
      updateScrollPercentage(control.sliderId, control.percentId);
      applyScroll(control.sliderId, control.iframeId);
    });
    updateScrollPercentage(control.sliderId, control.percentId);
  });
}

// Inicializar os controles de rolagem ao carregar a página
window.addEventListener('DOMContentLoaded', initializeScrollControls);
