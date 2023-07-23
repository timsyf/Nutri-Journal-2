import { useState, useEffect } from 'react';

export default function UserCalorieChecker(props) {

    const { user } = props.elements;
    const [userFood, setUserFood] = useState({ name: '' });
    const [userMeal, setUserMeal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const fetchSearchDates = async () => {
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
          fetchUserFood(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchSearchDates();
    }, []);

    useEffect(() => {
        if (formDataChanged) {
            const debounceTimer = setTimeout(() => {
                fetchSearchDates();
            }, 500);
        
            return () => {
                clearTimeout(debounceTimer);
            };
        }
    }, [selectedDate]);

    const fetchUserFood = async (userfood) => {
        try {
        setLoading(true);
        const userIdsString = userfood.map((user) => user.foodId).join(",");
        const response = await fetch(`/food/userfood?_ids=${userIdsString}`);
        const data = await response.json();
        setLoading(false);
        setUserFood(data);
        console.log(data);
        } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        }
    };

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

    const renderTable = () => {
        if (userMeal.length === 0) {
            return <p>No food items found.</p>;
        }

        return (
            <>
            <table>
            <thead>
                <tr>
                <th>Food ID</th>
                <th>Type</th>
                <th>Date</th>
                </tr>
            </thead>

            <tbody>
                {userMeal.map((um, index) => (
                    <tr key={um._id}>
                        <td>{userFood[index].name}</td>
                        <td>{um.type}</td>
                        <td>{um.date.slice(0, 10)}</td>
                    </tr>
                ))
            }
            </tbody>
            </table>
            </>
        );
    };
    
    return (
    <div>
        <h1>Summary</h1>                                                                                 
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
        <input type="date" value={selectedDate.slice(0, 10)} onChange={handlesetSelectedDateChange} />
        </form>
        {loading ? <div>Loading...</div> : renderTable()}
    </div>
    );
}