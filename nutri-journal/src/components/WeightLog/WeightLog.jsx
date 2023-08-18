import { useState } from "react";
import swal from "sweetalert";

export default function WeightLog(props) {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    userId: props.elements.user._id,
    weight: 0,
    date: getCurrentTime(),
  });

  const create = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        date: formState.date,
        userId: formState.userId,
      });
      const dateAndUserExistsResponse = await fetch(
        "/weight/log/date?" + query.toString()
      );

      console.log(dateAndUserExistsResponse);
      if (dateAndUserExistsResponse.ok) {
        const data = await dateAndUserExistsResponse.json();

        if (data.exists) {
          swal(
            "Something went wrong! Weight with the same date and user already exists in the database."
          );
          console.log(
            "Data with the same date and user already exists in the database. You may choose to update or handle this case."
          );
          setLoading(false);
          return;
        }

        const response = await fetch("/weight/log", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        if (response.ok) {
          const newData = await response.json();
          swal("Weight has been stored in the database!");
          console.log("Data stored in the database:", newData);
        } else {
          swal("Something went wrong! The weight hasn't been added.");
          console.error(
            "Failed to store data in the database:",
            response.status
          );
        }
      } else {
        swal(
          "Something went wrong! Failed to check if the date and user exist in the database."
        );
        console.error(
          "Failed to check if the date and user exist in the database:",
          dateAndUserExistsResponse.status
        );
      }

      setLoading(false);
      props.callFetch();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formState);
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    create();
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
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
        <small id="passwordHelpBlock" className="form-text text-muted">
          Please select a date
        </small>
          <div className="row mb-3">
            <div className="col-sm">
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formState.date}
                onChange={handleChange}
              />
            </div>
          </div>
        <small id="passwordHelpBlock" className="form-text text-muted">
          Please key in your weight
        </small>
          <div className="row mb-3">
            <div className="col-sm">
              <input
                type="text"
                className="form-control"
                id="weight"
                placeholder="Weight"
                name="weight"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block btn-margin"
                style={{ width: "100%" }}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
