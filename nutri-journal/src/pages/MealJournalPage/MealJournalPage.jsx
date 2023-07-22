import { useState, useEffect } from 'react';
import UserCalorieCheckIn from '../../components/UserCalorieCheckIn/UserCalorieCheckIn';

export default function CaloriesCheckIn(props) {
  return (
    <>
      <UserCalorieCheckIn elements = {props} />
    </>
  );
}