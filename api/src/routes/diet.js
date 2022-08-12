const axios = require("axios");
const { Diet } = require("../db");
const {
  apiKey1,
  apiKey2,
  apiKey3,
  apiKey4,
  apiKey5,
  apiKey6,
  apiKey7,
  apiKey8,
} = process.env;

module.exports = {
  getOrCreateDiets: async (req, res, next) => {
    try {
      const bring = await Diet.findAll();
      if (!bring.length) {
        const { results } = (
          await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey8}&addRecipeInformation=true&number=100`
          )
        ).data;
        const fullArrayOfDiets = results.map((element) => element.diets);
        const oneArrayOnly = fullArrayOfDiets.flat();
        const noDoubles = new Set(oneArrayOnly);
        const backToArray = [...noDoubles];
        const rightFormat = backToArray.map((ele) => {
          return { name: ele };
        }); // try without a return
        await Diet.bulkCreate(rightFormat);
      }
      res.json(bring);
    } catch (error) {
      next(error);
    }
  },
};
