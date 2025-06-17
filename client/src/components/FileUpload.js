import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Modal from "./Modal";
import FormData from "form-data";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentButton, setCurrentButton] = useState("upload");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `525a33da2ba4426b2b4d`,
            pinata_secret_api_key: `c843f656b33df72f5a7770511d42c6973994e1c044a75eea0db79ed9d9bb5b99`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progressPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progressPercentage);
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        await signer.add(account, ImgHash);

        alert("Successfully uploaded to Pinata!");

        setFile(null);
        setFileName("No image selected");
        setUploadProgress(0);
      } catch (e) {
        alert("Unable to upload to Pinata");
        console.error(e);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
  };

  const renderPreview = () => {
    if (!file) return null;
    const fileType = file.type.split("/")[0];

    switch (fileType) {
      case "image":
        return <img src={URL.createObjectURL(file)} alt="preview" className="preview-image" />;
      case "video":
        return <video src={URL.createObjectURL(file)} controls className="preview-video" height={150} width={320} />;
      case "audio":
        return <audio src={URL.createObjectURL(file)} controls className="preview-audio" />;
      default:
        return <p>{file.name}</p>;
    }
  };

  return (
    <div className="upload-share-container">
      <div className="toggleWrapper">
        <input type="checkbox" className="dn" id="dn" />
        <label
          htmlFor="dn"
          className="toggle"
          onClick={() =>
            setCurrentButton(currentButton === "share" ? "upload" : "share")
          }
        >
          <span className="toggle__handler"></span>
        </label>
      </div>
      {currentButton === "upload" ? (
        <div className="wrapper">
          <h3>Upload Your Files</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="my-file" id="fileLabel" className="custom-file-upload">
              <i className="fa-solid fa-cloud-arrow-up fa-bounce"></i>
            </label>
            <input
              type="file"
              id="my-file"
              disabled={!account}
              onChange={retrieveFile}
              style={{ display: "none" }}
            />
            {renderPreview()}
            {uploadProgress > 0 && <progress value={uploadProgress} max={100} />}
            <button type="submit" className="upload" disabled={!file}>Upload</button>
          </form>
        </div>
      ) : (
        <div className="share-wrapper">
          <h3>Share Your Files</h3>
          <Modal contract={contract} />
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  contract: PropTypes.shape({ connect: PropTypes.func }),
  account: PropTypes.string,
  provider: PropTypes.shape({ getSigner: PropTypes.func }),
};

export default FileUpload;