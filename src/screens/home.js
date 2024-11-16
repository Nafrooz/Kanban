import React, { useState, useEffect } from "react";
import TopSection from "./TopSection";
import TicketCard from "./TicketCard";
import GroupHeader from "./GroupHeader";
import inProgressIcon from "../icons/in-progress.svg";
import todoIcon from "../icons/To-do.svg";
import doneIcon from "../icons/Done.svg";
import backlogIcon from "../icons/Backlog.svg";
import cancelicon from "../icons/Cancelled.svg";
import nopriorityIcon from "../icons/No-priority.svg";
import lowpriorityIcon from "../icons/Img - Low Priority.svg";
import highpriorityIcon from "../icons/Img - High Priority.svg";
import mediumpriorityIcon from "../icons/Img - Medium Priority.svg";
import urgentIcon from "../icons/SVG - Urgent Priority colour.svg";
import urgentgreyIcon from "../icons/SVG - Urgent Priority grey.svg"
const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [grouping, setGrouping] = useState(() =>
        localStorage.getItem("grouping") || "status"
    );
    const [sorting, setSorting] = useState(() =>
        localStorage.getItem("sorting") || "priority"
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("grouping", grouping);
    }, [grouping]);

    useEffect(() => {
        localStorage.setItem("sorting", sorting);
    }, [sorting]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const groupTickets = (tickets) => {
        const grouped = {};

        if (grouping === "status") {
            const allStatuses = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
            allStatuses.forEach((status) => {
                grouped[status] = [];
            });
        }

        tickets.forEach((ticket) => {
            let key =
                grouping === "status"
                    ? ticket.status
                    : grouping === "user"
                        ? data.users.find((user) => user.id === ticket.userId)?.name || "Unassigned"
                        : ticket.priority;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ticket);
        });
        return grouped;
    };

    const sortTickets = (tickets) => {
        return tickets.sort((a, b) =>
            sorting === "priority" ? b.priority - a.priority : a.title.localeCompare(b.title)
        );
    };




    const groupedTickets = groupTickets(data.tickets);

    const getHeaderDetails = (key) => {
        const priorityIcons = {
            "0": nopriorityIcon,
            "1": lowpriorityIcon,
            "2": mediumpriorityIcon,
            "3": highpriorityIcon,
            "4": urgentIcon,
        };

        const statusIcons = {
            Backlog: backlogIcon,
            "In progress": inProgressIcon,
            Todo: todoIcon,
            Done: doneIcon,
            Cancelled: cancelicon,
        };

        if (grouping === "status") {
            return { title: key, icon: statusIcons[key] || null };
        }

        if (grouping === "priority") {
            return { title: key, icon: priorityIcons[key] || null };
        }

        if (grouping === "user") {
            return { title: key, icon: null };
        }

        return { title: key, icon: null };
    };
    
    return (
        <div style={{backgroundColor: "#f4f5f7" }}>
            <TopSection
                grouping={grouping}
                setGrouping={setGrouping}
                sorting={sorting}
                setSorting={setSorting}
            />

            <div 
                style={{ display: "flex", gap: "20px", padding: "20px"}}
            >
                {Object.keys(groupedTickets).map((key) => {
                    const { title, icon } = getHeaderDetails(key);

                    return (
                        <div
                            key={key}
                            style={{
                                width: "350px",
                                // background: "#fff",
                                // borderRadius: "8px",
                                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <GroupHeader
                                type={grouping}
                                title={title}
                                count={groupedTickets[key].length}
                                onAdd={() => console.log(`Add to ${title}`)}
                                onMore={() => console.log(`More options for ${title}`)}
                                icon={icon}
                                users={data.users}
                                
                            />

                            {sortTickets(groupedTickets[key]).map((ticket) => (
                                <TicketCard
                                    key={ticket.id}
                                    title={title}
                                    ticket={ticket}
                                    grouping={grouping}
                                    users={data.users}
                                    priorities={{
                                        "0": nopriorityIcon,
                                        "1": lowpriorityIcon,
                                        "2": mediumpriorityIcon,
                                        "3": highpriorityIcon,
                                        "4": urgentgreyIcon,
                                    }}
                                    status={{
                                        Backlog: backlogIcon,
                                        "In progress": inProgressIcon,
                                        Todo: todoIcon,
                                        Done: doneIcon,
                                        Cancelled: cancelicon,
                                    }}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
