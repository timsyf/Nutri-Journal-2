import { useState } from 'react';
import { allNutrients } from '../../components/Data/Data';

export default function AdminFoodUpdate({ callFetch }) {

    const [loading, setLoading] = useState(false);
    const [updateID, setUpdateID] = useState([]);
    const [formState, setFormState] = useState({});

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

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return (
        <>
            {loading ? ( <div>Loading...</div> ) : (<></>)}
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
        </>
    );
  }