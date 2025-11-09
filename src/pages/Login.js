import { useEffect, useState } from "react"
import { loginRequest, registerRequest } from "../api/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

function Login() {

    const [userDetails, setUserDetails] = useState({
        username: '',
        age: '',
        dob: '',
        gender: '',
        name: '',
        mobile: '',
        password: '',
        cnfPassword: ''
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'dob') {
            const dobDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();

            setUserDetails((prevDetails) => ({
                ...prevDetails,
                dob: value,
                age: age
            }));
        } else {
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }

    }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    useEffect(() => {
        if (error) {
            alert(error);
            setError('');
        }
    }, [error]);

    useEffect(() => {

    }, [isLoading]);

    const navigate = useNavigate();
    async function handleLogin() {
        try {
            setIsLoading(true);
            const loginData = await loginRequest({
                username: userDetails?.username,
                password: userDetails?.password
            });
            if (loginData?.success && loginData?.accessToken) {
                localStorage.setItem('user', JSON.stringify({ username: userDetails?.username, token: loginData.accessToken }));
                localStorage.setItem('sessionStart', Date.now() + 10 * 60 * 1000);
                navigate('/dashboard');
            } else {
                setIsLoading(false)
                setError(loginData?.message || 'Login asjdkaskd failed');
            }
        } catch (error) {
            setIsLoading(false)
            setError(error);
        }
    }

    async function handleRegister() {
        setIsLoading(true);
        if (userDetails?.password !== userDetails?.cnfPassword) {
            alert('Password not matched')
            setIsLoading(false);
            return
        }
        try {
            const registerData = await registerRequest(userDetails);
            if (registerData.success) {
                alert('Registration Successful')
                setIsLoginMode(true);
                setUserDetails({
                    username: '',
                    age: '',
                    dob: '',
                    gender: '',
                    name: '',
                    mobile: null,
                    password: null,
                    cnfPassword: null
                })
            } else {
                setIsLoading(false);
                setError(registerData.message || 'Registration failed');
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.message);
        }
    }

    const loginComponent = () => {
        return (
            <div style={{ textAlign: 'left', display: 'inline-table', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ display: 'flex', justifyContent: 'center' }}> <strong>LOGIN</strong> </p>
                <p>
                    <label htmlFor="username">Username :</label>
                    <input type='text' value={userDetails?.username} name="username" onChange={(e) => handleChange(e)} />
                </p>
                <p>
                    <label htmlFor="username">Password :</label>
                    <input type='password' value={userDetails?.password} name="password" onChange={(e) => handleChange(e)} />
                </p>
                <span style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button style={{ cursor: 'pointer' }} onClick={handleLogin}>Login</button>
                </span>
            </div>
        )
    }

    function registerComponent() {
        return (
            <>
                {isLoading ? <Loader />
                    : (<div style={{ textAlign: 'left', display: 'inline-table', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ display: 'flex', justifyContent: 'center' }}> <strong>REGISTER</strong> </p>
                        <p>
                            <label htmlFor="username">Username :</label>
                            <input type='text' value={userDetails?.username} name="username" onChange={(e) => handleChange(e)} />
                        </p>
                        <p>
                            <label htmlFor="username">Name :</label>
                            <input type='text' value={userDetails?.name} name="name" onChange={(e) => handleChange(e)} />
                        </p>
                        <p>
                            <label htmlFor="username">Gender :</label>
                            <input type='text' value={userDetails?.gender} name="gender" onChange={(e) => handleChange(e)} />
                        </p>
                        <p>
                            <label htmlFor="username">DOB :</label>
                            <input type='date' value={userDetails?.dob} name='dob' onChange={(e) => handleChange(e)} />
                        </p>
                        <p>
                            <label htmlFor="username">Mobile :</label>
                            <input type='number' value={userDetails?.mobile} name="mobile" onChange={(e) => handleChange(e)} />
                        </p>
                        <p>
                            <label htmlFor="username">Password :</label>
                            <input type='password' value={userDetails?.password} name="password" onChange={(e) => handleChange(e)} />
                        </p>
                        <p>
                            <label htmlFor="username">Confirm Password :</label>
                            <input type='password' value={userDetails?.cnfPassword} name="cnfPassword" onChange={(e) => handleChange(e)} />
                        </p>
                        <span style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <button style={{ cursor: 'pointer' }} onClick={handleRegister}>Register</button>
                            <button style={{ cursor: 'pointer' }} onClick={() => setIsLoginMode(false)}>Already Have Login</button>
                        </span>
                    </div>)
                }
            </>
        )
    }

    return (
        <>
            <style>
                {`
                p {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px;
                width: 350px;
                }

                p > label {
                flex: 1;
                text-align: left;
                margin-right: 10px;
                }

                p > input, p > select {
                flex: 1;
                text-align: left;
                width: 150px;
                }`}
            </style>
            {isLoginMode ? loginComponent() : registerComponent()}
            {isLoading && <Loader />}
        </>
    )
}

export default Login;