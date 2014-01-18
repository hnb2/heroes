/**
 * View for the whoami command
 * @class WhoAmIView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {

    /**
     * Will output the hero name and its attributes
     * @method whoAmI
     * @param {Object} _hero reference to the hero
     * @return {Object} View object
     * @public
     */
    var whoAmI = function (_hero) {
        var content = [];

        //Test if the name has been set
        if (_hero.getName() === undefined) {
            content.push(
                mDomUtils.createText(
                    "info",
                    "You should pick a name !"
                )
            );

            content.push(
                mDomUtils.createCommand(
                    "name",
                    "name"
                )
            );
        } else {
            //Display the hero name
            content.push(
                mDomUtils.createText(
                    "info",
                    _hero.getDisplayName()
                )
            );
        }

        //List its attributes
        content.push(
            mDomUtils.createText(
                "info",
                ">> " +
                _hero.getAttributes().toString()
            )
        );
        
        return mDomUtils.appendArray(content);
    };

    return {
        whoAmI: whoAmI
    };
});
