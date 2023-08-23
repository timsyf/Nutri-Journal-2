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
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Calorie:</strong> {food.calorie} kcal
          </li>
          <li className="list-group-item">
            <strong>Carbohydrate:</strong> {food.carbohydrate} g
          </li>
          <li className="list-group-item">
            <strong>Protein:</strong> {food.protein} g
          </li>
          <li className="list-group-item">
            <strong>Fat:</strong> {food.fat} g
          </li>
          <li className="list-group-item">
            <strong>Trans Fat:</strong> {food.trans_Fat} g
          </li>
          <li className="list-group-item">
            <strong>Saturated Fat:</strong> {food.saturated_Fat} g
          </li>
          <li className="list-group-item">
            <strong>Polyunsaturated Fat:</strong> {food.polyunsaturated_Fat} g
          </li>
          <li className="list-group-item">
            <strong>Monounsaturated Fat:</strong> {food.monounsaturated_Fat} g
          </li>
          <li className="list-group-item">
            <strong>Cholesterol:</strong> {food.cholesterol} mg
          </li>
          <li className="list-group-item">
            <strong>Sodium:</strong> {food.sodium} mg
          </li>
          <li className="list-group-item">
            <strong>Potassium:</strong> {food.potassium} mg
          </li>
          <li className="list-group-item">
            <strong>Fiber:</strong> {food.fiber} g
          </li>
          <li className="list-group-item">
            <strong>Sugar:</strong> {food.sugar} g
          </li>
          <li className="list-group-item">
            <strong>Vitamin A:</strong> {food.vitamin_A} IU
          </li>
          <li className="list-group-item">
            <strong>Vitamin C:</strong> {food.vitamin_C} mg
          </li>
          <li className="list-group-item">
            <strong>Calcium:</strong> {food.calcium} mg
          </li>
          <li className="list-group-item">
            <strong>Iron:</strong> {food.iron} mg
          </li>
        </ul>
      );
    };
  
    return (
      <div className="container mt-4">
        <h2>{food.name}</h2>
        {loading ? <div className="overlay"><div className="spinner"></div></div> : renderTable()}
      </div>
    );
  }