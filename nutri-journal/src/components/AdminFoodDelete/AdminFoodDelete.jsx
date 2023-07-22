import { useState } from 'react';

export default function AdminFoodDelete({ callFetch }) {

    const [loading, setLoading] = useState(false);
    const [removeID, setRemoveID] = useState([]);
    
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
          callFetch();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };

    async function handleDelete(evt) {
        evt.preventDefault();
        remove();
    }

    function handleDeleteChange(evt) {
      setRemoveID(evt.target.value);
    }

    return (
        <>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
            <h1>Delete</h1>
            <div>
                <form autoComplete="off" onSubmit={handleDelete}>
                <input type="text" name="id" placeholder='ID' onChange={handleDeleteChange} required />
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
  }