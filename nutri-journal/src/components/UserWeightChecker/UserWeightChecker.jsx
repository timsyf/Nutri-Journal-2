import { useState, useEffect } from 'react';

export default function UserWeightChecker(props) {

    const [loading, setLoading] = useState(false);
    const [weightData, setWeightData] = useState([]);
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [formDateState, setFormDateState] = useState({
        startDate: getCurrentTime(),
        endDate: getCurrentTime(),
      });

    const fetchDateByRange = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                userId: props.elements.user._id,
                startDate: formDateState.startDate, 
                endDate: formDateState.endDate,
            });
            const response = await fetch('/weight/log?' + query.toString());
            const data = await response.json();
            setWeightData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDateByRange();
    }, []);

    const handleSearchSubmit = (evt) => {
        evt.preventDefault();
        if (formDateState.endDate < formDateState.startDate) {
            alert("End date cannot be before start date.");
            return;
        }
        else
            fetchDateByRange();
    }

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setFormDateState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setFormDataChanged(true);
    };
    
    useEffect(() => {
        if (formDataChanged) {
          const debounceTimer = setTimeout(() => {
            fetchDateByRange();
          }, 500);
    
          return () => {
            clearTimeout(debounceTimer);
          };
        }
      }, [formDateState.startDate, formDateState.endDate]);

    function getCurrentTime() {
        const currentTime = new Date();
        const year = currentTime.getFullYear().toString();
        const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentTime.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const renderTable = () => {
        {console.log(weightData)}
        if (weightData == 0) {
          return <p>No weight data found.</p>;
        }
    
        return (
          <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Calories</th>
              </tr>
            </thead>
    
            <tbody>
              {weightData.map((w) => (
                <tr key={w._id}>
                  <td>{w.weight}</td>
                  <td>{w.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
        );
      };

    return (
        <>
        <h1>User Weight Checker</h1>
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
            <input type="date" name="startDate" value={formDateState.startDate} onChange={handleDateChange} />
            <input type="date" name="endDate" value={formDateState.endDate} onChange={handleDateChange} />
        </form>
        {loading ? <div>Loading...</div> : renderTable()}
        </>
    );
}