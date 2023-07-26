import { useState } from 'react';
import { allNutrients } from '../../components/Data/Data';

export default function AdminFoodUpdate({ callFetch }) {

    const [formData, setFormData] = useState([]);
    const [food, setFood] = useState([]);

    const [loading, setLoading] = useState(false);
    const [updateID, setUpdateID] = useState([]);
    const [formState, setFormState] = useState({});
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

    const update = async () => {
        try {
            setLoading(true);

            const hasNonEmptyValue = Object.values(formState).some((value) => value !== null);

            if (!hasNonEmptyValue) {
                console.log('No changes to update.');
                setLoading(false);
                return;
            }

            const filteredUpdate = Object.fromEntries(
                Object.entries(formState).filter(([key, value]) => value !== null)
            );

            const response = await fetch(`/food/${updateID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredUpdate),
            });

            if (response.ok) {
                console.log('Data updated in the database');
            } else {
                console.error('Failed to update data in the database:', response.status);
            }

            setLoading(false);
            callFetch();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

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

    function capitalizeFirstLetter(str) {
        return (str.charAt(0).toUpperCase() + str.slice(1)).replace("_", " ");
      }

    return (
        <div class="container">
        <br></br>
        <h1>Update Food</h1>

        {loading ? ( <div>Loading...</div> ) : (<></>)}

        <form autoComplete="off" onSubmit={handleUpdate}>
        <input type="text" class="form-control btn-margin" placeholder='ID' name="id" onChange={handleUpdateChangeID} required></input>
          <div class="row">
            <div className='col'>
              <input type="text" class="form-control btn-margin" placeholder='Name' value={formState.name} name="name" onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Carbohydrate' value={formState.carbohydrate} name="carbohydrate" onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Fat' name="fat" value={formState.fat} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Saturated Fat' value={formState.saturated_Fat} name="saturated_Fat" onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Monounsaturated Fat' value={formState.monounsaturated_Fat} name="monounsaturated_Fat" onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Sodium' name="sodium" value={formState.sodium} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Fiber' name="fiber" value={formState.fiber} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Vitamin A' name="vitamin_A" value={formState.vitamin_A} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Calcium' name="calcium" value={formState.calcium} onChange={handleUpdateChangeData}></input>
            </div>

            <div className='col'>
              <input type="text" class="form-control btn-margin" placeholder='Calorie' name="calorie" value={formState.calorie} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Protein' name="protein" value={formState.protein} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Trans Fat' name="trans_Fat" value={formState.trans_Fat} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Polyunsaturated Fat' name="polyunsaturated_Fat" value={formState.polyunsaturated_Fat} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Cholesterol' name="cholesterol" value={formState.cholesterol} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Potassium' name="potassium" value={formState.potassium} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Sugar' name="sugar" value={formState.sugar} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Vitamin C' name="vitamin_C" value={formState.vitamin_C} onChange={handleUpdateChangeData}></input>
              <input type="text" class="form-control btn-margin" placeholder='Iron' name="iron" value={formState.iron} onChange={handleUpdateChangeData}></input>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Submit</button>
          <button type="button" class="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }} onClick={handleReset}>Reset</button>
        </form>
      </div>
    );
  }

  {/*{loading ? ( <div>Loading...</div> ) : (<></>)}
            <h1>Update</h1>
            <div>
                <form autoComplete="off" onSubmit={handleUpdate}>
                <input type="text" name="id" placeholder='ID' onChange={handleUpdateChangeID} required />
                <br></br>
                <br></br>
                <input type="text" name="name" placeholder='Name' onChange={handleUpdateChangeData} />
                {allNutrients.map((nutrient) => (
                <input type='text' placeholder={capitalizeFirstLetter(nutrient)} name={nutrient} onChange={handleUpdateChangeData}></input>
                ))}
                <br></br>
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
                </>*/}
