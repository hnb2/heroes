/**
 * View for the move command
 * @class MoveView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {
    
    /**
     * Display the hero move and add a where button
     * @method moveSuccess
     * @param {Object} _hero            the hero
     * @param {Object} _currentPosition current position
     * @param {Object} _nextPosition    next position
     * @return {Object} View
     * @public
     */
    var moveSuccess = function (
        _hero,
        _currentPosition,
        _nextPosition
    ) {

        var content = [];

        //Info message: the hero is moving
        content.push(
            mDomUtils.createText(
                "info",
                _hero.getDisplayName() +
                " has moved from " +
                _currentPosition.getName() +
                " to " +
                _nextPosition.getName() +
                "."
            )
        );

        //Adding a where command button
        content.push(
            mDomUtils.createCommand(
                "where",
                "where"
            )
        );

        return mDomUtils.appendArray(content);
    };

    /**
     * Display an error message because the next position
     * does not exist.
     * @method moveError
     * @param {Object} _hero the hero
     * @return {Object} View
     * @public
     */
    var moveError = function (_hero) {
        return mDomUtils.createErrorText(
            _hero.getDisplayName() +
            " has lost his way ! Remember to use where in trouble..."
        );
    };

    /**
     * Display a message mentionning that the current position
     * is too dark and it is impossible to move.
     * @method positionIsDark
     * @return {Object} View
     * @public
     */
    var positionIsDark = function () {
        return mDomUtils.createText(
            "dark",
            "You cannot find your way in the dark..."
        );
    };

    /**
     * Display a message mentionning that there are monsters,
     * and it is impossible to move away from the position.
     * @method positionHasMonsters
     * @return {Object} View
     * @public
     */
    var positionHasMonsters = function () {
        return mDomUtils.createText(
            "error",
            "Monster(s) are blocking the way !"
        );
    };

    return {
        moveSuccess: moveSuccess,
        moveError: moveError,
        positionIsDark: positionIsDark,
        positionHasMonsters: positionHasMonsters
    };

});
