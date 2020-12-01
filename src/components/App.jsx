import React , {useEffect, useState, useRef } from "react";
import "./styles.css";


export default function App() {
  const [ingredients, updataIngredients] = useState([])
  const [loader, setLoader] = useState(false)
  const API_KEY = "2c45eb92d9e21958b2c15e48c4eff6a1";
  const API_ID = "c75e7d95";
  const inputRef = useRef(null)

  const userQuery = () =>  {
      recipeSearch(inputRef.current.value);
      inputRef.current.value = '';
  }
 
  const recipeSearch = (search) => {
    if(search === null) {
      return;
    }
    setLoader(true)
    let url = `search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`;
    fetch(url, {mode: "no-cors"})
        .then(response => {
        return response.json();
      })
      .then(res => {
          updataIngredients(res.hits);
        setLoader(false);

      })
      .catch(err => {
        console.log(err) ;
        setLoader(false);
    })
  }
  useEffect(() => {
    recipeSearch('beef')
  },[]);

  return (
    <>
    <div className = "App">
        <header className="appHeader">
        <div className="btn">
        <input ref={inputRef} placeholder="Search Recipe"/>
        <button onClick={userQuery}>Search</button>
        </div>
         {loader && <span>wait....</span>}
        <div className="container">
            {ingredients.map(({recipe}) => {
                return (
                    <div key={recipe.label} className="recipe">
                        <legend> calories: {Math.floor(recipe.calories)}</legend>
                    <span>{recipe.label}</span>
                    <img src={recipe.image} alt="#"></img>
                    <div className="picks">
                        {recipe.ingredientLines.map((step, index) => {
                            return <p key={index}>{step}</p>
                        })}
                    </div>
                    </div>
                )
            })}
        </div>
        </header>
        </div>
        </>
  );
}
