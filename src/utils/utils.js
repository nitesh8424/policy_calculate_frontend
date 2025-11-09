function validateSumAssured(premium, sumAssured, frequency) {
    let annualPremium;

    if (frequency === 'Monthly') {
        annualPremium = premium * 12;
    } else if (frequency === 'Half-Yearly') {
        annualPremium = premium * 2;
    } else {
        annualPremium = premium;
    }

    const minRequired = Math.min(annualPremium * 10, 5000000);

    if (sumAssured < minRequired) {
        return {
            valid: false,
            message: `Sum Assured must be at least ₹${minRequired.toLocaleString()} based on your premium`
        };
    }

    return { valid: true };
}

export default validateSumAssured