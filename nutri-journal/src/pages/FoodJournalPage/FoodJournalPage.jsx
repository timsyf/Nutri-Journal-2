import { useState, useEffect } from 'react';

export default function FoodJournalPage() {

  const [formData, setFormData] = useState({ id: '', name: '' });
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllEntries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/food');
        const data = await response.json();
        setFood(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchAllEntries();
  }, []);

  const fetchSearchedEntries = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        _id: formData.id,
        name: formData.name,
      });
  
      const response = await fetch('/food?' + query.toString());
      const data = await response.json();
      setFood(data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const renderTable = () => {
    if (food.length === 0) {
      return <p>No food items found.</p>;
    }

    return (
      <>
      <input type="text" placeholder="ID" name="id" value={formData.id} onChange={handleSearchChange} />
      <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
      <button type='submit' onClick={fetchSearchedEntries}>Submit</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
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
              <td>{food.macronutrients.carbohydrate} g</td>
              <td>{food.macronutrients.protein} g</td>
              <td>{food.macronutrients.fat} g</td>
              <td>{food.fats.transFat} g</td>
              <td>{food.fats.saturatedFat} g</td>
              <td>{food.fats.polyunsaturatedFat} g</td>
              <td>{food.fats.monounsaturatedFat} g</td>
              <td>{food.nutrients.cholesterol} mg</td>
              <td>{food.nutrients.sodium} mg</td>
              <td>{food.nutrients.potassium} mg</td>
              <td>{food.nutrients.fiber} g</td>
              <td>{food.nutrients.sugar} g</td>
              <td>{food.vitamins.vitaminA} IU</td>
              <td>{food.vitamins.vitaminC} mg</td>
              <td>{food.minerals.calcium} mg</td>
              <td>{food.minerals.iron} mg</td>
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
      {loading ? <div>Loading...</div> : renderTable()}
    </div>
  );
};