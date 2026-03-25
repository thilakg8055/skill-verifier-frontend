const StatusBadge = ({ status }) => {
    let color = "";

    if (status === "Accepted") color = "bg-green-500";
    else if (status === "Rejected") color = "bg-red-500";
    else color = "bg-yellow-500";

    return (
        <span className={`text-white px-2 py-1 rounded text-sm ${color}`}>
            {status}
        </span>
    );
};

export default StatusBadge;