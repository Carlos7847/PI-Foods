const { Router } = require("express");
// Importar todos los routers;
const { getOrCreateDiets } = require("./diet");
const { getAllRecipes, getById, postCreate } = require("./recipe");

const router = Router();

// Configurar los routers
router.get("/recipes", getAllRecipes);
router.get("/recipes/:id", getById);
router.post("/recipes", postCreate);
router.get("/diets", getOrCreateDiets);

module.exports = router;
