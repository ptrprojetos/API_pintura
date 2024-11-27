const {
  fetchDatas,
} = require('../models/checkInfoPot');
const { getTemperatureAndHumity02 } = require('../models/sensor02');
const { getTemperatureAndHumity03 } = require('../models/sensor03');

const getTempAndUmi03 = async (req, res) => {
  try {
    const sensor03 = await getTemperatureAndHumity03();
    console.log(sensor03)

    res.status(200).json(sensor03);
  } catch (error) {
    console.log(error);
  }
};

const getTempAndUmi02 = async (req, res) => {
  try {
    const sensor02 = await getTemperatureAndHumity02();
    console.log(sensor02)

    res.status(200).json(sensor02);
  } catch (error) {
    console.log(error);
  }
};

const getTempAndUmi = async (req, res) => {
  try {
    const response = await fetchDatas();
    console.log(response.mensage)
    if(response.mensage === 'Não foi possível obter os dados em 10 segundos')
    return res.status(400).json({message: 'erro ao conectar com sensores'})
  else return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
};

module.exports = { getTempAndUmi, getTempAndUmi02, getTempAndUmi03 };
