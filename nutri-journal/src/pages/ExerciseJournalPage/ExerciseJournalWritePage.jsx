import { useState } from 'react';

export default function ExerciseJournalWritePage() {

    const [exercise, setExercise] = useState({});
    const [removeByID, setremoveByID] = useState({});
    const [loading, setLoading] = useState(false);

    const [updateID, setUpdateID] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const insert = async () => {
        try {
          setLoading(true);
          const response = await fetch('/exercise', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
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
          const response = await fetch(`/exercise/${removeByID}`, {
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
        const response = await fetch(`/exercise/${updateID}`, {
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

    function handleChange(evt) {
        setExercise({ ...exercise, [evt.target.name]: evt.target.value });
    }

    function handleChange2(evt) {
        setremoveByID(evt.target.value);
    }

    function handleChange3(evt) {
        setUpdateID(evt.target.value);
    }

    function handleChange4(evt) {
        setUpdateData(evt.target.value);
    }

    async function handleInsert(evt) {
        evt.preventDefault();
        console.log(exercise);
        insert();
    }

    async function handleDelete(evt) {
        evt.preventDefault();
        console.log(removeByID);
        remove();
    }
    
    async function handleUpdate(evt) {
      evt.preventDefault();
      update();
  }

    return (
    <>
        <h1>Exercise Journal Write Page</h1>
        <div>
            <form autoComplete="off" onSubmit={handleInsert}>
            <label>ID</label>
            <input type="text" name="id" onChange={handleChange} required />
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} required />
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>

        <h1>Delete</h1>
        <div>
            <form autoComplete="off" onSubmit={handleDelete}>
            <label>ID</label>
            <input type="text" name="id" onChange={handleChange2} required />
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>

        <h1>Update</h1>
        <div>
            <form autoComplete="off" onSubmit={handleUpdate}>
            <label>ID</label>
            <input type="text" name="id" onChange={handleChange3} required />
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange4} required />
            <button type="submit">Submit</button>
            </form>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
        </div>
    </>
  );
}