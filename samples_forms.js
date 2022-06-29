;
'use strict';

/**
 * Déclarations
 */

/* forme 1 */

var MonObjet = MonObjet || {};
(function() {
    /*== private ==*/
    var _property = '';
    var _concat = function(val) {
        _property = `${_property}${val}`;
        return _property;
    };

    /*== public ==*/
    MonObjet.get = function() {
        return _property;
    }
    MonObjet.set = function(val) {
        _property = val;
    }
    MonObjet.concatWith = function(val) {
        return _concat(val);
    }
})();

/* forme 2 */

function MonObjet2() {
    /*== private ==*/
    var _property = '';
    var _concat = function(val) {
        _property = `${_property}${val}`;
        return _property;
    };

    /*== public ==*/
    this.get = function() {
        return _property;
    }
    this.set = function(val) {
        _property = val;
    }
    this.concatWith = function(val) {
        return _concat(val);
    }
}

/* forme 3 */

var MonObjet3 = function() {
    /*== private ==*/
    var _property = '';
    var _concat = function(val) {
        _property = `${_property}${val}`;
        return _property;
    };
    var _get = function() {
        return _property;
    };
    var _set = function(val) {
        _property = val;
    };

    /*== public ==*/
    return ({
        get: _get,
        set: _set,
        concatWith: _concat
    });
};

/**
 * Exécution des objets
 */

(function() {
    /* forme 1 */
    console.log(MonObjet.get());
    MonObjet.set('Olivier');
    var concat = MonObjet.concatWith(' Duval');
    console.log(concat);

    /* forme 2 */

    var monObjet2 = new MonObjet2();
    console.log(monObjet2.get());
    monObjet2.set('Valérie')
    var concat2 = monObjet2.concatWith(' Aubin');
    console.log(concat2);

    /* forme 3 */

    var monObjet3 = MonObjet3();
    console.log(monObjet3.get());
    monObjet3.set('John');
    var concat3 = monObjet3.concatWith(' Do');
    console.log(concat3);
})();
