import { GET_RECIPES, GET_DIETS, GET_BY_ID, GET_BY_NAME } from "./action";

const initialState = {
  recipesList: [],
  auxRecipeList: [],
  recipeDetail: {},
  diets: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipesList: action.payload,
        auxRecipeList: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        recipesList: action.payload,
      };
    case "REMOVE_SELECTED_PRODUCT":
      return {
        ...state,
        recipeDetail: {},
      };
    case "FILTER_BY_TYPE":
      let allRecipes = state.auxRecipeList;
      let filtered;
      if (action.payload === "All") {
        filtered = allRecipes;
      } else {
        console.log(allRecipes[0]);
        filtered = allRecipes.filter((rep) =>
          rep.diets?.includes(action.payload)
        );
      }
      return {
        ...state,
        recipesList: [...filtered],
      };

    case "ORDER_BY_ALP":
      let sorted;
      if (action.payload === "fromA") {
        sorted = state.recipesList.sort((first, second) => {
          if (first.title > second.title) return 1;
          if (first.title < second.title) return -1;
          return 0;
        });
      } else if (action.payload === "fromZ") {
        sorted = state.recipesList.sort((first, second) => {
          if (first.title > second.title) return -1;
          if (first.title < second.title) return 1;
          return 0;
        });
      } else if (action.payload === "belowToTop") {
        sorted = state.recipesList.sort((first, second) => {
          if (first.healthScore > second.healthScore) return 1;
          if (first.healthScore < second.healthScore) return -1;
          return 0;
        });
      } else if (action.payload === "topToBelow") {
        sorted = state.recipesList.sort((first, second) => {
          if (first.healthScore > second.healthScore) return -1;
          if (first.healthScore < second.healthScore) return 1;
          return 0;
        });
      }
      return {
        ...state,
        recipesList: [...sorted],
      };

    default:
      return { ...state };
  }
}
