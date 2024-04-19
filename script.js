function formatCurrency(input) {
    var value = input.value.replace(/\D/g, '');
    var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
    input.value = formattedValue;
}

document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/\D/g, ''));
    var loanTerm = parseInt(document.getElementById("loanTerm").value);
    var interestRate = parseFloat(document.getElementById("interestRate").value);

    // Рассчитываем ежемесячный платеж
    var monthlyInterestRate = interestRate / 100 / 12;
    var monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

    // Выводим результат
    document.getElementById("monthlyPayment").innerText = "Ежемесячный платеж: " + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " тенге";
});
