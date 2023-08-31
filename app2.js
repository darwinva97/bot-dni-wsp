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
const startCommand = "hola";
const tipo = 0;
const startCommand2 = "Hola";
const principalMenu = [
  "Escribí el número de la opción que desees elegir:",
  "👉 *1.* Consulta por DOMINIO.",
];

const flowOut = addKeyword(["3"]).addAnswer(
  [
    `Muchas gracias por usar este bot. Recuerda que puedes volver a activarlo escribiendo "*${startCommand}*".`,
  ],
  null,
  null,
  []
);

const flowApi2 = addKeyword("/^[a-zA-Z0-9]+$/", {
  regex: true,
}).addAnswer("El resultado es 1 para realizar el pago")


const flowApi = addKeyword("/^[a-zA-Z0-9]+$/", {
  regex: true,
})
  .addAnswer("El resultado es:", null, async (ctx, { flowDynamic }) => {
    const dni = ctx.body;
    const result = await api(dni,tipo);
    const message = JSON.stringify(result, null, 3);
    await flowDynamic(message);
  })

const flowSearch = addKeyword(["1"]).addAnswer(
  ["🔍Ingrese el DNI a buscar, sin puntos(.) ni espacios🔍"],
  null,
  null,
  [flowApi]
);

if (addKeyword(["2"])){
  this.tipo = 2;
}

if (addKeyword(["1"])){
  this.tipo = 1;
}

const flowPrincipal = addKeyword([startCommand])
  .addAnswer( "¡Hola, Bienvenido/a UACIBOT👋",
  "¿En qué puedo ayudarte hoy?",)
  .addAnswer(principalMenu, null, null, [flowSearch, flowOut,Pago]);

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