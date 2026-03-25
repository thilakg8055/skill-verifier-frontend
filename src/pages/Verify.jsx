import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Verify = () => {
    const { id, action } = useParams();

    useEffect(() => {
        const verifySkill = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/api/skills/verify/${id}/${action}`);
            } catch (err) {
                console.error(err);
            }
        };

        verifySkill();
    }, [id, action]);

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">
                {action === "accept" ? "✅ Skill Accepted" : "❌ Skill Rejected"}
            </h1>
        </div>
    );
};

export default Verify;