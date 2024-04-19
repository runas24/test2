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
    var loanTermYears = parseInt(document.getElementById("loanTerm").value);

    // Рассчитываем максимальную сумму кредита
    // Больший процент от пенсионных отчислений увеличивает максимальную сумму кредита
    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    var formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("loanDate", loanDate);
    formData.append("maxLoanAmount", maxLoanAmount);
    
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

document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/\D/g, ''));
    var interestRate = parseFloat(document.getElementById("interestRate").value);
    var loanTermMonths = parseInt(document.getElementById("loanTermMonths").value);

    // Рассчитываем ежемесячный платеж
    var monthlyInterestRate = interestRate / 100 / 12;
    var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

    // Отображаем результат
    document.getElementById("monthlyPaymentResult").textContent = "Ежемесячный платеж: " + monthlyPayment.toFixed(2) + " тенге";
});
