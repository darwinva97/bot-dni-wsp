const { addKeyword } = require("@bot-whatsapp/bot");

const output = "Ingrese 1 para realizar el pago"

const searchFlow = addKeyword("/^[0-9]{8}$/", {
  regex: true,
})
  .addAnswer("El resultado es:", null, async (ctx, { flowDynamic }) => {
    const dni = ctx.body;
    const result = await api({ dni, ...ctx });
    const message = JSON.stringify(result, null, 3);
    await flowDynamic(message);
  })
  .addAnswer(output, { delay: 1000 }, null, []);

module.exports = { flow: searchFlow, menu: searchMenu };
