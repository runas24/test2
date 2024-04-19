function formatCurrency(input) {
    var value = input.value.replace(/\D/g, '');
    var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
    input.value = formattedValue;
}

document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fullName = document.getElementById("fullName").value;
    var loanDate = document.getElementById("loanDate").value;
    var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
    var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
    var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));
    var loanTerm = parseFloat(document.getElementById("loanTerm").value);

    // Рассчитываем максимальную сумму кредита
    // Больший процент от пенсионных отчислений увеличивает максимальную сумму кредита
    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    var formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("loanDate", loanDate);
    formData.append("maxLoanAmount", maxLoanAmount);
    formData.append("loanTerm", loanTerm);

    // Показываем анимированную загрузку
    var loader = document.getElementById("loader");
    loader.style.display = "block";

    fetch('https://script.google.com/macros/s/AKfycbxGh8pH6EOSuN6Ys0vov4Bex-pnyd43S1or2w81LTZoZWM8-nG7sDwyxA9OKs5DXsh4/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("resultMessage").textContent = data;
        document.getElementById("viewResultButton").style.display = "block"; // Показываем кнопку "Посмотреть результат"
        loader.style.display = "none"; // Скрываем анимированную загрузку после завершения
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = "none"; // Скрываем анимированную загрузку в случае ошибки
    });
});

document.getElementById("calculateMonthlyPayment").addEventListener("click", function() {
    var loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/\D/g, ''));
    var annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value);
    var loanPeriod = parseFloat(document.getElementById("loanPeriod").value);

    var monthlyInterestRate = annualInterestRate / 100 / 12;
    var totalPayments = loanPeriod * 12;
    
    // Рассчет ежемесячного платежа по формуле аннуитетного платежа
    var monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    document.getElementById("monthlyPayment").textContent = "Ежемесячный платеж: " + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " тенге";
});
