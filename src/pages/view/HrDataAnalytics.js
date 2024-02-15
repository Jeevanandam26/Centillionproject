import React, { useState, useEffect, useRef } from "react";
import "./hr.css";
import CSV from "./techstars4.csv";

const HrDataAnalytics = () => {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [popupWidth, setPopupWidth] = useState(400); // Initial popup width
  const [popupHeight, setPopupHeight] = useState(200); // Initial popup height
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV);
        if (!response.ok) {
          throw new Error("Failed to fetch CSV data");
        }
        const data = await response.text();
        const parsedData = parseCSV(data);
        setCsvData(parsedData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate popup dimensions based on row data length
    const calculatePopupDimensions = () => {
      const maxPopupWidth = 400; // Max width for the popup
      const maxPopupHeight = 300; // Max height for the popup
      const maxWidth = window.innerWidth * 0.8; // 80% of window width
      const maxHeight = window.innerHeight * 0.8; // 80% of window height

      const width = Math.min(maxPopupWidth, maxWidth);
      const height = Math.min(maxPopupHeight, maxHeight);

      setPopupWidth(width);
      setPopupHeight(height);
    };

    calculatePopupDimensions();

    // Recalculate dimensions on window resize
    window.addEventListener("resize", calculatePopupDimensions);

    return () => {
      window.removeEventListener("resize", calculatePopupDimensions);
    };
  }, [rowData]);

  const parseCSV = (csvData) => {
    const rows = csvData.split("\n");
    return rows.map((row) => row.split(","));
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const handleCheckboxChange = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleDropdownButtonClick = (rowIndex) => {
    setRowData(csvData[rowIndex + 1]); // Corrected the row index
    setShowPopup(true);
  };

  return (
    <div className="container">
      {/* <button onClick={toggleTableVisibility}>Toggle CSV Table</button> */}
      <div className="tw-w-full tw-py-4 tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-b tw-from-transparent tw-from-80% ">
        <h1 className="tw-text-2xl tw-text-black tw-font-bold">
          Hr Data Analytics
        </h1>
      </div>
      {error && <p>Error: {error}</p>}
      {isTableVisible && csvData.length > 0 && (
        <div className="table-container" ref={tableRef}>
          <table>
            <thead>
              <tr>
                <th>Select</th> {/* Checkbox column */}
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={selectedRows.includes(rowIndex) ? "selected" : ""}
                >
                  <td>
                    <button onClick={() => handleDropdownButtonClick(rowIndex)}>
                      🔻
                    </button>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(rowIndex)}
                      checked={selectedRows.includes(rowIndex)}
                    />
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showPopup && (
        <div className="popup" style={{ width: `${popupWidth}px`, height: `${popupHeight}px` }}>
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <h2 className="popup-title">Row Data</h2>
            <div className="popup-body">
              <ul>
                {rowData.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrDataAnalytics;
