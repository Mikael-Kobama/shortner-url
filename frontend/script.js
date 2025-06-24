document.getElementById("shortenBtn").addEventListener("click", async () => {
  const input = document.getElementById("urlInput");
  const result = document.getElementById("result");
  const fullUrl = input.value.trim();

  if (!fullUrl) {
    result.textContent = "Por favor, insira uma URL válida.";
    return;
  }

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullUrl }),
    });

    if (!response.ok) {
      throw new Error("Erro ao encurtar a URL.");
    }

    const data = await response.json();
    result.innerHTML = `URL encurtada: <a href="${data.shortLink}" target="_blank">${data.shortLink}</a>`;
    input.value = "";
  } catch (err) {
    result.textContent = err.message || "Erro inesperado.";
  }
});
