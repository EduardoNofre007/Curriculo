/* =====================================================
   script.js — Eduardo Nofre
   Funcionalidades:
   1) alert() de boas-vindas
   2) mostrar/esconder seção
   3) saudação com o nome digitado (innerText)
   4) ano do rodapé
   5) contador de visitas (localStorage)
   6) gráfico de habilidades no canvas
   ===================================================== */

/* -------- 1. ALERT DE BOAS-VINDAS -------- */
const btnAlerta = document.getElementById("btn-alerta");

btnAlerta.addEventListener("click", function () {
  alert("Olá! Obrigado por visitar meu currículo.");
});

/* -------- 2. MOSTRAR / ESCONDER SEÇÃO -------- */
const btnAlternar = document.getElementById("btn-alternar");
const conteudoExtra = document.getElementById("conteudo-extra");

btnAlternar.addEventListener("click", function () {
  // hidden é true/false: basta inverter
  const estaEscondido = conteudoExtra.hidden;

  conteudoExtra.hidden = !estaEscondido;
  btnAlternar.innerText = estaEscondido ? "Mostrar menos" : "Mostrar mais";

  // Informa leitores de tela se está aberto ou fechado
  btnAlternar.setAttribute("aria-expanded", String(estaEscondido));
});

/* -------- 3. SAUDAÇÃO COM O NOME DIGITADO -------- */
const campoNome = document.getElementById("campo-nome");
const btnSaudacao = document.getElementById("btn-saudacao");
const saidaSaudacao = document.getElementById("saudacao");

function mostrarSaudacao() {
  const nome = campoNome.value.trim();

  if (nome === "") {
    saidaSaudacao.innerText = "Digite seu nome antes de enviar.";
    campoNome.focus();
    return;
  }

  saidaSaudacao.innerText = "Olá, " + nome + "! Que bom te ver por aqui.";
}

btnSaudacao.addEventListener("click", mostrarSaudacao);

// Enter no campo também envia
campoNome.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    mostrarSaudacao();
  }
});

/* -------- 4. ANO DO RODAPÉ -------- */
document.getElementById("ano").innerText = new Date().getFullYear();

/* -------- 5. CONTADOR DE VISITAS (localStorage) -------- */
// try/catch porque alguns navegadores bloqueiam o armazenamento local
try {
  const totalAnterior = Number(localStorage.getItem("visitas")) || 0;
  const total = totalAnterior + 1;

  localStorage.setItem("visitas", total);
  document.getElementById("visitas").innerText = total;
} catch (erro) {
  document.getElementById("visitas").innerText = "indisponível";
}

/* -------- 6. GRÁFICO DE HABILIDADES NO CANVAS -------- */
// Edite os nomes e os valores (0 a 100) conforme a sua realidade
const habilidades = [
  { nome: "HTML",  nivel: 60 },
  { nome: "CSS",   nivel: 50 },
  { nome: "JS",    nivel: 30 },
  { nome: "Java",   nivel: 20 },
  { nome: "VBA",   nivel: 60 }
];

const canvas = document.getElementById("grafico-habilidades");

if (canvas && canvas.getContext) {
  const ctx = canvas.getContext("2d");

  const margemBaixo = 40;         // espaço para os rótulos
  const alturaUtil = canvas.height - margemBaixo - 20;
  const larguraBarra = canvas.width / habilidades.length;

  habilidades.forEach(function (item, indice) {
    const altura = (item.nivel / 100) * alturaUtil;
    const x = indice * larguraBarra + larguraBarra * 0.2;
    const y = canvas.height - margemBaixo - altura;
    const largura = larguraBarra * 0.6;

    // Barra
    ctx.fillStyle = "#0F6B5C";
    ctx.fillRect(x, y, largura, altura);

    // Percentual acima da barra
    ctx.fillStyle = "#16262B";
    ctx.font = "600 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(item.nivel + "%", x + largura / 2, y - 8);

    // Nome embaixo
    ctx.fillText(item.nome, x + largura / 2, canvas.height - 15);
  });
}