// import StatusBadge from "./StatusBadge";
// import { Link } from "react-router-dom";
// const SkillTable = ({ skills, updateStatus }) => {
//     return (
//         <table className="w-full border mt-4">
//             <thead>
//                 <tr className="bg-gray-200">
//                     <th className="p-2">Skill</th>
//                     <th className="p-2">Verifier</th>
//                     <th className="p-2">Status</th>
//                     <th className="p-2">Action</th>
//                     <th className="p-2">Verify</th>
//                 </tr>
//             </thead>

//             <tbody>
//                 {skills.length === 0 ? (
//                     <tr>
//                         <td colSpan="5" className="text-center p-4">
//                             No skills added
//                         </td>
//                     </tr>
//                 ) : (
//                     skills.map((skill, index) => (
//                         <tr key={index} className="text-center border-t">
//                             <td className="p-2">{skill.name}</td>
//                             <td className="p-2">{skill.verifier}</td>
//                             <td className="p-2">
//                                 <StatusBadge status={skill.status} />
//                             </td>

//                             <td className="p-2 space-x-2">
//                                 <button
//                                     onClick={() => updateStatus(skill._id, "Accepted")}
//                                     className="bg-green-500 text-white px-2 py-1 rounded"
//                                 >
//                                     Accept
//                                 </button>

//                                 <button
//                                     onClick={() => updateStatus(skill._id, "Rejected")}
//                                     className="bg-red-500 text-white px-2 py-1 rounded"
//                                 >
//                                     Reject
//                                 </button>

//                                 <button
//                                     onClick={() => updateStatus(skill._id, "In Progress")}
//                                     className="bg-blue-500 text-white px-2 py-1 rounded"
//                                 >
//                                     In Progress
//                                 </button>
//                             </td>

//                             <td className="p-2">
//                                 <Link
//                                     to={`/verify/${skill.id}`}
//                                     className="text-blue-500 underline"
//                                 >
//                                     Open
//                                 </Link>
//                             </td>

//                         </tr>
//                     ))
//                 )}
//             </tbody>
//         </table>
//     );
// };

// export default SkillTable;

// import StatusBadge from "./StatusBadge";

// const SkillTable = ({ skills }) => {
//     return (
//         <div className="overflow-x-auto">
//             <table className="w-full border mt-4">
//                 <thead className="bg-gray-200">
//                     <tr>
//                         <th className="p-2 border">Skill</th>
//                         <th className="p-2 border">Company</th>
//                         <th className="p-2 border">Verifier</th>
//                         <th className="p-2 border">Status</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {skills.map((skill, index) => (
//                         <tr key={index} className="text-center">
//                             <td className="p-2 border">{skill.name}</td>
//                             <td className="p-2 border">{skill.company || "-"}</td>
//                             <td className="p-2 border">{skill.verifierEmail}</td>
//                             <td className="p-2 border">
//                                 <StatusBadge status={skill.status} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default SkillTable;

// import StatusBadge from "./StatusBadge";
// import axios from "axios";

// const SkillTable = ({ skills, refreshSkills }) => {

//     const resendEmail = async (id) => {
//         try {
//             await axios.post(`http://localhost:5001/api/skills/resend/${id}`);
//             alert("Verification email resent!");
//         } catch (err) {
//             alert("Error resending email");
//         }
//     };

//     return (
//         <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
//             <table className="min-w-full bg-white">
//                 <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
//                     <tr className="border-t hover:bg-gray-50 transition">
//                         <th className="px-4 py-3 text-left">Skill</th>
//                         <th className="px-4 py-3 text-left">Verifier</th>
//                         <th className="px-4 py-3 text-left">Status</th>
//                         <th className="px-4 py-3 text-left">Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {skills.map((skill) => (
//                         <tr key={skill._id} className="border-t">
//                             <td className="p-3 flex items-center gap-2">
//                                 {skill.name}

//                                 {/* ✔ Verified Badge */}
//                                 {skill.status === "Accepted" && (
//                                     <span className="text-green-600 font-bold">✔️</span>
//                                 )}
//                             </td>
//                             <td className="px-4 py-3">{skill.verifierEmail}</td>
//                             <td className="p-3 flex items-center gap-2">
//                                 <StatusBadge status={skill.status} />

//                                 {/* 🔗 Blockchain Badge */}
//                                 {skill.status === "Accepted" && (
//                                     <span className="text-blue-600 text-sm">🔗 On-chain</span>
//                                 )}
//                             </td>

//                             <td className="px-4 py-3">
//                                 {skill.status === "Applied" && (
//                                     <button
//                                         onClick={() => resendEmail(skill._id)}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
//                                     >
//                                         Resend
//                                     </button>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default SkillTable;



import axios from "axios";
import { useRef } from "react";
import { gsap } from "gsap";

const statusConfig = {
    verified: { color: "#2dd4bf", bg: "rgba(45,212,191,0.1)", border: "rgba(45,212,191,0.25)", label: "Verified", icon: "✓" },
    Accepted: { color: "#2dd4bf", bg: "rgba(45,212,191,0.1)", border: "rgba(45,212,191,0.25)", label: "Accepted", icon: "✓" },
    pending: { color: "#f0c040", bg: "rgba(240,192,64,0.1)", border: "rgba(240,192,64,0.25)", label: "Pending", icon: "⏳" },
    Applied: { color: "#f0c040", bg: "rgba(240,192,64,0.1)", border: "rgba(240,192,64,0.25)", label: "Applied", icon: "⏳" },
    rejected: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", label: "Rejected", icon: "✕" },
    Rejected: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", label: "Rejected", icon: "✕" },
};

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)", label: status, icon: "·" };
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "4px 12px",
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            borderRadius: "20px",
            color: cfg.color,
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.03em",
        }}>
            {cfg.icon} {cfg.label}
        </span>
    );
};

const SkillTable = ({ skills, refreshSkills }) => {
    const rowRefs = useRef([]);

    const resendEmail = async (id, btn) => {
        gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/skills/resend/${id}`);
            gsap.fromTo(btn, { backgroundColor: "rgba(45,212,191,0.3)" }, { backgroundColor: "rgba(240,192,64,0.1)", duration: 0.8 });
            alert("Verification email resent!");
        } catch {
            alert("Error resending email");
        }
    };

    const thStyle = {
        padding: "12px 16px",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#475569",
        fontWeight: 600,
        textAlign: "left",
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
    };

    const tdStyle = {
        padding: "14px 16px",
        fontSize: "0.875rem",
        color: "#e2e8f0",
        verticalAlign: "middle",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <colgroup>
                    <col style={{ width: "26%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: "22%" }} />
                </colgroup>

                <thead>
                    <tr>
                        <th style={thStyle}>Skill</th>
                        <th style={thStyle}>Verifier</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {skills.map((skill, i) => {
                        const isVerified = skill.status === "verified" || skill.status === "Accepted";
                        const isPending = skill.status === "Applied" || skill.status === "pending";

                        return (
                            <tr
                                key={skill._id}
                                ref={el => rowRefs.current[i] = el}
                                style={{ transition: "background 0.2s ease" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                                {/* Skill Name */}
                                <td style={tdStyle}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <div style={{
                                            width: "34px", height: "34px", borderRadius: "9px",
                                            background: isVerified ? "rgba(45,212,191,0.12)" : "rgba(240,192,64,0.1)",
                                            border: `1px solid ${isVerified ? "rgba(45,212,191,0.2)" : "rgba(240,192,64,0.15)"}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "0.85rem", color: isVerified ? "#2dd4bf" : "#f0c040",
                                            fontWeight: 700, flexShrink: 0,
                                        }}>
                                            {skill.name?.[0]?.toUpperCase() || "S"}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "0.875rem", lineHeight: 1.2 }}>
                                                {skill.name}
                                            </p>
                                            {skill.company && (
                                                <p style={{ color: "#475569", fontSize: "0.75rem" }}>{skill.company}</p>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Verifier */}
                                <td style={tdStyle}>
                                    <p style={{ color: "#94a3b8", fontSize: "0.82rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {skill.verifierEmail}
                                    </p>
                                </td>

                                {/* Status */}
                                <td style={tdStyle}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <StatusBadge status={skill.status} />
                                        {isVerified && (
                                            <span style={{ fontSize: "0.7rem", color: "#6366f1", display: "flex", alignItems: "center", gap: "3px" }}>
                                                🔗 On-chain
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Action */}
                                <td style={tdStyle}>
                                    {isPending && (
                                        <button
                                            onClick={(e) => resendEmail(skill._id, e.currentTarget)}
                                            style={{
                                                padding: "6px 16px",
                                                background: "rgba(240,192,64,0.1)",
                                                border: "1px solid rgba(240,192,64,0.25)",
                                                borderRadius: "8px",
                                                color: "#f0c040",
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontWeight: 600,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,192,64,0.18)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(240,192,64,0.2)"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,192,64,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                                        >
                                            ↺ Resend
                                        </button>
                                    )}
                                    {isVerified && (
                                        <span style={{ fontSize: "0.78rem", color: "#2dd4bf", opacity: 0.7 }}>
                                            — Verified
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SkillTable;