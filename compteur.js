;
'use strict';
var compteur = (function(max, start_after_sec, callBack) {
    const _one_second = 1_000;
    const _default_second = _one_second * 2;
    const _max = max || 10;
    let _start_until = _get_ms_sec(start_after_sec);
    let _interval;
    const Operator = {
        PLUS: 1,
        MINUS: -1
    };
    if (!callBack || typeof callBack !== 'function') {
        throw new Error('le callBack est obligatoire');
    }
    const _callBack = callBack;

    function _get_ms_sec(sec) {
        return sec ? _one_second * sec : _default_second;
    }

    const _print = function (i, text = 'count =>') {
        console.log(`${text} ${i}`);
    };
    const _iifeCallback = (function (_cnt) {
        _print(_cnt);
        _callBack(_cnt);
    });
    const _timerCondition = function (condition, n, operator, interval) {
        if (condition) {
            _iifeCallback(n);
            return n + operator;
        } else {
            clearInterval(interval);
        }
    };
    var _stop_count = function() {
        if(_interval) {
            clearInterval(_interval);
        }
    }
    const _decount_from = function (max) {
        var _i = max || _max;
        _interval = setInterval(function () {
            _i = _timerCondition(_i >= 0, _i, Operator.MINUS, _interval);
        }, _one_second);
    };
    const _count_to = function (max) {
        var _to = max || _max;
        var _i = 1;
        _interval = setInterval(function () {
            _i = _timerCondition(_i <= _to, _i, Operator.PLUS, _interval);
        }, _one_second);
    };
    const _count_to_after_n_sec = function (_start_after_sec) {
        _start_until = _get_ms_sec(_start_after_sec || start_after_sec);
        for (var i = 1; i <= _max; i++) {
            (function (_i) {
                setTimeout(_callBack(_i), _start_until);
            })(i);
        }
    };
    return ({
        count: _count_to,
        decount: _decount_from,
        stop: _stop_count,
        display: _count_to_after_n_sec
    });
}); // compteur
