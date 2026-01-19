// Объявляем переменные глобально
let container, fon, ups;

window.onload = function() {
    // Инициализируем переменные внутри window.onload
    container = document.querySelector('.container');
    fon = document.querySelector('.fon');
    ups = document.querySelector(".ups");
    
    var savedValue = localStorage.getItem("myValue");
    
    if (savedValue) {
        document.getElementById("inputValue").value = savedValue;
        var value = localStorage.getItem("myValue");
        userId = value; // Присваиваем значение переменной userId
        const fakeParam = Date.now();
        const index = 'https://api.puzzlebot.top/api?token=2s1OVLz5iHnPeU7dp8ZGAUrFww8cQ4p9&method=getVariableValue&variable=index&user_id=';
        const proxyUrl = 'https://super-sup.ru:8443/';
        const indexfull = (index + userId);
        let theme = 0;
        let BusNumber = 0;

        fetch(proxyUrl + indexfull + '?fakeParam=' + fakeParam)
        .then(response => {
            if (!response.ok) {
                if (ups) ups.style.display = 'block';
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data) {
                const variables = data.data.split(' ; ');
                theme = variables[0];
                BusNumber = variables[1];
                
                console.log("theme: " + theme + ", BusNumber: " + BusNumber);
                // Убрана функция handleFetchResponse с реддиректом
                // Тема теперь будет обрабатываться на самой странице
            } else {
                if (container) container.classList.replace('hidden', 'block');
                if (fon) fon.classList.replace('hidden', 'block');
                savedValue = "Неверный ID";
                document.getElementById("inputValue").value = savedValue;
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("inputValue").value = "неверный id";
        });
    }
    else {
        // Если значение не сохранено в Local Storage, скрываем элементы
        if (container) container.classList.replace('hidden', 'block');
        if (fon) fon.classList.replace('hidden', 'block');
    }
};

function saveData() {
    var value = document.getElementById("inputValue").value;
    localStorage.setItem("myValue", value);
}

function hideContainer() {   
    // Теперь переменные доступны
    if (container) container.classList.replace('block', 'hidden');
    if (fon) fon.classList.replace('block', 'hidden');
}