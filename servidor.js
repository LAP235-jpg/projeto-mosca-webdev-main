const express = require("express");
const fs = require('node:fs');


const app = express();

app.use(express.json());

app.get("/", (req, res) => {

res.send('/home.html');
});

app.listen(port = 3000, () => {

 console.log(`Servidor rodando em http://localhost:${port}/`);

});

fs.readFile('home.html', 'utf8', (err, html) => {
  if (err) {
    return 0
  }

   res.send('/home.html') 
});

//espaço DEV 0.4.5

//vari