export default function AddGoals() {
    
    const [formState, setFormState] = useState({
        userId: "64bc144dd677ffd37d47aa2a",
        weight: 0,
          nutrients: {
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
          }
      });
    
      const insert = async () => {
        try {
          const response = await fetch('/goal', {
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
        } catch (error) {
          console.error(error);
        }
    };

      return (
        <>
            <h1>Add Goals</h1>
        </>
      );
  }