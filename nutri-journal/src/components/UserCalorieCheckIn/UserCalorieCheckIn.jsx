import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default function UserCalorieCheckIn(props) {

    const [userFood, setUserFood] = useState({ name: '' });
    const [userMeal, setUserMeal] = useState([]);
    const [selectedDate, setSelectedDate] = useState(getCurrentTime());

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
            swal("Meal has been added!");
          } else {
            console.error('Failed to store data in the database:', response.status);
          }
        } catch (error) {
          console.error(error);
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

    const fetchSearchDatesAndUserFood = async () => {
      try {
        let query;
        if (selectedDate === '') {
          query = new URLSearchParams({
            userId: user._id,
          });
        } else {
          query = new URLSearchParams({
            userId: user._id,
            date: selectedDate,
          });
        }
    
        const response = await fetch('/meal/search/dates?' + query.toString());
        const data = await response.json();
        setUserMeal(data);
        
        if (data.length === 0) {
          setUserFood([]);
          return;
        }
    
        const userIdsString = data.map((user) => user.foodId).join(",");
        const foodResponse = await fetch(`/food/userfood?_ids=${userIdsString}`);
        const foodData = await foodResponse.json();
        setUserFood(foodData);
        console.log(foodData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchSearchDatesAndUserFood();
    }, []);

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
        return <p>No food data found.</p>;
      }
    
      return (
        <div className="card">
          <div className="card-header">
            <h5>Food Information</h5>
          </div>
          <div className="card-body">
            <div className="table-wrapper" style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Carbohydrate</th>
                    <th>Protein</th>
                  </tr>
                </thead>
                <tbody>
                  {food.map((foodItem) => (
                    <tr key={foodItem._id}>
                      <td>
                        <button type="button" className="btn btn-primary" name={foodItem._id} onClick={handleCopy} data-bs-toggle="tooltip" data-bs-placement="top" title="Copy to clipboard">
                          +
                        </button>
                      </td>
                      <td>
                        <Link to={"/food/detail/" + foodItem._id}>{foodItem.name}</Link>
                      </td>
                      <td>{foodItem.calorie} kcal</td>
                      <td>{foodItem.carbohydrate} g</td>
                      <td>{foodItem.protein} g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
      <div className="container mt-4">
        <h2>Add Meal</h2>
        <div>
          <form autoComplete="off" onSubmit={handleCheckin}>
            <div className="mb-3">
              <select className="form-select" id="dropdown" name='type' onChange={handleCheckInChange} required>
                <option value="">Select a type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Supper">Supper</option>
              </select>
            </div>
  
            <div className="dropdown mb-3">
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item">Breakfast</a>
                <a className="dropdown-item">Lunch</a>
                <a className="dropdown-item">Dinner</a>
                <a className="dropdown-item">Supper</a>
              </div>
            </div>
  
            <div className="mb-3">
              <input type="text" className="form-control" name="foodId" placeholder='Food ID' value={foodId} readOnly required />
            </div>
  
            <div className="mb-3">
              <input type="date" className="form-control" name="date" value={formState.date} onChange={handleCheckInChange} required />
            </div>
  
            <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Add</button>
          </form>
        </div>

        <form autoComplete="off" onSubmit={handleSearchSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
          </div>
        </form>
  
        {loading ? <div>Loading...</div> : renderTable()}
        </div>
      </>
    );
  }