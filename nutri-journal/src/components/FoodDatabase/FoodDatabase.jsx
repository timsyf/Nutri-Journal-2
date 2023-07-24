import { useState, useEffect } from 'react';

export default function FoodDatabase() {
    const [formData, setFormData] = useState({ name: '' });
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);
  
    const fetchSearch = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          name: formData.name,
        });
        const response = await fetch('/food/search?' + query.toString());
        const data = await response.json();
        setFood(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    useEffect(() => {
        fetchSearch();
    }, []);

    useEffect(() => {
        if (formDataChanged) {
          const debounceTimer = setTimeout(() => {
            fetchSearch();
          }, 500);
    
          return () => {
            clearTimeout(debounceTimer);
          };
        }
      }, [formData]);
  
    const handleSearchChange = (evt) => {
      const { name, value } = evt.target;
      setFormData({ ...formData, [name]: value });
      setFormDataChanged(true);
    };
  
    const handleSearchSubmit = (evt) => {
      evt.preventDefault();
    }

    const renderTable = () => {
      if (food.length === 0) {
        return <p>No food items found.</p>;
      }
  
      return (
        <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Calories</th>
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
            {food.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.calorie} kcal</td>
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
            ))}
          </tbody>
        </table>
        </>
      );
    };
  
    return (
      <div>
        <h1>Food Database</h1>
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
        </form>
        {loading ? <div>Loading...</div> : renderTable()}
      </div>
    );
  }