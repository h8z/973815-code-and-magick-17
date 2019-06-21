'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = BAR_WIDTH + 50;
var TEXT_COLOR = '#000';
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  // Тело попапа
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // Поздравительный текст
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 5);

  // Ищем лучший результат и игрока
  for (var i = 0; i <= times.length - 2; i++) {
    var bestScore = times[i];
    var bestPlayer = names[i];

    // Сортируем оба массива по возрастанию
    for (var j = i + 1; j <= times.length - 1; j++) {
      if (times[j] < bestScore) {
        bestScore = times[j];
        var swapTime = times[i];
        times[i] = bestScore;
        times[j] = swapTime;

        bestPlayer = names[j];
        var swapName = names[i];
        names[i] = bestPlayer;
        names[j] = swapName;
      }
    }
  }

  // Создание вспомогательных переменных
  var barPositionX = 150;
  var barPositionY = 100;
  var worstScore = times[times.length - 1];

  // Рендеринг гистограммы: расчет размеров, отступов, раскрашивание столбцов
  for (var g = 0; g < names.length; g++) {
    var barHeight = Math.round(BAR_HEIGHT * times[g] / worstScore);
    var barMargin = BAR_HEIGHT - barHeight;
    var saturate = Math.round(Math.random() * 100);
    var rivalColor = 'hsl(240, ' + saturate + '%, 50%)';

    ctx.fillStyle = (names[g] === 'Вы') ? PLAYER_COLOR : rivalColor;
    ctx.fillRect(barPositionX, barPositionY + barMargin, BAR_WIDTH, barHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[g], barPositionX, CLOUD_HEIGHT);
    ctx.fillText(Math.round(times[g]), barPositionX, barPositionY - GAP + barMargin);

    barPositionX += BAR_GAP;
  }
};
