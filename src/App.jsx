// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { useState } from "react";
// //import AddSkill from "./components/AddSkill";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import AddSkill from "./pages/AddSkill";
// import Verify from "./pages/Verify";
// import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
// import PrivateRoute from "./components/PrivateRoute";
// import Resume from "./pages/Resume";

// function App() {
//     // const [skills, setSkills] = useState([]);
//     // const updateStatus = (index, newStatus) => {
//     //     const updatedSkills = [...skills];
//     //     updatedSkills[index].status = newStatus;
//     //     setSkills(updatedSkills);
//     // };
//     return (
//         <Router>
//             <Navbar />

//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/resume/:userId" element={<Resume />} />

//                 <Route
//                     path="/dashboard"
//                     element={
//                         <PrivateRoute>
//                             <Dashboard />
//                         </PrivateRoute>
//                     }
//                 />

//                 <Route
//                     path="/add-skill"
//                     element={
//                         <PrivateRoute>
//                             <AddSkill />
//                         </PrivateRoute>
//                     }
//                 />

//                 <Route path="/verify/:id/:action" element={<Verify />} />
//                 <Route
//                     path="/profile"
//                     element={
//                         <PrivateRoute>
//                             <Profile />
//                         </PrivateRoute>
//                     } />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddSkill from "./pages/AddSkill";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Resume from "./pages/Resume";
import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/resume/:userId" element={<Resume />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-skill"
                    element={
                        <PrivateRoute>
                            <AddSkill />
                        </PrivateRoute>
                    }
                />
                <Route path="/verify/:id/:action" element={<Verify />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;