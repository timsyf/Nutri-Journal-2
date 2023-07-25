import { useState } from 'react';

export default function WeightLog(props) {

    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
      userId: props.elements.user._id,
      weight: 0,
      date: getCurrentTime(),
    });

    const create = async () => {
      try {
        setLoading(true);
    
        const query = new URLSearchParams({
          date: formState.date,
        });
        const dateExistsResponse = await fetch('/weight/log/date?' + query.toString());
    
        if (dateExistsResponse.ok) {
          const data = await dateExistsResponse.json(); // Ensure the response has a JSON body
    
          if (data.exists) {
            console.log('Data with the same date already exists in the database. You may choose to update or handle this case.');
            setLoading(false);
            return;
          }
    
          const response = await fetch('/weight/log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
          });
    
          if (response.ok) {
            const newData = await response.json();
            console.log('Data stored in the database:', newData);
          } else {
            console.error('Failed to store data in the database:', response.status);
          }
        } else {
          console.error('Failed to check if the date exists in the database:', dateExistsResponse.status);
        }
    
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setFormState((prevState) => ({
          ...prevState,
          [name]: value,
      }));
      console.log(formState);
    };

    const handleSearchSubmit = (evt) => {
      evt.preventDefault();
      create();
    }

    function getCurrentTime() {
      const currentTime = new Date();
      const year = currentTime.getFullYear().toString();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentTime.getDate().toString().padStart(2, '0');
      return `${day}-${month}-${year}`;
    }

    return (
      <>
        <h1>Weight Log</h1>
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
          <input type="date" name='date' onChange={handleChange} />
                <input type="text" placeholder="Weight" name="weight" value={formState.weight} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }