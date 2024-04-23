const fetchDatas = require('../models/checkInfoPot');

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

module.exports = getTempAndUmi;
