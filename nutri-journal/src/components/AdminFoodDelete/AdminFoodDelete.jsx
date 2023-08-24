import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function AdminFoodDelete({ adminUpdate, setAdminUpdate }) {
  const [formData, setFormData] = useState({ name: "" });
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);

  const fetchSearch = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        name: formData.name,
      });
      const response = await fetch("/food/search?" + query.toString());
      const data = await response.json();
      setFood(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    
    const regex = /[^a-zA-Z0-9\s]/g;
    
    const sanitizedValue = value.replace(regex, '');
  
    setFormData({ ...formData, [name]: sanitizedValue });
    setFormDataChanged(true);
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    fetchSearch();
  };

  const fetchSearchDelete = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        name: formData.name,
      });
      const response = await fetch("/food/search?" + query.toString());
      const data = await response.json();
      setFood(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setAdminUpdate(true);
        console.log("Data deleted from the database");
      } else {
        swal("Something went wrong! the food hasn't been deleted");
        console.error(
          "Failed to delete data from the database:",
          response.status
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    fetchSearchDelete();
    setAdminUpdate(false);
  }, [adminUpdate]);

  async function handleDelete(evt) {
    evt.preventDefault();
    remove(evt.target.name);
  }

  const renderTable = () => {
    if (food.length === 0) {
      return <p>No food items found.</p>;
    }

    return (
      <div className="card">
        <div className="card-body">
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Calories</th>
                  <th>Carbohydrate</th>
                  <th>Protein</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {food
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((food) => (
                    <tr key={food._id}>
                      <td>
                        <Link to={"/food/detail/" + food._id}>{food.name}</Link>
                      </td>
                      <td>{food.calorie} kcal</td>
                      <td>{food.carbohydrate} g</td>
                      <td>{food.protein} g</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          name={food._id}
                          onClick={handleDelete}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Copy to clipboard"
                        >
                          Delete
                        </button>
                      </td>
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
      <div className="container mt-4">
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
          <small id="passwordHelpBlock" className="form-text text-muted">
            Please search for a food to delete
          </small>
          <input
            type="text"
            className="form-control btn-margin"
            placeholder="Search"
            name="name"
            value={formData.name}
            onChange={handleSearchChange}
          />
        </form>
        {loading ? (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        ) : (
          renderTable()
        )}
      </div>
    </>
  );
}
