import { useState } from 'react';

export default function UserCalorieCheckIn(props) {

    const { user } = props.elements;
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        userId: user,
        foodId: '',
        type: '',
        date: '',
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

    async function handleCheckin(evt) {
        evt.preventDefault();
        insert();
    }
    
    const handleCheckInChange = (evt) => {
        const { name, value } = evt.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(formState);
    };

    return (
        <>
            <h2>Hello, {user.name}!</h2>

            {loading ? ( <div>Loading...</div> ) : (<></>)}
            <h1>Check in</h1>
            <div>
                <form autoComplete="off" onSubmit={handleCheckin}>
                <input type="text" name="type" placeholder='Type' onChange={handleCheckInChange} required />
                <input type="text" name="foodId" placeholder='Food' onChange={handleCheckInChange} required />
                <input type="date" name="date" onChange={handleCheckInChange} required />
                <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
  }