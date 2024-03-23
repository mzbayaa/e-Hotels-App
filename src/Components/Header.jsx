import React from "react";
import "./Header.css";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  //date function for calender
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  //defaults for adult, children, room options
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  //navigate pages
  const navigate = useNavigate();

  //adding or removing from option ammount
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "header-container list-mode" : "header-container"
        }
      >
        <div className="header-list">
          <div className="header-list-item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="header-list-item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="header-title">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="header-description">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            <button className="header-button">Sign in / Register</button>
            <div className="header-search">
              <div className="header-search-item">
                <FontAwesomeIcon icon={faBed} className="header-icon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header-icon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="header-search-text"
                >{`${format(date[0].startDate, "mm/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "mm/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="header-search-item">
                <FontAwesomeIcon icon={faPerson} className="header-icon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="header-search-text"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="option-item">
                      <span className="option-text">Adult</span>
                      <div className="option-counter">
                        <button
                          disabled={options.adult <= 1}
                          className="option-increment-button"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="option-increment-number">
                          {options.adult}
                        </span>
                        <button
                          className="option-increment-button"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="option-item">
                      <span className="option-text">Children</span>
                      <div className="option-counter">
                        <button
                          disabled={options.children <= 0}
                          className="option-increment-button"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="option-increment-number">
                          {options.children}
                        </span>
                        <button
                          className="option-increment-button"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="option-item">
                      <span className="option-text">Room</span>
                      <div className="option-counter">
                        <button
                          disabled={options.room <= 1}
                          className="option-increment-button"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="option-increment-number">
                          {options.room}
                        </span>
                        <button
                          className="option-increment-button"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="header-search-item">
                <button className="header-button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
