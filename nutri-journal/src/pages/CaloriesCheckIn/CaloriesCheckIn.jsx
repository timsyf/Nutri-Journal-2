import { useState } from 'react';
import { allNutrients } from '../../components/Data/Data';

export default function CaloriesCheckIn() {

    const [loading, setLoading] = useState(false);

    const [formState, setFormState] = useState({
        name: '',
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

  return (
    <>
        <h1>Food Journal Write Page</h1>
        <div>
            <form autoComplete="off" onSubmit={handleInsert}>
            <input type="text" name="name" placeholder='Name' onChange={handleInsertChange} required />
            <br></br>
            {allNutrients.map((nutrient) => (
              <>
                <input type='text' placeholder={nutrient} name={nutrient} onChange={handleInsertChange}></input>
                <br></br>
              </>
            ))}
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>

        <h1>Delete</h1>
        <div>
            <form autoComplete="off" onSubmit={handleDelete}>
            <input type="text" name="id" placeholder='ID' onChange={handleDeleteChange} required />
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>

        <h1>Update</h1>
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