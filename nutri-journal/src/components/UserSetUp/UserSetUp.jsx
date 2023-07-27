import { useState } from 'react';
import { UserNutrient, UserPhysique } from '../../components/Data/Data';
import swal from 'sweetalert';

export default function UserSetup(props) {
  
  const [loading, setLoading] = useState(false);
  const [formToggle, setformToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentTime());
  const [formState, setFormState] = useState({
    userId: props.elements.user._id,
    calorie: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    trans_Fat: 0,
    saturated_Fat: 0,
    polyunsaturated_Fat: 0,
    monounsaturated_Fat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    fiber: 0,
    sugar: 0,
    vitamin_A: 0,
    vitamin_C: 0,
    calcium: 0,
    iron: 0,
    dob: selectedDate,
    gender: 0,
    height: 0,
    weight: 0,
  });

  const create = async () => {
    try {
      setLoading(true);
      const response = await fetch('/user/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Data stored in the database:', data);
      } else {
        console.error('Failed to store data in the database:', response.status);
      }
      setLoading(false);
      swal("User has been configured!");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
};

  const handlePhysiqueSubmit = (evt) => {
    evt.preventDefault();
    setformToggle(true);
  }

  const handleCreateChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
    setSelectedDate(formState.dob);
    console.log(formState);
  };

  const handleBack = (evt) => {
    evt.preventDefault();
    setformToggle(false);
  }

  const handleNutrientSubmit = (evt) => {
    evt.preventDefault();
    create();
  }

  function capitalizeFirstLetter(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1)).replace("_", " ");
  }

  function getCurrentTime() {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const day = currentTime.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="container mt-4">
      <h2>User Setup</h2>
      {!formToggle ? (
        <form autoComplete="off" onSubmit={handlePhysiqueSubmit}>
          {UserPhysique.map((data) => (
            <div className="mb-3" key={data}>
              {data === 'gender' ? (
                <select className="form-select" name="gender" onChange={handleCreateChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : data === 'dob' ? (
                <input className="form-control" type="date" name={data} value={formState.dob} onChange={handleCreateChange} />
              ) : (
                <input
                  className="form-control"
                  type="text"
                  placeholder={capitalizeFirstLetter(data)}
                  name={data}
                  onChange={handleCreateChange}
                  required
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Next</button>
        </form>
      ) : (
        <>
          <form autoComplete="off" onSubmit={handleNutrientSubmit}>
            <div className="row">
              {UserNutrient.map((data, index) => (
                <div className="col-md-6 mb-3" key={data}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder={capitalizeFirstLetter(data)}
                    name={data}
                    onChange={handleCreateChange}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-md-12">
              </div>
            </div>
            <button type="button" className="btn btn-secondary btn-lg btn-block btn-margin" onClick={handleBack} style={{ width: '100%' }}>Back</button>
            <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Submit</button>
          </form>
        </>
      )}
    </div>
  );
}