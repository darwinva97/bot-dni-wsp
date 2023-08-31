const { addKeyword } = require("@bot-whatsapp/bot");

const entry = ["1"];
const consultMenu = ["Ingrese el DNI a buscar, sin puntos(.) ni espacios."];

const consultFlow = addKeyword(entry).addAnswer(consultMenu, null, null, [
  consult.flow,
]);

module.exports = { flow: consultFlow, menu: consultMenu, entry };
