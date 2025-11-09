import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const navigate = useNavigate();
    const timeRef = useRef(0);
    const displayRef = useRef(null);

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!user.username) {
            navigate("/");
        }
    }, [user, navigate]);

    // Session countdown logic
    useEffect(() => {
        const sessionStart = parseInt(localStorage.getItem("sessionStart"), 10);
        const now = Date.now();
        const remainingSeconds = Math.floor((sessionStart - now) / 1000);
        timeRef.current = isNaN(remainingSeconds) || remainingSeconds < 0 ? 0 : remainingSeconds;

        const interval = setInterval(() => {
            if (timeRef.current <= 0) {
                alert("Session Expired");
                clearInterval(interval);
                localStorage.removeItem("user");
                localStorage.removeItem("sessionStart");
                localStorage.removeItem("policy_details");
                navigate("/");
            } else {
                timeRef.current -= 1;
                const hrs = Math.floor(timeRef.current / 3600);
                const mins = Math.floor((timeRef.current % 3600) / 60);
                const secs = timeRef.current % 60;
                if (displayRef.current) {
                    displayRef.current.textContent = `${hrs.toString().padStart(2, "0")}:${mins
                        .toString()
                        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    // Logout handler
    function handleLogout() {
        alert("Successfully logged out");
        localStorage.removeItem("user");
        localStorage.removeItem("sessionStart");
        localStorage.removeItem("policy_details");
        navigate("/");
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "40px",
                    marginLeft: "40px",
                }}
            >
                <p>Insurance Policy Company</p>
                <div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <p>
                            Welcome: <strong>{user.username}</strong>
                        </p>
                        <p>
                            <button style={{ cursor: "pointer" }} onClick={handleLogout}>
                                Logout
                            </button>
                        </p>
                    </div>
                    <div>
                        <p>
                            Session Expires In: <span ref={displayRef}></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;