const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Инициализация Firebase Admin SDK
const serviceAccount = require('./test-project-2484e-firebase-adminsdk-xf9w6-5095a4f2d2.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const cors = require('cors');

app.use(cors());

app.use(express.json()); // Для работы с JSON запросами

// Middleware для проверки токена
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next(); // Перейти к следующему middleware или маршруту
    } catch (error) {
        return res.status(403).json({ message: 'Неверный токен' });
    }
};

app.post('/save-user-data', async (req, res) => {
    const { uid, name, surname, phone } = req.body;

    if (!uid || !name || !surname || !phone) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения, включая uid' });
    }

    try {
        // Сохраняем данные пользователя в Firestore с использованием uid
        await db.collection('users').doc(uid).set({
            name,
            surname,
            phone,
        });

        res.status(200).json({ message: 'Данные пользователя сохранены успешно' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при сохранении данных', error });
    }
});

app.get('/get-user-data/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const userDoc = await db.collection('users').doc(uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json({ data: userDoc.data() });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении данных', error });
    }
});

// Пример API с защитой токеном
app.get('/secure-data', authenticateToken, (req, res) => {
    res.json({ message: 'Доступ к защищенным данным', user: req.user });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
