;
'use strict';
let Action;
Action = Action || {};
(function() {
    const _changeColor = function (color) {
        var msg = `change color to ${color}`;
        console.log(msg);
    };
    const _disabled = function button_submit_disabled(selector, disabled) {
        document.getElementById(selector).disabled = disabled;
    };
    Action.ChangeColor = function(selector, color, choices) {
        if (choices.includes(color)) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
            _changeColor(color);
            document.getElementById(selector).classList.remove(...choices);
            document.getElementById(selector).classList.add(color);
        }
    }

    Action.ButtonDisabled = function(selector, disabled) {
        _disabled(selector, disabled);
    }    
})();

const FormColor = function () {
    const select_selector = 'select_color';
    const change_color = 'btn_change_color';
    const choices_color = ['btn-light', 'btn-primary', 'btn-danger', 'btn-success'];
    let color_to_change = 'none';
    const _onSelect = function (selector) {
        document.getElementById(selector).addEventListener('click', function () {
            color_to_change = this.value;
            Action.ButtonDisabled(change_color, color_to_change === 'none');
        });
    };
    const _onSubmit = function (selector) {
        document.getElementById(selector).addEventListener('click', function () {
            if (choices_color.includes(color_to_change)) {
                console.log('change color ', color_to_change);
                Action.ChangeColor('btn_change_color', color_to_change, choices_color);
            }
        });
    };
    const _init = function () {
        _onSelect(select_selector);
        _onSubmit(change_color);
    };
    const _getColorToChange = function () {
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
    const formColor = FormColor();
    formColor.init();
})();
