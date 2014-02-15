/**
 * View for the take  command
 * @class TakeView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {

    /**
     * Returns an error message because the item cannot be found
     * @method takeError
     * @return {Object} view
     * @public
     */
    var takeError = function () {
        return mDomUtils.createErrorText("Not found !");
    };

    /**
     * Returns an error message because it is currently impossible
     * to take the item
     * @method takeImpossible
     * @return {Object} view
     * @public
     */
    var takeImpossible = function () {
        return mDomUtils.createErrorText(
            "You cannot take the item, " +
            "monster(s) are around..."
        );
    };

    /**
     * Returns a message mentionning that the hero took the item
     * @method takeSuccess
     * @param {Object} _hero the hero
     * @param {Object} _item the item to take
     * @return {Object} view
     * @public
     */
    var takeSuccess = function (_hero, _item) {
        return mDomUtils.createText(
            "action",
            _hero.take(_item)
        );
    };

    return {
        takeError: takeError,
        takeImpossible: takeImpossible,
        takeSuccess: takeSuccess
    };
});
