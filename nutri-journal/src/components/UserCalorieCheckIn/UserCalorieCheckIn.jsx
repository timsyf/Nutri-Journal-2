import { useState, useEffect } from "react";
import swal from "sweetalert";

export default function UserCalorieCheckIn({elements, setUpdated}) {
  const [userFood, setUserFood] = useState({ name: "" });
  const [userMeal, setUserMeal] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentTime());

  const { user } = elements;
  const [formData, setFormData] = useState({ name: "" });
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    userId: user,
    foodId: "",
    type: "",
    date: getCurrentTime(),
  });

  const insert = async () => {
    try {
      const response = await fetch("/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data stored in the database:", data);
        swal("Meal has been added!");
        setUpdated(true);
      } else {
        console.error("Failed to store data in the database:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const fetchSearchDatesAndUserFood = async () => {
    try {
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
        return;
      }

      const userIdsString = data.map((user) => user.foodId).join(",");
      const foodResponse = await fetch(`/food/userfood?_ids=${userIdsString}`);
      const foodData = await foodResponse.json();
      setUserFood(foodData);
      console.log(foodData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSearchDatesAndUserFood();
  }, []);

  async function handleCheckin(evt) {
    evt.preventDefault();
    insert();
  }

  const handleCheckInChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formState);
  };

  function getCurrentTime() {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="container mt-4">
        <div>
          <form autoComplete="off" onSubmit={handleCheckin}>
            <div className="mb-3">
              <small id="passwordHelpBlock" className="form-text text-muted">
                Please select a meal
              </small>

              <select
                className="form-select"
                id="dropdown"
                name="type"
                onChange={handleCheckInChange}
                required
              >
                <option value="">-</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Supper">Supper</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>

            <div className="mb-3">
              <small id="passwordHelpBlock" className="form-text text-muted">
                Please select a food
              </small>
              <select
                className="form-select"
                id="dropdown"
                aria-label="Select a food item"
                name="foodId"
                onChange={handleCheckInChange}
                required
              >
                <option value="">-</option>
                {food
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((foodItem) => (
                    <option
                      key={foodItem._id}
                      value={foodItem._id}
                      name={foodItem._id}
                    >
                      {foodItem.name} - {foodItem.calorie} kcal,{" "}
                      {foodItem.carbohydrate} g carbs, {foodItem.protein} g
                      protein
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              
            <small id="passwordHelpBlock" className="form-text text-muted">
                Please select a date
              </small>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formState.date}
                onChange={handleCheckInChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block btn-margin"
              style={{ width: "100%" }}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
