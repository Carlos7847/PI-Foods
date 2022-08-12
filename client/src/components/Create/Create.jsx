import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipes, postRecipe } from "../../redux/action";
import styles from "./Create.module.css";

export default function Create() {
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 1,
    steps: "",
    image: "",
    diets: [],
  });

    
  const [errors, setErrors] = useState({});
  const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getDiets());
    }, [dispatch]);

    const dietsGot = useSelector((dietsA) => dietsA.diets);
    const stringDiets = [...dietsGot.map((el)=>el.name)]
    

  const validate = (i) => {
    let errors = {};
    
    if (!i.title) {
      errors.title = "Title is required";
    } else if (!/^[^0-9()]+$/.test(i.title))
      errors.title = "Numbers are not allowed";
    else if (/[^\w\s\d!.,]/.test(i.title))
      errors.title = "Only , . and letters are allowed";

    if (!i.summary) errors.summary = "Summary is required";
    else if (!/^[\s\S]{20,200}$\b/.test(i.summary))
      errors.summary = "write a summary between 20 and 200 characters";
    else if (/[^\w\s\d!.,]/.test(i.summary))
      errors.summary = "Summary cannot have numbers";

    if (!i.steps) errors.steps = "steps is required";
    else if (!/^[\s\S]{20,200}$\b/.test(i.steps)) errors.steps = "entre 20 y 200";
    // else if (!/^[A-Z]+$/i.test(i.steps))
    //   errors.steps = "steps cannot have numbers";

    if (!i.healthScore) errors.healthScore = "healthScore is required";
    else if (!/\b([1-9]|[1-9][0-9]|100)\b/.test(parseInt(i.healthScore)))
      errors.healthScore = "healthScore has to be between 1 - 100";

    if (!i.image) errors.image = "image is required";
    else if (
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/gi.test(
        i.image
      )
    )
      errors.image = "Choose a valid format";

    // if (i.diets.length < 1) errors.diets = "A type of diet is required";
    // else if (!arra.includes(false)) {
    //   errors.diets = "Choose at least one";
    // }

    return errors;
  };
  // const validateCheck = (array) => {
  //      array.map(el=>el.)
  //  }
  const handleInputOnChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    
  };

  const errorsOnBlur = (e) => {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    
  };


  // const handleOnChangeCheckbox = (e) => { //  cpon checkboxz
  //     console.log(e);
  //     if (e.target.checked) setInput(prev => ({ ...prev, diets: [...input.diets, e.target.value] }))
  //     else setInput(prev => ({ ...prev, diets: input.diets.filter(diet => diet !== e.target.value) }))
  //     // if(!errors.diets){
  //         setErrors(validate({ ...input, diets: [...input.diets] }))
  //     // }
  // }

  const handlerSelectDiets = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
      console.log(input);
    }
  };

  const handlerDelete = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((el) => el !== e),
    });
  };

  useEffect(() => {
    dispatch(getDiets());
    // validate(input)
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // setErrors(validate(input))
      if (!input.diets.length) alert("complete your diets")
      console.log(!Object.keys(errors).length);
      
      if (!Object.keys(errors).length) {
        console.log(Object.keys(errors));
        dispatch(postRecipe(input));
        alert("created")
        
        history.push("/home");
        console.log(input);
        setInput({
        title: "",
        summary: "",
        healthScore: 1,
        steps: "",
        image: "",
        diets: [],
        });
        
    window.location.replace("");
      } else {
          console.log("consoleerror");
        alert("complete the form with valid inputs")
    }
    
    
    };
    

  return (
    <div>
      <div className={styles.fragmet}>
        <div className={styles.home}><Link to={"/home"}>Back to home</Link></div>
        
        <div className={styles.center}>
          
          <h1>You can share your recipe on this section</h1>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className={styles.field}>
              <label htmlFor="inTitle">Name:</label>
              <input
                autoFocus
                id="inTitle"
                type="text"
                name="title"
                value={input.title}
                onChange={(e) => handleInputOnChange(e)}
                onBlur={(e) => errorsOnBlur(e)}
              />
              <span>{errors.title}</span>
            </div>
            <div className={styles.field}>
              <label htmlFor="inSummary">Summary:</label>
              <input
                id="inSummary"
                type="text"
                name="summary"
                value={input.summary}
                onChange={(e) => handleInputOnChange(e)}
                onBlur={(e) => errorsOnBlur(e)}
              />
              <span>{errors.summary}</span>
            </div>
            <div className={styles.field}>
              <label htmlFor="inSteps">Step by step:</label>
              <input
                id="inSteps"
                type="text"
                name="steps"
                value={input.steps}
                onChange={(e) => handleInputOnChange(e)}
                onBlur={(e) => errorsOnBlur(e)}
              />
              <span>{errors.steps}</span>
            </div>
            <div className={styles.field}>
              <label htmlFor="inHealthScore">Health Score:</label>
              <input
                id="inHealthScore"
                type="range"
                min="1"
                max="100"
                name="healthScore"
                value={input.healthScore}
                onChange={(e) => handleInputOnChange(e)}
                onBlur={(e) => errorsOnBlur(e)}
              />
              <span>{input.healthScore}</span>
              <span>{errors.healthScore}</span>
            </div>
            <div className={styles.field}>
              <label htmlFor="inImage">Image:</label>
              <input
                id="inImage"
                type="text"
                name="image"
                value={input.image}
                onChange={(e) => handleInputOnChange(e)}
              />
              <span>{errors.image}</span>
            </div>
            {/* <div>
                    {dietsGot && dietsGot.map(diet => {
                        return <div key={diet.id}>
                            <input className={styles.check} id={diet.id} type="checkbox" name="diets" value={diet.name}  onChange={e => handleOnChangeCheckbox(e)} /> <span>{diet.name}</span>
                                </div>
                    })}
                </div> */}

            {/* <select onChange={e=>handleSelect(e)}>
                    {dietsGot && dietsGot.map(diet=>{
                        return <option key={diet.id} id={diet.id} value={diet.name} name="diets">{diet.name}</option>
                    })}
                </select> */}

            {/* <div>{input.diets.map((di, i) => <span key={i} value={di} >{di}<button value={di} onClick={e=>handleDelete(e)}>X</button></span>)}
                </div> */}

            <h2 className="name">Choose your diets</h2>
            <select onChange={(evento) => handlerSelectDiets(evento)}>
              
              {stringDiets.map((e,i) => {
              return (
                <option key={i} value={e}>
                  {" "}
                  {e}
                </option>
                      );
                  
            })} 
            </select>

            <div>
              <div>
                {input.diets.map((e,i) => {
                  return (
                    <div>
                      <p>
                        {e}
                        <button key={e} onClick={() => handlerDelete(e)}>
                          X
                        </button>
                      </p>
                    </div>
                  );
                })}{" "}
              </div>
            </div>

                <input type={"submit"}/>
              
          </form>
        </div>
      </div>
    </div>
  );
}
