const axios = require("axios");
const qs = require("qs");

module.exports = (dni) => {
  let data = qs.stringify({
    id: dni,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://monitoreovialmisiones.ar/api/nuevotest?=36407654",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: "s6goGiqxNySSa69991.Z*ohMHi1oxblQJ0sh4",
    },
    data: data,
  };

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