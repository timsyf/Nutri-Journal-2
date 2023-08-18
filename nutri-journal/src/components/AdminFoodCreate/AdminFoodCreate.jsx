import { useState } from 'react';
import swal from 'sweetalert';

export default function AdminFoodCreate({ adminUpdate, setAdminUpdate }) {

    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        calorie: '',
        carbohydrate: '',
        protein: '',
        fat: '',
        trans_Fat: '',
        saturated_Fat: '',
        polyunsaturated_Fat: '',
        monounsaturated_Fat: '',
        cholesterol: '',
        sodium: '',
        potassium: '',
        fiber: '',
        sugar: '',
        vitamin_A: '',
        vitamin_C: '',
        calcium: '',
        iron: '',
      });
      const initialFormState = {
        name: '',
        calorie: '',
        carbohydrate: '',
        protein: '',
        fat: '',
        trans_Fat: '',
        saturated_Fat: '',
        polyunsaturated_Fat: '',
        monounsaturated_Fat: '',
        cholesterol: '',
        sodium: '',
        potassium: '',
        fiber: '',
        sugar: '',
        vitamin_A: '',
        vitamin_C: '',
        calcium: '',
        iron: '',
      };

      const insert = async () => {
        try {
          setLoading(true);
          const response = await fetch('/food', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
          });
          
          if (response.ok) {
            const data = await response.json();
            swal("Food has been created!");
            console.log('Data stored in the database:', data);
          } else {
            swal("Something went wrong! the food hasn't been created.");
            console.error('Failed to store data in the database:', response.status);
          }
          setLoading(false);
          setAdminUpdate(true);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
    };
    
    async function handleInsert(evt) {
        evt.preventDefault();
        insert();
    }
    
    const handleInsertChange = (evt) => {
        const { name, value } = evt.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleReset = (evt) => {
      setFormState(initialFormState);
    };

    return (
        <>
        <div className="container mt-4">
          {loading ? ( <div>Loading...</div> ) : (<></>)}

          <form autoComplete="off" onSubmit={handleInsert}>
          <small id="passwordHelpBlock" className="form-text text-muted">
                Please key in the details of your new food
              </small>
            <div className="row">
              <div className='col'>
                <input type="text" className="form-control btn-margin" placeholder='Name' name="name" value={formState.name} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Carbohydrate' value={formState.carbohydrate} name="carbohydrate"  onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Fat' name="fat" value={formState.fat} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Saturated Fat' value={formState.saturated_Fat} name="saturated_Fat" onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Monounsaturated Fat' value={formState.monounsaturated_Fat} name="monounsaturated_Fat" onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Sodium' name="sodium" value={formState.sodium} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Fiber' name="fiber" value={formState.fiber} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Vitamin A' name="vitamin_A" value={formState.vitamin_A} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Calcium' name="calcium" value={formState.calcium} onChange={handleInsertChange} required></input>
              </div>

              <div className='col'>
                <input type="text" className="form-control btn-margin" placeholder='Calorie' name="calorie" value={formState.calorie} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Protein' name="protein" value={formState.protein} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Trans Fat' name="trans_Fat" value={formState.trans_Fat} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Polyunsaturated Fat' name="polyunsaturated_Fat" value={formState.polyunsaturated_Fat} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Cholesterol' name="cholesterol" value={formState.cholesterol} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Potassium' name="potassium" value={formState.potassium} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Sugar' name="sugar" value={formState.sugar} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Vitamin C' name="vitamin_C" value={formState.vitamin_C} onChange={handleInsertChange} required></input>
                <input type="text" className="form-control btn-margin" placeholder='Iron' name="iron" value={formState.iron} onChange={handleInsertChange} required></input>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Create</button>
            <button type="button" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }} onClick={handleReset}>Reset</button>
          </form>
        </div>
      </>
    );
  }