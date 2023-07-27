import { useState, useEffect } from 'react';

export default function AdminFoodDelete({ callFetch }) {

  const [formData, setFormData] = useState({ name: '' });
  const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removeID, setRemoveID] = useState([]);
    
    const fetchSearchDelete = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          name: formData.name,
        });
        const response = await fetch('/food/search?' + query.toString());
        const data = await response.json();
        setFood(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchSearchDelete();
    }, []);

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
          fetchSearchDelete();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };

    async function handleDelete(evt) {
        evt.preventDefault();
        remove();
        fetchSearchDelete();
    }

    function handleDeleteChange(evt) {
      const selectedId = evt.target.value;
      setRemoveID(selectedId);
      fetchSearchDelete();
    }

    return (
        <>
          <div className="container">
            <br></br>
            <h2>Delete Food</h2>
            <div>
              <form autoComplete="off" onSubmit={handleDelete}>
                <input type="text" className="form-control btn-margin" placeholder='ID' onChange={handleDeleteChange} required></input>
                <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Submit</button>
              </form>
            </div>
          </div>
        </>
    );
  }