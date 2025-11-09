import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import Header from "./Header";

function IllustrationPage() {
    const location = useLocation();
    const [data, setData] = useState(() => {
        return location.state.data || JSON.parse(localStorage.getItem('policy_details'));
    });

    useEffect(() => {
        if (data) {
            localStorage.setItem('policy_details', JSON.stringify(data));
        }
    }, [data]);

    return (
        <>
            <Header />
            <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'center' }}>
                <style>
                    {`
          table {
            border: 1px solid black;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          td {
            text-align: right;
          }
            .loader {
            width: 48px;
            height: 48px;
            border: 5px solid #FFF;
            border-bottom-color: #FF3D00;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
            }

            @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            } 
        `}
                </style>
                {data.length > 0 ?
                    (
                        <div>
                            <p style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: '20px', fontStyle: 'italic' }}> Illustration Page</p>
                            <table>
                                <thead style={{ backgroundColor: 'lightskyblue' }}>
                                    <tr>
                                        <th colSpan={5} style={{ backgroundColor: 'white' }}></th>
                                        <th style={{ backgroundColor: 'aqua' }}>IIR -</th>
                                        <th style={{ backgroundColor: 'aqua' }}>8.4%</th>
                                    </tr>
                                    <tr>
                                        <th>Policy Year</th>
                                        <th>Premium</th>
                                        <th>Sum Assured</th>
                                        <th>Bonus Rate</th>
                                        <th>Bonus Amount</th>
                                        <th>Total Benifit</th>
                                        <th>Net Cashflows</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.policy_year}</td>
                                                <td>{item.premium.toLocaleString('en-US')}</td>
                                                <td>{item.sum_assured.toLocaleString('en-US')}</td>
                                                <td>{item.bonus_rates}%</td>
                                                <td>{item.bonus_amount.toLocaleString('en-US')}</td>
                                                <td>{item.total_benefit.toLocaleString('en-US')}</td>
                                                <td>{item.net_cashflows.toLocaleString('en-US')}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>) :
                    (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '200px',
                                width: '300px',
                                padding: '20px',
                                alignItems: 'center'
                            }}>
                                <span className="loader"></span>
                                <p>loading illustration data ....</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default IllustrationPage;