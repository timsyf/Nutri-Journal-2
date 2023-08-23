import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TotalCalories(props) {
  const { user } = props.elements;
  const [userFood, setUserFood] = useState({ name: "" });
  const [userMeal, setUserMeal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentTime());

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
      setLoading(false);

      if (data.length === 0) {
        setUserFood([]);
        return;
      }

      setLoading(true);
      const userIdsString = data.map((user) => user.foodId).join(",");
      const foodResponse = await fetch(`/food/userfood?_ids=${userIdsString}`);
      const foodData = await foodResponse.json();
      setLoading(false);
      setUserFood(foodData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchDatesAndUserFood();
  }, []);

  useEffect(() => {
    if (formDataChanged) {
      const debounceTimer = setTimeout(() => {
        fetchSearchDatesAndUserFood();
      }, 0);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [selectedDate]);

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
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

  function getCurrentTime() {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const renderTable = () => {
    if (userMeal.length === 0) {
      return <p>No food data found.</p>;
    }

    // Calculate the total sum of calories
    const totalCalories = userFood
      .reduce((sum, um) => sum + um.calorie, 0)
      .toFixed(1);
    const totalProtein = userFood
      .reduce((sum, um) => sum + um.protein, 0)
      .toFixed(1);
    const totalCarbohydrates = userFood
      .reduce((sum, um) => sum + um.carbohydrate, 0)
      .toFixed(1);

    return (
      <>
        <div className="card btn-margin">
          <div className="card-body">
            <div style={{ overflow: "auto", maxHeight: "400px" }}>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbohydrate</th>
                  </tr>
                </thead>
                <tbody>
                  {userFood.map((um) => {
                    return (
                      <tr>
                        <td>
                          <Link to={"/food/detail/" + um._id}>{um.name}</Link>
                        </td>
                        <td>{um.calorie} kcal</td>
                        <td>{um.protein} g</td>
                        <td>{um.carbohydrate} g</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <div className="alert alert-info">
        <div className="row">
            <div className="col">
              <strong>Total Calories Consumed:</strong> {totalCalories} kcal
            </div>
            <div className="col">
              <strong>Total Protein Consumed:</strong> {totalProtein} kcal
            </div>
            <div className="col">
              <strong>Total Carbohydrates Consumed:</strong>{" "}
              {totalCarbohydrates} kcal
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <form className="btn-margin" autoComplete="off" onSubmit={handleSearchSubmit}>
        <small id="passwordHelpBlock" className="form-text text-muted">
          Please enter the date you're searching for
        </small>
        <input
          type="date"
          className="form-control"
          value={selectedDate.slice(0, 10)}
          onChange={handlesetSelectedDateChange}
        />
      </form>
      <div className="row">
        <div className="col">
        {loading ? <div className="overlay"><div className="spinner"></div></div> : renderTable()}
        </div>
      </div>
    </div>
  );
}
