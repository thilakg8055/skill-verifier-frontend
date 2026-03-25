// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // const token = localStorage.getItem("token");

// // const Profile = () => {
// //     const [skills, setSkills] = useState([]);

// //     useEffect(() => {
// //         const fetch = async () => {
// //             const res = await axios.get("http://localhost:5001/api/skills",
// //                 {
// //                     headers: {
// //                         Authorization: token,
// //                     },
// //                 }
// //             );
// //             setSkills(res.data);
// //         };

// //         fetch();
// //     }, []);

// //     return (
// //         <div className="max-w-3xl mx-auto p-6">

// //             <h1 className="text-2xl font-bold mb-4">Public Profile</h1>

// //             {skills.map((skill) => (
// //                 <div
// //                     key={skill._id}
// //                     className="border p-4 mb-3 rounded shadow"
// //                 >
// //                     <h3 className="font-bold text-lg">
// //                         {skill.name}{" "}
// //                         {skill.status === "Accepted" && "✔️"}
// //                     </h3>

// //                     <p className="text-gray-600">
// //                         Verified by: {skill.verifierEmail}
// //                     </p>

// //                     <p className="text-sm mt-1">
// //                         Status: {skill.status}
// //                     </p>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default Profile;

// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const Profile = () => {
// //     const [user, setUser] = useState({});
// //     const [skills, setSkills] = useState([]);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const token = localStorage.getItem("token");

// //                 // ✅ get user data
// //                 const userRes = await axios.get(
// //                     "http://localhost:5001/api/auth/me",
// //                     {
// //                         headers: { Authorization: token },
// //                     }
// //                 );

// //                 // ✅ get skills
// //                 const skillRes = await axios.get(
// //                     "http://localhost:5001/api/skills",
// //                     {
// //                         headers: { Authorization: token },
// //                     }
// //                 );

// //                 setUser(userRes.data);
// //                 setSkills(skillRes.data);
// //             } catch (err) {
// //                 console.error(err);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     return (
// //         <div className="max-w-3xl mx-auto p-6">

// //             {/* 🔥 USER DETAILS */}
// //             <h1 className="text-2xl font-bold mb-4">My Profile</h1>

// //             <div className="border p-4 rounded mb-6 shadow">
// //                 <p><b>Name:</b> {user.name}</p>
// //                 <p><b>Email:</b> {user.email}</p>
// //                 <p><b>Phone:</b> {user.phone}</p>
// //                 <p><b>GitHub:</b> {user.github}</p>
// //                 <p><b>LinkedIn:</b> {user.linkedin}</p>
// //             </div>

// //             {/* 🔥 SKILLS (OPTIONAL SECTION) */}
// //             <h2 className="text-xl font-bold mb-3">Skills</h2>

// //             {skills.map((skill) => (
// //                 <div
// //                     key={skill._id}
// //                     className="border p-4 mb-3 rounded shadow"
// //                 >
// //                     <h3 className="font-bold text-lg">
// //                         {skill.name}{" "}
// //                         {skill.status === "verified" && "✔️"}
// //                     </h3>

// //                     <p className="text-gray-600">
// //                         Verified by: {skill.verifierEmail}
// //                     </p>

// //                     <p className="text-sm mt-1">
// //                         Status: {skill.status}
// //                     </p>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default Profile;



// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [editMode, setEditMode] = useState(false);

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         github: "",
//         linkedin: "",
//         education: [],
//         experience: [],
//         projects: [],
//     });

//     // 🔥 FETCH USER
//     const fetchUser = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5001/api/auth/me",
//                 {
//                     headers: {
//                         Authorization: localStorage.getItem("token"),
//                     },
//                 }
//             );

//             setUser(res.data);
//             setForm({
//                 ...res.data,
//                 education: res.data.education || [],
//                 experience: res.data.experience || [],
//                 projects: res.data.projects || [],
//             });
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     // 🔥 HANDLE INPUT
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // 🔥 SAVE UPDATE
//     const handleSave = async () => {
//         try {
//             const res = await axios.put(
//                 "http://localhost:5001/api/auth/update",
//                 form,
//                 {
//                     headers: {
//                         Authorization: localStorage.getItem("token"),
//                     },
//                 }
//             );

//             setUser(res.data);
//             setEditMode(false);
//             alert("✅ Profile updated");
//         } catch (err) {
//             console.error(err);
//             alert("❌ Update failed");
//         }
//     };

//     if (!user) return <p className="p-6">Loading...</p>;

//     return (
//         <div className="max-w-3xl mx-auto p-6">

//             <h2 className="text-2xl font-bold mb-4">My Profile</h2>

//             <div className="bg-white shadow-md rounded p-6 space-y-4">

//                 {/* NAME */}
//                 <div>
//                     <label className="font-semibold">Name</label>
//                     {editMode ? (
//                         <input
//                             name="name"
//                             value={form.name}
//                             onChange={handleChange}
//                             className="w-full border p-2 rounded"
//                         />
//                     ) : (
//                         <p>{user.name}</p>
//                     )}
//                 </div>

//                 {/* EMAIL */}
//                 <div>
//                     <label className="font-semibold">Email</label>
//                     {editMode ? (
//                         <input
//                             name="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             className="w-full border p-2 rounded"
//                         />
//                     ) : (
//                         <p>{user.email}</p>
//                     )}
//                 </div>

//                 {/* PHONE */}
//                 <div>
//                     <label className="font-semibold">Phone</label>
//                     {editMode ? (
//                         <input
//                             name="phone"
//                             value={form.phone || ""}
//                             onChange={handleChange}
//                             className="w-full border p-2 rounded"
//                         />
//                     ) : (
//                         <p>{user.phone || "Not added"}</p>
//                     )}
//                 </div>

//                 {/* GITHUB */}
//                 <div>
//                     <label className="font-semibold">GitHub</label>
//                     {editMode ? (
//                         <input
//                             name="github"
//                             value={form.github || ""}
//                             onChange={handleChange}
//                             className="w-full border p-2 rounded"
//                         />
//                     ) : (
//                         <p>{user.github || "Not added"}</p>
//                     )}
//                 </div>

//                 {/* LINKEDIN */}
//                 <div>
//                     <label className="font-semibold">LinkedIn</label>
//                     {editMode ? (
//                         <input
//                             name="linkedin"
//                             value={form.linkedin || ""}
//                             onChange={handleChange}
//                             className="w-full border p-2 rounded"
//                         />
//                     ) : (
//                         <p>{user.linkedin || "Not added"}</p>
//                     )}
//                 </div>

//                 {/* EDUCATION */}
//                 <h3 className="text-xl font-semibold mt-6">Education</h3>

//                 {form.education?.map((edu, index) => (
//                     <div key={index} className="border p-3 rounded mb-2 space-y-2">

//                         {editMode ? (
//                             <>
//                                 <input
//                                     placeholder="College"
//                                     value={edu.college}
//                                     onChange={(e) => {
//                                         const updated = [...form.education];
//                                         updated[index].college = e.target.value;
//                                         setForm({ ...form, education: updated });
//                                     }}
//                                     className="w-full border p-2 rounded"
//                                 />

//                                 <input
//                                     placeholder="Degree"
//                                     value={edu.degree}
//                                     onChange={(e) => {
//                                         const updated = [...form.education];
//                                         updated[index].degree = e.target.value;
//                                         setForm({ ...form, education: updated });
//                                     }}
//                                     className="w-full border p-2 rounded"
//                                 />

//                                 <input
//                                     placeholder="Year"
//                                     value={edu.year}
//                                     onChange={(e) => {
//                                         const updated = [...form.education];
//                                         updated[index].year = e.target.value;
//                                         setForm({ ...form, education: updated });
//                                     }}
//                                     className="w-full border p-2 rounded"
//                                 />

//                                 <button
//                                     onClick={() => {
//                                         const updated = form.education.filter((_, i) => i !== index);
//                                         setForm({ ...form, education: updated });
//                                     }}
//                                     className="text-red-500"
//                                 >
//                                     Delete
//                                 </button>
//                             </>
//                         ) : (
//                             <div>
//                                 <p><strong>{edu.college}</strong></p>
//                                 <p>{edu.degree}</p>
//                                 <p className="text-gray-500">{edu.year}</p>
//                             </div>
//                         )}

//                     </div>
//                 ))}

//                 {editMode && (
//                     <button
//                         onClick={() =>
//                             setForm({
//                                 ...form,
//                                 education: [
//                                     ...(form.education || []),
//                                     { college: "", degree: "", year: "" }
//                                 ],
//                             })
//                         }
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                         + Add Education
//                     </button>
//                 )}

//                 {/*EXPERIENCE */}
//                 <h3 className="text-xl font-semibold mt-6">Experience</h3>

//                 {form.experience?.map((exp, index) => (
//                     <div key={index} className="border p-3 rounded mb-2">
//                         <input
//                             placeholder="Company"
//                             value={exp.company}
//                             onChange={(e) => {
//                                 const updated = [...form.experience];
//                                 updated[index].company = e.target.value;
//                                 setForm({ ...form, experience: updated });
//                             }}
//                         />

//                         <input
//                             placeholder="Role"
//                             value={exp.role}
//                             onChange={(e) => {
//                                 const updated = [...form.experience];
//                                 updated[index].role = e.target.value;
//                                 setForm({ ...form, experience: updated });
//                             }}
//                         />

//                         <input
//                             placeholder="Duration"
//                             value={exp.duration}
//                             onChange={(e) => {
//                                 const updated = [...form.experience];
//                                 updated[index].duration = e.target.value;
//                                 setForm({ ...form, experience: updated });
//                             }}
//                         />

//                         {editMode && (
//                             <button
//                                 onClick={() => {
//                                     const updated = form.experience.filter((_, i) => i !== index);
//                                     setForm({ ...form, experience: updated });
//                                 }}
//                                 className="text-red-500"
//                             >
//                                 Delete
//                             </button>
//                         )}
//                     </div>
//                 ))}

//                 {editMode && (
//                     <button
//                         onClick={() =>
//                             setForm({
//                                 ...form,
//                                 experience: [
//                                     ...(form.experience || []),
//                                     { company: "", role: "", duration: "" },
//                                 ],
//                             })
//                         }
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                         + Add Experience
//                     </button>
//                 )}
//                 {/* PROJECTS */}
//                 <h3 className="text-xl font-semibold mt-6">Projects</h3>

//                 {form.projects?.map((proj, index) => (
//                     <div key={index} className="border p-3 rounded mb-2">
//                         <input
//                             placeholder="Title"
//                             value={proj.title}
//                             onChange={(e) => {
//                                 const updated = [...form.projects];
//                                 updated[index].title = e.target.value;
//                                 setForm({ ...form, projects: updated });
//                             }}
//                         />

//                         <input
//                             placeholder="Description"
//                             value={proj.description}
//                             onChange={(e) => {
//                                 const updated = [...form.projects];
//                                 updated[index].description = e.target.value;
//                                 setForm({ ...form, projects: updated });
//                             }}
//                         />

//                         <input
//                             placeholder="Link"
//                             value={proj.link}
//                             onChange={(e) => {
//                                 const updated = [...form.projects];
//                                 updated[index].link = e.target.value;
//                                 setForm({ ...form, projects: updated });
//                             }}
//                         />

//                         {editMode && (
//                             <button
//                                 onClick={() => {
//                                     const updated = form.experience.filter((_, i) => i !== index);
//                                     setForm({ ...form, experience: updated });
//                                 }}
//                                 className="text-red-500"
//                             >
//                                 Delete
//                             </button>
//                         )}
//                     </div>
//                 ))}

//                 {editMode && (
//                     <button
//                         onClick={() =>
//                             setForm({
//                                 ...form,
//                                 projects: [
//                                     ...(form.projects || []),
//                                     { title: "", description: "", link: "" },
//                                 ],
//                             })
//                         }
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                         + Add Project
//                     </button>
//                 )}

//                 {/* BUTTONS */}
//                 <div className="flex gap-3 mt-4">
//                     {editMode ? (
//                         <>
//                             <button
//                                 onClick={handleSave}
//                                 className="bg-green-500 text-white px-4 py-2 rounded"
//                             >
//                                 Save
//                             </button>

//                             <button
//                                 onClick={() => setEditMode(false)}
//                                 className="bg-gray-400 text-white px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             onClick={() => setEditMode(true)}
//                             className="bg-blue-500 text-white px-4 py-2 rounded"
//                         >
//                             Edit Profile
//                         </button>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Profile;




import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "", email: "", phone: "", github: "", linkedin: "",
        education: [], experience: [], projects: [],
    });

    const headerRef = useRef(null);
    const cardRef = useRef(null);
    const orbRef = useRef(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setUser(res.data);
            setForm({
                ...res.data,
                education: res.data.education || [],
                experience: res.data.experience || [],
                projects: res.data.projects || [],
            });
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchUser(); }, []);

    useEffect(() => {
        if (!user) return;
        const tl = gsap.timeline();
        tl.fromTo(orbRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
        );
        tl.fromTo(headerRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.5"
        );
        tl.fromTo(cardRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
        );
        gsap.to(orbRef.current, {
            y: -20, x: 10, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1
        });
    }, [user]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update`, form, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setUser(res.data);
            setEditMode(false);
            gsap.fromTo(cardRef.current,
                { scale: 0.99 },
                { scale: 1, duration: 0.3, ease: "back.out(2)" }
            );
        } catch (err) {
            console.error(err);
            alert("Update failed");
        } finally {
            setSaving(false);
        }
    };

    const toggleEdit = () => {
        gsap.to(cardRef.current, {
            scale: 0.99, duration: 0.15, yoyo: true, repeat: 1,
            onComplete: () => setEditMode(!editMode)
        });
    };

    if (!user) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    border: "3px solid rgba(240,192,64,0.15)", borderTopColor: "#f0c040",
                    animation: "spin 0.8s linear infinite", margin: "0 auto 14px",
                }} />
                <p style={{ color: "#475569" }}>Loading profile...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );

    const pageStyle = {
        minHeight: "100vh", padding: "100px 24px 60px",
        position: "relative", overflow: "hidden",
    };

    const inputStyle = {
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "11px 14px",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.875rem",
        outline: "none",
        transition: "all 0.2s ease",
        marginTop: "4px",
    };

    const labelStyle = {
        fontSize: "0.72rem", color: "#94a3b8",
        letterSpacing: "0.08em", textTransform: "uppercase",
        fontWeight: 500, display: "block", marginBottom: "2px",
    };

    const valueStyle = {
        color: "#e2e8f0", fontSize: "0.9rem", paddingTop: "4px",
        paddingBottom: "4px",
    };

    const fieldBlock = (label, name, type = "text") => (
        <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>{label}</label>
            {editMode ? (
                <input
                    type={type} name={name} value={form[name] || ""}
                    onChange={handleChange} style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; e.target.style.background = "rgba(240,192,64,0.04)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                />
            ) : (
                <p style={valueStyle}>{user[name] || <span style={{ color: "#334155" }}>Not added</span>}</p>
            )}
        </div>
    );

    const sectionHeaderStyle = {
        fontSize: "0.72rem", letterSpacing: "0.15em", color: "#f0c040",
        textTransform: "uppercase", fontWeight: 700, marginBottom: "16px",
        display: "flex", alignItems: "center", gap: "10px",
    };

    const addBtnStyle = {
        padding: "8px 18px",
        background: "rgba(45,212,191,0.1)",
        border: "1px solid rgba(45,212,191,0.25)",
        borderRadius: "8px",
        color: "#2dd4bf",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600, fontSize: "0.82rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
    };

    const deleteBtnStyle = {
        padding: "5px 12px",
        background: "rgba(248,113,113,0.1)",
        border: "1px solid rgba(248,113,113,0.2)",
        borderRadius: "7px",
        color: "#f87171",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500, fontSize: "0.78rem",
        cursor: "pointer",
    };

    const subCardStyle = {
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "16px 18px",
        marginBottom: "10px",
    };

    const dividerStyle = {
        height: "1px",
        background: "rgba(255,255,255,0.05)",
        margin: "28px 0",
    };

    const initials = user.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div style={pageStyle}>
            {/* Orb */}
            <div ref={orbRef} style={{
                position: "fixed",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,58,120,0.4) 0%, transparent 70%)",
                filter: "blur(80px)",
                top: "-150px", left: "-150px",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto" }}>

                {/* Header */}
                <div ref={headerRef} style={{ marginBottom: "28px" }}>
                    <p style={{ fontSize: "0.75rem", color: "#f0c040", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "6px" }}>
                        Account Settings
                    </p>
                    <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.4rem", color: "#fff", lineHeight: 1.1 }}>
                        My <span style={{ color: "#f0c040" }}>Profile</span>
                    </h1>
                </div>

                {/* Main Card */}
                <div ref={cardRef} style={{
                    background: "rgba(10,22,40,0.65)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "24px",
                    backdropFilter: "blur(30px)",
                    overflow: "hidden",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                }}>
                    <div style={{ height: "3px", background: "linear-gradient(90deg, #f0c040, #2dd4bf)" }} />

                    {/* Avatar Row */}
                    <div style={{
                        padding: "28px 32px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", flexWrap: "wrap", gap: "16px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <div style={{
                                width: "56px", height: "56px", borderRadius: "50%",
                                background: "linear-gradient(135deg, #f0c040, #2dd4bf)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "1.3rem", color: "#060b18", fontWeight: 700,
                            }}>
                                {initials}
                            </div>
                            <div>
                                <p style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "1.05rem" }}>{user.name}</p>
                                <p style={{ color: "#475569", fontSize: "0.85rem" }}>{user.email}</p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            {editMode ? (
                                <>
                                    <button onClick={handleSave} disabled={saving} style={{
                                        padding: "9px 22px",
                                        background: "linear-gradient(135deg, #f0c040, #e0a820)",
                                        color: "#060b18", fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 700, borderRadius: "10px", border: "none",
                                        cursor: saving ? "not-allowed" : "pointer",
                                        opacity: saving ? 0.7 : 1,
                                        boxShadow: "0 4px 20px rgba(240,192,64,0.25)",
                                    }}>
                                        {saving ? "Saving..." : "✓ Save"}
                                    </button>
                                    <button onClick={() => setEditMode(false)} style={{
                                        padding: "9px 22px",
                                        background: "transparent",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#94a3b8", fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 500, borderRadius: "10px", cursor: "pointer",
                                    }}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button onClick={toggleEdit} style={{
                                    padding: "9px 22px",
                                    background: "rgba(240,192,64,0.1)",
                                    border: "1px solid rgba(240,192,64,0.25)",
                                    color: "#f0c040", fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 600, borderRadius: "10px", cursor: "pointer",
                                }}>
                                    ✎ Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Form Body */}
                    <div style={{ padding: "32px" }}>

                        {/* Basic Info */}
                        <p style={sectionHeaderStyle}>
                            <span style={{ width: "16px", height: "2px", background: "#f0c040" }} />
                            Basic Information
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                            {fieldBlock("Full Name", "name")}
                            {fieldBlock("Phone", "phone")}
                            {fieldBlock("Email", "email", "email")}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                            {fieldBlock("GitHub URL", "github")}
                            {fieldBlock("LinkedIn URL", "linkedin")}
                        </div>

                        <div style={dividerStyle} />

                        {/* Education */}
                        <p style={sectionHeaderStyle}>
                            <span style={{ width: "16px", height: "2px", background: "#f0c040" }} />
                            Education
                        </p>
                        {form.education?.map((edu, i) => (
                            <div key={i} style={subCardStyle}>
                                {editMode ? (
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                        <div>
                                            <label style={labelStyle}>College</label>
                                            <input value={edu.college} onChange={(e) => {
                                                const u = [...form.education]; u[i].college = e.target.value; setForm({ ...form, education: u });
                                            }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Degree</label>
                                            <input value={edu.degree} onChange={(e) => {
                                                const u = [...form.education]; u[i].degree = e.target.value; setForm({ ...form, education: u });
                                            }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Year</label>
                                            <input value={edu.year} onChange={(e) => {
                                                const u = [...form.education]; u[i].year = e.target.value; setForm({ ...form, education: u });
                                            }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                                            <button onClick={() => { const u = form.education.filter((_, idx) => idx !== i); setForm({ ...form, education: u }); }} style={deleteBtnStyle}>
                                                ✕ Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: "2px" }}>{edu.college}</p>
                                            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{edu.degree}</p>
                                        </div>
                                        {edu.year && <span style={{ padding: "4px 12px", background: "rgba(240,192,64,0.1)", border: "1px solid rgba(240,192,64,0.2)", borderRadius: "20px", fontSize: "0.78rem", color: "#f0c040" }}>{edu.year}</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                        {editMode && (
                            <button onClick={() => setForm({ ...form, education: [...(form.education || []), { college: "", degree: "", year: "" }] })} style={addBtnStyle}>
                                + Add Education
                            </button>
                        )}

                        <div style={dividerStyle} />

                        {/* Experience */}
                        <p style={sectionHeaderStyle}>
                            <span style={{ width: "16px", height: "2px", background: "#f0c040" }} />
                            Experience
                        </p>
                        {form.experience?.map((exp, i) => (
                            <div key={i} style={subCardStyle}>
                                {editMode ? (
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                        <div>
                                            <label style={labelStyle}>Company</label>
                                            <input value={exp.company} onChange={(e) => { const u = [...form.experience]; u[i].company = e.target.value; setForm({ ...form, experience: u }); }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Role</label>
                                            <input value={exp.role} onChange={(e) => { const u = [...form.experience]; u[i].role = e.target.value; setForm({ ...form, experience: u }); }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Duration</label>
                                            <input value={exp.duration} onChange={(e) => { const u = [...form.experience]; u[i].duration = e.target.value; setForm({ ...form, experience: u }); }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                                            <button onClick={() => { const u = form.experience.filter((_, idx) => idx !== i); setForm({ ...form, experience: u }); }} style={deleteBtnStyle}>✕ Remove</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: "2px" }}>{exp.role}</p>
                                            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{exp.company}</p>
                                        </div>
                                        {exp.duration && <span style={{ padding: "4px 12px", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: "20px", fontSize: "0.78rem", color: "#2dd4bf" }}>{exp.duration}</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                        {editMode && (
                            <button onClick={() => setForm({ ...form, experience: [...(form.experience || []), { company: "", role: "", duration: "" }] })} style={addBtnStyle}>
                                + Add Experience
                            </button>
                        )}

                        <div style={dividerStyle} />

                        {/* Projects */}
                        <p style={sectionHeaderStyle}>
                            <span style={{ width: "16px", height: "2px", background: "#f0c040" }} />
                            Projects
                        </p>
                        {form.projects?.map((proj, i) => (
                            <div key={i} style={subCardStyle}>
                                {editMode ? (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <div>
                                            <label style={labelStyle}>Title</label>
                                            <input value={proj.title} onChange={(e) => { const u = [...form.projects]; u[i].title = e.target.value; setForm({ ...form, projects: u }); }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Description</label>
                                            <input value={proj.description} onChange={(e) => { const u = [...form.projects]; u[i].description = e.target.value; setForm({ ...form, projects: u }); }} style={inputStyle}
                                                onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                                            <div style={{ flex: 1 }}>
                                                <label style={labelStyle}>Link</label>
                                                <input value={proj.link} onChange={(e) => { const u = [...form.projects]; u[i].link = e.target.value; setForm({ ...form, projects: u }); }} style={inputStyle}
                                                    onFocus={(e) => { e.target.style.borderColor = "#f0c040"; e.target.style.boxShadow = "0 0 0 3px rgba(240,192,64,0.1)"; }}
                                                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                                                />
                                            </div>
                                            <button onClick={() => { const u = form.projects.filter((_, idx) => idx !== i); setForm({ ...form, projects: u }); }} style={{ ...deleteBtnStyle, marginTop: "4px" }}>✕ Remove</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                                            <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{proj.title}</p>
                                            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ padding: "4px 12px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "20px", fontSize: "0.78rem", color: "#818cf8", textDecoration: "none" }}>↗ View</a>}
                                        </div>
                                        <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{proj.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {editMode && (
                            <button onClick={() => setForm({ ...form, projects: [...(form.projects || []), { title: "", description: "", link: "" }] })} style={addBtnStyle}>
                                + Add Project
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;