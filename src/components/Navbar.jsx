// import { Link } from "react-router-dom";
// const token = localStorage.getItem("token");

// const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
// };

// const Navbar = () => {
//     return (
//         <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
//             <h1 className="text-lg font-bold">Skill Verifier</h1>

//             <div className="space-x-4">
//                 <Link to="/profile" className="hover:underline">Profile</Link>
//                 <Link to="/" className="hover:underline">Login</Link>
//                 <Link to="/signup" className="hover:underline">Signup</Link>
//                 <Link to="/dashboard" className="hover:underline">Dashboard</Link>

//                 {/* ✅ ADD SKILL BUTTON */}
//                 <Link
//                     to="/add-skill"
//                     className="bg-white text-blue-600 px-3 py-1 rounded font-semibold"
//                 >
//                     + Add Skill
//                 </Link>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const [token, setToken] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         setToken(localStorage.getItem("token"));
//     }, []);

//     useEffect(() => {
//         const handleStorage = () => {
//             setToken(localStorage.getItem("token"));
//         };

//         window.addEventListener("storage", handleStorage);

//         return () => window.removeEventListener("storage", handleStorage);
//     }, []);

//     localStorage.setItem("token", res.data.token);

//     // 🔥 ADD THIS
//     window.location.reload();

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.reload();
//     };

//     return (
//         <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
//             <h1 className="font-bold">Skill Verifier</h1>

//             <div className="space-x-4">

//                 {/* NOT LOGGED IN */}
//                 {!token && (
//                     <>
//                         <Link to="/">Login</Link>
//                         <Link to="/signup">Signup</Link>
//                     </>
//                 )}

//                 {/* LOGGED IN */}
//                 {token && (
//                     <>
//                         <Link to="/dashboard">Dashboard</Link>
//                         <Link to="/profile">Profile</Link>
//                         <Link
//                             to="/add-skill"
//                             className="bg-white text-blue-600 px-3 py-1 rounded"
//                         >
//                             + Add Skill
//                         </Link>

//                         <button
//                             onClick={handleLogout}
//                             className="bg-red-500 px-3 py-1 rounded"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const userId = localStorage.getItem("userId")
// const Navbar = () => {
//     const [token, setToken] = useState(localStorage.getItem("token"));

//     useEffect(() => {
//         const handleStorage = () => {
//             setToken(localStorage.getItem("token"));
//         };

//         window.addEventListener("storage", handleStorage);

//         return () =>
//             window.removeEventListener("storage", handleStorage);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.reload();
//     };

//     return (
//         <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
//             <h1 className="font-bold">Skill Verifier</h1>

//             <div className="space-x-4">
//                 {!token ? (
//                     <>
//                         <Link to="/">Login</Link>
//                         <Link to="/signup">Signup</Link>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/dashboard">Dashboard</Link>
//                         <Link to="/profile">Profile</Link>

//                         <Link
//                             to="/add-skill"
//                             className="bg-white text-blue-600 px-3 py-1 rounded"
//                         >
//                             + Add Skill
//                         </Link>
//                         {userId && <Link
//                             to={`/resume/${userId}`}
//                             className="bg-white text-blue-600 px-3 py-1 rounded"
//                         >
//                             View Resume
//                         </Link>}

//                         <button
//                             onClick={handleLogout}
//                             className="bg-red-500 px-3 py-1 rounded"
//                         >
//                             Logout
//                         </button>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const userId = localStorage.getItem("userId");

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Entrance animation
        const tl = gsap.timeline();
        tl.fromTo(navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
        tl.fromTo(logoRef.current,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.4"
        );
        tl.fromTo(linksRef.current?.children || [],
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" },
            "-=0.3"
        );
    }, []);

    useEffect(() => {
        const handleStorage = () => setToken(localStorage.getItem("token"));
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        gsap.to(navRef.current, {
            y: -80, opacity: 0, duration: 0.4, ease: "power2.in",
            onComplete: () => {
                localStorage.removeItem("token");
                window.location.reload();
            }
        });
    };

    const isActive = (path) => location.pathname === path;

    const navStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 2rem",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s ease",
        background: scrolled
            ? "rgba(6, 11, 24, 0.92)"
            : "rgba(6, 11, 24, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
            ? "1px solid rgba(240, 192, 64, 0.15)"
            : "1px solid rgba(255,255,255,0.05)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
    };

    const logoStyle = {
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1.3rem",
        color: "#ffffff",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };

    const dotStyle = {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #f0c040, #2dd4bf)",
        boxShadow: "0 0 10px rgba(240,192,64,0.6)",
    };

    const linkStyle = (path) => ({
        color: isActive(path) ? "#f0c040" : "#94a3b8",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: isActive(path) ? 600 : 400,
        padding: "6px 12px",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        background: isActive(path) ? "rgba(240,192,64,0.1)" : "transparent",
        border: isActive(path) ? "1px solid rgba(240,192,64,0.2)" : "1px solid transparent",
    });

    const btnStyle = (color = "gold") => ({
        padding: "7px 18px",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: 600,
        cursor: "pointer",

        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.25s ease",
        background: color === "gold"
            ? "linear-gradient(135deg, #f0c040, #e0a820)"
            : color === "teal"
                ? "linear-gradient(135deg, #2dd4bf, #14b8a6)"
                : "rgba(239, 68, 68, 0.15)",
        color: color === "red" ? "#f87171" : "#060b18",
        border: color === "red" ? "1px solid rgba(239,68,68,0.3)" : "none",
    });

    return (
        <nav ref={navRef} style={navStyle}>
            {/* Logo */}
            <Link to={token ? "/dashboard" : "/"} style={logoStyle} ref={logoRef}>
                <div style={dotStyle} />
                <span>SkillVerify</span>
                <span style={{ color: "#f0c040", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, opacity: 0.8 }}>
                    PRO
                </span>
            </Link>

            {/* Links */}
            <div ref={linksRef} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {!token ? (
                    <>
                        <Link to="/" style={linkStyle("/")}>Login</Link>
                        <Link to="/signup" style={{ ...btnStyle("gold"), textDecoration: "none", padding: "7px 18px" }}>
                            Get Started
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
                        <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>

                        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />

                        <Link
                            to="/add-skill"
                            style={{ ...btnStyle("teal"), textDecoration: "none", display: "inline-block" }}
                        >
                            + Add Skill
                        </Link>

                        {userId && (
                            <Link
                                to={`/resume/${userId}`}
                                style={{ ...btnStyle("gold"), textDecoration: "none", display: "inline-block" }}
                            >
                                View Resume
                            </Link>
                        )}

                        <button onClick={handleLogout} style={btnStyle("red")}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;