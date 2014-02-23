/**
 * View for the use command
 * @class WhoView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {

    /**
     * Returns an error message because the target could not be found
     * @method useError
     * @return {Object} view
     * @public
     */
    var useError = function () {
        return mDomUtils.createErrorText(
            "Not found in your inventory !"
        );
    };

    /**
     * Returns an error message because the target's constraint has
     * not been respected (i.e: using a key on a position).
     * @method useConstraintError
     * @return {Object} view
     * @public
     */
    var useConstraintError = function () {
        return mDomUtils.createErrorText(
            "You cannot use this here !"
        );
    };

    /**
     * TODO: refactor this method to export the view from the model
     * Returns a success message after the hero used the item
     * @method useSuccess
     * @param {Object} _hero   the hero
     * @param {Object} _target the target
     * @param {Object} )item   the item to use on the target
     * @return {Object} view
     * @public
     */
    var useSuccess = function (_hero, _target, _item) {
        return mDomUtils.createText(
            "action",
            _hero.use(_target, _item)
        );
    };

    return {
        useError: useError,
        useConstraintError: useConstraintError,
        useSuccess: useSuccess
    };

});
