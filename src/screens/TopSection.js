import React, { useState } from "react";
import DisplayIcon from "../icons/Display.svg";
 // Import the Display SVG icon
import downicon from "../icons/down.svg"

const TopSection = ({ grouping, setGrouping, sorting, setSorting }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div style={styles.topBar}>
            <button style={styles.displayButton} onClick={toggleDropdown}>
                <img src={DisplayIcon} alt="Display Icon" style={styles.icon} />
                Display
                <img
                    src={downicon}
                    alt="Down Arrow"
                    style={{ width: "16px", height: "16px" }}
                />
            </button>

            {dropdownOpen && (
                <div style={styles.dropdown}>
                    <div style={styles.dropdownItem}>
                        <label>Grouping</label>
                        <select
                            value={grouping}
                            onChange={(e) => setGrouping(e.target.value)}
                            style={styles.dropdownSelect}
                        >
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div style={styles.dropdownItem}>
                        <label>Ordering</label>
                        <select
                            value={sorting}
                            onChange={(e) => setSorting(e.target.value)}
                            style={styles.dropdownSelect}
                        >
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styling for the top section
const styles = {
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        // backgroundColor: "#f4f5f7",
        backgroundColor:"#fff",
        borderBottom: "1px solid #ddd",
    },
    displayButton: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 12px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "500",
        color: "#333",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    },
    icon: {
        width: "20px",
        height: "20px",
    },
    dropdown: {
        position: "absolute",
        top: "60px", // Ensures dropdown appears just below the button
        left: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "6px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        padding: "15px 20px",
        width: "300px", // Updated dropdown width
    },
    dropdownItem: {
        display: "flex",
        alignItems: "center", // Aligns label and dropdown vertically in the same line
        marginBottom: "10px", // Adds spacing between rows of dropdown items
    },
    label: {
        fontSize: "14px",
        color: "#555", // Increased spacing between the label and the dropdown
        flexShrink: 0, // Ensures label doesn't shrink when flex layout is applied
        width: "100px", // Optional: Fixed width for labels to align neatly
    },
    dropdownSelect: {
        marginLeft: "75px",
        flex: "1", // Ensures the dropdown takes up the remaining space
        Width: "200px", // Optional: Limits the dropdown's maximum width
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        backgroundColor: "#fff",
    },
};

export default TopSection;
