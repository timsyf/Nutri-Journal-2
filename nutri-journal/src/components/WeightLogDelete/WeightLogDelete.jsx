import { useState } from 'react';
import swal from 'sweetalert';

export default function WeightLogDelete(props) {

    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
      userId: props.elements.user._id,
      weight: 0,
      date: getCurrentTime(),
    });

    const deleteWeight = async () => {
      try {
        setLoading(true);
    
        const query = new URLSearchParams({
          date: formState.date,
        });
        const dateExistsResponse = await fetch('/weight/log/delete?' + query.toString(), {
          method: 'DELETE',
        });
    
        if (dateExistsResponse.ok) {
          const data = await dateExistsResponse.json();
          if (data.deleted) {
            console.log('Data with the specified date has been deleted from the database.');
          } else {
            console.log('No data found with the specified date in the database.');
          }
        } else {
          console.error('Failed to check if the date exists in the database:', dateExistsResponse.status);
        }
        setLoading(false);
        props.callFetch();
        swal("Weight details have been deleted!");
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

    const handleDeleteSubmit = (evt) => {
      evt.preventDefault();
      deleteWeight();
    }

    function getCurrentTime() {
      const currentTime = new Date();
      const year = currentTime.getFullYear().toString();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentTime.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    return (
      <>
        <h2>Delete Weight Record</h2>
        <form autoComplete="off" onSubmit={handleDeleteSubmit}>
          <div className="row mb-3">
            <div className="col-sm">
              <input type="date" className="form-control" id="date" name="date" value={formState.date} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <button type="submit" className="btn btn-primary btn-lg btn-block btn-margin" style={{ width: '100%' }}>Submit</button>
            </div>
          </div>
        </form>
      </>
    );
  }