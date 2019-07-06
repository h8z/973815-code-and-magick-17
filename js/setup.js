'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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
    coatColor: getRandElement(WIZARD_COAT_COLORS),
    eyesColor: getRandElement(WIZARD_EYES_COLORS)
  };
};

/**
 * Возвращает массив объектов со случайными магами
 * @param {number} count количество создаваемых магов
 * @return {array}
 */
var getSimilarWizards = function (count) {
  var similarWizards = [];

  for (var i = 0; i < count; i++) {
    similarWizards.push(getRandWizard());
  }

  return similarWizards;
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closePopup();
  }
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var setupWizard = document.querySelector('.setup-player');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardCoatInput = setupWizard.querySelector('[name="coat-color"]');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardEyesInput = setupWizard.querySelector('[name="eyes-color"]');
var setupWizardFireball = setupWizard.querySelector('.setup-fireball-wrap');
var setupWizardFireballInput = setupWizardFireball.querySelector('[name="fireball-color"]');

var onWizardCoatClick = function () {
  setupWizardCoat.style.fill = getRandElement(WIZARD_COAT_COLORS);
  setupWizardCoatInput.value = setupWizardCoat.style.fill;
};

var onWizardEyesClick = function () {
  setupWizardEyes.style.fill = getRandElement(WIZARD_EYES_COLORS);
  setupWizardEyesInput.value = setupWizardEyes.style.fill;
};

var onWizardFireballClick = function () {
  setupWizardFireball.style.backgroundColor = getRandElement(WIZARD_FIREBALL_COLORS);
  setupWizardFireballInput.value = setupWizardFireball.style.backgroundColor;
};

setupWizardCoat.addEventListener('click', onWizardCoatClick);
setupWizardEyes.addEventListener('click', onWizardEyesClick);
setupWizardFireball.addEventListener('click', onWizardFireballClick);

var similarListElement = setup.querySelector('.setup-similar-list');
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

setup.querySelector('.setup-similar').classList.remove('hidden');
