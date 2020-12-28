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
	let slideIndex = 1;

	/* Устанавливает текущий слайд */
	function currentSlide(n) {
	    showSlides(slideIndex = n);
	}

	/* Бесконечный слайдер */
	setInterval(function(){
		var dots = document.getElementsByClassName("dot");
		for (i = 0; i < dots.length; i++) {
	        if(dots[i].style.className == "dot active")
	        	slideIndex = dots[i];
	    }
	    slideIndex++;
	    showSlides(slideIndex);
	}, 5000);

	/* Основная функция слайдера */
	function showSlides(n) {
	    var i;
	    var slides = document.getElementsByClassName("slides");
	    var dots = document.getElementsByClassName("dot");

	    if (n > slides.length) {
	      slideIndex = 1
	    }
	    else if (n < 1) {
	        slideIndex = slides.length;
	    }
	    for (i = 0; i < slides.length; i++) {
	        slides[i].style.display = "none";
	    }
	    for (i = 0; i < dots.length; i++) {
	        dots[i].className = dots[i].className.replace(" active", "");
	    }

	    	slides[slideIndex-1].style.display = "block";
	    	dots[slideIndex-1].className += " active";  
	}
	
}