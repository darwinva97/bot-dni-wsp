const { addKeyword } = require("@bot-whatsapp/bot");
const api = require("../../../../api")

// const output = "Ingrese 1 para realizar el pago";

const payFlow = addKeyword(["1"])
  .addAnswer("Procesando solicitud:", null, async (ctx, { flowDynamic }) => {
    const result = await api.startPay();
    const message = JSON.stringify(result, null, 3);
    await flowDynamic(message);
  })
  // .addAnswer(output, { delay: 1000 }, null, []);

module.exports = { flow: payFlow, menu: payMenu };
