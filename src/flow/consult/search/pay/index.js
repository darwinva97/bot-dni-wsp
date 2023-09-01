const { addKeyword } = require("@bot-whatsapp/bot");
const api = require("../../../../api");
const state = require("../../../../state");

const payFlow = addKeyword(["1"])
  .addAnswer("Procesando solicitud:", null, async (ctx, { flowDynamic }) => {
    const dni = state.get(ctx.from);
    const result = await api.startPay(dni);
    const message = JSON.stringify(result, null, 3);
    await flowDynamic(message);
  })

module.exports = { flow: payFlow };
