import { useState, useEffect } from 'react';

export default function ExerciseJournalPage() {

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/exercise');
        const data = await response.json();
        console.log(data);
        setAll(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

    return (
      <>
        <h1>Exercise Journal Page</h1>
        {loading ? ( <div>Loading...</div> ) : (
            all.map((value) => (
              <p>{value.name}</p>
            ))
          )}
      </>

    );
  }