const { addKeyword } = require("@bot-whatsapp/bot");
const search = require("./search");

const entry = ["1"];
const consultMenu = ["Ingrese el DNI a buscar, sin puntos(.) ni espacios."];

const consultFlow = addKeyword(entry).addAnswer(consultMenu, null, null, [
  search.flow,
]);

module.exports = { flow: consultFlow, menu: consultMenu, entry };
