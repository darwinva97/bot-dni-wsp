const { addKeyword } = require("@bot-whatsapp/bot");
const config = require("../../config");

const entry = ["0"];
const outMenu = [
  `Hasta luego! Recuerda que puedes volver escribiendo (${config.startCommands[0]})`,
];
const outFlow = addKeyword(entry).addAnswer(outMenu, null, null);

module.exports = { flow: outFlow, menu: outMenu, entry };
