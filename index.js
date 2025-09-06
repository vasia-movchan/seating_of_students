const students = {
    1: 'Дорошенко Анастасія',
    2: 'Ийбер Жанна',
    3: 'Ільічек Софія',
    4: 'Ковальчук Віктор',
    5: 'Олексик Надія',
    6: 'Панькович Олександра',
    7: 'Пехньо Тетяна',
    8: 'Плеша Марія',
    9: 'Плоскіна Ярослав',
    10: 'Пуга Олександр',
    11: 'Сіденко Валерія',
    12: 'Скиба Емілія',
    13: 'Співак Вероніка',
    14: 'Талабішка Динис',
    15: 'Халявка Анастасія',
    16: 'Хом’як Максим',
    17: 'Цьонь Анастасія',
    18: 'Яковенко Карина',
};

const cardsList = document.getElementById('cards-list');
Object.entries(students).forEach(([num, name]) => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.textContent = `${num}. ${name}`;
    cardsList.appendChild(card);
});

const numbersList = document.getElementById('numbers-list');
for (let i = 1; i <= 20; i++) {
    const card = document.createElement('div');
    card.className = 'student-card';

    // Додаємо номер парти у верхній лівий кут
    const numberDiv = document.createElement('div');
    numberDiv.className = 'desk-number';
    numberDiv.textContent = i;
    card.appendChild(numberDiv);

    // Додаємо зображення парти desk.png
    const img = document.createElement('img');
    img.src = 'desk.png';
    img.alt = 'Парта';
    card.appendChild(img);

    numbersList.appendChild(card);
}

// Функція для перемішування масиву
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.querySelector('.place-btn').addEventListener('click', () => {
    // Очищаємо всі картки парт від імен
    const deskCards = numbersList.querySelectorAll('.student-card');
    deskCards.forEach((card) => {
        // Видаляємо старі імена, якщо вони є
        const nameDiv = card.querySelector('.student-name');
        if (nameDiv) card.removeChild(nameDiv);
    });

    // Створюємо масив імен учнів (без номерів)
    const studentNames = Object.values(students);
    const shuffled = shuffle(studentNames);

    // Додаємо імена до перших 18 парт
    deskCards.forEach((card, idx) => {
        if (idx < shuffled.length) {
            const nameDiv = document.createElement('div');
            nameDiv.className = 'student-name';
            nameDiv.textContent = shuffled[idx];

            // Вставляємо ім'я перед зображенням парти
            const img = card.querySelector('img');
            card.insertBefore(nameDiv, img);
        }
    });
});
