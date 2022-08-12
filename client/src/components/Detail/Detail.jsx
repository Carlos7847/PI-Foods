import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getById } from "../../redux/action"
import styles from "./Detail.module.css"

export default function Detail(params) {

    const recipeId = useParams()
    const detail = useSelector(state=>state.recipeDetail)
    const {title, image, diets, id, summary, healthScore, steps, dishTypes, cuisines} = detail
    const dispatch = useDispatch()
    // console.log(parseInt(recipeId.id));

    useEffect((e) => {
        dispatch(getById(recipeId.id)) /// <= recipesId es un string
        console.log(diets)
        return () => {
            dispatch({type: "REMOVE_SELECTED_PRODUCT"})
        }
    }, [recipeId, dispatch])

    const removeTags = (summ) => {
        let regex = /<[^>]*>/g
        return summ.replace(regex, ' ')
    }

    return (
        <React.Fragment>
            
            <div className={styles.container}>
                <Link to="/home"><div className={styles.back}>Back</div> </Link>
                {Array.isArray(detail)&&<img src="https://th.bing.com/th/id/OIP.ck87tttUm2wdJPNIhEb9BgHaG8?pid=ImgDet&rs=1" alt="recipe not found"></img>}
                {!Array.isArray(detail)&& (Object.keys(detail).length === 0 ? (<img src="https://th.bing.com/th/id/OIP.Lhjg8d3snEWHbSH6s14DJAHaHa?pid=ImgDet&rs=1" alt="loading..."></img>) : (
                    <div className={styles.di}>
                        <div className={styles.id} >#{id}</div>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.hedes}>
                            <div className={styles.header}>
                            <div className={styles.img}><img src={image} alt="not found" /></div>
                            <div className={styles.healthScore}>Health Score: {healthScore}</div>
                            <div>{cuisines}</div>
                            <div className={styles.dishTypes}>Dish types: {dishTypes}</div>
                            <div className={styles.diets}>Diets: {diets}</div>
                            </div>

                            <div className={styles.description}>
                            <h2>Summary:</h2>
                            <div className={styles.summary}>{removeTags(summary)}</div>
                            <h2>Instructions:</h2>
                            {typeof steps === "string" && <p>-{steps}</p>}
                            {Array.isArray(steps) && steps?.map(ele => {
                            return <p key={ele.number}>-{ele.step} </p>
                            })}
                        </div>
                        </div>
                        
                        
                        
                    </div>)
                )}
            </div>
        </React.Fragment>
    )
}