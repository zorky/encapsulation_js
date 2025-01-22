;
'use strict';
function FormCounter() {
    let number = 10;
    const number_selector = 'number';
    const number_display_selector = 'display_count';
    const display_selector = 'display_chrono';
    const btn_countdown = 'btn_countdown';
    const btn_countup = 'btn_countup';
    const btn_stop = 'btn_stopcount';
    const btn_display = 'btn_display_factorielle';
    const Strategie = {
        COUNT_DOWN: 1,
        COUNT_UP: 2
    };
    let _compteur;
    const _toggleButtons = function (disabled) {
        $(`#${btn_countup}`).prop('disabled', disabled);
        $(`#${btn_countdown}`).prop('disabled', disabled);
        $(`#${btn_stop}`).prop('disabled', !disabled);
    };
    const _displayNumber = function (conditionBoom, text) {
        if (conditionBoom) {
            text = 'Boom ! 💣';
            _toggleButtons(false);
        } else {
            text = `🔥 ${text} 🔥`;
        }
        $(`#${number_display_selector}`).text(text);
    };
    const _displayCountDown = function (_number) {
        _displayNumber(_number === 0, _number.toString());
    };
    const _displayCountUp = function (_number) {
        _displayNumber(_number === number, _number.toString());
    };
    const _check_number = function (number) {
        if (number <= 0) {
            throw new Error('le nombre ne peut être négatif !');
        }
    };
    const _get_number = function () {
        var val = $(`#${number_selector}`).val();
        number = Number(val) || number;
        _check_number(number);
        return number;
    };
    const _onClickButtonCountDecount = function (selector, strategie) {
        $(`#${selector}`).click(function () {
            number = _get_number();
            _toggleButtons(true);
            if (strategie === Strategie.COUNT_DOWN) {
                _compteur = compteur(number, 1, _displayCountDown);
                _compteur.decount();
            }
            if (strategie === Strategie.COUNT_UP) {
                _compteur = compteur(number, 1, _displayCountUp);
                _compteur.count();
            }
        });
    };
    const _onClickStop = function (selector) {
        $(`#${selector}`).click(function () {
            if (_compteur) {
                _compteur.stop();
                $(`#${number_display_selector}`).text('');
                _toggleButtons(false);
            }
        });
    };
    const _onClickDisplay = function (selector) {
        var fact = function (n) {
            if (n === 0) {
                return 1;
            }
            return n * fact(n - 1);
        }
        $(`#${selector}`).click(function () {
            var __n = '';
            var __number = _get_number();
            var __compteur = compteur(__number, 1, function (n) {
                var res = fact(n);
                __n = `${__n} ${res}`;
                $(`#${display_selector}`).text(__n);
            });
            __compteur.display();
        });
    };
    const _init = function () {
        _onClickButtonCountDecount(btn_countdown, Strategie.COUNT_DOWN);
        _onClickButtonCountDecount(btn_countup, Strategie.COUNT_UP);
        _onClickStop(btn_stop);
        _onClickDisplay(btn_display)
    };
    this.init = function() {
        _init();
    };
} // forme 3

const InitFormCounter = {
    formCounter: null,
    initialize: function () {
        var formCounter = new FormCounter();
        this.formCounter = formCounter;
        formCounter.init();
        return formCounter;
    }
};
(function() {
  InitFormCounter.initialize();
})();
