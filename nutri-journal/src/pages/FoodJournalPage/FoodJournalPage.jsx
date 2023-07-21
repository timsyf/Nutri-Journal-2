import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FoodJournalWritePage from './FoodJournalWritePage';

export default function FoodJournalPage() {

  const [formData, setFormData] = useState({ name: '' });
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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

  const fetchSearchedEntries = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        name: formData.name,
      });
      const response = await fetch('/food/search?' + query.toString());
      const data = await response.json();
      setFood(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCopy = (evt) => {
    navigator.clipboard.writeText(evt.target.name);
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
            <th>ID</th>
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
              <td>
                <div class="tooltip">
                <button name={food._id} onClick={handleCopy} onmouseout="outFunc()">
                  <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                  Copy
                  </button>
                </div>
              </td>
              <td>{food.name}</td>
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
      <FoodJournalWritePage fetchAllEntries={fetchAllEntries} />
      <h1>Food Database</h1>
      <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
      <button type='submit' onClick={fetchSearchedEntries}>Submit</button>
      {loading ? <div>Loading...</div> : renderTable()}
    </div>
  );
};