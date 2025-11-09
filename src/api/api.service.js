
const baseUrl = process.env.REACT_APP_URL || 'http://localhost:5000';

function loginRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            let result;
            if (response.ok) {
                result = await response.json();
                resolve(result);
            } else {
                const errorData = await response.json();
                reject(new Error(errorData.message || 'Login failed'));
            }
        } catch (error) {
            reject(new Error(error.message || 'Login failed'));
        }
    });
}

function registerRequest(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const result = await response.json();
                resolve(result);
            } else {
                reject(new Error('Registration failed'));
            }
        } catch (error) {
            reject(new Error('Registration failed'));
        }
    });
}

function getPolicyDetails(data) {
    return new Promise(async (resolve, reject) => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch(`${baseUrl}/get_policy_details`, {
                method: 'GET',
                params: data,
                headers: { authorization: `Bearer ${user.token || ''}` }
            });
            if (response.ok) {
                const result = await response.json();
                resolve(result);
            } else {
                reject(new Error('Failed to retrieve policy details'));
            }
        } catch (error) {
            reject(new Error('Failed to retrieve policy details'));
        }
    });
}

function calculatePolicy(data) {
    return new Promise(async (resolve, reject) => {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await fetch(`${baseUrl}/policy_calculation`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { authorization: `Bearer ${user.token || ''}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const result = await response.json();
                resolve(result);
            } else {
                reject(new Error('Failed to policy calculation'));
            }
        } catch (error) {
            reject(new Error('Failed to policy calculation'));
        }
    });
}

export { loginRequest, registerRequest, getPolicyDetails, calculatePolicy };
