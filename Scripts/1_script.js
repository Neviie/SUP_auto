let container, fon, ups;
var images = [
    "/Assets/control_banana_1.png",
    "/Assets/contol_cat_2.png",
    "/Assets/control_cherry_3.png",
    "/Assets/control_duck_4.png",
    "/Assets/control_flower_5.png",
    "/Assets/control_house_6.png",
    "/Assets/control_plane_7.png",
    "/Assets/control_rocket_8.png",
    "/Assets/control_tea_9.png",
    "/Assets/conrol_tram_10.png",
];
var leftImageIndex;
var rightImageIndex;
var userId;

// Добавляем в начало
window.randomNumber16 = '9' + Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 10 ** 17);

(function applyInitialTheme() {
    const savedTheme = localStorage.getItem('appTheme') || '0';
    const isDark = savedTheme === '1';
    
    // Создаем или находим стиль
    let themeStyle = document.getElementById('theme-style');
    if (!themeStyle) {
        themeStyle = document.createElement('link');
        themeStyle.id = 'theme-style';
        themeStyle.rel = 'stylesheet';
        themeStyle.type = 'text/css';
        document.head.appendChild(themeStyle);
    }
    
    // Устанавливаем тему 
    themeStyle.href = isDark ? "/StyleWEBN.css" : "/StyleWEBL.css";
    
    // Сохраняем текущую тему
    window.currentTheme = savedTheme;
    window.pendingThemeUpdate = isDark; // Сохраняем для обновления картинок позже
    
    console.log("INITIAL THEME APPLIED:", savedTheme, isDark ? "DARK" : "LIGHT");
})();

function getRandomNumber() {
    var numbers = [0, 43, 86];
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function update1Number() {
    var numberElement = document.getElementById('number');
    var numberElement2 = document.getElementById('number2');
    var numberElement3 = getRandomNumber();
    numberElement.textContent = numberElement3;
    numberElement2.textContent = numberElement3;
}

// Функция показа контейнера
function showContainer() {
    if (container) container.classList.replace('hidden', 'block');
    if (fon) fon.classList.replace('hidden', 'block');
}

// Функция скрытия контейнера
function hideContainer() {
    if (container) container.classList.replace('block', 'hidden');
    if (fon) fon.classList.replace('block', 'hidden');
}

// Функция сохранения данных
function saveData() {
    var value = document.getElementById("inputValue").value.trim();
    
    if (!value) {
        alert("Введите user_id");
        return;
    }
    
    localStorage.setItem("myValue", value);
    
    // Скрываем контейнер
    hideContainer();
    
    // Загружаем данные без перезагрузки страницы
    loadUserData(value);
}

// Функция обновления картинок темы
function updateThemeImages(isDark) {
    const imgs = document.querySelectorAll("img[data-dark][data-light]");
    
    if (imgs.length === 0) {
        console.log("Картинки с data-dark/data-light не найдены");
        return false;
    }
    
    console.log(`Найдено ${imgs.length} картинок для обновления темы`);
    
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        try {
            const newSrc = isDark ? img.dataset.dark : img.dataset.light;
            const currentSrc = img.src.split('/').pop(); // Только имя файла
            
            // Обновляем только если нужно
            if (!img.src.includes(newSrc)) {
                img.src = newSrc;
                console.log(`Обновлена картинка: ${newSrc}`);
            }
        } catch(e) {
            console.error("Ошибка у картинки:", img, e);
        }
    }
    
    return true;
}

// Функция обновления меню
function updateThemeMenu(isDark) {
    setTimeout(() => {
        const activeMenu = document.getElementById('menunow_left');
        if (activeMenu) {
            if (isDark) {
                activeMenu.style.backgroundColor = 'rgb(19,32,47)';
                activeMenu.style.color = 'rgb(39,122,243)';
                const img = activeMenu.querySelector('.img_left_menu');
                if (img) img.src = '/Assets/Active_menunow.png';
            } else {
                activeMenu.style.backgroundColor = 'rgb(226,239,255)';
                activeMenu.style.color = 'rgb(42,127,228)';
                const img = activeMenu.querySelector('.img_left_menu');
                if (img) img.src = '/Assets/Active_menunowL.png';
            }
        }
    }, 50);
}

function applyTheme(theme) {
    const isDark = theme === "1";
    
    // Меняем CSS только если тема изменилась
    if (window.currentTheme !== theme) {
        const themeStyle = document.getElementById('theme-style');
        if (themeStyle) {
            themeStyle.href = isDark ? "/StyleWEBN.css" : "/StyleWEBL.css";
        }
        
        localStorage.setItem('appTheme', theme);
        window.currentTheme = theme;
        console.log("THEME CHANGED:", theme, isDark ? "DARK" : "LIGHT");
    }
    
    // ВСЕГДА обновляем картинки и меню
    updateThemeImages(isDark);
    updateThemeMenu(isDark);
}

function cloneControlElements() {
    var passenValue = parseInt(document.getElementById("passen").innerText);
    var controlDiv = document.getElementById("control");

    if (!isNaN(passenValue) && passenValue >= 2) {
        var existingClones = document.querySelectorAll(".cloned-control");
        for (let i = 0; i < existingClones.length; i++) {
            existingClones[i].remove();
        }

        for (let i = 1; i < passenValue; i++) {
            const clone = controlDiv.cloneNode(true);
            clone.classList.add("cloned-control");
            controlDiv.parentElement.insertBefore(clone, controlDiv.nextElementSibling);
            const randomNumber = Math.floor(Math.random() * (9000000000 - 5000000000)) + 5000000000;
            clone.querySelector('#e').innerText = randomNumber;
        }
    }

    var oplataElement = document.getElementById("oplata");
    var bagsValue = parseInt(document.getElementById("bags").innerText);
    var result = (passenValue + bagsValue) * 43;
    var greenspan = document.getElementById("greenpass");
    oplataElement.textContent = result;
    greenspan.textContent = result;
}

function update2Number() {
    var numberElement = document.getElementById('number');
    var numberElement2 = document.getElementById('number2');
    var currentNumber = parseInt(numberElement.textContent);
    var numbers = [0, 43, 86];
    var nextNumberIndex = numbers.indexOf(currentNumber) + 1;
    if (nextNumberIndex >= numbers.length) nextNumberIndex = 0;
    numberElement.textContent = numbers[nextNumberIndex];
    numberElement2.textContent = numbers[nextNumberIndex];
}

function checkUserIdAndLoadData() {
    let userId = null;

    if (!userId) {
        userId = localStorage.getItem("myValue");
    }

    if (userId) {
        console.log("UserID найден:", userId);
        
        // Скрываем контейнер ввода
        hideContainer();
        
        // Загружаем данные пользователя
        loadUserData(userId);
    } else {
        // Если userId нет, показываем контейнер ввода
        console.log("UserID не найден, показываем контейнер");
        showContainer();
        if (window.Android && typeof window.Android.pageReady === "function") {
            window.Android.pageReady();
        }
    }
}

function loadUserData(userId) {
    const variable = 'all_1';

    // Используем Node.js-прокси
    const proxyUrl = `https://super-sup.ru/test-api/variable?variable=${variable}&user_id=${userId}&fakeParam=${Date.now()}`;

    fetch(proxyUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data) {
            const variables = data.data.split(' ; ');
            const url = variables[0];
            const UstUrl = variables[1];
            const emailurl = variables[2];
            const timerurl = variables[3];
            const passenUrl = variables[4];
            let unixurl = variables[5];
            let theme = variables[6];
            let transport = variables[7];
            let route = variables[8];
            
            // Применяем тему (если она отличается)
            applyTheme(theme);

            // Обновляем элементы на странице
            document.getElementById('emailid').innerHTML = emailurl;
            document.getElementById('result').textContent = url;
            document.getElementById('result2').textContent = url;
            document.getElementById('ustr').textContent = UstUrl;
            document.getElementById('passen').innerHTML = passenUrl;
            document.getElementById('marshrutt').innerHTML = route;

            // Форматирование времени
            document.getElementById('current_date_time_block').innerHTML = timerurl;
            var timeComponents = timerurl.split(':');
            var formattedTime = timeComponents[0] + ':' + timeComponents[1];
            document.getElementById('date_time').textContent = formattedTime;

            // Дата
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()} `;
            document.querySelector('#x').innerHTML = `${formattedDate} ${timerurl}`;
            
            // Таймер
            var timerElement = document.getElementById("timer");
            var startDate = new Date(unixurl * 1000);
            function updateTimer() {
                var diff = new Date() - startDate;
                var hours = Math.floor(diff / 3600000);
                var minutes = Math.floor((diff - hours * 3600000) / 60000);
                var seconds = Math.floor((diff - hours * 3600000 - minutes * 60000) / 1000);
                timerElement.innerText = minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
            }
            updateTimer();
            setInterval(updateTimer, 1000);

            // Загрузка маршрутов
            loadRoutes(transport, route);

        } else {
            console.error("Нет данных в ответе");
            showContainer();
        }
    })
    .catch(error => {
        console.error("Ошибка загрузки данных:", error);
        showContainer();
    });
}

function loadRoutes(transport, route) {
    fetch("/Routes/routes.json")
    .then(res => res.json())
    .then(routesData => {
        console.log("Маршруты загружены", routesData);

        const transportType = transport === "tram" ? "tram" : "bus";
        const routeNumber = route;
        const routeInfo = routesData.find(
            r => r.route === routeNumber && r.transport === transportType
        );

        if (routeInfo) {
            document.querySelector("#carrier_name").textContent = routeInfo.carrier;
            document.querySelector("#carrier_inn").textContent = routeInfo.inn;
            document.querySelector("#marshrutfont").textContent = routeInfo.routeName;

            const transportText =
                routeInfo.transport === "tram" ? "Трамвай " : "Автобус ";
            document
                .querySelectorAll(".transport_type")
                .forEach(el => el.textContent = transportText);
                cloneControlElements();
        }
        
        // СООБЩАЕМ ANDROID: СТРАНИЦА ГОТОВА
        if (window.Android && typeof window.Android.pageReady === "function") {
            window.Android.pageReady();
        }
    })
    .catch(err => {
        console.error("Ошибка загрузки routes.json", err);

        // даже при ошибке убираем splash, чтобы не завис
        if (window.Android && typeof window.Android.pageReady === "function") {
            window.Android.pageReady();
        }
    });
}

window.onload = function() {
  
    // Инициализация элементов
    container = document.querySelector('.container');
    fon = document.querySelector('.fon');
    ups = document.querySelector(".ups");
    
    // Обновление чисел
    update1Number();
    
    // Инициализация виртуальной карты
    if (document.getElementById('virtual_card_num')) {
        document.getElementById('virtual_card_num').textContent = window.randomNumber16;
    }
    
    // Инициализация картинок
    var leftImageElement = document.getElementById('left-image');
    var rightImageElement = document.getElementById('right-image');
    
    if (leftImageElement && rightImageElement) {
        leftImageIndex = Math.floor(Math.random() * images.length);
        rightImageIndex = leftImageIndex;
        while (rightImageIndex === leftImageIndex) {
            rightImageIndex = Math.floor(Math.random() * images.length);
        }
        leftImageElement.src = images[leftImageIndex];
        rightImageElement.src = images[rightImageIndex];
    }
    
    // Обновляем картинки темы после загрузки DOM
    if (window.pendingThemeUpdate !== undefined) {
        setTimeout(() => {
            console.log("Обновление картинок темы после загрузки DOM");
            updateThemeImages(window.pendingThemeUpdate);
            delete window.pendingThemeUpdate;
        }, 100);
    }
    
    // Добавляем обработчик события
    var passenElement = document.getElementById("passen");
    if (passenElement) {
        passenElement.addEventListener("DOMSubtreeModified", cloneControlElements);
    }
    
    // Проверяем userId и загружаем данные
    checkUserIdAndLoadData();
};