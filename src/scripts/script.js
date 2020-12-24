/*Слайдер*/
/* Индекс слайда по умолчанию */
/*
var slideIndex = 1;

/* Устанавливает текущий слайд 
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Бесконечный слайдер 
setInterval(function(){
	var dots = document.getElementsByClassName("dot");
	for (i = 0; i < dots.length; i++) {
        if(dots[i].style.className == "dot active")
        	slideIndex = dots[i];
    }
    slideIndex++;
    showSlides(slideIndex);
}, 6000);

/* Основная функция слайдера 
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

*/

/*Бесконечный слайдер*/
let slides= document.getElementsByClassName("slides");
console.log(slides);
let slider=[];
for(let i=0; i<slides.length; i++){
	slider[i] = slides[i];
	slides[i].remove();
}
console.log(slider);
/*Авторизация*/

