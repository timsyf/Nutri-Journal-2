import { useState } from 'react';
import { UserNutrient, UserPhysique } from '../../components/Data/Data';

export default function UserSetup(props) {
  
  const [loading, setLoading] = useState(false);
  const [formToggle, setformToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
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
    dob: 0,
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

  return (
    <div>
      <h1>User Set Up</h1>
      {!formToggle ?
        <>
          <form autoComplete="off" onSubmit={handlePhysiqueSubmit}>
            {UserPhysique.map((data) => (

              data == "gender" ?
              <select name="gender" onChange={handleCreateChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
                data == "dob" ? (
                  <input type="date" name={data} onChange={handleCreateChange} />
                ) : (
                  <input type='text' placeholder={capitalizeFirstLetter(data)} name={data} onChange={handleCreateChange} required></input>
                )
            ))}
            <br></br>
            <button type="submit">Submit</button>
          </form>
          <br></br>
        </>
        :
        <>
          <button type="button" onClick={handleBack}>Back</button>
          <form autoComplete="off" onSubmit={handleNutrientSubmit}>
            {UserNutrient.map((data) => (
              (data == "carbohydrate" || data == "protein" || data == "calorie") ?
              <input type='text' placeholder={capitalizeFirstLetter(data)} name={data} onChange={handleCreateChange} required></input>
              :
              <></>
            ))}
            <br></br>
            <button type="submit">Submit</button>
          </form>
        </>
      }
    </div>
  );
}