/**
 * View for the who command
 * @class WhoView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {

    /**
     * Returns an error message because the target could not be found
     * @method whoError
     * @return {Object} view
     * @public
     */
    var whoError = function () {
        return mDomUtils.createErrorText("Not found !");
    };

    /**
     * Returns the name and attributes of the target
     * @method whoSuccess
     * @param {Object} _monster the target
     * @return {Object} view
     * @public
     */
    var whoSuccess = function (_monster) {
        var content = [];

        //Monster name
        content.push(
            mDomUtils.createText("info", _monster.getName())
        );

        //Monster attributes
        content.push(
            mDomUtils.createText(
                "info", ">> " + _monster.getAttributes().toString()
            )
        );

        //Fight command shortcut
        content.push(
            mDomUtils.createCommand(
                "fight " + _monster.getId(),
                "fight"
            )
        );
        
        return mDomUtils.appendArray(content);
    };

    return {
        whoError: whoError,
        whoSuccess: whoSuccess
    };
});
