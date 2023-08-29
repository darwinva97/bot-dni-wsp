const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");
const api = require("./api");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const startCommand = "bot";
const principalMenu = [
  "Menú:",
  "👉 *buscar* para buscar DNI.",
  "👉 *salir* para terminar el bot.",
];

const flowOut = addKeyword(["salir"]).addAnswer(
  [
    `uchas gracias por usar este bot. Recuerda que puedes volver a activarlo escribiendo "*${startCommand}*".`,
  ],
  null,
  null,
  []
);

const flowApi = addKeyword("/^[0-9]{8}$/", {
  regex: true,
})
  .addAnswer("El resultado es:", null, async (ctx, { flowDynamic }) => {
    const dni = ctx.body;
    const result = await api(dni);
    const message = JSON.stringify(result, null, 3);
    await flowDynamic(message);
  })
  .addAnswer(principalMenu, { delay: 1000 });

const flowSearch = addKeyword(["buscar"]).addAnswer(
  ["Ingrese el DNI a buscar"],
  null,
  null,
  [flowApi]
);

const flowPrincipal = addKeyword([startCommand])
  .addAnswer("🙌 Hola bienvenido a este *Chatbot*")
  .addAnswer(principalMenu, null, null, [flowSearch, flowOut]);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();