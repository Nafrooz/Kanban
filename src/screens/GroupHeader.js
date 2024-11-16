import React from "react";

import addicon from "../icons/add.svg";
import moreicon from "../icons/3 dot menu.svg";

const GroupHeader = ({ type, title, count, onAdd, onMore, icon ,users}) => {
    const addIcon = addicon; // Replace with actual path
    const moreIcon = moreicon; // Replace with actual path
    const user = users.find((user) => user.name === title );
    // console.log(user.name,title)
    // Priority mapping
    const priorityLabels = {
        0: "No Priority",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent",
    };

    const iconColors = [
         "#87c4ff",

        "#ffcfb3",
        "#fff9d0",
        "#ff99cc",
        "#e0f4ff",
        "#7c9d96",


        "#6f42c1", // Purple
        "#17a2b8", // Teal
    ];
    // Generate a user icon using initials
    const generateUserIcon = (name) => {
        const initials = name
            .split(" ") // Split name into words
            .map((word) => word[0].toUpperCase()) // Get the first letter of each word
            .join(""); // Join the initials
        const colorIndex = initials.charCodeAt(0) % 5;
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: iconColors[colorIndex], // Customize background color
                    color: "black",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    position: "relative", // Make the container relative for positioning the badge
                }}
            >
                {initials}
                {user && renderAvailabilityDot(user.available)} {/* Add availability dot */}
            </div>
        );
    };

    // Dot for availability status
    const renderAvailabilityDot = (isAvailable) => {
        return (
            <div
                style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "10px",
                    height: "10px",
                    backgroundColor: isAvailable ? "#28a745" : "#6c757d", // Green for available, grey for unavailable
                    borderRadius: "50%",
                    border: "2px solid white", // Optional: border for better visibility
                }}
            />
        );
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                background: "#f7f8fa",
                borderRadius: "8px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Conditional icon display */}
                {type === "status" && icon && (
                    <img src={icon} alt={`${title} icon`} style={{ width: "24px", height: "24px" }} />
                )}
                {type === "priority" && icon && (
                    <img src={icon} alt={`${title} icon`} style={{ width: "24px", height: "24px" }} />
                )}
                {type === "user" && !icon && generateUserIcon(title)} {/* Display user initials */}

                <h6 style={{ margin: 0 }}>
                    {/* Dynamic Title */}
                    {type === "priority"
                        ? priorityLabels[title] || "No Priority" // Map the priority level
                        : title}
                    <span style={{ color: "#888" }}> ({count})</span>
                </h6>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                {/* Add button with an image */}
                <button
                    onClick={onAdd}
                    style={{ border: "none", background: "transparent", cursor: "pointer" }}
                >
                    <img src={addIcon} alt="Add" style={{ width: "24px", height: "24px" }} />
                </button>
                {/* More button with an image */}
                <button
                    onClick={onMore}
                    style={{ border: "none", background: "transparent", cursor: "pointer" }}
                >
                    <img src={moreIcon} alt="More" style={{ width: "24px", height: "24px" }} />
                </button>
            </div>
        </div>
    );
};

export default GroupHeader;
