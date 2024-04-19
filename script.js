function formatCurrency(input) {
    var value = input.value.replace(/\D/g, '');
    var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
    input.value = formattedValue;
}

function calculateMaxLoanAmount() {
    var fullName = document.getElementById("fullName").value;
    var loanDate = document.getElementById("loanDate").value;
    var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
    var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
    var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));

    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    document.getElementById("resultMessage").innerText = "Максимальная сумма кредита: " + maxLoanAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " тенге";
    document.getElementById("loader").style.display = "block"; // Показываем анимацию загрузки

    setTimeout(function() {
        document.getElementById("loader").style.display = "none"; // Скрываем анимацию загрузки
        document.getElementById("viewResultButton").style.display = "block"; // Показываем кнопку "Посмотреть результат"
    }, 10000); // Результат появится через 10 секунд (10000 миллисекунд)
}

function calculateMonthlyPayment() {
    var loanAmount = parseFloat(document.getElementById("loanAmount").value);
    var interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    var loanTerm = parseInt(document.getElementById("loanTerm").value);

    var monthlyInterestRate = interestRate / 12;
    var monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

    document.getElementById("monthlyPayment").innerText = "Ежемесячный платеж: " + monthlyPayment.toFixed(2) + " тенге";
}
