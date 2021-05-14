const vacinasData = require('../data/vacinasData');

exports.formatJson = function (vacina) {
  return {
    id: vacina.id,
    dataVacina: vacina.data_vacina,
    tipoVacina: vacina.tipo_vacina,
    produtoId: vacina.id_produto
  };
};

exports.getVacinas = function () {
  const todasVacinas = vacinasData.getVacinas()
    .then(data => {
      if (data.length === 0) {
        return data;
      } else {
        return data.map(elem => exports.formatJson(elem));
      }
    })
    .catch(_ => { return new Array(0); });
  return todasVacinas;
};

exports.getVacina = async function (id) {
  const vacina = await vacinasData.getVacina(id);
  if (!vacina) {
    throw new Error("Vacina não econtrada");
  }
  return exports.formatJson(vacina);
};

exports.saveVacina = async function (vacina) {
  const newVacina = await vacinasData.saveVacina(vacina);
  return exports.formatJson(newVacina);
};

exports.updateVacina = async function (id, vacina) {
  const existsVacina = await exports.getVacina(id);
  if (!existsVacina) {
    throw new Error("Vacina não econtrada");
  }
  return vacinasData.updateVacina(id, vacina);
};

exports.deleteVacina = function (id) {
  return vacinasData.deleteVacina(id);
};