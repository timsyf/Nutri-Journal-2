import { useState, useEffect } from 'react';

export default function AdminFoodDelete({ callFetch }) {

  const [formData, setFormData] = useState({ name: '' });
  const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [removeID, setRemoveID] = useState([]);
    
    const fetchSearch = async () => {
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
        fetchSearch();
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
          fetchSearch();
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
      const selectedOption = evt.target.options[evt.target.selectedIndex];
      const selectedId = selectedOption.getAttribute('name');
      setRemoveID(selectedId);
      console.log(selectedId);
      fetchSearch();
    }

    return (
        <>
          <div class="container">
            <br></br>
            <h1>Delete Food</h1>
            
            {loading ? ( <div>Loading...</div> ) : (<></>)}

            <div>
              <form autoComplete="off" onSubmit={handleDelete}>
                <select class="form-control btn-margin" name="id" onChange={handleDeleteChange} required>
                  <option>Select a food</option>
                {food.map((food) => (
                  <option key={food._id} name={food._id}>{food._id} - {food.name}</option>
                ))}
                </select>
                <button type="submit" class="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Submit</button>
              </form>
            </div>
          </div>
        </>
    );
  }