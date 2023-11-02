/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';

const UserDailyHours = (props: any) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const renderOptions = () => {
    return days.map((day, index) => (
      <option key={index} value={day}>
        {day}
      </option>
    ));
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now(), day: '', startTime: '', endTime: '' };
    if (props.hours) {
      props.handleHours([...props.hours, newRow]);
    }
  };

  const handleDayChange = (index: any, value: any) => {
    props.setErrorMessage('');
    const updatedRows = [...props.hours];
    updatedRows[index].day = value;
    if (props.hours) {
      props.handleHours(updatedRows);
    }
  };

  const handleStartTime = (index: any, value: any) => {
    props.setErrorMessage('');
    const updatedRows = [...props.hours];
    updatedRows[index].startTime = value;
    if (props.hours) {
      props.handleHours(updatedRows);
    }
  };

  const handleEndTime = (index: any, value: any) => {
    props.setErrorMessage('');
    const updatedRows = [...props.hours];
    updatedRows[index].endTime = value;
    if (props.hours) {
      props.handleHours(updatedRows);
    }
  };

  function deleteRow(id: any) {
    props.setErrorMessage('');
    const newArray = props.hours.filter((x: any) => x.id !== id);
    if (props.hours) {
      props.handleHours(newArray);
    }
  }

  return (
    <div className="">
      <div className="hidden lg:flex justify-between font-semibold text-gray-500 mb-2">
        <h1>Day</h1>
        <h1 className="ml-5">Start</h1>
        <h1>End</h1>
        <h1>Delete</h1>
      </div>
      {props.hours &&
        props.hours.map((row: any, index: any) => (
          <div
            className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row justify-between  mb-3"
            key={index}
          >
            <div className="flex items-center gap-x-3 mt-5 lg:mt-0 lg:col-span-1">
              <p className="block lg:hidden font-bold">Day</p>
              <select
                className="shadow text-sm md:w-[125px] bg-white px-3 appearance-none border border-gray-200 rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={e => handleDayChange(index, e.target.value)}
                value={row.day}
              >
                <option>Select a day</option>
                {renderOptions()}
              </select>
            </div>
            <div className="flex items-center gap-x-3 lg:col-span-1">
              <p className="text-sm block lg:hidden lg:text-base font-bold">
                Start
              </p>
              <input
                className="shadow appearance-none border border-gray-200 md:w-[133px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="appt"
                name="appt"
                onChange={e => handleStartTime(index, e.target.value)}
                type="time"
                value={row.startTime}
              />
            </div>
            <div className="flex items-center gap-x-4 lg:col-span-1">
              <p className="text-sm block lg:hidden lg:text-base font-bold">
                End
              </p>
              <input
                className="shadow appearance-none border border-gray-200 md:w-[133px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="appt"
                name="appt"
                onChange={e => handleEndTime(index, e.target.value)}
                type="time"
                value={row.endTime}
              />
            </div>
            <div className="lg:block flex items-center gap-x-3">
              <p className="text-sm block lg:hidden lg:text-base font-bold">
                Delete
              </p>
              <div className="flex items-center justify-center w-9 cursor-pointer border border-gray-200 p-2 rounded-full text-red-500/50 hover:text-red-500">
                <RiDeleteBinLine
                  className=" "
                  onClick={() => deleteRow(row.id)}
                />
              </div>
            </div>
          </div>
        ))}
      <p className="text-red-500">{props.errorMessage}</p>
      <div className="text-center">
        {props.hours.length < 7 && (
          <button
            className="rounded-full p-1 text-3xl border border-blue-500 text-blue-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all"
            onClick={handleAddRow}
          >
            <IoMdAdd />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDailyHours;
