/**
 * View for the where command
 * @class WhereView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {


    /**
     * Will output a description of the position and a list
     * of all the items, monsters and adjacent positions
     * @method where
     * @param {Object} _position current position of the hero 
     * @return {Object} View object
     * @public
     */
    var where = function (_position) {
        var content = [];
        
        //Dark
        if (_position.isDark()) {
            content.push(
                mDomUtils.createText(
                    "dark",
                    "[DARK]"
                )
            );
        }

        //Basic description
        content.push(
            mDomUtils.createText(
                "info",
                _position.getName() + " : " + _position.getDescription()
            )
        );
        
        //Directions
        content.push(
            mDomUtils.createText(
                "info",
                "You can move to :"
            )
        );

        _position.getTo().forEach(function (toPosition) {
            content.push(
                mDomUtils.createCommand(
                    "move " + toPosition,
                    toPosition
                )
            );
        });
        
        //Monsters
        if (_position.hasMonsters()) {
            var monsters = _position.getMonsters();

            content.push(
                mDomUtils.createText(
                    "info",
                    monsters.length + " monster(s) : "
                )
            );

            monsters.forEach(function (monster) {
                content.push(
                    mDomUtils.createCommand(
                        "who " + monster,
                        monster
                    )
                );
            });
        }
        
        //Items
        if (_position.hasItems()) {
            var items = _position.getItems();

            content.push(
                mDomUtils.createText(
                    "info",
                    items.length + " items(s) :"
                )
            );

            items.forEach(function (item) {
                content.push(
                    mDomUtils.createCommand(
                        "what " + item,
                        item
                    )
                );
            });
        }
        
        return mDomUtils.appendArray(content);
    };

    return {
        where: where
    };
});
