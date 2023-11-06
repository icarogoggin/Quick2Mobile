document.addEventListener("DOMContentLoaded", function () {
  var qrcodeDiv = document.getElementById("qrcode");

  if (!qrcodeDiv) {
    console.error("Elemento 'qrcode' não encontrado.");
    return;
  }

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    if (!tabs || tabs.length === 0) {
      console.error("Nenhuma guia ativa encontrada.");
      return;
    }

    var currentURL = tabs[0].url;

    if (!currentURL) {
      console.error("URL atual não encontrada.");
      return;
    }

    generateQRCode(currentURL);
  });

  function generateQRCode(url) {
    qrcodeDiv.innerHTML = "";

    try {
      var qrcode = new QRCode(qrcodeDiv, {
        text: url,
        width: 128,
        height: 128,
      });
    } catch (error) {
      console.error("Erro ao gerar o QR Code:", error);
    }
  }
});
