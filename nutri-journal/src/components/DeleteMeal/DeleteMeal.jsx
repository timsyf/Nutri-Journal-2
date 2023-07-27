import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default function UserCalorieCheckIn(props) {

    const [userFood, setUserFood] = useState({ name: '' });
    const [userMeal, setUserMeal] = useState([]);
    const [selectedDate, setSelectedDate] = useState(getCurrentTime());
    const [removeID, setRemoveID] = useState([]);

    const [foodId, setFoodId] = useState('');
    const { user } = props.elements;
    const [formData, setFormData] = useState({ name: '' });
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [formState, setFormState] = useState({
        userId: user,
        foodId: '',
        type: '',
        date: getCurrentTime(),
    });

    const remove = async () => {
      try {
        const response = await fetch(`/meal/${removeID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          console.log('Data deleted from the database');
        } else {
          console.error('Failed to delete data from the database:', response.status);
        }
        fetchSearchDatesAndUserFood();
        
        swal("Meal has been deleted!");
        console.log(response);
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

    const handleDeleteSubmit = (evt) => {
      evt.preventDefault();
      remove();
    }

    function getCurrentTime() {
      const currentTime = new Date();
      const year = currentTime.getFullYear().toString();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentTime.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const handleCopy = (evt) => {
        setRemoveID(evt.target.name);

        setFormState((prevState) => ({
            ...prevState,
            foodId: evt.target.name,
        }));
        console.log(formState);
      };

    const renderTable = () => {
        if (food.length === 0) {
          return <p>No food data found.</p>;
        }

        return (
        <>
            <form autoComplete="off" onSubmit={handleDeleteSubmit}>
            <div className="card">
            <div className="card-header"><h5>User Meal Data</h5></div>
            <div className="card-body">
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userMeal.map((um, index) => {
                  const userFoodArray = Object.values(userFood);
                  const matchedFood = userFoodArray.find((food) => food._id === um.foodId);
                  {console.log(matchedFood)}
                  if (matchedFood) {
                    return (
                      <tr key={index}>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            name={um._id}
                            onClick={handleCopy}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Copy to clipboard"
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <Link to={"/food/detail/" + um.foodId}>{matchedFood.name}</Link>
                        </td>
                        <td>{um.type}</td>
                        <td>{um.date.slice(0, 10)}</td>
                      </tr>
                    );
                  } else {
                    return null; // Return null if no matchedFood is found to avoid rendering anything
                  }
                })}
              </tbody>
            </table>
            </div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Delete</button>
            </form>
        </>
        );
    }

    return (
        <>
        <div className='container mt-4'>
            <h2>Delete Meal</h2>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="ID" name="id" value={removeID} readOnly required />
            </div>
            {loading ? <div>Loading...</div> : renderTable()}
            </div>
        </>
    )

}