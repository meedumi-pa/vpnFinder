import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./reports.css";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Toast from "../../Components/Toast/Toast";

const CSVDownload = () => {
  const [csvData, setCsvData] = useState([]);
  const [term1, setterm1] = useState("");
  const [term2, setterm2] = useState("");
  const [showcsv, setshowcsv] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [districts, setDistricts] = useState([
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullativu",
    "Vavuniya",
    "Kurunegala",
    "Puttalam",
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Anuradhapura",
    "Polonnaruwa",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Kegalle",
    "Ratnapura",
    "Ampara",
    "Batticoloa",
    "Trincomalee",
    "Badulla",
    "Monaragala",
    "Galle",
    "Matara",
    "Hambantota",
  ]);

  const [provinces, setProvinces] = useState([
    "Northern Province",
    "North Western Province",
    "Western Province",
    "North Central Province",
    "Central Province",
    "Sabaragamuwa Province",
    "Eastern Province",
    "Uva Province",
    "Southern ",
  ]);
  const [RegionList, setRegionList] = useState([
    "Colombo 1",
    "Colombo 2",
    "Colombo 3",
    "Gampaha 1",
    "Gampaha 2",
    "Gampaha 3",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwaraeliya",
    "Ratnapura",
    "Ratnapura 2",
    "Kegalle",
    "Anuradhapura",
    "Polonnaruwa & Trinco",
    "Galle",
    "Matara",
    "Hambanthota",
    "Kurunegala",
    "Puttalam",
    "Badulla",
    "Monaragala & Ampara",
    "Batticaloa",
    "Jaffna",
  ]);

  const handleOptionChange = (event) => {
    setterm1(event.target.value);
  };
  const handleSuggestionClick = (value, type) => {
    switch (type) {
      case "region":
        setterm2(value);
        break;
      case "province":
        setterm2(value);
        break;
      case "district":
        setterm2(value);

        break;
      default:
        break;
    }
  };
  const handleXLSDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");

    // Save the file
    XLSX.writeFile(wb, "BranchDetails.xlsx");
  };

  const handleCSV = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/reports?term1=${term1}&term2=${term2}`
      );

      const data = response.data;
      if (data && data.length > 0) {
        setCsvData(data);
        setSubmitClicked(true);
      } else {
        setShowToast(true);
        setToastMessage("No data available");
        setToastType("danger");
        console.warn("No CSV data received or empty response");
      }
    } catch (error) {
      setShowToast(true);
      setToastMessage("Error fetching CSV data");
      setToastType("danger");
      console.error("Error fetching CSV data:", error);
    }
  };

  const ResetFields = () => {
    setterm1("");
    setterm2("");
    setSubmitClicked(false);
  };

  return (
    <div className="reports">
      {showcsv && (
        <div className="csv-container">
          <legend>Download as CSV</legend>

          <div className="row">
            <label htmlFor="csvOption">Select CSV Option</label>
            <select id="csvOption" value={term1} onChange={handleOptionChange}>
              <option value="" disabled>
                Choose an option..
              </option>
              <option value="alldetails">All Branch details</option>
              <option value="region">Region</option>
              <option value="province">Province</option>
              <option value="district">District</option>
            </select>
          </div>

          {term1 === "region" && (
            <div className="row">
              <label htmlFor="regionSelect">Select Region:</label>
              <select
                id="regionSelect"
                value={term2 || ""}
                onChange={(e) =>
                  handleSuggestionClick(e.target.value, "region")
                }
              >
                <option value="" disabled>
                  Choose a Region..
                </option>
                {RegionList.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          )}
          {term1 === "province" && (
            <div className="row">
              <label>Select Province:</label>
              <select
                value={term2 || ""}
                onChange={(e) =>
                  handleSuggestionClick(e.target.value, "province")
                }
              >
                <option value="" disabled>
                  Choose a Province..
                </option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          )}
          {term1 === "district" && (
            <div className="row">
              <label>Select District:</label>
              <select
                value={term2 || ""}
                onChange={(e) =>
                  handleSuggestionClick(e.target.value, "district")
                }
              >
                <option value="" disabled>
                  Choose a district..
                </option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          )}
          {submitClicked && (
            <>
              <button className="csvlink" onClick={handleXLSDownload}>
                Download XLS
              </button>
            </>
          )}
          <div className="formRow-btn">
            <button type="submit" className="csvbtn" onClick={ResetFields}>
              Clear
            </button>

            <button className="csvbtn" onClick={handleCSV}>
              Submit
            </button>
          </div>
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CSVDownload;
