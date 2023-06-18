import React, { useState, useEffect } from "react";
import "./input.css";
import img from "../src/assets/oy1.png";
import img1 from "../src/assets/quyosh1.png";

const Input = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [displayedNames, setDisplayedNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedNames = JSON.parse(localStorage.getItem("names"));
    if (storedNames) {
      setDisplayedNames(storedNames);
    }
  }, []);

  const handle = () => {
    const updatedNames = [...displayedNames, { firstName, lastName, age }];
    setDisplayedNames(updatedNames);
    localStorage.setItem("names", JSON.stringify(updatedNames));
    setFirstName("");
    setLastName("");
    setAge("");
    setIsModalOpen(false);
    setModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const [modal, setModal] = useState();

  const openModal = () => {
    setIsModalOpen(true);
    setModal(true);
  };

  const [backgroundColor, setBackgroundColor] = useState();

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const handleButtonClick = () => {
    setBackgroundColor((Color) =>
      Color === "#171923" ? "#171923" : "#171923"
    );
    document.querySelector("nav").style.backgroundColor = "";
    document.querySelector(".con").style.backgroundColor = "";
    document.querySelectorAll(".res-con").forEach((e) => {
      e.style.backgroundColor = "";
    });
    document.querySelectorAll(".s").forEach((e) => {
      e.style.color = "";
    });
    document.querySelector("modal , h2").style.color = "";
    document.querySelector(".img").style.zIndex = "-1";
    document.querySelector(".img1").style.zIndex = "1";
  };
  const handleButtonClick1 = () => {
    setBackgroundColor((Color) => (Color === "white" ? "white" : "white"));
    document.querySelector("nav").style.backgroundColor = "#ebeff1";
    document.querySelector(".con").style.backgroundColor = "#E2E8F0";
    document.querySelectorAll(".res-con").forEach((e) => {
      e.style.backgroundColor = "#F7FAFC";
    });
    document.querySelectorAll(".s").forEach((e) => {
      e.style.color = "#302033";
    });
    document.querySelector("modal , h2").style.color = "#556E8B";
    document.querySelector(".img1").style.zIndex = "-1";
    document.querySelector(".img").style.zIndex = "1";
  };

  const filteredNames = displayedNames.filter(
    ({ firstName, lastName }) =>
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav>
        <div className="modal">
          <h2>Forms</h2>
          <button onClick={openModal} className="add">
            Add New
          </button>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="search"
            />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="dum">
            <img
              src={img}
              alt=""
              className="img "
              onClick={handleButtonClick}
            />
            <img
              src={img1}
              alt=""
              className="img1"
              onClick={handleButtonClick1}
            />
          </div>
        </div>
      </nav>
      <div className="con">
        {modal && <div className="modall" style={{ display: "block" }}></div>}

        {isModalOpen && (
          <div className="modal1">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <button
              onClick={handle}
              disabled={!firstName || !lastName || !age}
              className="sav"
            >
              Save
            </button>
          </div>
        )}

        <div className="item-con">
          <div className="bush"></div>

          {filteredNames.map(({ firstName, lastName, age }, index) => (
            <div key={index} className="res-con">
              <div className="pe">
                <p className="p">

                  <span className="span">First Name:</span>
                  <span className="s"> {firstName}</span>
                </p>
              </div>
              <div className="pe1">
                <p className="p1">
                  <span className="span">Last Name:</span>
                  <span className="s"> {lastName}</span>
                </p>
              </div>
              <div className="pe2">
                <p className="p2">
                  <span className="span">Age:</span>{" "}
                  <span className="s">{age}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bush"></div>
      </div>
    </div>
  );
};

export default Input;
