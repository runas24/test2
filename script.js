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
    var loanTerm = parseInt(document.getElementById("loanTerm").value);

    // Рассчитываем максимальную сумму кредита
    // Больший процент от пенсионных отчислений увеличивает максимальную сумму кредита
    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    // Рассчитываем ежемесячный платеж
    var monthlyInterestRate = 0.05 / 12; // Процентная ставка в месяц (5% годовых)
    var numberOfPayments = loanTerm * 12; // Общее количество платежей
    var monthlyPayment = (maxLoanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    // Проверяем, что сумма кредита не превышает максимальное значение
    if (desiredAmount > maxLoanAmount) {
        document.getElementById("resultMessage").textContent = "Ошибка: Сумма кредита превышает максимально возможное значение.";
        return;
    }

    // Форматируем ежемесячный платеж
    var formattedMonthlyPayment = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT' }).format(monthlyPayment);

    // Отображаем результаты на странице
    document.getElementById("resultMessage").textContent = "Максимальная сумма кредита: " + maxLoanAmount.toLocaleString('ru-RU') + " тенге";
    document.getElementById("monthlyPaymentValue").textContent = formattedMonthlyPayment + " в месяц";

    // Показываем кнопку "Посмотреть результат"
    document.getElementById("viewResultButton").style.display = "block";
});
