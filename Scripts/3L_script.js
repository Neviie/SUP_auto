// Объекты с путями к картинкам для разных тем
let imagePaths = {
    theme0: { // светлая тема
        bilet: {
            active: '/Assets/bilet_acrive.png',
            inactive: '/Assets/bilet_noacrive.png',
            noactive: '/Assets/bilet_noacrive.png'
        },
        proezdnoy: {
            active: '/Assets/proezdnoy_active.png',
            inactive: '/Assets/proezdnoy_noactive.png',
            noactive: '/Assets/proezdnoy_noactive.png'
        },
        schedule: {
            active: '/Assets/schedule_active.png',
            inactive: '/Assets/schedule_noactive.png',
            noactive: '/Assets/schedule_noactive.png'
        },
        cabinet: {
            active: '/Assets/cabinet_active.png',
            inactive: '/Assets/cabinet_noactive.png',
            noactive: '/Assets/cabinet_noactive.png'
        },
        leftMenu: {
            scanQR: {
                active: '/Assets/Active_menuQRL.png',
                inactive: '/Assets/Noactive_menuQRL.png'
            },
            numQR: {
                active: '/Assets/Active_menuQRL.png',
                inactive: '/Assets/Noactive_menuQRL.png'
            },
            now: {
                active: '/Assets/Active_menunowL.png',
                inactive: '/Assets/Noactive_menunowL.png'
            },
            history: {
                active: '/Assets/Active_menuhistoryL.png',
                inactive: '/Assets/Noactive_menuhistoryL.png'
            },
            card: {
                active: '/Assets/Active_menucardL.png',
                inactive: '/Assets/Noactive_menucardL.png'
            },
            TS_map: {
                active: '/Assets/Active_TS_map.png',
                inactive: '/Assets/Noactive_TS_map.png'
            },
            oplata: '/Assets/Noactive_menuoplataL.png',
            exit: '/Assets/ExitL.png',
            copy: '/Assets/copyL.png'
        },
        other: {
            schedule_6: '/Assets/Schedule_6.png',
            schedule_5: '/Assets/Schedule_5.png',
            proezdnoy_3: '/Assets/proezdnoy_3.png'
        }
    },
    theme1: { // темная тема
        bilet: {
            active: '/Assets/bilet_acrive_N.png',
            inactive: '/Assets/bilet_noacrive_N.png',
            noactive: '/Assets/bilet_noacrive_N.png'
        },
        proezdnoy: {
            active: '/Assets/proezdnoy_active_N.png',
            inactive: '/Assets/proezdnoy_noactive_N.png',
            noactive: '/Assets/proezdnoy_noactive.png'
        },
        schedule: {
            active: '/Assets/schedule_active_N.png',
            inactive: '/Assets/schedule_noactive_N.png',
            noactive: '/Assets/schedule_noactive_N.png'
        },
        cabinet: {
            active: '/Assets/cabinet_active_N.png',
            inactive: '/Assets/cabinet_noactive_N.png',
            noactive: '/Assets/cabinet_noactive_N.png'
        },
        leftMenu: {
            scanQR: {
                active: '/Assets/Active_menuQR.png',
                inactive: '/Assets/Noactive_menuQR.png'
            },
            numQR: {
                active: '/Assets/Active_menuQR.png',
                inactive: '/Assets/Noactive_menuQR.png'
            },
            now: {
                active: '/Assets/Active_menunow.png',
                inactive: '/Assets/Noactive_menunow.png'
            },
            history: {
                active: '/Assets/Active_menuhistory.png',
                inactive: '/Assets/Noactive_menuhistory.png'
            },
            card: {
                active: '/Assets/Active_menucard.png',
                inactive: '/Assets/Noactive_menucard.png'
            },
            TS_map: {
                active: '/Assets/Active_TS_mapN.png',
                inactive: '/Assets/Noactive_TS_mapN.png'
            },
            oplata: '/Assets/Noactive_menuoplata.png',
            exit: '/Assets/Exit.png',
            copy: '/Assets/copyN.png'
        },
        other: {
            schedule_6: '/Assets/Schedule_6_N.png',
            schedule_5: '/Assets/Schedule_5_N.png',
            proezdnoy_3: '/Assets/proezdnoy_3_N.png'
        }
    }
};

// Цвета для разных тем
let themeColors = {
    theme0: { // светлая тема
        active: 'rgb(17,121,145)',
        inactive: 'rgb(110, 110, 110)',
        leftMenu: {
            text: 'black',
            bg: 'white',
            activeText: 'rgb(42,127,228)',
            activeBg: 'rgb(226,239,255)'
        }
    },
    theme1: { // темная тема
        active: 'rgb(38,99,175)',
        inactive: 'rgb(110, 110, 110)',
        leftMenu: {
            text: 'white',
            bg: 'rgb(18,18,18)',
            activeText: 'rgb(39,122,243)',
            activeBg: 'rgb(19,32,47)'
        }
    }
};

// Глобальные переменные темы (будут инициализированы с задержкой)
let currentTheme, themeImages, colors;

// Функция для получения изображения с динамическим определением темы
function getImage(type, state = 'inactive') {
    // Всегда получаем актуальную тему
    const theme = getCurrentTheme();
    const images = imagePaths[`theme${theme}`];
    
    if (type === 'bilet' || type === 'proezdnoy' || type === 'schedule' || type === 'cabinet') {
        return images[type][state];
    }
    return images[type];
}

// Функция для получения цветов с динамическим определением темы
function getThemeColors() {
    const theme = getCurrentTheme();
    return themeColors[`theme${theme}`];
}

// Функция для получения текущей темы
function getCurrentTheme() {
    // Сначала проверяем window.currentTheme, потом localStorage, потом по умолчанию '1'
    return window.currentTheme || localStorage.getItem('appTheme') || '1';
}

// Функция инициализации темы с задержкой
function initTheme() {
    console.log("Script 3: Starting theme initialization...");
    
    setTimeout(() => {
        currentTheme = getCurrentTheme();
        console.log("Script 3: Theme after delay:", currentTheme);
        console.log("Script 3: window.currentTheme:", window.currentTheme);
        console.log("Script 3: localStorage appTheme:", localStorage.getItem('appTheme'));
        
        const themeKey = `theme${currentTheme}`;
        themeImages = imagePaths[themeKey];
        colors = themeColors[themeKey];
        
        console.log("Script 3: Theme initialized:", themeKey);
        
        // Инициализируем изображения
        initThemeImages();
    }, 1000); // Задержка 1 секунда
}

// Функция инициализации изображений
function initThemeImages() {
    if (!themeImages) {
        console.log("Script 3: themeImages not initialized yet");
        return;
    }
    
    console.log("Script 3: Initializing theme images...");
    
    // Устанавливаем изображения для левого меню
    var left_menu_exit = document.getElementById('left_menu_exit');
    if (left_menu_exit) {
        left_menu_exit.src = themeImages.leftMenu.exit;
        console.log("Script 3: Set left_menu_exit to", themeImages.leftMenu.exit);
    }

    var copy_img = document.querySelector('.copy_img');
    if (copy_img) {
        copy_img.src = themeImages.leftMenu.copy;
        console.log("Script 3: Set copy_img to", themeImages.leftMenu.copy);
    }

    // Устанавливаем изображения в расписании
    var schedule_img_5 = document.querySelector('.schedule_star[data-dark]');
    if (schedule_img_5) {
        schedule_img_5.src = themeImages.other.schedule_5;
        console.log("Script 3: Set schedule_img_5 to", themeImages.other.schedule_5);
    }

    var schedule_img_6 = document.querySelector('.img_schedule_menu[data-dark]');
    if (schedule_img_6) {
        schedule_img_6.src = themeImages.other.schedule_6;
        console.log("Script 3: Set schedule_img_6 to", themeImages.other.schedule_6);
    }

    var proezdnoy_img_3 = document.querySelector('.schedule_star[data-dark][data-light]');
    if (proezdnoy_img_3) {
        proezdnoy_img_3.src = themeImages.other.proezdnoy_3;
        console.log("Script 3: Set proezdnoy_img_3 to", themeImages.other.proezdnoy_3);
    }
    
    console.log("Script 3: Theme images initialized");
}

// ===================== ОСНОВНЫЕ ФУНКЦИИ =====================

// Кабинет
function handleClick() {
    var profileNewElement = document.querySelector('.profile_new');
    profileNewElement.style.display = 'block';

    var profileNewElement2 = document.querySelector('.profile_new2');
    profileNewElement2.style.display = 'block';

    var elementsToHide = document.querySelectorAll('.marshrut, .time_pos, .timer, .qr, .ost, .control_box, .mini_line, .mini_line2, mini_line3, .null_shap, zo, .schedule_new, .proezdnoy_new, .button, .new_control, .main_box');
    elementsToHide.forEach(function(element) {
        element.style.display = 'none';
    });

    var imgElement = document.querySelector('.img_fig_3');
    imgElement.src = getImage('cabinet', 'active');

    var fontElement = document.querySelector('.font_fig_3');
    fontElement.style.color = getThemeColors().active;

    var zoElement = document.querySelector('.shap_cen');
    zoElement.style.marginLeft = '12vw';

    var opElement = document.querySelector('op');
    opElement.textContent = 'Кабинет';

    var backbusimgElement = document.querySelector('.img_fig_4');
    backbusimgElement.src = getImage('schedule', 'inactive');

    var backbusfontElement = document.querySelector('.font_fig_4');
    backbusfontElement.style.color = getThemeColors().inactive;

    var backproezdnoyimgElement = document.querySelector('.img_fig_2');
    backproezdnoyimgElement.src = getImage('proezdnoy', 'inactive');

    var backproezdnoyfontElement = document.querySelector('.font_fig_2');
    backproezdnoyfontElement.style.color = getThemeColors().inactive;

    var backticketfontElement = document.querySelector('.font_fig_1');
    backticketfontElement.style.color = getThemeColors().inactive;

    var backticketimgElement = document.querySelector('.img_fig_1');
    backticketimgElement.src = getImage('bilet', 'inactive');
}

// Расписание
function handleClick2() {
    var profileNewElement = document.querySelector('.schedule_new');
    profileNewElement.style.display = 'block';

    var elementsToHide = document.querySelectorAll('.marshrut, .time_pos, .timer, .qr, .ost, .control_box, .mini_line, .mini_line2, mini_line3, .null_shap, zo, .profile_new, .proezdnoy_new, .profile_new2, .button, .new_control, .main_box');
    elementsToHide.forEach(function(element) {
        element.style.display = 'none';
    });

    var imgElement = document.querySelector('.img_fig_4');
    imgElement.src = getImage('schedule', 'active');

    var backprofileimgElement = document.querySelector('.img_fig_3');
    backprofileimgElement.src = getImage('cabinet', 'inactive');

    var fontElement = document.querySelector('.font_fig_4');
    fontElement.style.color = getThemeColors().active;

    var backprofilefontElement = document.querySelector('.font_fig_3');
    backprofilefontElement.style.color = getThemeColors().inactive;

    var zoElement = document.querySelector('.shap_cen');
    zoElement.style.marginLeft = '15vw';

    var opElement = document.querySelector('op');
    opElement.textContent = 'Расписание';

    var backproezdnoyimgElement = document.querySelector('.img_fig_2');
    backproezdnoyimgElement.src = getImage('proezdnoy', 'inactive');

    var backproezdnoyfontElement = document.querySelector('.font_fig_2');
    backproezdnoyfontElement.style.color = getThemeColors().inactive;

    var backticketfontElement = document.querySelector('.font_fig_1');
    backticketfontElement.style.color = getThemeColors().inactive;

    var backticketimgElement = document.querySelector('.img_fig_1');
    backticketimgElement.src = getImage('bilet', 'inactive');
}

// Проездной
function handleClick3() {
    var profileNewElement = document.querySelector('.proezdnoy_new');
    profileNewElement.style.display = 'block';

    var elementsToHide = document.querySelectorAll('.marshrut, .time_pos, .timer, .qr, .ost, .control_box, .mini_line, .mini_line2, mini_line3, .null_shap, zo, .profile_new, .schedule_new, .profile_new2, .button, .new_control, .main_box');
    elementsToHide.forEach(function(element) {
        element.style.display = 'none';
    });

    var imgElement = document.querySelector('.img_fig_2');
    imgElement.src = getImage('proezdnoy', 'active');

    var backprofileimgElement = document.querySelector('.img_fig_3');
    backprofileimgElement.src = getImage('cabinet', 'inactive');

    var fontElement = document.querySelector('.font_fig_2');
    fontElement.style.color = getThemeColors().active;

    var backprofilefontElement = document.querySelector('.font_fig_3');
    backprofilefontElement.style.color = getThemeColors().inactive;

    var zoElement = document.querySelector('.shap_cen');
    zoElement.style.marginLeft = '20vw';

    var opElement = document.querySelector('op');
    opElement.textContent = 'Добавить карту';

    var backbusimgElement = document.querySelector('.img_fig_4');
    backbusimgElement.src = getImage('schedule', 'inactive');

    var backbusfontElement = document.querySelector('.font_fig_4');
    backbusfontElement.style.color = getThemeColors().inactive;

    var backticketfontElement = document.querySelector('.font_fig_1');
    backticketfontElement.style.color = getThemeColors().inactive;

    var backticketimgElement = document.querySelector('.img_fig_1');
    backticketimgElement.src = getImage('bilet', 'inactive');
}

// Билеты
function handleClick4() {
    var zooElement = document.querySelector('zo');
    zooElement.textContent = 'Заказ оплачен';

    var profileNewElement = document.querySelector('.button');
    profileNewElement.style.display = 'flex';

    var profileNewElement1 = document.querySelector('.profile_new');
    profileNewElement1.style.display = 'none';

    var profileNewElement2 = document.querySelector('.profile_new2');
    profileNewElement2.style.display = 'none';

    var proezdnoyNewElement = document.querySelector('.proezdnoy_new');
    proezdnoyNewElement.style.display = 'none';

    var scheduleNewElement = document.querySelector('.schedule_new');
    scheduleNewElement.style.display = 'none';

    var elementsToHide = document.querySelectorAll('.marshrut, .time_pos, .timer, .qr, .ost, .control_box, .mini_line, .mini_line2, mini_line3, .null_shap, zo, .main_box');
    elementsToHide.forEach(function(element) {
        element.style.display = 'block';
    });

    var imgElement1 = document.querySelector('.img_fig_1');
    imgElement1.src = getImage('bilet', 'active');

    var fontElement = document.querySelector('.font_fig_1');
    fontElement.style.color = getThemeColors().active;

    var backprofileimgElement = document.querySelector('.img_fig_3');
    backprofileimgElement.src = getImage('cabinet', 'inactive');

    var backprofilefontElement = document.querySelector('.font_fig_3');
    backprofilefontElement.style.color = getThemeColors().inactive;

    var zoElement = document.querySelector('.shap_cen');
    zoElement.style.marginLeft = 'calc(12vw + 10vh)';

    var opElement = document.querySelector('op');
    opElement.textContent = 'Оплата проезда';

    var backbusimgElement = document.querySelector('.img_fig_4');
    backbusimgElement.src = getImage('schedule', 'inactive');

    var backbusfontElement = document.querySelector('.font_fig_4');
    backbusfontElement.style.color = getThemeColors().inactive;

    var backproezdnoyimgElement = document.querySelector('.img_fig_2');
    backproezdnoyimgElement.src = getImage('proezdnoy', 'inactive');

    var backproezdnoyfontElement = document.querySelector('.font_fig_2');
    backproezdnoyfontElement.style.color = getThemeColors().inactive;
}

function showNewControl() {
    var buttonElement = document.getElementById('button');
    var newControlElement = document.querySelector('.new_control');

    buttonElement.style.display = 'none';
    newControlElement.style.display = 'block';
}

const leftMenu = document.getElementById('left_menu');
const miniLineBox = document.getElementById('mini_line_box');
var exit = document.querySelectorAll('.arrow_img, .left_menu_exit, .fig_2, .fig_3, .fig_4');
const miniLines = document.querySelectorAll('.mini_line, .mini_line2');
const shadow = document.getElementById('shadow');

miniLineBox.addEventListener('click', () => {
    leftMenu.style.left = '0%';
    shadow.classList.toggle('transparent');

    miniLines.forEach((miniLine) => {
        miniLine.classList.toggle('transparent');
    });

    setTimeout(() => {
        miniLines.forEach((miniLine) => {
            miniLine.classList.toggle('transparent');
        });
    }, 1000);
});

exit.forEach((exitButton) => {
    exitButton.addEventListener('click', () => {
        leftMenu.style.left = '-100%';
        shadow.classList.remove('transparent');
    });
});

var poriadok_oplati = document.getElementById('poriadok_oplati');
const poriadok_oplati_text = document.getElementById('poriadok_oplati_text');
const poriadok_oplati_text2 = document.getElementById('poriadok_oplati_text2');
var oppElement = document.querySelector('op');
var zooElement = document.querySelector('zo');
var shap_cenElement = document.querySelector('.shap_cen');
var arrow_img = document.getElementById('arrow_img');
var scan_QR = document.getElementById('scan_QR');
var all_hide = document.querySelectorAll('.marshrut, .time_pos, .timer, .qr, .new_control, .ost, .control_box, .button, .scan_QR_fon, .num_QR_box, .card_box, .copy_img, .right_up_img, .history_box, .history_paid_box, .TS_map_box, .main_box');
var now_order = document.querySelectorAll('.marshrut, .time_pos, .timer, .qr, .new_control, .ost, .control_box');
var Active_menunow_img = document.getElementById('Active_menunow');
var Menu_now = document.getElementById('menunow_left');
var scan_QR_img = document.getElementById('scan_QR_img');
var bottom_button = document.querySelectorAll('.fig_2, .fig_3, .fig_4');

// Функция деактивации всех кнопок
function noactive() {
    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    var all_leftmenu_buttons = document.querySelectorAll('.left_menu_point');
    var scanQR_img = document.getElementById('scan_QR_img');
    var numQR_img = document.getElementById('num_QR_img');
    var now_img = document.getElementById('Active_menunow');
    var history_img = document.getElementById('history_img');
    var card_img = document.getElementById('menu_card_img');
    var TS_map_img = document.getElementById('TS_map_img');

    all_leftmenu_buttons.forEach((button) => {
        button.style.color = themeColors.leftMenu.text;
        button.style.fontWeight = 'normal';
        button.style.backgroundColor = themeColors.leftMenu.bg;
    });

    scanQR_img.src = themeImages.leftMenu.scanQR.inactive;
    numQR_img.src = themeImages.leftMenu.numQR.inactive;
    history_img.src = themeImages.leftMenu.history.inactive;
    card_img.src = themeImages.leftMenu.card.inactive;
    now_img.src = themeImages.leftMenu.now.inactive;
    TS_map_img.src = themeImages.leftMenu.TS_map.inactive;
}

// Функция для убирания всего
function hideall() {
    all_hide.forEach((element) => {
        element.style.display = 'none';
    });
    var videoElement = document.getElementById('videoElement');
    if (videoElement) {
        var stream = videoElement.srcObject;
        var tracks = stream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
        videoElement.parentNode.removeChild(videoElement);
    }
}

bottom_button.forEach((bottombutton) => {
    bottombutton.addEventListener('click', () => {
        hideall();
    });
});

// Порядок оплаты
poriadok_oplati.addEventListener('click', () => {
    hideall();
    poriadok_oplati_text.style.display = 'block';
    poriadok_oplati_text2.style.display = 'block';
    leftMenu.style.left = '-100%';
    shadow.classList.toggle('transparent');
    oppElement.textContent = 'Информация';
    zooElement.style.display = 'none';
    shap_cenElement.style.marginLeft = '30vw';
    miniLineBox.style.display = 'none';
    arrow_img.style.display = 'block';

    var videoElement = document.getElementById('videoElement');
    if (videoElement) {
        var stream = videoElement.srcObject;
        var tracks = stream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
        videoElement.parentNode.removeChild(videoElement);
    }
});

exit.forEach((exitButton) => {
    exitButton.addEventListener('click', () => {
        poriadok_oplati_text.style.display = 'none';
        poriadok_oplati_text2.style.display = 'none';
        arrow_img.style.display = 'none';
        miniLineBox.style.display = 'block';
    });
});

arrow_img.addEventListener('click', () => {
    noactive();
    hideall();

    var menunow_left = document.getElementById('menunow_left');
    var now_img = document.getElementById('Active_menunow');
    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    menunow_left.style.color = themeColors.leftMenu.activeText;
    menunow_left.style.fontWeight = '600';
    menunow_left.style.backgroundColor = themeColors.leftMenu.activeBg;
    now_img.src = themeImages.leftMenu.now.active;
    handleClick4();
});

// Сканировать QR
scan_QR.addEventListener('click', () => {
    noactive();
    hideall();

    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    scan_QR.style.color = themeColors.leftMenu.activeText;
    scan_QR.style.fontWeight = '600';
    scan_QR.style.backgroundColor = themeColors.leftMenu.activeBg;
    scan_QR_img.src = themeImages.leftMenu.scanQR.active;

    leftMenu.style.left = '-100%';
    shadow.classList.toggle('transparent');
    zooElement.textContent = 'Сканировать QR';
    scan_QR_elements.style.display = 'flex';
    oppElement.textContent = 'Оплата проезда';
    shap_cenElement.style.marginLeft = 'calc(12vw + 10vh)';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            videoElement.id = 'videoElement';
            videoElement.style.height = '100%';
            videoElement.style.position = 'absolute';
            scan_QR_elements.appendChild(videoElement);
        })
        .catch((error) => {
            console.error('Ошибка при получении доступа к камере:', error);
        });
});

// Ввести гос. номер ТС
var num_QR = document.getElementById('num_QR');
var num_QR_box = document.getElementById('num_QR_box');
num_QR.addEventListener('click', () => {
    noactive();
    hideall();
    oppElement.textContent = 'Оплата проезда';
    
    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    num_QR.style.color = themeColors.leftMenu.activeText;
    num_QR.style.fontWeight = '600';
    num_QR.style.backgroundColor = themeColors.leftMenu.activeBg;
    var num_QR_img = document.getElementById('num_QR_img');
    num_QR_img.src = themeImages.leftMenu.numQR.active;

    leftMenu.style.left = '-100%';
    shadow.classList.toggle('transparent');
    zooElement.textContent = 'Ввести гос. номер ТС';

    num_QR_box.style.display = 'block';
    shap_cenElement.style.marginLeft = 'calc(15vw + 10vh)';
});

// Выбрать ТС на карте
var TS_map = document.getElementById('TS_map');
var TS_map_box = document.getElementById('TS_map_box');
TS_map.addEventListener('click', () => {
    noactive();
    hideall();
    oppElement.textContent = 'Оплата проезда';
    
    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    TS_map.style.color = themeColors.leftMenu.activeText;
    TS_map.style.fontWeight = '600';
    TS_map.style.backgroundColor = themeColors.leftMenu.activeBg;
    var TS_map_img = document.getElementById('TS_map_img');
    TS_map_img.src = themeImages.leftMenu.TS_map.active;

    leftMenu.style.left = '-100%';
    shadow.classList.toggle('transparent');
    zooElement.textContent = 'Выбрать ТС на карте';

    TS_map_box.style.display = 'block';
    shap_cenElement.style.marginLeft = 'calc(15vw + 10vh)';
    var right_up_img = document.querySelector('.right_up_img');
    right_up_img.style.display = 'block';
    right_up_img.src = '/Assets/flag.png';
});

// Текуший заказ
var menunow_left = document.getElementById('menunow_left');
var now_img = document.getElementById('Active_menunow');
var bills = document.querySelector('.fig_1');

bills.addEventListener('click', menunowleft);

function menunowleft() {
    noactive();
    hideall();

    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    menunow_left.style.color = themeColors.leftMenu.activeText;
    menunow_left.style.fontWeight = '600';
    menunow_left.style.backgroundColor = themeColors.leftMenu.activeBg;
    now_img.src = themeImages.leftMenu.now.active;
    handleClick4();
}

menunow_left.addEventListener('click', () => {
    menunowleft();
    shadow.classList.toggle('transparent');
    leftMenu.style.left = '-100%';
});

var menucard = document.getElementById('menucard');
var card_box = document.getElementById('card_box');
var right_up_img = document.querySelector('.right_up_img');
var copy_img = document.querySelector('.copy_img');

menucard.addEventListener('click', () => {
    noactive();
    hideall();

    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    menucard.style.color = themeColors.leftMenu.activeText;
    menucard.style.fontWeight = '600';
    menucard.style.backgroundColor = themeColors.leftMenu.activeBg;
    var menu_card_img = document.getElementById('menu_card_img');
    menu_card_img.src = themeImages.leftMenu.card.active;

    leftMenu.style.left = '-100%';
    shadow.classList.toggle('transparent');
    zooElement.textContent = 'Цифровая карта';
    oppElement.textContent = window.randomNumber16;
    card_box.style.display = 'block';
    shap_cenElement.style.marginLeft = 'calc(15vw + 12vh)';
    right_up_img.style.display = 'block';
    right_up_img.src = '/Assets/Reload.png';
    copy_img.style.display = 'block';
});

// История заказов
var historyleft = document.getElementById('history_left');
var history_img = document.getElementById('history_img');
var history_box = document.querySelector('.history_box');
var numDivs = Math.floor(Math.random() * 15) + 1;

historyleft.addEventListener('click', () => {
    noactive();
    hideall();

    const themeColors = getThemeColors();
    const theme = getCurrentTheme();
    const themeImages = imagePaths[`theme${theme}`];
    
    historyleft.style.color = themeColors.leftMenu.activeText;
    historyleft.style.fontWeight = '600';
    historyleft.style.backgroundColor = themeColors.leftMenu.activeBg;
    history_img.src = themeImages.leftMenu.history.active;

    leftMenu.style.left = '-100%';
    shadow.classList.toggle('transparent');
    oppElement.textContent = 'История заказов';
    zooElement.textContent = ' ';
    shap_cenElement.style.marginLeft = 'calc(10vw + 12vh)';
    history_box.style.display = 'block';

    function getRandomNumber(min, max, excludedNumbers) {
        var randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (excludedNumbers.includes(randomNumber));
        return randomNumber;
    }

    function getRandomDate() {
        var startDate = new Date('2025-05-01T06:00:00');
        var endDate = new Date('2025-06-10T23:59:59');
        var randomTimestamp = Math.floor(Math.random() * (endDate.getTime() - startDate.getTime() + 1)) + startDate.getTime();
        var randomDate = new Date(randomTimestamp);
        var formattedDate = randomDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        var formattedTime = randomDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        return formattedDate + ' ' + formattedTime;
    }

    var historyBox = document.querySelector('.history_box');

    for (var i = 0; i < numDivs; i++) {
        var div = document.createElement('div');
        div.className = 'history_line';
        var greenbusBox = document.createElement('div');
        greenbusBox.className = 'greenbus_box';
        var greenBoxBus = document.createElement('img');
        greenBoxBus.className = 'green_box_bus';
        greenBoxBus.src = '/Assets/Green_Bus.png';
        var greenbusBoxNum = document.createElement('span');
        greenbusBoxNum.className = 'greenbus_box_num';
        greenbusBoxNum.textContent = getRandomNumber(1, 80, [2, 31, 42, 43, 66, 72, 76, 78, 79]);
        greenbusBox.appendChild(greenBoxBus);
        greenbusBox.appendChild(greenbusBoxNum);
        var randomDate = document.createElement('span');
        randomDate.className = 'random_date';
        randomDate.textContent = getRandomDate();
        var greenn = document.createElement('greenn');
        greenn.innerHTML = '<img class= "green_img" src="/Assets/virtual_card.png">40 ₽ ';
        div.appendChild(greenbusBox);
        div.appendChild(randomDate);
        div.appendChild(greenn);
        historyBox.appendChild(div);
    }

    var marshrut = document.getElementById('marshrutt');
    var marshrut_duble = document.getElementById('duble_marsh');
    marshrut_duble.textContent = marshrut.textContent;
});

// История пополнений
var blue_box = document.querySelector('.blue_box');
var history_paid_box = document.querySelector('.history_paid_box');

blue_box.addEventListener('click', () => {
    hideall();

    oppElement.textContent = 'Цифровая карта';
    zooElement.textContent = 'История пополнений';
    shap_cenElement.style.marginLeft = 'calc(10vw + 12vh)';
    history_paid_box.style.display = 'block';

    function getRandomNumber(min, max, excludedNumbers) {
        var randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (excludedNumbers.includes(randomNumber));
        return randomNumber;
    }

    function getRandomDate() {
        var startDate = new Date('2025-05-01T06:00:00');
        var endDate = new Date('2025-06-08T23:59:59');
        var randomTimestamp = Math.floor(Math.random() * (endDate.getTime() - startDate.getTime() + 1)) + startDate.getTime();
        var randomDate = new Date(randomTimestamp);
        var formattedDate = randomDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        var formattedTime = randomDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        return formattedDate + ' ' + formattedTime;
    }

    var historyBox = document.querySelector('.history_paid_box');

    for (var i = 0; i < numDivs; i++) {
        var div = document.createElement('div');
        div.className = 'history_paid_line';
        var greenPaidBox = document.createElement('div');
        greenPaidBox.className = 'green_paid_box';
        var greenPaidNum = document.createElement('span');
        greenPaidNum.className = 'green_paid_num';
        greenPaidNum.textContent = 'Пополнение';
        greenPaidBox.appendChild(greenPaidNum);
        var randomDate = document.createElement('span');
        randomDate.className = 'random_date';
        randomDate.textContent = getRandomDate();
        var greenn = document.createElement('greenn');
        greenn.textContent = '+40 ₽';
        div.appendChild(greenPaidBox);
        div.appendChild(randomDate);
        div.appendChild(greenn);
        historyBox.appendChild(div);
    }
});

// ===================== ЗАПУСК ИНИЦИАЛИЗАЦИИ =====================

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script 3: DOM loaded, starting initialization...");
    initTheme();
});

// Также можно вызвать инициализацию сразу (на случай если DOM уже загружен)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}