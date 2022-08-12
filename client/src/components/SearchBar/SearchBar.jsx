import React, { useState } from "react";
import { getByName } from "../../redux/action"
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.css"

export default function SearchBar({setCurrentPage}) {
    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        setInput(e.target.value)
        console.log(e.target.value);
    }

    const handleOnSubmit = (e) => {
        dispatch(getByName(input))
        setCurrentPage(1)
        setInput("")
    }
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className={styles.container} >
                    <input className={styles.input} value={input} type="text" placeholder="Search" onChange={(e)=>handleOnChange(e) } />
                    <button className={styles.button} type="submit" onClick={e => handleOnSubmit(e)} >Search</button>
                </div>
            </div>
        </React.Fragment>
    )
}