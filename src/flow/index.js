const { addKeyword } = require("@bot-whatsapp/bot");
const consult = require("./consult");
const out = require("./out");

const entry = ["hola", "Hola"];
const mainMenu = ["Menú:", "👉 *1*. Consulta por DOMINIO.", "👉 *0*. Salir."];

const mainFlow = addKeyword(["hola", "Hola"]).addAnswer(mainMenu, null, null, [
  consult.flow,
  out.flow,
]);

module.exports = { flow: mainFlow, menu: mainMenu, entry };
