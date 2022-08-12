import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, getRecipes } from "../../redux/action";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const allRecipes = useSelector((state) => state.recipesList);

  const [pages] = useState(11);
  const [currentPage, setCurrentPage] = useState(1);
  const [dietSelected, setDietSelected] = useState("");
  const dietsList = useSelector((diets) => diets.diets);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getRecipes())
      dispatch(getDiets())
  }, [])

  const filterDiet = (e) => {
    setDietSelected(e.target.value);
    dispatch({ type: "FILTER_BY_TYPE", payload: e.target.value });
    setCurrentPage(1);
    console.log(dietSelected);
  };

  const sort = (e) => {
    dispatch({ type: "ORDER_BY_ALP", payload: e.target.value });
    setCurrentPage(1);
    console.log(e.target.value);
  };
  const nextPage = () => {
    if(listOfNumbers().length!==currentPage){
      setCurrentPage((page) => page + 1);
    }
  };

  const previousPage = () => {
    if(currentPage!==1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const changePage = (e) => {
    console.log(e.target.value);
    setCurrentPage(Number(e.target.value));
  };
  const itemsToRender = () => {
    const start = currentPage * 9 - 9;
    let end = start + 9;
    if(start+9>allRecipes.length) end = allRecipes.length
    return allRecipes.slice(start, end);
  };

  // const listOfNumbers = () => {
  //   const first = Math.floor((currentPage - 1) / 9) * 9;
  //   return Array(9)
  //     .fill()
  //     .map((_, i) => first + i + 1);
  // };
  const listOfNumbers = () => {
    let list = []
    let done = Math.ceil((allRecipes.length) / 9)
    for (let i = 0; i < done; i++) {
      list.push(i+1)
    }
    return list
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.titulo} >
            <div>
              <Link to={"/"}>Back</Link>
            </div>
            <div>
              <h1>Check our whole list of recipes</h1>
            </div>
          </div>
          <div className={styles.form} >
            <Link to={"/create"}>Create your recipe</Link>
          </div>
          <div className={styles.filtros} >
            <div>
              <select className={styles.sele} onChange={(e) => filterDiet(e)}>
                <option value="All">All</option>
                {dietsList.map((diet) => {
                  return (
                    <option key={diet.id} value={diet.name}>
                      {diet.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select className={styles.sele} onChange={(e) => sort(e)}>
                <option value="Sort">- Sort by name or health Score -</option>
                <option value="fromA">from A to Z</option>
                <option value="fromZ">from Z to A</option>
                <option value="belowToTop">from 0 to 100</option>
                <option value="topToBelow">from 100 to 0</option>
              </select>
            </div>
          </div>
          <div className={styles.search} >
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
        </div>
        {/* /////////////////////////////////////////////////////////////////////////// */}
        <div className={styles.header}>
          <div className={styles.prenext}>
            <button onClick={previousPage}>Previous</button>
          </div>
          <div className={styles.numbers} >
            {listOfNumbers().map((number, i) => {
              return (
                <button id={i} value={number} onClick={(e) => changePage(e)}>
                  {number}
                </button>
              );
            })}
          </div>
          <div className={styles.prenext}>
            <button onClick={nextPage}>Next</button>
          </div>
          <div className={styles.pageNum} >Page N° {currentPage}</div>
        </div>
        <div className={styles.cards}>
          {typeof itemsToRender()[0]==="string"? <div className={styles.err}>ERROR</div>:
            itemsToRender().map((rep) => {
              return (
                <div key={rep.id}>
                  <Link to={`/home/${rep.id}`}>
                    <Card
                      key={rep.id}
                      title={rep.title}
                      image={rep.image}
                      diets={rep.diets}
                    />{" "}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
}
