const { addKeyword } = require("@bot-whatsapp/bot");
const main = require("..");

const entry = ["0"];
const outMenu = [
  `Hasta luego! Recuerda que puedes volver escribiendo (${main.entry[0]})`,
];
const outFlow = addKeyword(entry).addAnswer(outMenu, null, null);

module.exports = { flow: outFlow, menu: outMenu, entry };
