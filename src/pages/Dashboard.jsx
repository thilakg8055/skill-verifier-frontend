// import { useEffect, useState } from "react";
// import axios from "axios";
// import SkillTable from "../components/SkillTable";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//     const [skills, setSkills] = useState([]);

//     const fetchSkills = async () => {
//         const res = await axios.get("http://localhost:5001/api/skills");
//         setSkills(res.data);
//     };

//     useEffect(() => {
//         fetchSkills();
//     }, []);

//     return (
//         <div className="p-6 max-w-5xl mx-auto">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Your Skills</h2>

//                 {/* ✅ ADD SKILL BUTTON */}
//                 <Link
//                     to="/add-skill"
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                     + Add Skill
//                 </Link>
//             </div>

//             {/* Table */}
//             {skills.length === 0 ? (
//                 <p className="text-gray-500">No skills added yet.</p>
//             ) : (
//                 <SkillTable skills={skills} />
//             )}
//         </div>
//     );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import SkillTable from "../components/SkillTable";
// import { Link } from "react-router-dom";
// //import { gsap } from "gsap";
// const userId = localStorage.getItem("userId");

// const Dashboard = () => {
//     const [skills, setSkills] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const titleRef = useRef(null);
//     // const buttonsRef = useRef(null);
//     //const tableRef = useRef(null);
//     //const [animated, setAnimated] = useState(false);




//     const fetchSkills = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const res = await axios.get(
//                 "http://localhost:5001/api/skills",
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 }
//             );

//             setSkills(res.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSkills();
//     }, []);
//     return (
//         <div className="p-6 max-w-5xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <div>
//                         <h2 className="text-3xl font-bold text-gray-800">
//                             Your Skills
//                         </h2>
//                         <p className="text-gray-500 text-sm">
//                             Manage and verify your professional skills
//                         </p>
//                     </div>

//                     <div className="flex gap-3">
//                         <Link
//                             to="/add-skill"
//                             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
//                         >
//                             + Add Skill
//                         </Link>

//                         <Link
//                             to={`/resume/${userId}`}
//                             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
//                         >
//                             View Resume
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Loading */}
//                 {loading && <p className="text-gray-500">Loading...</p>}

//                 {/* Empty */}
//                 {!loading && skills.length === 0 && (
//                     <p className="text-gray-500">No skills added yet.</p>
//                 )}

//                 {/* Table */}
//                 <div className="mt-4">
//                     {loading ? (
//                         <p className="text-gray-500">Loading...</p>
//                     ) : skills.length === 0 ? (
//                         <p className="text-gray-500">No skills added yet.</p>
//                     ) : (
//                         <SkillTable skills={skills} refreshSkills={fetchSkills} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



import { useEffect, useState, useRef } from "react";
import axios from "axios";
import SkillTable from "../components/SkillTable";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const userId = localStorage.getItem("userId");


const Dashboard = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const headerRef = useRef(null);
    const statsRef = useRef(null);
    const tableRef = useRef(null);

    let user = {};
    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : {};
    } catch (err) {
        console.error("Invalid user JSON", err);
        user = {};
    }

    const fetchSkills = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token → skipping API call");
                setLoading(false);
                return;
            }
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/skills`, {
                headers: { Authorization: token },
            });
            setSkills(res.data);
        } catch (err) {
            console.error("Fetch skills error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    useEffect(() => {
        if (!loading) {
            const tl = gsap.timeline();
            tl.fromTo(headerRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
            tl.fromTo(statsRef.current?.children || [],
                { y: 20, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.2"
            );
            // tl.fromTo(tableRef.current,
            //     { y: 30, opacity: 0 },
            //     { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            //     "-=0.2"
            // );
        }
    }, [loading]);

    // const verified = skills.filter(s => s.status === "accepted").length;
    // const pending = skills.filter(s => s.status === "pending").length;
    // const rejected = skills.filter(s => s.status === "rejected").length;


    const verified = skills.filter(s => s.status?.toLowerCase() === "accepted").length;

    const pending = skills.filter(s =>
        s.status?.toLowerCase() === "applied" ||
        s.status?.toLowerCase() === "pending"
    ).length;

    const rejected = skills.filter(s =>
        s.status?.toLowerCase() === "rejected"
    ).length;


    const pageStyle = {
        padding: "100px 24px 48px",
        maxWidth: "1100px",
        margin: "0 auto",
        minHeight: "100vh",
    };

    const statCardStyle = (color) => ({
        background: "rgba(10,22,40,0.6)",
        border: `1px solid ${color}22`,
        borderRadius: "16px",
        padding: "22px 24px",
        backdropFilter: "blur(20px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
    });

    const statAccentStyle = (color) => ({
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
    });

    const actionBtnStyle = (type) => ({
        padding: "10px 22px",
        borderRadius: "10px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.875rem",
        cursor: "pointer",
        border: "none",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.25s ease",
        ...(type === "add" ? {
            background: "linear-gradient(135deg, #2dd4bf, #14b8a6)",
            color: "#060b18",
            boxShadow: "0 4px 20px rgba(45,212,191,0.25)",
        } : {
            background: "linear-gradient(135deg, #f0c040, #e0a820)",
            color: "#060b18",
            boxShadow: "0 4px 20px rgba(240,192,64,0.25)",
        }),
    });

    return (
        <div style={pageStyle}>
            {/* Header */}
            <div ref={headerRef} style={{ marginBottom: "36px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <p style={{ fontSize: "0.75rem", color: "#f0c040", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>
                            Welcome back
                        </p>
                        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.6rem", color: "#fff", lineHeight: 1.1, marginBottom: "8px" }}>
                            {user.name ? `${user.name.split(" ")[0]}'s` : "Your"}{" "}
                            <span style={{ color: "#f0c040" }}>Skills</span>
                        </h1>
                        <p style={{ color: "#475569", fontSize: "0.9rem" }}>
                            Manage and track your professional skill verifications
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <Link to="/add-skill" style={actionBtnStyle("add")}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 30px rgba(45,212,191,0.4)"}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(45,212,191,0.25)"}
                        >
                            + Add Skill
                        </Link>
                        <Link to={`/resume/${userId}`} style={actionBtnStyle("resume")}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 30px rgba(240,192,64,0.4)"}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(240,192,64,0.25)"}
                        >
                            View Resume ↗
                        </Link>
                    </div>
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginTop: "28px" }} />
            </div>

            {/* Stats Row */}
            {!loading && skills.length > 0 && (
                <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                    {[
                        { label: "Total Skills", value: skills.length, color: "#6366f1", sub: "added" },
                        { label: "Verified", value: verified, color: "#2dd4bf", sub: "confirmed" },
                        { label: "Pending", value: pending, color: "#f0c040", sub: "awaiting" },
                        { label: "Rejected", value: rejected, color: "#f87171", sub: "declined" },
                    ].map(({ label, value, color, sub }) => (
                        <div key={label} style={statCardStyle(color)}>
                            <div style={statAccentStyle(color)} />
                            <p style={{ fontSize: "2rem", fontWeight: 700, color, marginBottom: "2px", fontFamily: "'DM Serif Display', serif" }}>
                                {value}
                            </p>
                            <p style={{ color: "#e2e8f0", fontSize: "0.875rem", fontWeight: 500 }}>{label}</p>
                            <p style={{ color: "#475569", fontSize: "0.75rem" }}>{sub}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Table Section */}
            <div ref={tableRef} style={{
                background: "rgba(10,22,40,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                padding: "28px",
                backdropFilter: "blur(20px)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                    <div style={{ width: "4px", height: "22px", background: "linear-gradient(180deg, #f0c040, #e0a820)", borderRadius: "2px" }} />
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#e2e8f0" }}>Skill Records</h2>
                    {!loading && (
                        <span style={{
                            marginLeft: "auto",
                            padding: "3px 12px",
                            background: "rgba(240,192,64,0.1)",
                            border: "1px solid rgba(240,192,64,0.2)",
                            borderRadius: "20px",
                            fontSize: "0.78rem",
                            color: "#f0c040",
                            fontWeight: 600,
                        }}>
                            {skills.length} total
                        </span>
                    )}
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <div style={{
                            width: "40px", height: "40px", borderRadius: "50%",
                            border: "3px solid rgba(240,192,64,0.15)",
                            borderTopColor: "#f0c040",
                            animation: "spin 0.8s linear infinite",
                            margin: "0 auto 16px",
                        }} />
                        <p style={{ color: "#475569", fontSize: "0.875rem" }}>Loading your skills...</p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : skills.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.3 }}>🎯</div>
                        <p style={{ color: "#475569", marginBottom: "20px" }}>No skills added yet</p>
                        <Link to="/add-skill" style={{ ...actionBtnStyle("add"), margin: "0 auto" }}>
                            Add your first skill
                        </Link>
                    </div>
                ) : (
                    <SkillTable skills={skills} refreshSkills={fetchSkills} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;