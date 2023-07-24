import { useState } from 'react';
import { allNutrients } from '../../components/Data/Data';

export default function AdminFoodCreate({ callFetch }) {

    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        carbohydrate: 0,
        protein: 0,
        fat: 0,
        trans_Fat: 0,
        saturated_Fat: 0,
        polyunsaturated_Fat: 0,
        monounsaturated_Fat: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        fiber: 0,
        sugar: 0,
        vitamin_A: 0,
        vitamin_C: 0,
        calcium: 0,
        iron: 0,
      });
    
      const insert = async () => {
        try {
          setLoading(true);
          const response = await fetch('/food', {
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
          callFetch();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };
    
    async function handleInsert(evt) {
        evt.preventDefault();
        insert();
    }
    
    const handleInsertChange = (evt) => {
        const { name, value } = evt.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    function capitalizeFirstLetter(str) {
      return (str.charAt(0).toUpperCase() + str.slice(1)).replace("_", " ");
    }

    return (
        <>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
            <h1>Create</h1>
            <div>
                <form autoComplete="off" onSubmit={handleInsert}>
                <input type="text" name="name" placeholder='Name' onChange={handleInsertChange} required />
                {allNutrients.map((nutrient) => (
                <input type='text' placeholder={capitalizeFirstLetter(nutrient)} name={nutrient} onChange={handleInsertChange}></input>
                ))}
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
  }