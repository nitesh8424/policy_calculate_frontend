import '../App.css';

function PolicyDetailsPage() {

    const policyDetails = {
        dob: '1995/05/12',
        gender: 'M',
        sum_assured: '1,200,000',
        modal_premium: '80,000',
        premium_frequency: 'Yearly',
        pt: 18,
        ppt: 10
    }
    return (
        <>
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
        `}
            </style>

            <div style={{ display: 'flex', justifyContent: 'center', 'marginTop': '20px' }}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{ textAlign: 'center' }}>POLICY DETAILS</th>
                        </tr>
                        <tr>
                            <th>Inputs</th>
                            <th>Particulars</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DOB</td>
                            <td>{policyDetails.dob}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{policyDetails.gender}</td>
                        </tr>
                        <tr>
                            <td>Sum Assured</td>
                            <td>{policyDetails.sum_assured}</td>
                        </tr>
                        <tr>
                            <td>Modal Premium</td>
                            <td>{policyDetails.modal_premium}</td>
                        </tr>
                        <tr>
                            <td>Premium Frequency</td>
                            <td>{policyDetails.premium_frequency}</td>
                        </tr>
                        <tr>
                            <td>PT</td>
                            <td>{policyDetails.pt}</td>
                        </tr>
                        <tr>
                            <td>PPT</td>
                            <td>{policyDetails.ppt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default PolicyDetailsPage;