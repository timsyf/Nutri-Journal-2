import { useState, useEffect } from "react";
import swal from "sweetalert";

export default function AdminFoodUpdate({ adminUpdate, setAdminUpdate }) {
  const [formData, setFormData] = useState({ name: '' });
  const [food, setFood] = useState([]);

  const [loading, setLoading] = useState(false);
  const [updateID, setUpdateID] = useState([]);
  const [formState, setFormState] = useState({});
  const initialFormState = {
    name: "",
    calorie: "",
    carbohydrate: "",
    protein: "",
    fat: "",
    trans_Fat: "",
    saturated_Fat: "",
    polyunsaturated_Fat: "",
    monounsaturated_Fat: "",
    cholesterol: "",
    sodium: "",
    potassium: "",
    fiber: "",
    sugar: "",
    vitamin_A: "",
    vitamin_C: "",
    calcium: "",
    iron: "",
  };

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

  const update = async () => {
    try {
      setLoading(true);

      const hasNonEmptyValue = Object.values(formState).some(
        (value) => value !== null
      );

      if (!hasNonEmptyValue) {
        console.log("No changes to update.");
        setLoading(false);
        return;
      }

      const filteredUpdate = Object.fromEntries(
        Object.entries(formState).filter(([key, value]) => value !== null)
      );

      const response = await fetch(`/food/${updateID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredUpdate),
      });

      if (response.ok) {
        swal("Food has been updated!");
        console.log("Data updated in the database");
      } else {
        swal("Something went wrong! the food hasn't been updated.");
        console.error(
          "Failed to update data in the database:",
          response.status
        );
      }
      setLoading(false);
      setAdminUpdate(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();
    setAdminUpdate(false);
  }, [adminUpdate]);

  function handleUpdateChangeID(evt) {
    setUpdateID(evt.target.value);
  }

  function handleUpdateChangeData(evt) {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleUpdate(evt) {
    evt.preventDefault();
    update();
  }

  const handleReset = (evt) => {
    setFormState(initialFormState);
  };

  return (
    <div className="container mt-4">
      {loading ? <div>Loading...</div> : <></>}

      <form autoComplete="off" onSubmit={handleUpdate}>
      <small id="passwordHelpBlock" className="form-text text-muted">
                Please select a food to update
              </small>
        <select
          className="form-select btn-margin"
          id="dropdown"
          aria-label="Select a food item"
          name="id"
          onChange={handleUpdateChangeID}
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
                {foodItem.carbohydrate} g carbs, {foodItem.protein} g protein
              </option>
            ))}
        </select>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Name"
              value={formState.name}
              name="name"
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Carbohydrate"
              value={formState.carbohydrate}
              name="carbohydrate"
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Fat"
              name="fat"
              value={formState.fat}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Saturated Fat"
              value={formState.saturated_Fat}
              name="saturated_Fat"
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Monounsaturated Fat"
              value={formState.monounsaturated_Fat}
              name="monounsaturated_Fat"
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Sodium"
              name="sodium"
              value={formState.sodium}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Fiber"
              name="fiber"
              value={formState.fiber}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Vitamin A"
              name="vitamin_A"
              value={formState.vitamin_A}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Calcium"
              name="calcium"
              value={formState.calcium}
              onChange={handleUpdateChangeData}
            ></input>
          </div>

          <div className="col">
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Calorie"
              name="calorie"
              value={formState.calorie}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Protein"
              name="protein"
              value={formState.protein}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Trans Fat"
              name="trans_Fat"
              value={formState.trans_Fat}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Polyunsaturated Fat"
              name="polyunsaturated_Fat"
              value={formState.polyunsaturated_Fat}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Cholesterol"
              name="cholesterol"
              value={formState.cholesterol}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Potassium"
              name="potassium"
              value={formState.potassium}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Sugar"
              name="sugar"
              value={formState.sugar}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Vitamin C"
              name="vitamin_C"
              value={formState.vitamin_C}
              onChange={handleUpdateChangeData}
            ></input>
            <input
              type="text"
              className="form-control btn-margin"
              placeholder="Iron"
              name="iron"
              value={formState.iron}
              onChange={handleUpdateChangeData}
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block btn-margin"
          style={{ width: "100%" }}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block btn-margin"
          style={{ width: "100%" }}
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
}
