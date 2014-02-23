/**
 * View for the what command
 * @class WhatView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {

    /**
     * Returns an error message because the item could not be found
     * @method whatError
     * @return {Object} view
     * @public
     */
    var whatError = function () {
        return mDomUtils.createErrorText("Not found !");
    };

    /**
     * Return a description of the item
     * @method whatSuccess
     * @param {Object} _item the item to get information from
     * @return {Object} view
     * @public
     */
    var whatSuccess = function (_item) {
        return mDomUtils.createText("info", _item.toString());
    };

    return {
        whatError: whatError,
        whatSuccess: whatSuccess
    };
});
