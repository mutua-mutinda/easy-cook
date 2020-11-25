import React , {useEffect, useState, useRef } from "react";
import "./styles.css";


export default function App() {
  const [ingredients, updataIngredients] = useState([])
  const [loader, setLoader] = useState(false)
  const API_KEY = "2c45eb92d9e21958b2c15e48c4eff6a1";
  const API_ID = "c75e7d95";
  const inputRef = useRef(null)

  const userQuery = () =>  {
      recipeSearch(inputRef.current.value)
  }
  const recipeSearch = (search) => {
      setLoader(true)
    let url = `search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`;
    fetch(url, {mode: "no-cors"})
        .then(response => {
        return response.json();
      })
      .then(res => {
        //   console.log(res.hits)
          updataIngredients(res.hits)
      })
      .catch(err => {
        console.log(err);
    })
  }
  useEffect(() => {
    recipeSearch('beef')
  },[]);

  return (
    <>
    <div className = "App">
        <header className="appHeader">
        <div>
        <input ref={inputRef} placeholder="Search Recipe"/>
        <button className="btn"onClick={userQuery}>Search</button>
        </div>
        <div className="container">
            {ingredients.map(({recipe}, index) => {
                return (
                    <div key={index} className="recipe">
                        <legend> calories: {Math.floor(recipe.calories)}</legend>
                    <span>{recipe.label}</span>
                    <img src={recipe.image} alt="#"></img>
                    <div className="picks">
                        {recipe.ingredientLines.map((step, index) => {
                            return <p type="i">{step}</p>
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
