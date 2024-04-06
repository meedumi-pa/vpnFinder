import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./reports.css";
import { FaTimes } from "react-icons/fa";
import html2canvas from "html2canvas";

const PdfDownload = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBranchCode, setSelectedBranchCode] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [branchDetails, setBranchDetails] = useState(null);
  const [statusDetails, setStatusDetails] = useState(null);
  const [regionSuggestion, setRegionsuggestion] = useState([]);
  const [branchSuggestions, setBranchSuggestions] = useState([]);
  const [bCodeSuggestions, setbCodeSuggestions] = useState([]);

  const [showpdfForm, setshowpdfForm] = useState(true);

  const handleRegion = async (event) => {
    const regionName = event.target.value;
    setSelectedRegion(regionName);

    // Fetch branch names based on the selected region
    const suggestBranchUrl = `http://localhost:3001/branches?region=${encodeURIComponent(
      regionName
    )}`;

    try {
      const response = await axios.get(suggestBranchUrl);
      setBranchSuggestions(response.data); // Update branchSuggestions state with fetched branch names
      console.log("Branch Suggestions:", response.data); // Add this line to debug
    } catch (error) {
      console.error("Error fetching branch suggestions:", error);
      // Handle the error here, maybe display a message to the user
    }
  };

  const handleBranchName = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleStatus = async (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleBranchCode = async (event) => {
    const bCode = event.target.value;
    setSelectedBranchCode(bCode);

    const suggestBranchCodeUrl = `http://localhost:3001/branchdetails?term=${encodeURIComponent(
      bCode
    )}`;

    try {
      const response = await axios.get(suggestBranchCodeUrl);
      setbCodeSuggestions(response.data);
      console.log("BranchId Suggestions:", response.data);
    } catch (error) {
      console.error("Error fethching branch code suggestions:", error);
    }
  };

  const handleSuggestionClick = (value, type) => {
    switch (type) {
      case "region":
        setSelectedRegion(value);
        setRegionsuggestion([]); // Clear suggestions after selection
        break;
      case "branch":
        setSelectedBranch(value);
        setBranchSuggestions([]); // Clear suggestions after selection
        break;
      case "branchCode":
        setSelectedBranchCode(value);
        setbCodeSuggestions([]);
        break;
      default:
        break;
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(branchSuggestions);

      setSelectedRegion("");
      setBranchSuggestions([]);
      // Avoid using window.location.reload() if possible, it's better to manage state
    }
  };
  const handleSubmit = async () => {
    let response;
    try {
      if (selectedBranch && selectedBranchCode) {
        response = await axios.post("http://localhost:3001/pdf", {
          bname: selectedBranch,
          branchCode: selectedBranchCode,
        });
        setBranchDetails(response.data);
        setStatusDetails(null);
      } else if (selectedStatus) {
        response = await axios.post("http://localhost:3001/pdf", {
          status: selectedStatus,
        });
        setStatusDetails(response.data);
        setBranchDetails(null);
      } else {
      }
    } catch (error) {
      console.error("Error fetching branch details: ", error);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("pdfResults"); // Assuming 'pdfResults' is the id of the div containing your content
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("branch_details.pdf");
    });
  };

  const handleClosepdfForm = () => {
    setBranchDetails(null);
    window.location.reload();
  };

  const ResetFields = () => {
    setSelectedRegion("");
    setSelectedBranch("");
    setSelectedBranchCode("");
    setRegionsuggestion([]);
    setBranchSuggestions([]);
    setbCodeSuggestions([]);
  };
  const showDate = () => {
    const date = new Date();
    return (
      date.getDate() + " / " + date.getMonth() + " / " + date.getFullYear()
    );
  };

  const showTime = () => {
    const time = new Date();
    return (
      time.getHours() + " : " + time.getMinutes() + " : " + time.getSeconds()
    );
  };
  return (
    <div className="main">
      {showpdfForm && (
        <div className="pdf-container">
          <legend>Download as PDF</legend>

          <div className="row">
            <label>Select Region: </label>
            <input
              type="text"
              value={selectedRegion}
              placeholder="Search by Region name"
              onChange={handleRegion}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="row">
            <label>Branch Name: </label>
            <input
              type="text"
              value={selectedBranch}
              placeholder="Search by Branch name"
              onChange={handleBranchName}
            />
          </div>

          <div className="row">
            <label>Select Branch Code: </label>
            <input
              type="text"
              value={selectedBranchCode}
              placeholder="Search by Branch code"
              onChange={handleBranchCode}
            />
          </div>

          <div className="row">
            <label> Select option:</label>
            <select value={selectedStatus} onChange={handleStatus}>
              <option value="">Select Option...</option>
              <option value="WH">Warehouse</option>
              <option value="branch">Branch</option>
              <option value="RMO">R.M.Office</option>
            </select>
          </div>
          <div className="Branch_suggestion">
            {branchSuggestions.map((branch, index) => (
              <div
                key={index}
                className="branches"
                onClick={() => handleSuggestionClick(branch, "branch")}
              >
                {branch}
              </div>
            ))}
          </div>
          <div className="btngroup">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <button type="submit" onClick={ResetFields}>
              Reset
            </button>
          </div>
        </div>
      )}

      {selectedBranch &&
        selectedBranchCode &&
        branchDetails &&
        branchDetails.length > 0 && (
          <div className="pdfMain">
            <div id="pdfResults" className="pdfResults">
              <FaTimes
                className="close-icon-pdf"
                onClick={handleClosepdfForm}
              />
              <legend style={{ marginBottom: "0" }}>
                Lanka Sathosa Limited
              </legend>
              <p style={{ color: "black", textAlign: "center" }}>
                Branch Details Report
              </p>
              <div className="detailItem-head">
                <div className="pdf-row">
                  <label>Branch Id </label>
                  <p style={{ color: "black" }}>:</p>
                  <span style={{ width: "400px" }}>
                    {branchDetails[0].BranchId}
                  </span>

                  <label>Date</label>
                  <p style={{ color: "black" }}>:</p>
                  <span>{showDate()}</span>
                </div>

                <div className="pdf-row">
                  <label>Branch Name</label>
                  <p style={{ color: "black" }}>:</p>
                  <span style={{ width: "400px" }}>
                    {branchDetails[0].BranchName}
                  </span>

                  <label>Time</label>
                  <p style={{ color: "black" }}>:</p>
                  <span>{showTime()}</span>
                </div>
              </div>
              <hr style={{ backgroundColor: "#000" }} />

              <div className="detailItem">
                <div className="pdf-row">
                  <label>Province </label>
                  <p>:</p>
                  <span style={{ width: "200px" }}>
                    {branchDetails[0].Province}
                  </span>
                </div>
                <div className="pdf-row">
                  <label>District </label>
                  <p>:</p>
                  <span>{branchDetails[0].District}</span>
                </div>
                <div className="pdf-row">
                  <label>Region </label>
                  <p>:</p>
                  <span>{branchDetails[0].Region}</span>
                </div>
                <div className="pdf-row">
                  <label>Branch Manager Name </label>
                  <p>:</p>
                  <span>{branchDetails[0].BranchManager}</span>
                </div>
                <div className="pdf-row">
                  <label>Branch Address </label>
                  <p>:</p>
                  <span className="baddress">
                    {branchDetails[0].BranchAddress}
                  </span>
                </div>
                <div className="pdf-row">
                  <label>Telephone No </label>
                  <p>:</p>
                  <span>{branchDetails[0].BranchTelephoneNo}</span>
                </div>
                <div className="pdf-row">
                  <label>Mobile No </label>
                  <p>:</p>
                  <span>{branchDetails[0].MobileNo}</span>
                </div>
                <div className="pdf-row">
                  <label>Email </label>
                  <p>:</p>
                  <span>{branchDetails[0].Email}</span>
                </div>
                <hr />
                <div className="pdf-row">
                  <label>Vpn Id </label>
                  <p>:</p>
                  <span>{branchDetails[0].VPN_Circuit_ID}</span>
                </div>
                <div className="pdf-row">
                  <label>SD Wan Id </label>
                  <p>:</p>
                  <span>{branchDetails[0].SD_WAN_ID}</span>
                </div>
                <div className="pdf-row">
                  <label>Gateway IP </label>
                  <p>:</p>
                  <span>{branchDetails[0].VPN_GatewayIP}</span>
                </div>
                <div className="pdf-row">
                  <label>Server IP </label>
                  <p>:</p>
                  <span>{branchDetails[0].ServerIP}</span>
                </div>
                <div className="pdf-row">
                  <label>Manager PC IP </label>
                  <p>:</p>
                  <span>{branchDetails[0].BackOfficeIP}</span>
                </div>
                <hr></hr>

                <button className="pdfbtn" onClick={generatePDF}>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      {selectedStatus && statusDetails && statusDetails.length > 0 && (
        <div className="pdfMainstatus">
          <div id="statusResults" className="statusResults">
            <FaTimes className="close-icon-pdf" onClick={handleClosepdfForm} />
            <legend>Lanka Sathosa Limited</legend>
            <p style={{ color: "black", textAlign: "center" }}>
              Details Report
            </p>
            <div className="row-status">
              <label>Shop Count </label>
              <p style={{ color: "black" }}>:</p>
              <span style={{ width: "400px" }}>{statusDetails[0].length}</span>
            </div>
            <div className="row-status">
              <label>Date</label>
              <p style={{ color: "black" }}>:</p>
              <span>{showDate()}</span>
            </div>
            <div className="row-status">
              <label>Time</label>
              <p style={{ color: "black" }}>:</p>
              <span>{showTime()}</span>
            </div>
            <table className="pdf-table">
              <thead>
                <tr>
                  <th>Province</th>
                  <th>District</th>
                  <th>Region</th>
                  <th>Branch Code</th>
                  <th className="branch-name">Branch Name</th>
                  <th className="baddress">Branch Address</th>
                  <th>Opening Date</th>
                  <th>Branch Telephone Number</th>
                  <th>Mobile Nummber</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {statusDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.Province}</td>
                    <td>{detail.District}</td>
                    <td>{detail.Region}</td>
                    <td>{detail.BranchId}</td>
                    <td>{detail.BranchName}</td>
                    <td>{detail.BranchAddress}</td>
                    <td>{detail.OpeningDate}</td>
                    <td>{detail.BranchTelephoneNo}</td>
                    <td>{detail.MobileNo}</td>
                    <td>{detail.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfDownload;
