import React, { useState } from "react";
import "./search.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BsChevronCompactDown } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../../../Components/Toast/Toast";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [formData, setFormData] = useState({
    Branch_Code: "",
    Branch_Name: "",
    Branch_Address: "",
    Branch_TelephoneNo: "",
    Branch_Email: "",
    VPN_CircuitID: "",
    VPN_GatewayIP: "",
    SDWAN_CircuitID: "",
    ServerIP: "",
    BackOfficeIP: "",
    FingerPrintIP: "",
    AP_IP: "",
    LQAP_IP: "",
    POS01: "",
    POS02: "",
    POS03: "",
    POS04: "",
    POS05: "",
    POS06: "",
    LQPOS01: "",
    LQPOS02: "",
    Region: "",
    OpeningDate: "",
    Province: "",
    District: "",
    DS_Division: "",
    AM_Name: "",
    Contact_BM: "",
    BM_Name: "",
    Contact_AM: "",
  });

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
  const [togglesearch, setTogglesearch] = useState(true);
  const [togglesearch2, setTogglesearch2] = useState(false);
  const [togglesearch3, setTogglesearch3] = useState(false);
  const [togglesearch4, setTogglesearch4] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState({});
  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(searchTerm);

      setSearchTerm("");
      setSuggestions([]);
      window.location.reload();
    }
  };
  const handleInputChangeSearchbar = async (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);

    const apiUrl = `http://localhost:3001/suggestions?term=${newTerm}`;
    console.log("API URL:", apiUrl);

    try {
      const response = await axios.get(apiUrl);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    try {
      const response = await axios.post("http://localhost:3001/search", {
        name: suggestion,
      });
      if (response.data && response.data.length > 0) {
        setFormData(response.data[0]);
        console.log(response.data);
      } else {
        setFormData(null);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
    setSearchTerm("");
  };
  const isValidIPAddress = (value) => {
    const ipv4Regex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

    return ipv4Regex.test(value) || ipv6Regex.test(value);
  };
  const handleSaveChanges = async () => {
    const Province = formData?.Province;
    const District = formData?.District;
    const DS_Division = formData?.DS_Division;
    const OpeningDate = formData?.OpeningDate;
    const BranchTelephoneNo = formData?.Branch_TelephoneNo;
    const Email = formData?.Branch_Email;
    const BranchId = formData?.Branch_Code;
    const BranchName = formData?.Branch_Name;
    const BranchAddress = formData?.Branch_Address;
    const VPNCircuitID = formData?.VPN_CircuitID;
    const SdWanID = formData?.SDWAN_CircuitID;
    const GatewayIP = formData?.VPN_GatewayIP;
    const ServerIP = formData?.ServerIP;
    const ManagerPCIP = formData?.BackOfficeIP;
    const FingerPrintIP = formData?.FingerPrintIP;
    const Region = formData?.Region;
    const AP = formData?.AP_IP;
    const LQAP = formData?.LQAP_IP;
    const POS01 = formData?.POS01;
    const POS02 = formData?.POS02;
    const POS03 = formData?.POS03;
    const POS04 = formData?.POS04;
    const POS05 = formData?.POS05;
    const POS06 = formData?.POS06;
    const LQPOS01 = formData?.LQPOS01;
    const LQPOS02 = formData?.LQPOS02;
    const Contact_AM = formData?.Contact_AM;
    const Contact_BM = formData?.Contact_BM;
    const AM_Name = formData?.AM_Name;
    const BM_Name = formData?.BM_Name;

    const newErrors = {};

    if (!/^\d{10}$/.test(BranchTelephoneNo)) {
      newErrors.BranchTelephoneNo =
        " * Invalid telephone number format (10 digits expected).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      newErrors.Email = " * Invalid email format.";
    }
    if (!/^\d{10}$/.test(Contact_AM)) {
      newErrors.Contact_AM =
        "* Invalid mobile number format (10 digits expected).";
    }
    if (!/^\d{10}$/.test(Contact_BM)) {
      newErrors.Contact_BM =
        "* Invalid mobile number format (10 digits expected).";
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
    if (!isValidIPAddress(LQPOS01)) {
      newErrors.POS07 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(LQPOS01)) {
      newErrors.LQPOS01 = " * Invalid IP Address";
    }
    if (!isValidIPAddress(LQPOS02)) {
      newErrors.LQPOS02 = " * Invalid IP Address";
    }
    if (Object.keys(newErrors).length === 0) {
      // All validations passed, submit the form
      console.log("Form submitted!");
    } else {
      // Update errors state with new errors
      setErrors(newErrors);
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/update",
        formData
      );

      setFormData(response.data);
      setEditMode(false);
      setShowToast(true);
      setToastMessage("Update successful");
      setToastType("success");

      setTimeout(() => {
        setShowToast(false);
        setFormData(null);
      }, 3000);

      console.log(
        "Save changes button clicked. Updated details:",
        response.data
      );
    } catch (error) {
      console.error("Error saving changes:", error);
      setShowToast(true);
      setToastMessage("Update Unsuccessful");
      setToastType("danger");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const handleToggleSearch = () => {
    setTogglesearch(true);
    setTogglesearch2(false);
    setTogglesearch3(false);
    setTogglesearch4(false);
  };
  const handleToggleSearch2 = () => {
    setTogglesearch(false);
    setTogglesearch2(true);
    setTogglesearch3(false);
    setTogglesearch4(false);
  };
  const handleToggleSearch3 = () => {
    setTogglesearch(false);
    setTogglesearch2(false);
    setTogglesearch3(true);
    setTogglesearch4(false);
  };
  const handleToggleSearch4 = () => {
    setTogglesearch(false);
    setTogglesearch2(false);
    setTogglesearch3(false);
    setTogglesearch4(true);
  };
  return (
    <div className="searchContainer">
      {/* {!loggedIn && <LoginForm setLoggedIn={setLoggedIn} />} */}
      <div className="Branch_search">
        <FaSearch id="search-icon" size={15} />
        <input
          type="text"
          className="searchbar"
          value={searchTerm}
          placeholder="Search by Branch Name or Branch Code"
          onChange={handleInputChangeSearchbar}
          onKeyPress={handleKeyPress}
        />
      </div>
      <ul>
        <div
          className="suggestions-container"
          style={{ display: searchTerm.length > 0 ? "block" : "none" }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </ul>

      <div className="Search_results">
        <fieldset>
          <legend>Branch Details</legend>

          <BsChevronCompactDown
            size={25}
            className={`toggleS_branch toggleS_branch1  ${
              togglesearch ? "active" : ""
            }`}
            onClick={handleToggleSearch}
          />

          {togglesearch && (
            <>
              <div className="form-Row">
                <div className="form_field">
                  <label>Branch ID</label>
                  <input
                    type="text"
                    value={formData?.Branch_Code || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Branch_Code", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>Opening Date</label>
                  <input
                    type="date"
                    name="OpeningDate"
                    value={formData?.OpeningDate || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("OpeningDate", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>

              <div className="form-Row">
                <div className="form_field">
                  <label>Branch Name</label>
                  <input
                    type="text"
                    value={formData?.Branch_Name || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Branch_Name", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
                <div className="form_field">
                  <label>Region</label>
                  {editMode ? (
                    <select
                      value={formData?.Region || ""}
                      onChange={(e) =>
                        handleInputChange("Region", e.target.value)
                      }
                    >
                      <option> Select Region ..</option>
                      {selectedRegion.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData?.Region || ""}
                      readOnly={!editMode}
                      onChange={(e) =>
                        handleInputChange("Region", e.target.value)
                      }
                      className={`form-input ${
                        editMode ? "inputEditMode" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label>Province</label>
                  {editMode ? (
                    <select
                      value={formData?.Province || ""}
                      onChange={(e) =>
                        handleInputChange("Province", e.target.value)
                      }
                    >
                      <option value="">Select Province...</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData?.Province || ""}
                      readOnly={!editMode}
                      onChange={(e) =>
                        handleInputChange("Province", e.target.value)
                      }
                      className={`form-input ${
                        editMode ? "inputEditMode" : ""
                      }`}
                    />
                  )}
                </div>

                <div className="form_field">
                  <label>District</label>
                  {editMode ? (
                    <select
                      value={formData?.District || ""}
                      onChange={(e) =>
                        handleInputChange("District", e.target.value)
                      }
                    >
                      <option value="">Select District..</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="District"
                      value={formData?.District || ""}
                      readOnly={!editMode}
                      onChange={(e) =>
                        handleInputChange("District", e.target.value)
                      }
                      className={`form-input ${
                        editMode ? "inputEditMode" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label> Address</label>
                  <textarea
                    id="textareaid"
                    value={formData?.Branch_Address || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Branch_Address", e.target.value)
                    }
                    className={`form-input-large ${
                      editMode ? "inputEditMode" : ""
                    }`}
                    /* style={{ height: textareaHeight }}*/
                  />
                </div>

                <div className="form_field">
                  <label>Telephone No</label>
                  <input
                    type="text"
                    value={formData?.Branch_TelephoneNo || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Branch_TelephoneNo", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field"></div>
                <div className="form_field">
                  {errors.BranchTelephoneNo && (
                    <div className="error-m" style={{ marginTop: "-20px" }}>
                      {errors.BranchTelephoneNo}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-Row">
                <div className="form_field">
                  <label>Email</label>
                  <input
                    type="text"
                    value={formData?.Branch_Email || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Branch_Email", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>DS_Division</label>
                  <input
                    type="text"
                    value={formData?.DS_Division || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("DS_Division", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.Email && (
                    <div className="error-m">{errors.Email}</div>
                  )}
                </div>
              </div>
            </>
          )}
        </fieldset>

        <fieldset>
          <legend>Network Details</legend>
          <BsChevronCompactDown
            size={25}
            className={`toggleS_branch toggleS_branch2  ${
              togglesearch2 ? "active" : ""
            }`}
            onClick={handleToggleSearch2}
          />
          {togglesearch2 && (
            <>
              <div className="form-Row">
                <div className="form_field">
                  <label>VPN Circuit ID</label>
                  <input
                    type="text"
                    value={formData?.VPN_CircuitID || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("VPN_CircuitID", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>SD WAN ID</label>
                  <input
                    type="text"
                    value={formData?.SDWAN_CircuitID || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("SDWAN_CircuitID", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>

              <div className="form-Row">
                <div className="form_field">
                  <label>Server IP</label>
                  <input
                    type="text"
                    value={formData?.ServerIP || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("ServerIP", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>BackOffice IP</label>
                  <input
                    type="text"
                    value={formData?.BackOfficeIP || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("BackOfficeIP", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.ServerIP && (
                    <div className="error-m">{errors.ServerIP}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.ManagerPCIP && (
                    <div className="error-m">{errors.ManagerPCIP}</div>
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label>FingerPrint IP</label>
                  <input
                    type="text"
                    value={formData?.FingerPrintIP || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("FingerPrintIP", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label> Gateway IP</label>
                  <input
                    type="text"
                    value={formData?.VPN_GatewayIP || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("VPN_GatewayIP", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.FingerPrintIP && (
                    <div className="error-m">{errors.FingerPrintIP}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.VPN_GatewayIP && (
                    <div className="error-m">{errors.VPN_GatewayIP}</div>
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label>LQAP(Liquor)</label>
                  <input
                    type="text"
                    value={formData?.LQAP_IP || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("LQAP_IP", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>AP</label>
                  <input
                    type="text"
                    value={formData?.AP_IP || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("AP_IP", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.LQAP_IP && (
                    <div className="error">{errors.LQAP_IP}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.AP_IP && <div className="error">{errors.AP_IP}</div>}
                </div>
              </div>
            </>
          )}
        </fieldset>
        <fieldset>
          <legend>POS Machine Details</legend>
          <BsChevronCompactDown
            size={25}
            className={`toggleS_branch toggleS_branch3  ${
              togglesearch3 ? "active" : ""
            }`}
            onClick={handleToggleSearch3}
          />
          {togglesearch3 && (
            <>
              <div className="form-Row">
                <div className="form_field">
                  <label>POS 01</label>
                  <input
                    type="text"
                    value={formData?.POS01 || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("POS01", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>POS 02</label>
                  <input
                    type="text"
                    value={formData?.POS02 || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("POS02", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.POS01 && (
                    <div className="error-m">{errors.POS01}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.POS02 && (
                    <div className="error-m">{errors.POS02}</div>
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label>POS 03</label>
                  <input
                    type="text"
                    value={formData?.POS03 || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("POS03", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>POS 04</label>
                  <input
                    type="text"
                    value={formData?.POS04 || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("POS04", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.POS03 && (
                    <div className="error-m">{errors.POS03}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.POS04 && (
                    <div className="error-m">{errors.POS04}</div>
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label>POS 05</label>
                  <input
                    type="text"
                    value={formData?.POS05 || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("POS05", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>POS 06</label>
                  <input
                    type="text"
                    value={formData?.POS06 || ""}
                    readOnly={!editMode}
                    onChange={(e) => handleInputChange("POS06", e.target.value)}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.POS05 && (
                    <div className="error-m">{errors.POS05}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.POS06 && (
                    <div className="error-m">{errors.POS06}</div>
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label>LQPOS 01</label>
                  <input
                    type="text"
                    value={formData?.LQPOS01 || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("LQPOS01", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>LQPOS 02</label>
                  <input
                    type="text"
                    value={formData?.LQPOS02 || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("LQPOS02", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  {errors.LQPOS01 && (
                    <div className="error-m">{errors.LQPOS01}</div>
                  )}
                </div>
                <div className="form_field">
                  {errors.LQPOS02 && (
                    <div className="error-m">{errors.LQPOS02}</div>
                  )}
                </div>
              </div>
            </>
          )}
        </fieldset>
        <fieldset>
          <legend>Manager Details</legend>
          <BsChevronCompactDown
            size={25}
            className={`toggleS_branch toggleS_branch4  ${
              togglesearch4 ? "active" : ""
            }`}
            onClick={handleToggleSearch4}
          />
          {togglesearch4 && (
            <>
              <div className="form-Row">
                <div className="form_field">
                  <label style={{ width: "180px" }}>Area Manager Name</label>
                  <input
                    type="text"
                    value={formData?.Area_Manager_Name || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("AM_Name", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>

              <div className="form-Row">
                <div className="form_field">
                  <label style={{ width: "180px" }}>EPF No</label>
                  <input
                    type="text"
                    value={formData?.EPF_AM || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("EPF_AM", e.target.value)
                    }
                    style={{ marginLeft: "42px" }}
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>

                <div className="form_field">
                  <label>Contact No</label>
                  <input
                    type="text"
                    value={formData?.Contact_AM || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Contact_AM", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field"></div>
                <div className="form_field">
                  {errors.Contact_AM && (
                    <div className="error-m">{errors.Contact_AM}</div>
                  )}
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field">
                  <label style={{ width: "180px" }}>Branch Manager Name</label>
                  <input
                    type="text"
                    value={formData?.Branch_Manager_Name || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("BM_Name", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>

              <div className="form-Row">
                <div className="form_field">
                  <label style={{ width: "180px" }}>EPF No</label>
                  <input
                    type="text"
                    value={formData?.EPF_BM || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("EPF_BM", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                    style={{ marginLeft: "42px" }}
                  />
                </div>

                <div className="form_field">
                  <label>Contact No</label>
                  <input
                    type="text"
                    value={formData?.Contact_BM || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      handleInputChange("Contact_BM", e.target.value)
                    }
                    className={`form-input ${editMode ? "inputEditMode" : ""}`}
                  />
                </div>
              </div>
              <div className="form-Row">
                <div className="form_field"></div>
                <div className="form_field">
                  {errors.Contact_BM && (
                    <div className="error-m">{errors.Contact_BM}</div>
                  )}
                </div>
              </div>
            </>
          )}
        </fieldset>
        {/* <div style={{ position: "relative" }}>
            {editMode ? (
              <Button type="button" variant="success" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            ) : (
              <Button type="button" variant="info" onClick={handleToggleEditMode}>
                Edit VPN
              </Button>
            )}
          </div> */}
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
