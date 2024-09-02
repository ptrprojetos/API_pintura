const {
  fetchDatas,
  getTemperatureAndHumity02,
  getTemperatureAndHumity03,
} = require('../models/checkInfoPot');

const getTempAndUmi03 = async (req, res) => {
  try {
    const sensor03 = await getTemperatureAndHumity03();
    res.status(200).json(sensor03);
  } catch (error) {
    console.log(error);
  }
};

const getTempAndUmi02 = async (req, res) => {
  try {
    const sensor02 = await getTemperatureAndHumity02();
    res.status(200).json(sensor02);
  } catch (error) {
    console.log(error);
  }
};

const getTempAndUmi = async (req, res) => {
  try {
    const response = await fetchDatas();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
};

module.exports = { getTempAndUmi, getTempAndUmi02, getTempAndUmi03 };
