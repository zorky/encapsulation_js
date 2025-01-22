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
            console.log(selector, color, choices);
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
        /*document.getElementById(selector).addEventListener('click', function () {
            const selectElement = document.getElementById(selector);
            console.log(selectElement.options);
            // const item = selectElement.value; // La valeur de l'option sélectionnée
            // Action.ButtonDisabled(change_color, item === 'none');
            Action.ButtonDisabled(change_color, selectElement.options.selectedIndex === 0);
        });*/
        $(`#${selector}`).on('click', function () {
            item = $(`#${selector}>option:selected`).val();
            Action.ButtonDisabled(change_color, item === 'none');
        });
    };
    const _onSubmit = function (selector) {
        document.getElementById(selector).addEventListener('click', function () {
            Action.ChangeColor('btn_change_color', item, choices_color);
        });
    };
    const _init = function () {
        console.log('_init', item);
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
