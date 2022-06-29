;
'use strict';
function FormCounter() {
    var number = 10;
    var number_selector = 'number';
    var number_display_selector = 'display_count';
    var display_selector = 'display_chrono';
    var btn_countdown = 'btn_countdown';
    var btn_countup = 'btn_countup';
    var btn_stop = 'btn_stopcount';
    var btn_display = 'btn_display_factorielle';
    var Strategie = {
        COUNT_DOWN: 1,
        COUNT_UP: 2
    };
    var _compteur;
    var _toggleButtons = function(disabled) {
        $(`#${btn_countup}`).prop('disabled', disabled);
        $(`#${btn_countdown}`).prop('disabled', disabled);
        $(`#${btn_stop}`).prop('disabled', !disabled);
    };
    var _displayNumber = function(conditionBoom, text) {
        if (conditionBoom) {
            text = 'Boom ! 💣';
            _toggleButtons(false);
        } else {
            text = `🔥 ${text} 🔥`;
        }
        $(`#${number_display_selector}`).text(text);
    }
    var _displayCountDown = function(_number) {
        _displayNumber(_number === 0, _number.toString());
    };
    var _displayCountUp = function(_number) {
        _displayNumber(_number === number, _number.toString());
    };
    var _check_number = function(number) {
        if (number <= 0) {
            throw new Error('le nombre ne peut être négatif !');
        }
    };
    var _get_number = function () {
        var val = $(`#${number_selector}`).val();
        number = Number(val) || number;
        _check_number(number);
        return number;
    };
    var _onClickButtonCountDecount = function(selector, strategie) {
        $(`#${selector}`).click(function() {
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
    var _onClickStop = function(selector) {
        $(`#${selector}`).click(function() {
            if (_compteur) {
                _compteur.stop();
                $(`#${number_display_selector}`).text('');
                _toggleButtons(false);
            }
        });
    };
    var _onClickDisplay = function(selector) {
        var fact = function(n) {
            if (n === 0) {
                return 1;
            }
            return n * fact(n - 1);
        }
        $(`#${selector}`).click(function() {
            var __n = '';
            var __number = _get_number();
            var __compteur = compteur(__number, 1, function(n) {
                var res = fact(n);
                __n = `${__n} ${res}`;
                $(`#${display_selector}`).text(__n);
            });
            __compteur.display();
        });
    }
    var _init = function() {
        _onClickButtonCountDecount(btn_countdown, Strategie.COUNT_DOWN);
        _onClickButtonCountDecount(btn_countup, Strategie.COUNT_UP);
        _onClickStop(btn_stop);
        _onClickDisplay(btn_display)
    };
    this.init = function() {
        _init();
    };
    this.getNumber = function() {
        return number;
    };
} // forme 3

var InitFormCounter = {
    formCounter: null,
    initialize: function() {
        var formCounter = new FormCounter();
        this.formCounter = formCounter;
        formCounter.init();
        return formCounter;
    },
    getFormCounter: function() {
        return this.formCounter;
    }
};
(function() {
  InitFormCounter.initialize();
})();
