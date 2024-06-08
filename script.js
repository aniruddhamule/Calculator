function calculate() {
    const balance = parseFloat(document.getElementById('balance').value);
    const initialValue = parseFloat(document.getElementById('initial_value').value);
    let percentage = parseFloat(document.getElementById('percentage').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    const multiplier = parseFloat(document.getElementById('multiplier').value);
    
    percentage /= 100;
    let currentValue = initialValue;
    let totalSum = initialValue;
    let results = "";
    let isBalanceSufficient = true;

    for (let i = 1; i < iterations; i++) {
        let increment = currentValue * percentage;
        currentValue += increment;
        totalSum += currentValue;

        if (totalSum > balance) {
            results += `<p>Insufficient balance and you can play total ${i} bets only</p>`;
            isBalanceSufficient = false;
            break;
        }
    }

    if (isBalanceSufficient) {
        results = `<h2>Total Bets (Every Bet Price):</h2><table><tr><th>Number of Bets</th><th>Price</th></tr><tr><td>1</td><td>${initialValue.toFixed(2)}</td></tr>`;
        
        currentValue = initialValue;
        totalSum = initialValue;
        
        for (let i = 1; i < iterations; i++) {
            let increment = currentValue * percentage;
            currentValue += increment;
            totalSum += currentValue;
            results += `<tr><td>${i + 1}</td><td>${currentValue.toFixed(2)}</td></tr>`;
        }
        
        results += `</table><h2>Results:</h2><div class="results-container">`;

        const finalValueMultiplied = currentValue * multiplier;
        const finalBalanceAmount = balance - totalSum + finalValueMultiplied;

        results += `
            <div class="result-card"><h3>Bet Price</h3><p>${currentValue.toFixed(2)}</p></div>
            <div class="result-card"><h3>Winning Bet Price</h3><p>${finalValueMultiplied.toFixed(2)}</p></div>
            <div class="result-card"><h3>Sum of Losses</h3><p>${totalSum.toFixed(2)}</p></div>
            <div class="result-card"><h3>Final Balance Amount</h3><p>${finalBalanceAmount.toFixed(2)}</p></div>
        </div>`;
    }

    document.getElementById('result').innerHTML = results;
    return false;
}
