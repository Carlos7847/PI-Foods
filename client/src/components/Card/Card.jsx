import React from "react";
import styles from "./Card.module.css"

export default function Card({ image, title, diets }) {
    const linkError = "https://s3.envato.com/files/107860319/Theme%20preview/19_Restaurant%20theme_awesome%20spices_404%20page.jpg"
    return (
        <React.Fragment>
            <div className={styles.wrap} >
                <div className={styles.imgDiv} >
                    {Array.isArray(image)&&<img className={styles.img} src={linkError} alt="not found" />}
                    {!Array.isArray(image)&&<img className={styles.img} src={image} alt="not found" />}
                </div>
                <div className={styles.tit} >
                    <h1 className={styles.h1} >{title}</h1>
                </div>
                    {/* {diets.length && diets.map(type=> <div key={type.id}>{diets}</div>)} */}
                <div className={styles.dit} >
                    <h4>{diets?.map(dt => <div className={styles.diet} >{dt}</div>)}</h4>
                </div>
            </div>
        </React.Fragment>
    )
}