import { useState } from 'react';
import { allNutrients } from '../../components/Data/Data';

export default function FoodJournalWritePage(props) {
  
    const { fetchAllEntries } = props;
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

    const [removeID, setRemoveID] = useState({});
    const [updateID, setUpdateID] = useState(false);
    const [updateData, setUpdateName] = useState(false);

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
          fetchAllEntries();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };

    const remove = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/food/${removeID}`, {
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
          setLoading(false);
          console.log(removeID);
          fetchAllEntries();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };

    const update = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/food/${updateID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: updateData })
        });
        if (response.ok) {
          console.log('Data updated in the database');
        } else {
          console.error('Failed to update data in the database:', response.status);
        }
        setLoading(false);
        fetchAllEntries();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    // INSERT
    async function handleInsert(evt) {
        evt.preventDefault();
        console.log(formState);
        insert();
    }
    
    const handleInsertChange = (evt) => {
      const { name, value } = evt.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    // DELETE
    async function handleDelete(evt) {
        evt.preventDefault();
        console.log(removeID);
        remove();
    }

    function handleDeleteChange(evt) {
      setRemoveID(evt.target.value);
    }
    
    // UPDATE
    async function handleUpdate(evt) {
      evt.preventDefault();
      update();
  }

  function handleUpdateChangeID(evt) {
      setUpdateID(evt.target.value);
  }

  function handleUpdateChangeName(evt) {
      setUpdateName(evt.target.value);
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
        <h1>Admin Create</h1>
        <div>
            <form autoComplete="off" onSubmit={handleInsert}>
            <input type="text" name="name" placeholder='Name' onChange={handleInsertChange} required />
            {allNutrients.map((nutrient) => (
              <>
                <input type='text' placeholder={capitalizeFirstLetter(nutrient)} name={nutrient} onChange={handleInsertChange}></input>
              </>
            ))}
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>

        <h1>Admin Delete</h1>
        <div>
            <form autoComplete="off" onSubmit={handleDelete}>
            <input type="text" name="id" placeholder='ID' onChange={handleDeleteChange} required />
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>

        <h1>Admin Update</h1>
        <div>
            <form autoComplete="off" onSubmit={handleUpdate}>
            <input type="text" name="id" placeholder='ID' onChange={handleUpdateChangeID} required />
            <input type="text" name="name" placeholder='Name' onChange={handleUpdateChangeName} required />
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>
    </>
  );
}