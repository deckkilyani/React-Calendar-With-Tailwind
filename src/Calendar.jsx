import { CaretLeft, CaretRight } from "phosphor-react";
import React, { useState } from "react";

const Calendar = () => {
  const currentDate = new Date();
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateSelect = (day) => {
    const newSelectedDate = new Date(currYear, currMonth, day + 1);
    // Disable selection of past dates
    if (newSelectedDate < currentDate) {
      return;
    } else {
      setSelectedDate(new Date(currYear, currMonth, day));
    }
  };

  const renderCalendar = () => {
    const date = new Date(currYear, currMonth, 1);
    const firstDayOfMonth = date.getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(
      currYear,
      currMonth,
      lastDateOfMonth
    ).getDay();

    // last date of pervious month
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    const days = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      const day = lastDateOfLastMonth - i + 1;
      days.push(
        <span key={`inactive-${i}`} className="text-gray-300">
          {day}
        </span>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isSelected =
        selectedDate !== null &&
        selectedDate.getTime() === new Date(currYear, currMonth, i).getTime();

      const isPastDate =
        new Date(currYear, currMonth, i) < new Date().setHours(0, 0, 0, 0);

      days.push(
        <span
          key={`active-${i}`}
          className={`py-[2px] font-light  ${
            isSelected ? "bg-teal-500 text-white w-6 h-6 rounded-full" : ""
          } ${isPastDate ? "text-gray-300" : ""}`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </span>
      );
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      const day = i - lastDayOfMonth + 1;
      days.push(
        <span key={`inactive-next-${i}`} className="text-gray-300">
          {day}
        </span>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrMonth((prevMonth) => {
      const newMonth = prevMonth - 1;
      if (
        (newMonth < currentDate.getMonth() &&
          currYear === currentDate.getFullYear()) ||
        currYear < currentDate.getFullYear()
      ) {
        return prevMonth; // Do not update the month if it is a past month
      }

      if (newMonth < 0) {
        setCurrYear((prevYear) => prevYear - 1);
        return 11;
      }

      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrMonth((prevMonth) => {
      const newMonth = prevMonth + 1;
      if (newMonth > 11) {
        setCurrYear((prevYear) => prevYear + 1);
        return 0;
      }
      return newMonth;
    });
  };


  return (
    <div className="w-72 bg-white rounded-lg shadow-lg select-none">
      <header className="flex items-center justify-between p-4">
        <p className="text-lg text-gray-900 font-semibold">
          {months[currMonth]} {currYear}
        </p>
        <div className="flex">
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full text-gray-600 cursor-pointer hover:bg-gray-200 ${
              (currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear()) ||
              currYear < new Date().getFullYear()
                ? "opacity-50"
                : ""
            }`}
            onClick={handlePrevMonth}
          >
            <CaretLeft />
          </span>
          <span
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-600 cursor-pointer hover:bg-gray-200"
            onClick={handleNextMonth}
          >
            <CaretRight />
          </span>
        </div>
      </header>
      <div className="p-4">
        <ul className="flex flex-wrap mb-2 justify-evenly text-sm font-semibold text-teal-500">
          <li className="w-1/7 text-center">Sun</li>
          <li className="w-1/7 text-center">Mon</li>
          <li className="w-1/7 text-center">Tue</li>
          <li className="w-1/7 text-center">Wed</li>
          <li className="w-1/7 text-center">Thu</li>
          <li className="w-1/7 text-center">Fri</li>
          <li className="w-1/7 text-center">Sat</li>
        </ul>
        <ul className="flex flex-wrap gap-3 ml-[6px] text-sm">
          {renderCalendar().map((day, index) => (
            <li
              key={index}
              className="w-1/7  text-center cursor-pointer hover:bg-gray-100 rounded-full"
            >
              <div className="relative">
                <div className="w-6 h-6 flex items-center justify-center rounded-full text-gray-700">
                  {day}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
