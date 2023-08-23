import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function UserCalorieCheckIn({ elements, updated, setUpdated }) {
  const [userFood, setUserFood] = useState({ name: "" });
  const [userMeal, setUserMeal] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentTime());

  const { user } = elements;
  const [formData, setFormData] = useState({ name: "" });
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);

  const remove = async (foodId) => {
    try {
      setLoading(true);
      const response = await fetch(`/meal/${foodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Data deleted from the database");
      } else {
        console.error(
          "Failed to delete data from the database:",
          response.status
        );
      }
      fetchSearchDatesAndUserFood();
      console.log(response);
      swal("Meal has been deleted!");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  /*const fetchSearch = async () => {
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
  }, []);*/

  useEffect(() => {
    //fetchSearch();
    fetchSearchDatesAndUserFood();
    setUpdated(false);
  }, [updated]);

  const fetchSearchDatesAndUserFood = async () => {
    try {
      setLoading(true);
      let query;
      if (selectedDate === "") {
        query = new URLSearchParams({
          userId: user._id,
        });
      } else {
        query = new URLSearchParams({
          userId: user._id,
          date: selectedDate,
        });
      }

      const response = await fetch("/meal/search/dates?" + query.toString());
      const data = await response.json();
      setUserMeal(data);

      if (data.length === 0) {
        setUserFood([]);
        setLoading(false);
        return;
      }

      const userIdsString = data.map((user) => user.foodId).join(",");
      const foodResponse = await fetch(`/food/userfood?_ids=${userIdsString}`);
      const foodData = await foodResponse.json();
      setUserFood(foodData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    remove(evt.target.name);
  };

  const handlesetSelectedDateChange = (evt) => {
    if (evt.target.value) {
      setSelectedDate(new Date(evt.target.value).toISOString());
    } else {
      setSelectedDate("");
    }

    setFormDataChanged(true);
    console.log(selectedDate);
  };

  useEffect(() => {
    if (formDataChanged) {
      const debounceTimer = setTimeout(() => {
        fetchSearchDatesAndUserFood();
      }, 100);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [selectedDate]);

  function getCurrentTime() {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const renderTable = () => {
    if (userFood.length === 0) {
      return <p>No meal data found.</p>;
    }

    return (
      <>
        <form autoComplete="off" onSubmit={handleDelete}>
          <div className="card">
            <div className="card-body">
              <div style={{ overflow: "auto", maxHeight: "400px" }}>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userMeal.map((um, index) => {
                      const userFoodArray = Object.values(userFood);
                      const matchedFood = userFoodArray.find(
                        (food) => food._id === um.foodId
                      );
                      if (matchedFood) {
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={"/food/detail/" + um.foodId}>
                                {matchedFood.name}
                              </Link>
                            </td>
                            <td>{um.type}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                name={um._id}
                                onClick={handleDelete}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Copy to clipboard"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <div className="container mt-4">
        <div className="mb-3">
          <small id="passwordHelpBlock" className="form-text text-muted">
            Please select a date type
          </small>
          <input
            type="date"
            className="form-control btn-margin"
            id="selectedDate"
            value={selectedDate.slice(0, 10)}
            onChange={handlesetSelectedDateChange}
          />
        </div>
        {loading ? <div className="overlay"><div className="spinner"></div></div> : renderTable()}
      </div>
    </>
  );
}
