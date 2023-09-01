const axios = require("axios");

const getConfig = (data) => ({
  method: "post",
  maxBodyLength: Infinity,
  url: "http://monitoreovialmisiones.ar/api/nuevotest",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Token: "s6goGiqxNySSa69991.Z*ohMHi1oxblQJ0sh4",
  },
  data,
});

const search = (dni) => {
  const data = qs.stringify({
    id: dni,
  });

  const config = getConfig(data);

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

const startPay = (dni) => {
  const data = qs.stringify({
    id: dni,
    tipo: 4,
  });

  const config = getConfig(data);

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

const api = {
  search,
  startPay,
};

module.exports = api;
