;
'use strict';
/* polyfill includes ES5 */
if (!Array.prototype.includes) {
    Array.prototype.includes = function(element) {
        return this.indexOf(element) !== -1;
    };
}
var Action = Action || {};
(function() {
    var _disabled = function button_submit_disabled(selector, disabled) {
        document.getElementById(selector).disabled = disabled;
    };
    Action.ChangeColor = function(selector, color, choices) {
        if (choices.includes(color)) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
            document.getElementById(selector).classList.remove(...choices);
            document.getElementById(selector).classList.add(color);
        }
    }

    Action.ButtonDisabled = function(selector, disabled) {
        _disabled(selector, disabled);
    }    
})();

var FormColor = function () {
    var select_selector = 'select_color';
    var change_color = 'btn_change_color';
    var choices_color = ['btn-light', 'btn-primary', 'btn-danger', 'btn-success'];
    var color_to_change = 'none';
    var _onSelect = function (selector) {
        document.getElementById(selector).addEventListener('click', function () {
            color_to_change = this.value;
            Action.ButtonDisabled(change_color, color_to_change === 'none');
        });
    };
    var _onSubmit = function (selector) {
        document.getElementById(selector).addEventListener('click', function () {
            if (choices_color.includes(color_to_change)) {
                Action.ChangeColor('btn_change_color', color_to_change, choices_color);
            }
        });
    };
    var _init = function () {
        _onSelect(select_selector);
        _onSubmit(change_color);
    };
    var _getColorToChange = function () {
        return color_to_change;
    };

    return ({
        init: _init,
        getColorToChange: _getColorToChange,
        onSubmit: _onSubmit,
        onSelect: _onSelect
    });
};
(function() {
    var formColor = FormColor();
    formColor.init();
})();
