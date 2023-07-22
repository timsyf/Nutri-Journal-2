import { useState, useEffect } from 'react';

export default function UserCalorieChecker(props) {

    const { user } = props.elements;
    const [formData, setFormData] = useState({ userId: '' });
    const [meal, setMeal] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSearch = async () => {
            try {
              setLoading(true);
              const query = new URLSearchParams({
                userId: user._id,
              });
              const response = await fetch('/meal/search?' + query.toString());
              const data = await response.json();
              setMeal(data);
              setLoading(false);
              console.log(data);
            } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
            }
          };
          fetchSearch();
      }, []);

    const fetchSearch = async () => {
        try {
          setLoading(true);
          const query = new URLSearchParams({
            name: formData.name,
          });
          const response = await fetch('/meal/search?' + query.toString());
          const data = await response.json();
          setMeal(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

    return (
      <h1>UserCalorieChecker</h1>
    );
}