import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inputvpn.css";
import Button from "react-bootstrap/Button";
import { FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../../../Components/Toast/Toast";

const Inputform = () => {
  const [showForm, setShowForm] = useState(true);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [provinces, setProvinces] = useState([
    {
      id: 1,
      name: "Northern Province",
      districts: ["Jaffna", "Kilinochchi", "Mannar", "Mullativu", "Vavuniya"],
    },
    {
      id: 2,
      name: "North Western Province",
      districts: ["Kurunegala", "Puttalam"],
    },
    {
      id: 3,
      name: "Western Province",
      districts: ["Colombo", "Gampaha", "Kalutara"],
    },
    {
      id: 4,
      name: "North Central Province",
      districts: ["Anuradhapura", "Polonnaruwa"],
    },
    {
      id: 5,
      name: "Central Province",
      districts: ["Kandy", "Matale", "Nuwara Eliya"],
    },
    {
      id: 6,
      name: "Sabaragamuwa Province",
      districts: ["Kegalle", "Ratnapura"],
    },
    {
      id: 7,
      name: "Eastern Province",
      districts: ["Ampara", "Batticoloa", "Trincomalee"],
    },
    { id: 8, name: "Uva Province", districts: ["Badulla", "Monaragala"] },
    {
      id: 9,
      name: "Southern Province",
      districts: ["Galle", "Matara", "Hambantota"],
    },
  ]);

  const [selectedRegion, setSelectedRegion] = useState([
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

  const [checkedvalue, setCheckedvalue] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [Region, setRegion] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [BranchCode, setBranchCode] = useState("");
  const [BranchName, setBranchName] = useState("");
  const [BranchAddress, setBranchAddress] = useState("");
  const [TelephoneNumber, setTelephoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [DSdevision, setDSdivision] = useState("");
  const [VPNCircuitID, setVPNCircuitID] = useState("");
  const [SdWanID, setSdWanId] = useState("");
  const [GatewayIP, setGatewayIP] = useState("");
  const [ServerIP, setServerIP] = useState("");
  const [ManagerPCIP, setManagerPCIP] = useState("");
  const [FingerPrintIP, setFingerPrintIP] = useState("");
  const [AP, setAP] = useState("");
  const [LQAP, setLQAP] = useState("");
  const [POS01, setPOS01] = useState("");
  const [POS02, setPOS02] = useState("");
  const [POS03, setPOS03] = useState("");
  const [POS04, setPOS04] = useState("");
  const [POS05, setPOS05] = useState("");
  const [POS06, setPOS06] = useState("");
  const [LQ_POS01, setLQ_POS01] = useState("");
  const [LQ_POS02, setLQ_POS02] = useState("");
  const [AreaManagerName, setAreaManagerName] = useState("");
  const [EPFno_Am, setEPFno_Am] = useState("");
  const [ContactNo_Am, setContactNo_Am] = useState("");
  const [branchManagerName, setBranchManagerName] = useState("");
  const [EPFno_Sm, setEPFno_Sm] = useState("");
  const [ContactNo_Sm, setContactNo_Sm] = useState("");
  const [errors, setErrors] = useState({
    checkedvalue,
    selectedProvince,
    selectedDistrict,
    BranchCode,
    BranchName,
    BranchAddress,
    TelephoneNumber,
    Email,
    DSdevision,
    VPNCircuitID,
    SdWanID,
    GatewayIP,
    ServerIP,
    ManagerPCIP,
    FingerPrintIP,
    AP,
    LQAP,
    POS01,
    POS02,
    POS03,
    POS04,
    POS05,
    POS06,
    LQ_POS01,
    LQ_POS02,
    Region,
    openDate,
    AreaManagerName,
    EPFno_Am,
    ContactNo_Am,
    branchManagerName,
    EPFno_Sm,
    ContactNo_Sm,
  });

  const [togglemode, setTogglemode] = useState(true);
  const [togglemode2, setTogglemode2] = useState(false);
  const [togglemode3, setTogglemode3] = useState(false);
  const [togglemode4, setTogglemode4] = useState(false);

  useEffect(() => {
    setShowForm(true);
    return () => {
      setShowForm(false);
    };
  });

  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    const error = formValidation();
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    const error = formValidation();
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };
  const handleCheckboxChange = (event) => {
    setCheckedvalue(event.target.value);
    console.log("Checked value");

    const error = formValidation();
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "TelephoneNumber":
        setTelephoneNumber(value);
        break;
      case "openDate":
        setOpenDate(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "DSdevision":
        setDSdivision(value);
        break;
      case "ContactNo_Am":
        setContactNo_Am(value);
        break;
      case "ContactNo_Sm":
        setContactNo_Sm(value);
        break;
      default:
        break;
    }

    const error = formValidation(name, value);
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));

    // setErrors((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));
  };
  const isValidIPAddress = (value) => {
    const ipv4WithSubnetRegex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/(3[0-2]|[12]?[0-9]))?$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

    return ipv4WithSubnetRegex.test(value) || ipv6Regex.test(value);
  };

  const formValidation = () => {
    const newErrors = {};
    if (!checkedvalue) {
      newErrors.checkedvalue = "* Branch Type is required.";
    }
    if (!selectedProvince || !selectedDistrict) {
      newErrors.selectedProvince = "* Province and  District is required.";
    }

    if (!openDate) {
      newErrors.openDate = "* Opening date is required.";
    }
    if (!TelephoneNumber) {
      newErrors.TelephoneNumber = " * Telephone number is required.";
    } else if (!/^\d{10}$/.test(TelephoneNumber)) {
      newErrors.TelephoneNumber =
        " * Invalid telephone number format (10 digits expected).";
    }
    if (!Email) {
      newErrors.Email = "* Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      newErrors.Email = " * Invalid email format.";
    }
    if (!DSdevision) {
      newErrors.DSdevision = " * Ds devision is required.";
    }
    if (!ContactNo_Am) {
      newErrors.ContactNo_Am = " * Contact number is required.";
    } else if (!/^\d{10}$/.test(ContactNo_Am)) {
      newErrors.ContactNo_Am =
        " * Invalid Contact number format (10 digits expected).";
    }
    if (!ContactNo_Sm) {
      newErrors.ContactNo_Sm = " * Contact number is required.";
    } else if (!/^\d{10}$/.test(ContactNo_Sm)) {
      newErrors.ContactNo_Sm =
        "* Invalid Contact number format (10 digits expected).";
    }
    if (!isValidIPAddress(GatewayIP)) {
      newErrors.GatewayIP = " * Invalid IP Address";
    }
    if (!isValidIPAddress(ServerIP)) {
      newErrors.ServerIP = " * Invalid IP Address";
    }
    if (!isValidIPAddress(ManagerPCIP)) {
      newErrors.ManagerPCIP = " * Invalid IP Address";
    }
    if (!isValidIPAddress(FingerPrintIP)) {
      newErrors.FingerPrintIP = " * Invalid IP Address";
    }
    if (!isValidIPAddress(AP)) {
      newErrors.AP = " * Invalid IP Address";
    }
    if (!isValidIPAddress(LQAP)) {
      newErrors.LQAP = " * Invalid IP Address";
    }
    if (!isValidIPAddress(POS01)) {
      newErrors.POS01 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(POS02)) {
      newErrors.POS02 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(POS03)) {
      newErrors.POS03 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(POS04)) {
      newErrors.POS04 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(POS05)) {
      newErrors.POS05 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(POS06)) {
      newErrors.POS06 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(LQ_POS01)) {
      newErrors.LQ_POS01 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(LQ_POS02)) {
      newErrors.LQ_POS02 = " * Invalid IP Address";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted!");
    } else {
      setErrors(newErrors);
    }
    const requiredFields = [
      selectedProvince,
      selectedDistrict,
      BranchCode,
      BranchName,
      BranchAddress,
      TelephoneNumber,
      Email,
      DSdevision,
      VPNCircuitID,
      SdWanID,
      GatewayIP,
      ServerIP,
      ManagerPCIP,
      FingerPrintIP,
      AP,
      LQAP,
      POS01,
      POS02,
      POS03,
      POS04,
      POS05,
      POS06,
      LQ_POS01,
      LQ_POS02,
      Region,
      openDate,
      AreaManagerName,
      EPFno_Am,
      ContactNo_Am,
      branchManagerName,
      EPFno_Sm,
      ContactNo_Sm,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      setShowToast(true);
      showToastMessage("Please fill in all required fields", "danger");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }
  };
  const submitReview = async (e) => {
    e.preventDefault();
    console.log("submit clicked");
    const isValid = formValidation();
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3001/insert", {
          BranchCode,
          BranchName,
          BranchAddress,
          TelephoneNumber,
          Email,
          DSdevision,
          VPNCircuitID,
          GatewayIP,
          ServerIP,
          ManagerPCIP,
          FingerPrintIP,
          AP,
          LQAP,
          POS01,
          POS02,
          POS03,
          POS04,
          POS05,
          POS06,
          LQ_POS01,
          LQ_POS02,
          Region,
          openDate,
          AreaManagerName,
          EPFno_Am,
          ContactNo_Am,
          branchManagerName,
          EPFno_Sm,
          ContactNo_Sm,
          BranchType: checkedvalue,
          selectedProvince: selectedProvince,
          selectedDistrict: selectedDistrict,
          SdWanID,
        });

        resetFormFields();
        console.log(response.data);
        // Operation was successful
        console.log("Successful Insert");
        setShowToast(true);
        showToastMessage("Successful Insert", "success");

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setShowForm(false);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Duplicate entry error handling
          setShowToast(true);
          showToastMessage(
            "Duplicate Entry: This data already exists",
            "danger"
          );
          console.error("Duplicate entry:", error.response.data.error);
        } else {
          // Other error handling
          setShowToast(true);
          showToastMessage(`Unexpected error: ${error.message}`, "danger");
          console.error("Error:", error.message);
        }
      }
    } else {
      console.log(
        "Form validation failed, please correct errors before submitting."
      );
    }
  };
  const resetFormFields = () => {
    if (!showForm) {
      setOpenDate("");
      setRegion("");
      setBranchCode("");
      setBranchName("");
      setBranchAddress("");
      setTelephoneNumber("");
      setEmail("");
      setDSdivision("");
      setVPNCircuitID("");
      setSdWanId("");
      setGatewayIP("");
      setServerIP("");
      setManagerPCIP("");
      setFingerPrintIP("");
      setAP("");
      setLQAP("");
      setPOS01("");
      setPOS02("");
      setPOS03("");
      setPOS04("");
      setPOS05("");
      setPOS06(" ");
      setLQ_POS01(" ");
      setLQ_POS02(" ");
      setAreaManagerName(" ");
      setContactNo_Am(" ");
      setEPFno_Am(" ");
      setBranchManagerName("");
      setContactNo_Sm(" ");
      setEPFno_Sm(" ");
      setSelectedProvince("");
      setSelectedDistrict("");
      setCheckedvalue(false);
    }
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleToggleMode = () => {
    setTogglemode(true);
    setTogglemode2(false);
    setTogglemode3(false);
    setTogglemode4(false);
  };

  const handleToggleMode2 = () => {
    setTogglemode(false);
    setTogglemode2(true);
    setTogglemode3(false);
    setTogglemode4(false);
  };

  const handleToggleMode3 = () => {
    setTogglemode(false);
    setTogglemode2(false);
    setTogglemode3(true);
    setTogglemode4(false);
  };

  const handleToggleMode4 = () => {
    setTogglemode(false);
    setTogglemode2(false);
    setTogglemode3(false);
    setTogglemode4(true);
  };

  const handleResetIForm = () => {
    setOpenDate("");
    setRegion("");
    setBranchCode("");
    setBranchName("");
    setBranchAddress("");
    setTelephoneNumber("");
    setEmail("");
    setDSdivision("");
    setVPNCircuitID("");
    setSdWanId("");
    setGatewayIP("");
    setServerIP("");
    setManagerPCIP("");
    setFingerPrintIP("");
    setAP("");
    setLQAP("");
    setPOS01("");
    setPOS02("");
    setPOS03("");
    setPOS04("");
    setPOS05("");
    setPOS06("");
    setLQ_POS01("");
    setLQ_POS02("");
    setAreaManagerName(" ");
    setContactNo_Am(" ");
    setEPFno_Am(" ");
    setBranchManagerName("");
    setContactNo_Sm(" ");
    setEPFno_Sm(" ");
    setSelectedProvince("");
    setSelectedDistrict("");
    setCheckedvalue(false);
  };
  return (
    <div className="addvpn">
      {showForm && (
        <div className="formContainer">
          <div className="formRow" style={{ position: "relative" }}>
            <legend className="topic" style={{ fontSize: "20px" }}>
              {" "}
              Add VPN Details
            </legend>
          </div>
          <div
            className={`toggleBranch toggleBranch1 ${
              togglemode ? "active" : ""
            }`}
            onClick={handleToggleMode}
          >
            <legend> Branch Details</legend>
          </div>
          {togglemode && (
            <div className="details">
              <div className="checkbox-row">
                <input
                  type="radio"
                  id="warehouse"
                  name="warehouse"
                  value="warehouse"
                  checked={checkedvalue === "warehouse"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="warehouse">WareHouse</label>
                <input
                  type="radio"
                  id="branch"
                  name="branch"
                  value="branch"
                  checked={checkedvalue === "branch"}
                  onChange={handleCheckboxChange}
                />{" "}
                <label htmlFor="branch">Branch</label>
              </div>
              {errors.checkedvalue && (
                <div
                  className="error"
                  style={{ marginLeft: "120px", marginBottom: "10px" }}
                >
                  {errors.checkedvalue}
                </div>
              )}
              <div className="formRow">
                <div className="formColumn">
                  <label>Province</label>
                  <select
                    id="selectedProvince"
                    name="selectedProvince"
                    value={selectedProvince || " "}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Select a Province</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formColumn">
                  <label>District</label>
                  <select
                    id="selectedDistrict"
                    name="selectedDistrict"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedProvince}
                  >
                    <option value="" disabled>
                      Select a District
                    </option>
                    {selectedProvince &&
                      provinces
                        .find((p) => p.name === selectedProvince)
                        .districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>Region</label>
                  <select
                    id="Region"
                    name="Region"
                    value={Region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option>Select Region...</option>
                    {selectedRegion.map((region, index) => (
                      <option key={index} value={region} className="region">
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formColumn">
                  <label>Opening Date</label>
                  <input
                    type="date"
                    name="openDate"
                    value={openDate}
                    placeholder="Opening Date"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn"></div>
                <div className="formColumn">
                  {errors.openDate && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.openDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>Branch Code</label>
                  <input
                    type="text"
                    name="BranchCode"
                    value={BranchCode}
                    placeholder="Branch Code"
                    onChange={(e) => {
                      setBranchCode(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>Branch Name</label>
                  <input
                    type="text"
                    name="BranchName"
                    value={BranchName}
                    placeholder="Branch Name"
                    onChange={(e) => {
                      setBranchName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>Branch Address</label>
                  <textarea
                    className="form-input-large1"
                    name="BranchAddress"
                    value={BranchAddress}
                    placeholder="Branch Address"
                    onChange={(e) => {
                      setBranchAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>Telephone Number</label>
                  <input
                    type="text"
                    name="TelephoneNumber"
                    value={TelephoneNumber}
                    placeholder="Telephone Number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn"></div>
                <div className="formColumn">
                  {errors.TelephoneNumber && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.TelephoneNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>Email</label>
                  <input
                    type="text"
                    name="Email"
                    value={Email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="formColumn">
                  <label>D.S. Division</label>
                  <input
                    type="text"
                    name="DSdevision"
                    value={DSdevision}
                    placeholder="District Secretial Division "
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.Email && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.Email}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.DSdevision && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.DSdevision}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div
            className={`toggleBranch toggleBranch2 ${
              togglemode2 ? "active" : ""
            }`}
            onClick={handleToggleMode2}
          >
            <legend>Network Details</legend>
          </div>
          {togglemode2 && (
            <div className="details">
              <div className="formRow">
                <div className="formColumn">
                  <label>VPN Circuit ID</label>
                  <input
                    type="text"
                    name="VPNCircuitID"
                    value={VPNCircuitID}
                    placeholder="VPN Circuit ID"
                    onChange={(e) => {
                      setVPNCircuitID(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>SD WAN ID</label>
                  <input
                    type="text"
                    name="SDWanID"
                    value={SdWanID}
                    placeholder="SDWanID"
                    onChange={(e) => {
                      setSdWanId(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>Gateway IP</label>
                  <input
                    type="text"
                    name="GatewayIP"
                    value={GatewayIP}
                    placeholder="Gateway IP"
                    onChange={(e) => {
                      setGatewayIP(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>Server IP</label>
                  <input
                    type="text"
                    name="ServerIP"
                    value={ServerIP}
                    placeholder="Server IP"
                    onChange={(e) => {
                      setServerIP(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.GatewayIP && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.GatewayIP}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.ServerIP && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.ServerIP}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>ManagerPC IP</label>
                  <input
                    type="text"
                    name="ManagerPCIP"
                    value={ManagerPCIP}
                    placeholder="ManagerPC IP"
                    onChange={(e) => {
                      setManagerPCIP(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>FingerPrint IP</label>
                  <input
                    type="text"
                    name="FingerPrintIP"
                    value={FingerPrintIP}
                    placeholder="FingerPrint IP"
                    onChange={(e) => {
                      setFingerPrintIP(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.ManagerPCIP && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.ManagerPCIP}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.FingerPrintIP && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.FingerPrintIP}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>AP</label>
                  <input
                    type="text"
                    name="AP"
                    value={AP}
                    placeholder="AP"
                    onChange={(e) => {
                      setAP(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>LQAP</label>
                  <input
                    type="text"
                    name="LQAP"
                    value={LQAP}
                    placeholder="LQAP"
                    onChange={(e) => {
                      setLQAP(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.AP && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.AP}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.LQAP && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.LQAP}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div
            className={`toggleBranch toggleBranch3 ${
              togglemode3 ? "active" : ""
            }`}
            onClick={handleToggleMode3}
          >
            <legend> POS Machine Details</legend>
          </div>
          {togglemode3 && (
            <div className="details">
              <div className="formRow">
                <div className="formColumn">
                  <label>POS 01</label>
                  <input
                    type="text"
                    name="POS01"
                    value={POS01}
                    placeholder="POS 01"
                    onChange={(e) => {
                      setPOS01(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>POS 02</label>
                  <input
                    type="text"
                    name="POS02"
                    value={POS02}
                    placeholder="POS 02"
                    onChange={(e) => {
                      setPOS02(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.POS01 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.POS01}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.POS02 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.POS02}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>POS 03</label>
                  <input
                    type="text"
                    name="POS03"
                    value={POS03}
                    placeholder="POS 03"
                    onChange={(e) => {
                      setPOS03(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>POS 04</label>
                  <input
                    type="text"
                    name="POS04"
                    value={POS04}
                    placeholder="POS 04"
                    onChange={(e) => {
                      setPOS04(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.POS03 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.POS03}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.POS04 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.POS04}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>POS 05</label>
                  <input
                    type="text"
                    name="POS05"
                    value={POS05}
                    placeholder="POS 05"
                    onChange={(e) => {
                      setPOS05(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>POS 06</label>
                  <input
                    type="text"
                    name="POS06"
                    value={POS06}
                    placeholder="POS 06"
                    onChange={(e) => {
                      setPOS06(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.POS05 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.POS05}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.POS06 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.POS06}
                    </div>
                  )}
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label>POS 01 - Liqor</label>
                  <input
                    type="text"
                    name="LQ_POS01"
                    value={LQ_POS01}
                    placeholder="POS 01 - Liqor"
                    onChange={(e) => {
                      setLQ_POS01(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>POS 02 - Liqor</label>
                  <input
                    type="text"
                    name="LQ_POS02"
                    value={LQ_POS02}
                    placeholder="POS 02 - Liqor"
                    onChange={(e) => {
                      setLQ_POS02(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  {errors.LQ_POS01 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.LQ_POS01}
                    </div>
                  )}
                </div>
                <div className="formColumn">
                  {errors.LQ_POS02 && (
                    <div className="error" style={{ marginLeft: "120px" }}>
                      {errors.LQ_POS02}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div
            className={`toggleBranch toggleBranch4 ${
              togglemode4 ? "active" : ""
            }`}
            onClick={handleToggleMode4}
          >
            <legend>Manager Details</legend>
          </div>
          {togglemode4 && (
            <div className="details">
              <div className="formRow">
                <div className="formColumn">
                  <label style={{ width: "200px" }}>Area Manager Name</label>
                  <input
                    type="text"
                    name="AreaManagerName"
                    value={AreaManagerName}
                    placeholder="Area Manager Name"
                    onChange={(e) => {
                      setAreaManagerName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label style={{ width: "280px" }}>EPF Number</label>
                  <input
                    type="text"
                    name="Epf_AM"
                    value={EPFno_Am}
                    placeholder="EPF No"
                    onChange={(e) => {
                      setEPFno_Am(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="ContactNo_Am"
                    value={ContactNo_Am}
                    placeholder="Contact Number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errors.ContactNo_Am && (
                <div className="error" style={{ marginLeft: "500px" }}>
                  {errors.ContactNo_Am}
                </div>
              )}
              <div className="formRow">
                <div className="formColumn">
                  <label style={{ width: "200px" }}>Branch Manager Name</label>
                  <input
                    type="text"
                    name="BranchManagerName"
                    value={branchManagerName}
                    placeholder="Branch Manager Name"
                    onChange={(e) => {
                      setBranchManagerName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formColumn">
                  <label style={{ width: "280px" }}>EPF Number</label>
                  <input
                    type="text"
                    name="Epfno_sm"
                    value={EPFno_Sm}
                    placeholder="EPF No"
                    onChange={(e) => {
                      setEPFno_Sm(e.target.value);
                    }}
                  />
                </div>
                <div className="formColumn">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="ContactNo_Sm"
                    value={ContactNo_Sm}
                    placeholder="Contact Number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errors.ContactNo_Sm && (
                <div className="error" style={{ marginLeft: "500px" }}>
                  {errors.ContactNo_Sm}
                </div>
              )}
            </div>
          )}
          <div className="formRow-btn">
            <Button type="submit" variant="primary" onClick={handleResetIForm}>
              Clear
            </Button>
            <Button type="submit" variant="primary" onClick={submitReview}>
              Submit
            </Button>
          </div>
        </div>
      )}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Inputform;
