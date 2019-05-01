var plugin = document.getElementById("wacom-plugin"); //получаем плагин
var canvas = document.getElementById("cv-ttd"); //получаем элемент канваса
var context = canvas.getContext("2d"); //получаем контекст для рисования

context.lineCap = "round"; //стиль завершения линий - округлый
context.lineJoin = "round"; //стиль изгиба линий - округлый
context.strokeStyle = "#6DA3BD"; //цвет линии

//переменные для хранения предыдущих координат (для рисования линий)
var oldX = 0; 
var oldY = 0;

var mousedown = false; //флаг, если человек давит на планшет

canvas.onmousedown = function(e) { 
  mousedown = true; //устанавливаем флаг для начала рисования (начало штриха)
  oldX = e.pageX; //устанавливаем первичные значения для предыдущих координат
  oldY = e.pageY;
  onMouseMove(e); //отправляем на функцию рисования (чтобы рисовало и обычные точки)
}

canvas.onmousemove = onMouseMove;

function onMouseMove(e) {
  console.log(e.pageX);
  if(!mousedown) return;
  if(plugin) { //проверяем, есть ли плагин планшета
    context.lineWidth = 25 * plugin.pressure; //делаем ширину кисти зависимую от силы нажатия
  } else {
    context.lineWidth = 25; //если человек рисует мышью и планшет не подключен
  }
  context.beginPath(); //открываем путь
	context.moveTo(oldX, oldY); //двигаем к предыдущем координатам
  context.lineTo(e.pageX, e.pageY); //проводим линию к текущим
  context.stroke(); //рисуем линию
  oldX = e.pageX; //устанавливаем координаты предыдущего штриха
  oldY = e.pageY;
}

canvas.onmouseup = function() {
    mousedown = false; //конец штриха
}