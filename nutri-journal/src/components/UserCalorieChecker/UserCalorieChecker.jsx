import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserCalorieChecker(props) {
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
    if (userFood.length === 0) {
      return <p>No meal data found.</p>;
    }

    return (
      <>
        <div className="card">
          <div className="card-body">
            <div style={{ overflow: "auto", maxHeight: "400px" }}>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {userMeal.map((um) => {
                    const matchedFood = userFood.find(
                      (food) => food._id === um.foodId
                    );
                    if (matchedFood) {
                      return (
                        <tr key={um._id}>
                          <td>
                            <Link to={"/food/detail/" + matchedFood._id}>
                              {matchedFood.name}
                            </Link>
                          </td>
                          <td>{um.type}</td>
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
      </>
    );
  };

  return (
    <div className="container mt-4">
      <form className="btn-margin" autoComplete="off" onSubmit={handleSearchSubmit}>
        <small id="passwordHelpBlock" className="form-text text-muted">
          Please enter the date of the meal you're searching for
        </small>
        <input
          type="date"
          className="form-control"
          id="selectedDate"
          value={selectedDate.slice(0, 10)}
          onChange={handlesetSelectedDateChange}
        />
      </form>
      {loading ? <div className="overlay"><div className="spinner"></div></div> : renderTable()}
    </div>
  );
}
