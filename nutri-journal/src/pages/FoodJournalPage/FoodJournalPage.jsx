import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FoodJournalPage() {

  const [formData, setFormData] = useState({ id: '', name: '' });
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const _id = searchParams.get('_id');
  const name = searchParams.get('name');


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
      const response = await fetch('/food/search?' + query.toString());
      const data = await response.json();
      setFood(data);
      console.log(data);
      setLoading(false);
      navigate('/food?' + query.toString());
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

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
              <td>{food.carbohydrate} g</td>
              <td>{food.protein} g</td>
              <td>{food.fat} g</td>
              <td>{food.transFat} g</td>
              <td>{food.saturatedFat} g</td>
              <td>{food.polyunsaturatedFat} g</td>
              <td>{food.monounsaturatedFat} g</td>
              <td>{food.cholesterol} mg</td>
              <td>{food.sodium} mg</td>
              <td>{food.potassium} mg</td>
              <td>{food.fiber} g</td>
              <td>{food.sugar} g</td>
              <td>{food.vitaminA} IU</td>
              <td>{food.vitaminC} mg</td>
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
      <input type="text" placeholder="ID" name="id" value={formData.id} onChange={handleSearchChange} />
      <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
      <button type='submit' onClick={fetchSearchedEntries}>Submit</button>
      {loading ? <div>Loading...</div> : renderTable()}
    </div>
  );
};