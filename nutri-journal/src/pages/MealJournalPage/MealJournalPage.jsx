import { useState, useEffect } from 'react';
import UserCalorieCheckIn from '../../components/UserCalorieCheckIn/UserCalorieCheckIn';
import DeleteMeal from '../../components/DeleteMeal/DeleteMeal';

export default function CaloriesCheckIn(props) {
  return (
    <>
      <UserCalorieCheckIn elements = {props} />
      <DeleteMeal elements = {props} />
    </>
  );
}