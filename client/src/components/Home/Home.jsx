import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipes } from "../../redux/action";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";

export default function Home() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  return (
    <React.Fragment>
      <div className={styles.home}>
        <div>
          <Pagination />
        </div>
      </div>
    </React.Fragment>
  );
}
