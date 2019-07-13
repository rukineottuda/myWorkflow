'use strict';
/**Cоздаем NameSpace*/
window.addEventListener('load', function OnWindowLoaded() {
	var doc = document;
	var MYAPP = MYAPP || {};

	MYAPP.namespace = function(ns_string) {
		var parts = ns_string.split('.'),
			parent = MYAPP,
			i;
		//Отбросить начальный префикс - имя глобального объекта
		if (parts[0] === 'MYAPP') {
			parts = parts.slice(1);
		}
		for (i = 0; i < parts.length; i++) {
			//создать свойство если оно остуствует
			if (typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	var App = doc.getElementsByClassName('APP')[0],
		Calculator = MYAPP.namespace('MYAPP.modules.Calculator');
	textArea;
	// var APP = doc.getElementsByClassName('APP')[0],
	Calculator.signs = [ '1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '/', '0', '=', '.', 'c' ];
	// textArea = doc.getElementsByClassName('inputVal')[0];
	Calculate.textArea = doc.createElement(div).className = 'inputVal';
	textArea = Calculate.textArea;
	textArea = doc.getElementsByClassName('inputVal')[0];
	App.appendChild(textArea);
	Calculator.signs.forEach(function(sign) {
		var signElement = doc.createElement('div');
		signElement.className = 'btn';
		signElement.innerHTML = sign;
		App.appendChild(signElement);
	});

	Calculator.onButtonClick = function(e) {
		// e - MouseEvent (содержит информацию о клике)
		if (e.target.innerHTML === 'c') {
			// Если нажата кнопка "с", то стирает все из текстового поля
			textArea.innerHTML = '0';
		} else if (e.target.innerHTML === '=') {
			// Если нажата кнопка "=", то, приведя выражение
			// в текстовом поле к javascript, вычислить значение
			textArea.innerHTML = eval(textArea.innerHTML);
		} else if (textArea.innerHTML === '0') {
			// Если textarea содержит только "0", то
			// стереть "0" и записать
			// значения кнопки в текстовое поле
			textArea.innerHTML = e.target.innerHTML;
		} else {
			// Добавление значения кнопки в текстовое поле
			textArea.innerHTML += e.target.innerHTML;
		}
	};
	// App.addEventListener('click', Calculator.onButtonClick);
	// doc.querySelectorAll('.APP .btn').forEach(function(button) {});
});
