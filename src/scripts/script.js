window.onload=function(){

	/*Авторизация*/

	/* Кнопка вход */
	let buttonLogin = document.getElementById('header_btn');
	let modalWindow = document.querySelector('.modal__window');
	let buttonClose = document.getElementById('close_btn');

	buttonLogin.addEventListener('click', () => {
	    console.log("open modal window");
	    modalWindow.classList.toggle("modal__window--active");
	});

	buttonClose.addEventListener('click', () => {
	    console.log("close modal window");
	    modalWindow.classList.toggle("modal__window--active");
	});

	window.addEventListener('click', (e) => {
	    if(e.target == modalWindow){
	        modalWindow.classList.toggle("modal__window--active");
	    }
	});

	/*Модальное окно авторизации*/
	const INPUT_LOGIN_ERROR = "Введите действительный электронный адрес";
	const INPUT_PASSWORD_ERROR = "Введите пароль";

	let inputLogin = document.getElementById('modal-input-login');
	let inputPassword = document.getElementById('modal-input-password');
	let modalSubmitBtn = document.getElementById('modal-submit-button');
	let loginError = document.getElementById('input-error-login');
	let passwordError = document.getElementById('input-error-password');

	modalSubmitBtn.disabled = true;

	function validateLogin(login){
	    let re = /\S+@\S+\.\S+/;
	    return re.test(login);
	}

	function validatePassword(password){
	    let re = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/;
	    return re.test(password);
	}

	function enableError(element, blockError, error){
	    blockError.innerHTML = error;
	    element.classList.add('input-highlight');
	    modalSubmitBtn.classList.add('submit-disabled');
	    modalSubmitBtn.disabled = true;
	    console.log('error');
	}

	function disableError(element, blockError){
	    blockError.innerHTML = '';
	    element.classList.remove('input-highlight');
	    modalSubmitBtn.classList.remove('submit-disabled');
	    modalSubmitBtn.disabled = false;
	    console.log('none-error');
	}

	inputLogin.addEventListener('blur', () => {
	    if(validateLogin(inputLogin.value) && inputLogin.value.length > 0){
	        disableError(inputLogin, loginError);
	    }else{
	        enableError(inputLogin, loginError, INPUT_LOGIN_ERROR);
	    }
	});

	inputPassword.addEventListener('blur', () => {
	    if(validatePassword(inputPassword.value) && inputPassword.value.length > 0){
	        disableError(inputPassword, passwordError);
	    }else{
	        enableError(inputPassword, passwordError, INPUT_PASSWORD_ERROR);
	    }
	});

	/* Слайдер */

	let multiItemSlider = (function () {
    return function (selector, config) {
        let mainElement = document.querySelector(selector), // основной элемент блока
            sliderWrapper = mainElement.querySelector('.header__wrapper'), // обертка для .slider-item
            sliderItems = mainElement.querySelectorAll('.slides'), // элементы .slider-item
            sliderControls = mainElement.querySelectorAll('.dot'),
            wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
            itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // ширина одного элемента
            positionLeftItem = 0, // позиция левого активного элемента
            transform = 0, // значение трансформации .slider_wrapper
            step = itemWidth / wrapperWidth * 100, // величина шага (для трансформации)
            items = [], // массив элементов
            interval = 0,
            configuration = {
                isCycling: true, // автоматическая смена слайдов
                direction: 'right', // направление смены слайдов
                interval: 5000, // интервал между автоматической сменой слайдов
                pause: false // устанавливать ли паузу при поднесении курсора к слайдеру
            };

        for (let key in config) {
            if (key in configuration) {
                configuration[key] = config[key];
            }
        }

        // наполнение массива items
        sliderItems.forEach(function (item, index) {
            items.push({ item: item, position: index, transform: 0 });
        });

        let position = {
            getItemMin: function () {
                let indexItem = 0;
                items.forEach(function (item, index) {
                    if (item.position < items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function () {
                let indexItem = 0;
                items.forEach(function (item, index) {
                    if (item.position > items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function () {
                return items[position.getItemMin()].position;
            },
            getMax: function () {
                return items[position.getItemMax()].position;
            }
        }

        let transformItem = function (direction) {
            let nextItem;
            if (direction === 'right') {
                positionLeftItem++;
                if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    items[nextItem].position = position.getMax() + 1;
                    items[nextItem].transform += items.length * 100;
                    items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                }
                transform -= step;
            }
            if (direction === 'left') {
                positionLeftItem--;
                if (positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    items[nextItem].position = position.getMin() - 1;
                    items[nextItem].transform -= items.length * 100;
                    items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
                }
                transform += step;
            }
            sliderWrapper.style.transform = 'translateX(' + transform + '%)';
        }

        let cycle = function (direction) {
            if (!configuration.isCycling) {
                return;
            }
            interval = setInterval(function () {
                transformItem(direction);
            }, configuration.interval);
        }

        // обработчик события click для кнопок "назад" и "вперед"
        let controlClick = function (e) {
            if (e.target.classList.contains('dot')) {
                e.preventDefault();
                let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                transformItem(direction);
                clearInterval(interval);
                cycle(configuration.direction);
            }
        };

        let setUpListeners = function () {
            // добавление к кнопкам "назад" и "вперед" обработчика controlClick для события click
            sliderControls.forEach(function (item) {
                item.addEventListener('click', controlClick);
            });
            if (configuration.pause && configuration.isCycling) {
                mainElement.addEventListener('mouseenter', function () {
                    clearInterval(interval);
                });
                mainElement.addEventListener('mouseleave', function () {
                    clearInterval(interval);
                    cycle(configuration.direction);
                });
            }
        }

        // инициализация
        setUpListeners();
        cycle(configuration.direction);

        return {
            right: function () { // метод right
                transformItem('right');
            },
            left: function () { // метод left
                transformItem('left');
            }
        }

    }
}());

let slider = multiItemSlider('.header__content', {
    isCycling: true
})
}