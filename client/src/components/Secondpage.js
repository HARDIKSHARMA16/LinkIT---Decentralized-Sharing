import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { CONTRACT_ADDRESS } from "../config";
import React from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./Secondfile.css";
import "./FileUpload.css";
import FileUpload from "./FileUpload";
import Modal from "./Modal";
import Display from "./Display";
import Discordsvg from "./Discordsvg";
import Twittersvg from "./Twittersvg";
import Instagramsvg from "./Instagramsvg";
import firstpageBackground from "./images/firstpage.jpg";



const Secondpage = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [data, setData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let isRequestingAccounts = false;
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        if (!isRequestingAccounts) {
          isRequestingAccounts = true;
          try {
            // await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            let contractAddress = CONTRACT_ADDRESS;
            const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
            setContract(contract);
            setProvider(provider);
          } catch (error) {
            console.error("Error requesting accounts:", error);
          } finally {
            isRequestingAccounts = false;
          }
        }
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);



  const [currentButton, setCurrentButton] = useState("upload");

  const handleUploadClick = () => {
    setCurrentButton("upload");
  };

  const handleShareClick = () => {
    setCurrentButton("share");
  };

  return (
    <>
      {/* Navbar section */}
      <div className="navbar-section">
        <Navbar />
      </div>

      <div className="file-container">  
        <h1> Upload Or Share Your Files</h1>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
      </div>

     

      <div className="upload-check-section">
        <h2 className="check-head">My Uploads</h2>
        <p className="check-para">
          The &apos;My Uploads &apos; section of our decentralized image storage platform
          allows you to view all the images you have uploaded by clicking the
          search button. If someone has shared an image with you, you can also
          view it by entering the account address of the user who shared it into
          the search bar field. This will display all the images that have been
          shared with you by that user.
        </p>
        <Display contract={contract} account={account}></Display>
      </div>

      <div className="footer-section">
        <div className="column1">
          <h2 className="column1-heading">Contact Us</h2>
          <p className="column1-para">LinkIT@gmail.com</p>
        </div>

        <div className="column2">
          <h2 className="column2-text">Get involved</h2>
          <div className="social-icons">
            <Discordsvg />
            <Twittersvg />
            <Instagramsvg />
          </div>
        </div>

        <div className="column3">
          <p className="Column3-text">
            © 2025  LinkIT. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Secondpage;
