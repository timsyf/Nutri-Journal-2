import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FoodDatabase() {
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
    setFormData({ ...formData, [name]: value });
    setFormDataChanged(true);
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
  };

  const renderTable = () => {
    if (food.length === 0) {
      return <p>No food items found.</p>;
    }

    return (
      <div className="card">
        <div className="card-body">
          <div style={{ overflow: "auto", maxHeight: "400px" }}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Calories</th>
                  <th>Carbohydrate</th>
                  <th>Protein</th>
                </tr>
              </thead>
              <tbody>
                {food
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((food) => (
                    <tr key={food._id}>
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
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <form
            className="mb-3"
            autoComplete="off"
            onSubmit={handleSearchSubmit}
          >
            <small id="passwordHelpBlock" className="form-text text-muted">
              Please key in the food you're searching for
            </small>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {loading ? <div>Loading...</div> : renderTable()}
        </div>
      </div>
    </div>
  );
}
