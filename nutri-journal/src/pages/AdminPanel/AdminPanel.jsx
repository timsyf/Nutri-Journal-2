import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminFoodCreate from '../../components/AdminFoodCreate/AdminFoodCreate';
import AdminFoodDelete from '../../components/AdminFoodDelete/AdminFoodDelete';
import AdminFoodUpdate from '../../components/AdminFoodUpdate/AdminFoodUpdate';

export default function AdminPanel() {
  
    const [formData, setFormData] = useState({ name: '' });
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);

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

    useEffect(() => {
        if (formDataChanged) {
          const debounceTimer = setTimeout(() => {
            fetchSearch();
          }, 500);
    
          return () => {
            clearTimeout(debounceTimer);
          };
        }
      }, [formData]);
    
    const handleSearchChange = (evt) => {
      const { name, value } = evt.target;
      setFormData({ ...formData, [name]: value });
      setFormDataChanged(true);
    };

    const handleCopy = (evt) => {
      navigator.clipboard.writeText(evt.target.name);
    };

    const handleSearchSubmit = (evt) => {
      evt.preventDefault();
      fetchSearch();
    }

    const renderTable = () => {
      if (food.length === 0) {
        return <p>No food items found.</p>;
      }
    
      return (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Food Database</h5>
          </div>
          <div className="card-body">
            <div style={{ overflowY: "auto", maxHeight: "400px" }}>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Carbohydrate</th>
                    <th>Protein</th>
                  </tr>
                </thead>
                <tbody>
                  {food.map((food) => (
                    <tr key={food._id}>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          name={food._id}
                          onClick={handleCopy}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Copy to clipboard"
                        >
                          Copy
                        </button>
                      </td>
                      <td>
                        <Link to={"/food/detail/" + food._id}>{food.name}</Link>
                      </td>
                      <td>{food.calorie} kcal</td>
                      <td>{food.carbohydrate} g</td>
                      <td>{food.protein} g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };

  return (
    <>
      <AdminFoodCreate callFetch={fetchSearch} />
      <AdminFoodDelete callFetch={fetchSearch} />
      <AdminFoodUpdate callFetch={fetchSearch} />
      <div className='container'>
        <br></br>
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
          <input type="text" className='form-control btn-margin' placeholder="Name" name="name" value={formData.name} onChange={handleSearchChange} />
        </form>
        {loading ? <div>Loading...</div> : renderTable()}
      </div>
    </>
  );
}