const axios = require("axios");
const { Recipe, Diet } = require("../db");
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

const getApiRecipes = async () => {
  const apiRecipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey8}&addRecipeInformation=true&number=100`
  );
  const { results } = apiRecipes.data;
  const filterRecipes = results?.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      cuisines: recipe.cuisines,
      // a: console.log(recipe.analyzedInstructions[0]?.steps),
      steps: recipe.analyzedInstructions[0]?.steps.map((st) => {
        // console.log(recipe.analyzedInstructions[0].steps);
        return { number: st.number, step: st.step };
      }),
      image: recipe.image,
      dishTypes: recipe.dishTypes,
      diets: recipe.diets,
    };
  });
  return filterRecipes;
};

const getDbInfo = async () => {
  return await Recipe.findAll();
};

const apiDbInfo = async () => {
  const api = await getApiRecipes();
  const db = await getDbInfo();
  // const [api, db] = await Promise.all([getApiRecipes(), getDbInfo()])
  return [...api, ...db];
};

module.exports = {
  getAllRecipes: async (req, res, next) => {
    try {
      let { name } = req.query;
      let totalRecipes = await apiDbInfo();
      if (name) {
        const filtered = totalRecipes.filter((recipe) =>
          recipe.title?.toLowerCase().includes(name.toLowerCase())
        );
        return filtered.length
          ? res.json(filtered)
          : res.json(["No matches found"]);
      }
      res.json(totalRecipes);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const all = await apiDbInfo();
      if (id) {
        const found = all.find((recipe) => recipe.id == id);
        return found ? res.json(found) : res.json(["No matches by id"]);
      }
    } catch (error) {
      next(error);
    }
  },
  postCreate: async (req, res, next) => {
    const { title, summary, healthScore, image, steps, diets } = req.body;
    if (!title || !summary) res.send("Faltan datos obligatorios");
    try {
      const created = await Recipe.create({
        title,
        summary,
        steps,
        healthScore,
        image,
        steps,
      });
      diets?.forEach(async (element) => {
        let diet = await Diet.findOne({
          where: { name: element },
        });
        created.addDiet(diet);
      });
      res.send("success");
    } catch (error) {
      next(error);
    }
  },
};
