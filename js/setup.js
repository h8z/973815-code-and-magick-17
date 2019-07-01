'use strict';

// Включение отображения блока кастомизации персонажа
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COATCOLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYESCOLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var WIZARD_TOTAL = 4;

// Получение рандомного элемента из любого массива
var getRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandWizard = function () {
  return {
    name: getRandElement(WIZARD_NAMES) + '\t' + getRandElement(WIZARD_SURNAMES),
    coatColor: getRandElement(WIZARD_COATCOLORS),
    eyesColor: getRandElement(WIZARD_EYESCOLORS)
  };
};

var similarWizards = [];

for (var i = 0; i < WIZARD_TOTAL; i++) {
  similarWizards.push(getRandWizard());
}

// Создание переменных для доступа к элементам на странице
var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Использование фрагмента для одновременного добавления контента
var fragment = document.createDocumentFragment();

// Подготовка фрагмента, используем полученный ранее массив
for (var j = 0; j < WIZARD_TOTAL; j++) {
  var currentWizard = similarWizards[j];
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;

  fragment.appendChild(wizardElement);
}

// Вставка + убираем дисплей-нан
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
