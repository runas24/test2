const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем парсинг JSON
app.use(bodyParser.json());

// Обрабатываем POST-запросы к /submit
app.post('/submit', (req, res) => {
    const formData = req.body;

    // URL вашего скрипта Google Apps Script
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbx8l5uPCqI-5QzzEp4Y1Rw1c-cOxr-CpksABYujojIRCb5NyTJ5qkux2vWUi84guYi7/exec'; // Замените 'your_script_id' на реальный идентификатор вашего скрипта

    // Отправляем POST-запрос к скрипту Google Apps Script
    request.post(scriptUrl, { json: formData }, (error, response, body) => {
        if (error) {
            res.status(500).json({ error: 'Failed to send data to Google Apps Script.' });
        } else {
            res.status(response.statusCode).json(body);
        }
    });
});

// Слушаем порт
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
