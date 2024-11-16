import React from "react";

const TicketCard = ({ ticket, grouping, users, priorities, status }) => {
    const user = users.find((user) => user.id === ticket.userId);
    const priorityIcon = priorities[ticket.priority] || null;
    const statusIcon = status[ticket.status] || null;

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
        const colorIndex = initials.charCodeAt(0)%5;
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
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                position: "relative",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
        >
            {grouping !== "user" && (
                <>
                    {/* Top Section */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: "bold", fontSize: "14px", color: "#6e6d6d" }}>
                            {ticket.id}
                        </div>
                        {user ? (
                            user.profileIcon ? (
                                <img
                                    src={user.profileIcon}
                                    alt="User Icon"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        position: "relative", // Ensure the badge can be positioned over the icon
                                    }}
                                />
                            ) : (
                                generateUserIcon(user.name || "User")
                            )
                        ) : (
                            generateUserIcon(ticket.title) // Use ticket title initials if user data is not available
                        )}
                    </div>

                    {/* Title */}
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#2c3e50" }}>
                        {ticket.title}
                    </div>
                </>
            )}
            {/* Dynamic Content Based on Grouping */}
            {grouping === "status" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {priorityIcon && (
                        <img
                            src={priorityIcon}
                            alt="Status Icon"
                            style={{
                                width: "20px", height: "20px", backgroundColor: "#fff", border: "1px solid #e0e0e0",
                            }}
                        />
                    )}
                    <div
                        style={{
                            padding: "4px 8px",
                            backgroundColor: "#fff",
                            border: "1px solid #e0e0e0",
                            fontSize: "12px",
                            borderRadius: "4px",
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor: "#bec2c4", // Grey color
                                borderRadius: "50%", // Makes the dot circular
                                marginRight: "4px", // Space between dot and text
                            }}
                        ></span>
                        {ticket.tag[0]}
                    </div>
                </div>
            )}
            {grouping === "user" && (
                <>
                    {/* Title Section with Status Icon */}
                    <div style={{ fontWeight: "bold", fontSize: "14px", color: "#6e6d6d" }}>
                        {ticket.id}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        
                        {statusIcon && (
                            <img
                                src={statusIcon}
                                alt="Status Icon"
                                style={{ width: "20px", height: "20px" }}
                            />
                        )}
                        <div style={{ fontSize: "16px", fontWeight: "bold", color: "#2c3e50" }}>
                            {ticket.title}
                        </div>
                    </div>

                    {/* Tag Section with Priority Icon */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {priorityIcon && (
                            <img
                                src={priorityIcon}
                                alt="Priority Icon"
                                style={{ width: "20px", height: "20px", backgroundColor: "#fff", border: "2px solid #e0e0e0" }}
                            />
                        )}
                        <div
                            style={{
                                padding: "4px 8px",
                                backgroundColor: "#fff",
                                border: "1px solid #e0e0e0",
                                fontSize: "12px",
                                borderRadius: "4px",
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#bec2c4", // Grey color
                                    borderRadius: "50%", // Makes the dot circular
                                    marginRight: "4px", // Space between dot and text
                                }}
                            ></span>
                            {ticket.tag[0]}
                        </div>

                    </div>
                </>
            )}
            {grouping === "priority" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {statusIcon && (
                        <img
                            src={statusIcon}
                            alt="Priority Icon"
                            style={{ width: "20px", height: "20px", backgroundColor: "#fff", border: "1px solid #e0e0e0" }}
                        />
                    )}
                    <div
                        style={{
                            padding: "4px 8px",
                            backgroundColor: "#fff",
                            border: "1px solid #e0e0e0",
                            fontSize: "12px",
                            borderRadius: "4px",
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor: "#bec2c4", // Grey color
                                borderRadius: "50%", // Makes the dot circular
                                marginRight: "4px", // Space between dot and text
                            }}
                        ></span>
                        {ticket.tag[0]}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketCard;
