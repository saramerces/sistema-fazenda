const pesagensData = require('../data/pesagensData');

const pesagemJsonFormat = function (pesagem) { 
  return {
    id: pesagem.id, 
    animalId: pesagem.id_animal, 
    data: pesagem.data, 
    peso: pesagem.peso
  };
};

exports.getPesagens = function () {
  const pesagens = pesagensData.getPesagens()
    .then(data => {
      if (data.length === 0) {
        return data;
      } else {
        return data.map(elem => pesagemJsonFormat(elem));
      }
    })
    .catch(_ => { return new Array(0); });
  return pesagens;
};

exports.getPesagem = async function (id) {
  const pesagem = await pesagensData.getPesagem(id);
  if (!pesagem) {
    throw new Error('Pesagem not Found!');
  }
  return pesagemJsonFormat(pesagem);
};

exports.savePesagem = async function (pesagem) {
  const result = await pesagensData.savePesagem(pesagem);
  const saved = pesagemJsonFormat(result);
  return saved;
};

exports.deletePesagem = async function (id) {
  return await pesagensData.deletePesagem(id);
};
