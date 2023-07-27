import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TotalCalories(props) {

    const { user } = props.elements;
    const [userFood, setUserFood] = useState({ name: '' });
    const [userMeal, setUserMeal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentTime());

    const fetchSearchDatesAndUserFood = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
        
        if (data.length === 0) {
          setUserFood([]);
          return;
        }
    
        setLoading(true);
        const userIdsString = data.map((user) => user.foodId).join(",");
        const foodResponse = await fetch(`/food/userfood?_ids=${userIdsString}`);
        const foodData = await foodResponse.json();
        setLoading(false);
        setUserFood(foodData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchSearchDatesAndUserFood();
    }, []);

    useEffect(() => {
        if (formDataChanged) {
            const debounceTimer = setTimeout(() => {
                fetchSearchDatesAndUserFood();
            }, 500);
        
            return () => {
                clearTimeout(debounceTimer);
            };
        }
    }, [selectedDate]);

    const handleSearchSubmit = (evt) => {
      evt.preventDefault();
    }

    const handlesetSelectedDateChange = (evt) => {
    if (evt.target.value) {
        setSelectedDate(new Date(evt.target.value).toISOString());
    } else {
        setSelectedDate('');
    }

    setFormDataChanged(true);
      console.log(selectedDate);
    }

    function getCurrentTime() {
      const currentTime = new Date();
      const year = currentTime.getFullYear().toString();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentTime.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const renderTable = () => {
      if (userMeal.length === 0) {
        return <p>No food data found.</p>;
      }
    
      // Calculate the total sum of calories
      const totalCalories = userFood.reduce((sum, um) => sum + um.calorie, 0);
      const totalProtein = userFood.reduce((sum, um) => sum + um.protein, 0);
      const totalCarbohydrates = userFood.reduce((sum, um) => sum + um.carbohydrate, 0);
    
      return (
        <div className="card">
          <div className="card-header">
            <h5>Food Data</h5>
          </div>
          <div className="card-body">
            <div className="table-container" style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {userFood.map((um) => {
                    return (
                      <tr>
                        <td>{um.name}</td>
                        <td>{um.calorie} kcal</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>Total Calories Consumed: {totalCalories} kcal</div>
            <div>Total Protein Consumed: {totalProtein} kcal</div>
            <div>Total Carbohydrates Consumed: {totalCarbohydrates} kcal</div>
          </div>
        </div>
      );
    };
    
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>Calories Checker</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form className="mb-3" autoComplete="off" onSubmit={handleSearchSubmit}>
              <input
                type="date"
                className="form-control"
                value={selectedDate.slice(0, 10)}
                onChange={handlesetSelectedDateChange}
              />
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {loading ? <div>Loading...</div> : renderTable()}
          </div>
        </div>
      </div>
    );
}