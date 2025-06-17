import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Secondfile.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  const getdata = async () => {
    let dataArray = [];
    const Otheraddress = document.querySelector(".address")?.value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      return;
    }

    if (dataArray.length === 0) {
      alert("No image to display");
      return;
    }

    const images = dataArray.map((item, i) => {
      const cid = item.substring(7); // remove "ipfs://"
      const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

      return (
        <div key={i} className="image-container">
          <button className="delete-button" onClick={() => deleteFile(i)}>
            <i className="fa-solid fa-trash fa-beat" style={{ color: "#007bff" }}></i>
          </button>
          <a href={url} target="_blank" rel="noreferrer">
            <img
              src={url}
              alt="File"
              className="image-list"
              width={300}
              height={300}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <video
              src={url}
              className="image-list"
              width={200}
              height={150}
              style={{ display: "none" }}
              controls
            />
          </a>
        </div>
      );
    });

    setData(images);
    setShowData(true);
  };

  const deleteFile = async (index) => {
    try {
      await contract.deleteUrl(index);
      alert("Image deleted successfully");
      getdata();
    } catch (e) {
      alert("Error deleting image");
    }
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          className="address"
          placeholder="Enter the Account address"
        />
        <button className="search-button" onClick={getdata}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {showData && (
        <div className="blank-container">
          <div className="image-grid">
            {data}
            <button className="close-container" onClick={() => setShowData(false)}>
              <i className="fa-sharp fa-solid fa-circle-xmark fa-2xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Display.propTypes = {
  contract: PropTypes.shape({
    display: PropTypes.func,
    deleteUrl: PropTypes.func,
  }),
  account: PropTypes.string,
};

export default Display;
