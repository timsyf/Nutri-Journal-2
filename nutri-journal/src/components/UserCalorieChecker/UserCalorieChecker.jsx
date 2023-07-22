import { useState, useEffect } from 'react';

export default function UserCalorieChecker(props) {

    const { user } = props.elements;
    const [userMeal, setUserMeal] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                setLoading(true);
                const query = new URLSearchParams({
                    userId: user._id,
                });
        
                const response = await fetch('/meal/search?' + query.toString());
                const data = await response.json();
                setUserMeal(data);
                const foodIds = data.map((item) => item.foodId);
                setLoading(false);
        
                console.log(data);
                console.log(foodIds);
        
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchSearch();
      }, []);

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
          console.log(data);
          setUserMeal(data);
          const foodIds = data.map((item) => item.foodId);
          setLoading(false);
      
          console.log(data);
          console.log(foodIds);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      const handleSearchSubmit = (evt) => {
        evt.preventDefault();
        fetchSearchDates();
      }

      const handlesetSelectedDateChange = (evt) => {
        if (evt.target.value) {
            setSelectedDate(new Date(evt.target.value).toISOString());
        } else {
            setSelectedDate('');
        }

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
              {userMeal.map((um) => (
                <tr key={um._id}>
                  <td>{um.foodId}</td>
                  <td>{um.type}</td>
                  <td>{um.date.slice(0, 10)}</td>
                </tr>
              ))}
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
            <button type='submit'>Submit</button>
          </form>
          {loading ? <div>Loading...</div> : renderTable()}
        </div>
      );
}