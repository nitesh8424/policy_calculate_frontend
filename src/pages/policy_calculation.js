import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { calculatePolicy } from "../api/api.service";
import validateSumAssured from "../utils/utils";
import Loader from "../components/loader";

const PolicyCal = () => {
    const [policyDetails, setPolicyDetails] = useState({
        dob: '',
        age: '',
        gender: '',
        sum_assured: '',
        modal_premium: '',
        premium_frequency: 'Yearly',
        pt: '',
        ppt: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'dob') {
            const dobDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            console.log(age)
            setPolicyDetails((prevDetails) => ({
                ...prevDetails,
                dob: value,
                age: age
            }));
        } else {
            setPolicyDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    }
    const calculate_policy = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const validate = validateSumAssured(policyDetails.modal_premium, policyDetails.sum_assured, policyDetails.premium_frequency);
        if (!validate.valid) {
            setIsLoading(false);
            alert(validate.message);
        }
        if (policyDetails.age < 23 || policyDetails.age > 56) {
            setPolicyDetails((prev) => ({
                ...prev,
                dob: '',
                age: ''
            }));
            setIsLoading(false);
            alert('Age should min 23 and max 56');
            return
        }
        const data = await calculatePolicy(policyDetails);
        setIsLoading(false)
        navigate('/policy_illustration', { state: data })
    }

    return (
        <div>
            <Header />
            <style>
                {`
          table {
            margin-top: 20px;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
            input, select{
            width: 105px
            }
          td {
            text-align: left;
          }`}
            </style>
            <form onSubmit={calculate_policy}>
                <div style={{ width: '400px', marginTop: '20px', alignItems: 'center', margin: 'auto', justifyContent: 'center' }}>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={3} style={{ textAlign: 'center' }}>Policy Calculation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PPT (Premium Paying Term)</td>
                                <td>:</td>
                                <td> <input type='number' name='ppt' min={5} max={10} value={policyDetails.ppt} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td>PT (Policy Term)</td>
                                <td>:</td>
                                <td> <input type='number' min={10} max={20} name='pt' value={policyDetails.pt} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td>Premium</td>
                                <td>:</td>
                                <td> <input type='number' min={10000} max={80000} name='modal_premium' value={policyDetails.modal_premium} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>:</td>
                                <td> <input style={{ width: '105px' }} type='text' name='gender' value={policyDetails.gender} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td>Sum Assured</td>
                                <td>:</td>
                                <td> <input type='number' min={100000} max={5000000} name='sum_assured' value={policyDetails.sum_assured} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td>Premium Frequency</td>
                                <td>:</td>
                                <td><select style={{ marginLeft: '5px' }} name="premium_frequency" value={policyDetails.premium_frequency} onChange={handleChange} required>
                                    <option value="Yearly">Yearly</option>
                                    <option value="Half-Yearly">Half-Yearly</option>
                                    <option value="Monthly">Monthly</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>dob</td>
                                <td>:</td>
                                <td> <input type='date' name='dob' value={policyDetails.dob} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center' }}> <button style={{ cursor: 'pointer' }} type='submit'>Calculate Premium</button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
            {isLoading && <Loader/>}
        </div>
    )
}

export default PolicyCal;