'use strict';

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

/**
 * Возвращает случайный элемент массива
 * @param {array} arr
 * @return {string}
 */
var getRandElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Собирает объект с данными случайного мага
 * @return {object}
 */
var getRandWizard = function () {
  return {
    name: getRandElement(WIZARD_NAMES) + '\t' + getRandElement(WIZARD_SURNAMES),
    coatColor: getRandElement(WIZARD_COATCOLORS),
    eyesColor: getRandElement(WIZARD_EYESCOLORS)
  };
};

/**
 * Возвращает массив объектов со случайными магами
 * @param {number} count количество
 * @return {array}
 */
var getSimilarWizards = function (count) {
  var similarWizards = [];

  for (var i = 0; i < count; i++) {
    similarWizards.push(getRandWizard());
  }

  return similarWizards;
};

var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

getSimilarWizards(WIZARD_TOTAL).forEach(function (item) {
  var currentWizard = item;
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;

  fragment.appendChild(wizardElement);
});

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
