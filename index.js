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
    let arr = array.slice();

    // Вилучаємо учнів з особливими обмеженнями
    const special = [
        { num: 15, name: students[15] },
        { num: 7, name: students[7] },
        { num: 13, name: students[13] },
        { num: 12, name: students[12] },
        { num: 5, name: students[5] },
        { num: 8, name: students[8] },
        { num: 17, name: students[17] },
        { num: 14, name: students[14] },
        { num: 16, name: students[16] },
    ];
    special.forEach((s) => {
        const idx = arr.findIndex((name) => name === s.name);
        arr.splice(idx, 1);
    });

    // Перемішування масиву без особливих учнів
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    let valid = false,
        tempArr;
    while (!valid) {
        // Випадкові позиції для особливих учнів
        let positions = [];
        let arrCopy = arr.slice();
        for (let i = 0; i < special.length; i++) {
            let pos;
            do {
                pos = Math.floor(Math.random() * (arrCopy.length + 1));
            } while (positions.includes(pos));
            positions.push(pos);
            arrCopy.splice(pos, 0, special[i].name);
        }
        tempArr = arrCopy;

        // Перевірка обмежень
        valid = true;
        // 7 і 13 не поруч на спарених партах
        // 12 і 15 не поруч на спарених партах
        // 5 та 8 не можуть бути на партах > 13 (індекс > 13)
        // 15 не може бути на партах > 13 (індекс > 13)
        // 17 не може бути на партах > 15 (індекс > 14)
        // 14 та 16 не можуть бути на партах < 10 (індекс < 9)
        for (let i = 1; i <= 18; i += 2) {
            // 7 і 13
            if ((tempArr[i - 1] === students[7] && tempArr[i] === students[13]) || (tempArr[i - 1] === students[13] && tempArr[i] === students[7])) {
                valid = false;
                break;
            }
            // 12 і 15
            if (
                (tempArr[i - 1] === students[12] && tempArr[i] === students[15]) ||
                (tempArr[i - 1] === students[15] && tempArr[i] === students[12])
            ) {
                valid = false;
                break;
            }
        }
        const idx5 = tempArr.indexOf(students[5]);
        const idx8 = tempArr.indexOf(students[8]);
        const idx15 = tempArr.indexOf(students[15]);
        const idx17 = tempArr.indexOf(students[17]);
        const idx14 = tempArr.indexOf(students[14]);
        const idx16 = tempArr.indexOf(students[16]);
        if (idx5 > 12 || idx8 > 12) valid = false;
        if (idx15 > 12) valid = false;
        if (idx17 > 14) valid = false;
        if (idx14 < 8 || idx16 < 8) valid = false;
        console.log('Ітерація');
    }

    return tempArr;
}

const placeBtn = document.querySelector('.place-btn');

placeBtn.addEventListener('click', () => {
    const deskCards = numbersList.querySelectorAll('.student-card');
    deskCards.forEach((card) => {
        const nameDiv = card.querySelector('.student-name');
        if (nameDiv) card.removeChild(nameDiv);
    });

    const studentNames = Object.values(students);
    const shuffled = shuffle(studentNames);

    // Блокуємо кнопку
    placeBtn.disabled = true;
    placeBtn.classList.add('disabled');

    // Поступове додавання імен
    deskCards.forEach((card, idx) => {
        if (idx < shuffled.length) {
            setTimeout(() => {
                const nameDiv = document.createElement('div');
                nameDiv.className = 'student-name';
                nameDiv.textContent = shuffled[idx];

                const img = card.querySelector('img');
                card.insertBefore(nameDiv, img);

                // Якщо це останнє ім'я — розблокувати кнопку
                if (idx === shuffled.length - 1) {
                    placeBtn.disabled = false;
                    placeBtn.classList.remove('disabled');

                    // Зберігаємо відповідність учень — номер парти
                    let result = '';
                    deskCards.forEach((card, i) => {
                        const nameDiv = card.querySelector('.student-name');
                        if (nameDiv) {
                            result += `${nameDiv.textContent} - парта №${i + 1}\r\n`;
                        }
                    });

                    // Створюємо файл для завантаження
                    const blob = new Blob([result], { type: 'text/plain' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'seating.txt';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                }
            }, idx * 1000);
        }
    });
});
