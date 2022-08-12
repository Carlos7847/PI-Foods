import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";

export const getRecipes = () => {
  return async (dispatch) => {
    return axios.get(`http://localhost:3001/recipes`).then((res) => {
      dispatch({ type: GET_RECIPES, payload: res.data });
    });
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    return axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
      dispatch({ type: GET_BY_ID, payload: res.data });
    });
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    return axios.get(`http://localhost:3001/diets`).then((res) => {
      dispatch({ type: GET_DIETS, payload: res.data });
    });
  };
};

export const getByName = (name) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3001/recipes?name=${name}`)
      .then((res) => {
        dispatch({ type: GET_BY_NAME, payload: res.data });
      });
  };
};

export const postRecipe = (rep) => {
  return async (dispatch) => {
    console.log(rep);
    return await axios.post(`http://localhost:3001/recipes`, rep);
  };
};
