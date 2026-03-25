// import { useState } from "react";
// import axios from "axios";

// const AddSkill = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post("http://localhost:5001/api/skills/add", {
//                 name,
//                 verifierEmail: email,
//             });

//             alert("✅ Skill added & email sent!");

//             setName("");
//             setEmail("");
//         } catch (err) {
//             console.error(err);
//             alert("❌ Error adding skill");
//         }
//     };

//     return (
//         <div className="p-4 border rounded w-96">
//             <h2 className="text-xl font-bold mb-3">Add Skill</h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//                 <input
//                     type="text"
//                     placeholder="Skill Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                 />

//                 <input
//                     type="email"
//                     placeholder="Verifier Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                 />

//                 <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
//                     Add Skill
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddSkill;