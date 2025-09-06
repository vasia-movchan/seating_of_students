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

    // Вилучаємо учнів 15, 7, 13, 12, 5, 8, 17
    const idx15 = arr.findIndex((name) => name === students[15]);
    const student15 = arr.splice(idx15, 1)[0];

    const idx7 = arr.findIndex((name) => name === students[7]);
    const student7 = arr.splice(idx7, 1)[0];

    const idx13 = arr.findIndex((name) => name === students[13]);
    const student13 = arr.splice(idx13, 1)[0];

    const idx12 = arr.findIndex((name) => name === students[12]);
    const student12 = arr.splice(idx12, 1)[0];

    const idx5 = arr.findIndex((name) => name === students[5]);
    const student5 = arr.splice(idx5, 1)[0];

    const idx8 = arr.findIndex((name) => name === students[8]);
    const student8 = arr.splice(idx8, 1)[0];

    const idx17 = arr.findIndex((name) => name === students[17]);
    const student17 = arr.splice(idx17, 1)[0];

    // Перемішуємо масив без учнів 15, 7, 13, 12, 5, 8, 17
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Визначаємо індекси спарених парт (2-3, 4-5, ..., 17-18)
    const pairedIndexes = [];
    for (let i = 1; i <= 18; i += 2) {
        pairedIndexes.push([i - 1, i]);
    }

    let pos7,
        pos13,
        pos12,
        pos5,
        pos8,
        pos15,
        pos17,
        valid = false;
    while (!valid) {
        pos7 = Math.floor(Math.random() * (arr.length + 1));
        pos13 = Math.floor(Math.random() * (arr.length + 2));
        pos12 = Math.floor(Math.random() * (arr.length + 3));
        pos5 = Math.floor(Math.random() * (arr.length + 4));
        pos8 = Math.floor(Math.random() * (arr.length + 5));
        pos15 = Math.floor(Math.random() * (arr.length + 6));
        pos17 = Math.floor(Math.random() * (arr.length + 7));
        // Всі позиції мають бути різними
        if (new Set([pos7, pos13, pos12, pos5, pos8, pos15, pos17]).size < 7) continue;

        // Вставляємо тимчасово
        let tempArr = arr.slice();
        tempArr.splice(pos7, 0, student7);
        let adjPos13 = pos13 > pos7 ? pos13 : pos13;
        tempArr.splice(adjPos13, 0, student13);
        let adjPos12 = pos12;
        if (adjPos12 > pos7) adjPos12++;
        if (adjPos12 > adjPos13) adjPos12++;
        tempArr.splice(adjPos12, 0, student12);

        let adjPos5 = pos5;
        if (adjPos5 > pos7) adjPos5++;
        if (adjPos5 > adjPos13) adjPos5++;
        if (adjPos5 > adjPos12) adjPos5++;
        tempArr.splice(adjPos5, 0, student5);

        let adjPos8 = pos8;
        if (adjPos8 > pos7) adjPos8++;
        if (adjPos8 > adjPos13) adjPos8++;
        if (adjPos8 > adjPos12) adjPos8++;
        if (adjPos8 > adjPos5) adjPos8++;
        tempArr.splice(adjPos8, 0, student8);

        let adjPos15 = pos15;
        if (adjPos15 > pos7) adjPos15++;
        if (adjPos15 > adjPos13) adjPos15++;
        if (adjPos15 > adjPos12) adjPos15++;
        if (adjPos15 > adjPos5) adjPos15++;
        if (adjPos15 > adjPos8) adjPos15++;
        tempArr.splice(adjPos15, 0, student15);

        let adjPos17 = pos17;
        if (adjPos17 > pos7) adjPos17++;
        if (adjPos17 > adjPos13) adjPos17++;
        if (adjPos17 > adjPos12) adjPos17++;
        if (adjPos17 > adjPos5) adjPos17++;
        if (adjPos17 > adjPos8) adjPos17++;
        if (adjPos17 > adjPos15) adjPos17++;
        tempArr.splice(adjPos17, 0, student17);

        // Перевіряємо умови
        valid = true;
        for (let [a, b] of pairedIndexes) {
            // 7 і 13 не поруч
            if ((tempArr[a] === students[7] && tempArr[b] === students[13]) || (tempArr[a] === students[13] && tempArr[b] === students[7])) {
                valid = false;
                break;
            }
            // 12 і 15 не поруч
            if ((tempArr[a] === students[12] && tempArr[b] === students[15]) || (tempArr[a] === students[15] && tempArr[b] === students[12])) {
                valid = false;
                break;
            }
        }
        // 5 та 8 не можуть бути на партах з номером більше 13 (індекси 13-19)
        const idx5final = tempArr.indexOf(student5);
        const idx8final = tempArr.indexOf(student8);
        if (idx5final > 13 || idx8final > 13) valid = false;

        // 15 не може бути на партах з номером більше 13 (індекси 13-19)
        const idx15final = tempArr.indexOf(student15);
        if (idx15final > 13) valid = false;

        // 17 не може бути на партах з номером більше 15 (індекси 15-19)
        const idx17final = tempArr.indexOf(student17);
        if (idx17final > 14) valid = false;

        if (valid) {
            arr = tempArr;
        }
    }

    return arr;
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
