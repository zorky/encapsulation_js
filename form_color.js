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
        // $(`#${selector}`).prop('disabled', disabled);
        console.log(selector, disabled);
        document.getElementById(selector).disabled = disabled;
    };
    Action.ChangeColor = function(selector, color, choices) {
        if (choices.includes(color)) {
            _changeColor(color);
            /*console.log(`change color to ${color}`);
            console.log(`change choices to: ${choices}`);
            console.log(`${document.getElementById(selector).classList}`);
            document.getElementById(selector).classList.remove(choices);
            document.getElementById(selector).classList.add(color);*/
            $(`#${selector}`).removeClass(choices);
            $(`#${selector}`).addClass(color);
        }
    }

    Action.ButtonDisabled = function(selector, disabled) {
        _disabled(selector, disabled);
    }    
})();

const FormColor = function () {
    let item = 'none';
    const select_selector = 'select_color';
    const change_color = 'btn_change_color';
    const choices_color = ['btn-light', 'btn-primary', 'btn-danger', 'btn-success'];
    const _onSelect = function (selector) {
        $(`#${selector}`).on('click', function () {
            item = $(`#${selector}>option:selected`).val();
            Action.ButtonDisabled(change_color, item === 'none');
        });
    };
    const _onSubmit = function (selector) {
        $(`#${selector}`).click(function () {
            Action.ChangeColor('btn_change_color', item, choices_color);
        });
    };
    const _init = function () {
        _onSelect(select_selector);
        _onSubmit(change_color);
    };
    const _getitem = function () {
        return item;
    };

    return ({
        init: _init,
        getItem: _getitem,
        onSubmit: _onSubmit,
        onSelect: _onSelect
    });
};
(function() {
    const formColor = FormColor();
    formColor.init();
  })();
