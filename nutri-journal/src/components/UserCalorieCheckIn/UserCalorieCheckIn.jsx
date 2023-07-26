import { useState, useEffect } from 'react';

export default function UserCalorieCheckIn(props) {

    const { user } = props.elements;
    const [formData, setFormData] = useState({ name: '' });
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foodId, setFoodId] = useState('');
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [formState, setFormState] = useState({
        userId: user,
        foodId: '',
        type: '',
        date: getCurrentTime(),
    });

    const insert = async () => {
        try {
          setLoading(true);
          const response = await fetch('/meal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('Data stored in the database:', data);
          } else {
            console.error('Failed to store data in the database:', response.status);
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };

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

    const handleCopy = (evt) => {
        setFoodId(evt.target.name);

        setFormState((prevState) => ({
            ...prevState,
            foodId: evt.target.name,
        }));

        console.log(formState);

      };

    const handleSearchSubmit = (evt) => {
        evt.preventDefault();
        fetchSearch();
      }

    async function handleCheckin(evt) {
        evt.preventDefault();
        insert();
    }

    const handleSearchChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
        setFormDataChanged(true);
      };

    const handleCheckInChange = (evt) => {
        const { name, value } = evt.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(formState);
    };

    function getCurrentTime() {
      const currentTime = new Date();
      const year = currentTime.getFullYear().toString();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentTime.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
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
                <th>ID</th>
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
                  <td>
                    <div className="tooltip">
                        <button name={food._id} onClick={handleCopy}><span className="tooltiptext" id="myTooltip">Add to Meal</span>+</button>
                    </div>
                  </td>
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
        <>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
            <h1>Check in</h1>
            <div>
                <form autoComplete="off" onSubmit={handleCheckin}>
                <select id="dropdown" name='type' onChange={handleCheckInChange} required >
                    <option value="">Select a type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Supper">Supper</option>
                </select>

                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select a type
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item">Breakfast</a>
                    <a class="dropdown-item">Lunch</a>
                    <a class="dropdown-item">Dinner</a>
                    <a class="dropdown-item">Supper</a>
                  </div>
                </div>






                <input type="text" name="foodId" placeholder='Food' value={foodId} readOnly required />
                <input type="date" name="date" value={formState.date} onChange={handleCheckInChange} required />
                <button type="submit">Submit</button>
                </form>
            </div>

            <h1>Food Database</h1>
            <form autoComplete="off" onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
            </form>
            {loading ? <div>Loading...</div> : renderTable()}
        </>
    );
  }