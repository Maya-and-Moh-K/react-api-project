import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMealByName } from "../api/meals";

const SearchByName = () => {
  const [query, setQuery] = useState(""); // store search, meals, and errors
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchedMeals = await fetchMealByName(query);

      if (searchedMeals.length === 0) {
        setError("No results found");
        setMeals([]);
      } else if (searchedMeals.length > 0) {
        setMeals(searchedMeals);
        setError(null);
      }
      // history.push(`/meals?search=${query}`);
    } catch (error) {
      setError("No results found.");
      setMeals([]);
    }
  }; // submit handler function in which i take the meals
  return (
    <div>
      <h2>Search by Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter meal name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}

      {meals.length > 0 && (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              {meal.strMeal}
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              {meal.strInstructions}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchByName;
