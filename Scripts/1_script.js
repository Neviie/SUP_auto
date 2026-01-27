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

function getRandomNumber() {
    var numbers = [0, 40, 80];
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function update1Number() {
    var numberElement = document.getElementById('number');
    var numberElement2 = document.getElementById('number2');
    var numberElement3 = getRandomNumber();
    numberElement.textContent = numberElement3;
    numberElement2.textContent = numberElement3;
}

function applyTheme(theme) {
    const isDark = theme === "1";
    
    if (window.__initialTheme === theme) {
        updateThemeImages(isDark);
        updateThemeMenu(isDark);
        console.log("THEME ALREADY APPLIED:", theme, isDark ? "DARK" : "LIGHT");
        return;
    }
    
    const themeStyle = document.getElementById('theme-style');
    if (themeStyle) {
        themeStyle.href = isDark ? "/StyleWEBN.css" : "/StyleWEBL.css";
    }
    
    updateThemeImages(isDark);
    updateThemeMenu(isDark);
    
    localStorage.setItem('appTheme', theme);
    window.currentTheme = theme;
    
    console.log("THEME APPLIED:", theme, isDark ? "DARK" : "LIGHT");
    
    
}

function updateThemeImages(isDark) {
    document.querySelectorAll("img[data-dark][data-light]").forEach(img => {
        img.src = isDark ? img.dataset.dark : img.dataset.light;
    });
}

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
    var result = (passenValue + bagsValue) * 40;
    var greenspan = document.getElementById("greenpass");
    oplataElement.textContent = result;
    greenspan.textContent = result;
}

function update2Number() {
    var numberElement = document.getElementById('number');
    var numberElement2 = document.getElementById('number2');
    var currentNumber = parseInt(numberElement.textContent);
    var numbers = [0, 40, 80];
    var nextNumberIndex = numbers.indexOf(currentNumber) + 1;
    if (nextNumberIndex >= numbers.length) nextNumberIndex = 0;
    numberElement.textContent = numbers[nextNumberIndex];
    numberElement2.textContent = numbers[nextNumberIndex];
}

function saveData() {
    var value = document.getElementById("inputValue").value;
    localStorage.setItem("myValue", value);
    location.reload(); // Перезагружаем страницу после сохранения
}

function hideContainer() {
    if (container) container.classList.replace('block', 'hidden');
    if (fon) fon.classList.replace('block', 'hidden');
}

function checkUserIdAndLoadData() {
    let tg = window.Telegram.WebApp;
    let userId = null;

    try {
        userId = tg.initDataUnsafe.user.id;
    } catch (error) {
        console.error("Telegram WebApp не доступен:", error);
    }

    if (!userId) {
        userId = localStorage.getItem("myValue");
    }

    if (userId) {
        console.log("UserID найден:", userId);
        
        // Скрываем контейнер ввода
        if (container) container.classList.replace('block', 'hidden');
        if (fon) fon.classList.replace('block', 'hidden');
        
        // Загружаем данные пользователя
        loadUserData(userId);
    } else {
        // Если userId нет, показываем контейнер ввода
        console.log("UserID не найден, показываем контейнер");
        if (container) container.classList.replace('hidden', 'block');
        if (fon) fon.classList.replace('hidden', 'block');
        if (window.Android && typeof window.Android.pageReady === "function") {
            window.Android.pageReady();
        }
    }
}

function loadUserData(userId) {
    const variable = 'all_1';

    // Используем Node.js-прокси на твоём сервере
    // Пусть Nginx проксирует /test-api/ на порт 3001 Node.js
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
            
            // Применяем тему
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
            if (container) container.classList.replace('hidden','block');
            if (fon) fon.classList.replace('hidden','block');
        }
    })
    .catch(error => {
        console.error("Ошибка загрузки данных:", error);
        if (container) container.classList.replace('hidden','block');
        if (fon) fon.classList.replace('hidden','block');
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
        
        // ✅ СООБЩАЕМ ANDROID: СТРАНИЦА ГОТОВА
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
    
    // Добавляем обработчик события
    var passenElement = document.getElementById("passen");
    if (passenElement) {
        passenElement.addEventListener("DOMSubtreeModified", cloneControlElements);
    }
    
    // Проверяем userId и загружаем данные
    checkUserIdAndLoadData();
};

