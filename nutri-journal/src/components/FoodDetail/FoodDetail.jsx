import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function FoodDetail() {
    const { id } = useParams();
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOneFood = async () => {
            try {
                setLoading(true);
                const response = await fetch('/food/detail/' + encodeURIComponent(id));
                const data = await response.json();
                setFood(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchOneFood();
    }, [id]);

    const renderTable = () => {
      if (food.length === 0) {
        return <p>No food item found.</p>;
      }
  
      return (
        <>
        <table>
          <thead>
            <tr>
              <th>Carbohydrate</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Trans Fat</th>
              <th>Saturated Fat</th>
              <th>Polyunsaturated Fat</th>
              <th>Monounsaturated Fat</th>
              <th>Cholesterol</th>
              <th>Sodium</th>
              <th>Potassium</th>
              <th>Fiber</th>
              <th>Sugar</th>
              <th>Vitamin A</th>
              <th>Vitamin C</th>
              <th>Calcium</th>
              <th>Iron</th>
            </tr>
          </thead>
  
          <tbody>
              <tr key={food._id}>
                <td>{food.carbohydrate} g</td>
                <td>{food.protein} g</td>
                <td>{food.fat} g</td>
                <td>{food.trans_Fat} g</td>
                <td>{food.saturated_Fat} g</td>
                <td>{food.polyunsaturated_Fat} g</td>
                <td>{food.monounsaturated_Fat} g</td>
                <td>{food.cholesterol} mg</td>
                <td>{food.sodium} mg</td>
                <td>{food.potassium} mg</td>
                <td>{food.fiber} g</td>
                <td>{food.sugar} g</td>
                <td>{food.vitamin_A} IU</td>
                <td>{food.vitamin_C} mg</td>
                <td>{food.calcium} mg</td>
                <td>{food.iron} mg</td>
              </tr>
          </tbody>
        </table>
        </>
      );
    };
  
    return (
      <div>
        <h1>{food.name}</h1>
        {loading ? <div>Loading...</div> : renderTable()}
      </div>
    );
  }