function carregarHabitos() {
  return JSON.parse(localStorage.getItem("habitos")) || [];
}

function guardarHabitos(habitos) {
  localStorage.setItem("habitos", JSON.stringify(habitos));
}

function renderHabitos() {
  const lista = document.getElementById("lista-habitos");
  const progressoTexto = document.getElementById("progresso-texto");
  const progressoBarra = document.getElementById("progresso-barra");
  
  lista.innerHTML = "";
  const habitos = carregarHabitos();
  if (habitos.length === 0) {
    progressoTexto.textContent = "Sem hábitos ainda.";
    progressoBarra.style.width = "0%";
    return;
  }

  const feitos = habitos.filter(h => h.feito).length;
  const progresso = Math.round((feitos / habitos.length) * 100);
  progressoTexto.textContent = `Progresso: ${progresso}%`;
  progressoBarra.style.width = `${progresso}%`;

  habitos.forEach((h, i) => {
    const li = document.createElement("li");
    li.textContent = h.nome;
    li.classList.toggle("feito", h.feito);
    
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "✖";
    btnRemover.onclick = (e) => {
      e.stopPropagation();
      habitos.splice(i, 1);
      guardarHabitos(habitos);
      renderHabitos();
    };
    
    li.onclick = () => {
      habitos[i].feito = !habitos[i].feito;
      guardarHabitos(habitos);
      renderHabitos();
    };

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("novo-habito-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("novo-habito");
      const nome = input.value.trim();
      if (!nome) return;
      const habitos = carregarHabitos();
      habitos.push({ nome, feito: false });
      guardarHabitos(habitos);
      input.value = "";
      renderHabitos();
    });
    renderHabitos();
  }
});
