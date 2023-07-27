import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function UserCalorieChecker(props) {

    const { user } = props.elements;
    const [userFood, setUserFood] = useState({ name: '' });
    const [userMeal, setUserMeal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formDataChanged, setFormDataChanged] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentTime());

    const fetchSearchDatesAndUserFood = async () => {
      try {
        setLoading(true);
        let query;
        if (selectedDate === '') {
          query = new URLSearchParams({
            userId: user._id,
          });
        } else {
          query = new URLSearchParams({
            userId: user._id,
            date: selectedDate,
          });
        }
    
        const response = await fetch('/meal/search/dates?' + query.toString());
        const data = await response.json();
        setUserMeal(data);
        setLoading(false);
        
        if (data.length === 0) {
          setUserFood([]);
          return;
        }
    
        setLoading(true);
        const userIdsString = data.map((user) => user.foodId).join(",");
        const foodResponse = await fetch(`/food/userfood?_ids=${userIdsString}`);
        const foodData = await foodResponse.json();
        setLoading(false);
        setUserFood(foodData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };



    

    useEffect(() => {
        fetchSearchDatesAndUserFood();
    }, []);

    useEffect(() => {
        if (formDataChanged) {
            const debounceTimer = setTimeout(() => {
              fetchSearchDatesAndUserFood();
            }, 500);
        
            return () => {
                clearTimeout(debounceTimer);
            };
        }
    }, [selectedDate]);

    const handleSearchSubmit = (evt) => {
      evt.preventDefault();
    }

    const handlesetSelectedDateChange = (evt) => {
    if (evt.target.value) {
        setSelectedDate(new Date(evt.target.value).toISOString());
    } else {
        setSelectedDate('');
    }

    setFormDataChanged(true);
      console.log(selectedDate);
    }

    function getCurrentTime() {
      const currentTime = new Date();
      const year = currentTime.getFullYear().toString();
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentTime.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const renderTable = () => {
      if (userMeal.length === 0) {
        return <p>No meal data found.</p>;
      }
    
      return (
        <>
          <div className="row">
            <Swiper slidesPerView={4} spaceBetween={-20} pagination={{ clickable: true }} className="mySwiper">
              {userMeal.map((um) => {
                const matchedFood = userFood.find((food) => food._id === um.foodId);
                if (matchedFood) {
                  return (
                    <SwiperSlide key={um._id}>
                      <div className="container">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{matchedFood.name}</h5>
                            <p className="card-text">Type: {um.type}</p>
                            <p className="card-text">Date: {um.date.slice(0, 10)}</p>
                            <Link to={"/food/detail/" + matchedFood._id} className="btn btn-primary">View Details</Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                } else {
                  return null;
                }
              })}
            </Swiper>
          </div>
        </>
      );
    };
    
    return (
      <div className="container mt-4">
        <h2>Meal Checker</h2>
        <form autoComplete="off" onSubmit={handleSearchSubmit}>
          <div className="form-group">
            <input
              type="date"
              className="form-control btn-margin"
              id="selectedDate"
              value={selectedDate.slice(0, 10)}
              onChange={handlesetSelectedDateChange}
            />
          </div>
        </form>
        {loading ? <div>Loading...</div> : renderTable()}
      </div>
    );
}