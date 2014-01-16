/**
 * View for the Name command, is not defined as a class because
 * of the context issue when calling a command "exec" method
 * @class NameView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {

    /**
     * Will return an error message if the command is 
     * called incorrectly
     * @method nameError
     * @return {Object} Dom element
     * @public
     */
    var nameError = function () {
        //Create an empty array to store the created
        // DOM elements
        var content = [];

        //Basic error message
        content.push(
            mDomUtils.createText(
                "error",
                "Please enter a valid name."
            )
        );

        //Name command
        content.push(
            mDomUtils.createCommand(
                "name",
                "name"
            )
        );
        
        return mDomUtils.appendArray(content);
    };

    /**
     * Will return a success message with the new hero name
     * @method nameSuccess
     * @param {Object} _hero current hero
     * @return {Object} DOM element
     * @public
     */
    var nameSuccess = function (_hero) {
        return mDomUtils.createText(
            "name",
            "Thou shall now be known as " +
            _hero.getDisplayName()
        );
    };

    /**
     * Will return an error message if the name of the hero
     * is already set.
     * @method nameAlreadySet
     * @param {Object} _hero current hero
     * @return {Object} DOM element
     * @public
     */
    var nameAlreadySet = function (_hero) {
        return mDomUtils.createText(
            "error",
            "It is too late for you " +
            _hero.getDisplayName() +
            " !"
        );
    };

    return {
        nameError: nameError,
        nameSuccess: nameSuccess,
        nameAlreadySet: nameAlreadySet
    };

});
