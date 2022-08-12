// import "./Landing.module.css";
import styles from "./Landing.module.css"
import React from "react";
import { NavLink } from "react-router-dom";


export default function Landing(props) {
    return (
        <React.Fragment>
            <div className={styles.container} >
                <div className={styles.landing}>
                    <h1>Ready to discovery the most delicious recipes on earth?</h1>
                    <NavLink to={"/home"} >
                        <div className={styles.boton}>
                            <button>Here we go</button>
                        </div>
                    </NavLink>
                </div>
            </div>    
        </React.Fragment>
    )
}