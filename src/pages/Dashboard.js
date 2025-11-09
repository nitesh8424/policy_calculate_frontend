import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Dashboard() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});


    const navigate = useNavigate();
    useEffect(() => {
        if (!user.username) {
            navigate('/')
        }
    }, [user]);

    return (
        <div>
            <Header/>
            <div>
                <button style={{cursor:'pointer'}} onClick={()=>navigate('/policy_calculate')}>Policy Calculate</button>
            </div>
        </div>
    )
}

export default Dashboard;