const express = require("express");
const path = require('node:path');

const app = express();
const PORT = 3000;

app.use(express.json());

// Variáveis do "banco de dados"
let saldo = 100;
const jogos = [
  { id: 1, nome: 'GUA2', preco: 19.67, estoque: 10, pagina: 'gua2' },
  { id: 2, nome: 'fifa23', preco: 180.90, estoque: 5, pagina: 'fifa23' },
  { id: 3, nome: 'Animal Crossing', preco: 240.00, estoque: 3, pagina: 'animal-crossing' },
  { id: 4, nome: 'RDR2', preco: 210.90, estoque: 8, pagina: 'rdr2' }
];

// Função de compra
function comprarJogo(nome, preco, quantidade) {
  const total = preco * quantidade;
  if (total > saldo) {
    return { sucesso: false, mensagem: "Saldo insuficiente" };
  }
  saldo -= total;
  return {
    sucesso: true,
    mensagem: `Você comprou ${quantidade} unidade(s) de ${nome} por R$${total.toFixed(2)}`,
    saldoRestante: saldo
  };
}

// Rota: Home (vitrine)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});
// Rota: Páginas dos jogos
app.get("/jogos/:nome", (req, res) => {
  const nomeJogo = req.params.nome;
  res.sendFile(path.join(__dirname, "jogos", `${nomeJogo}`));
});

// API: Comprar jogo
app.post("/api/comprar", (req, res) => {
  const { nome, quantidade } = req.body;
  const jogo = jogos.find(j => j.nome === nome);

  if (!jogo) {
    return res.status(404).json({ erro: "Jogo não encontrado" });
  }

  const resultado = comprarJogo(jogo.nome, jogo.preco, quantidade || 1);
  res.json(resultado);
});

// API: Ver saldo
app.get("/api/saldo", (req, res) => {
  res.json({ saldo });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});