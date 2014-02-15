/**
 * View for the fight command
 * @class FightView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {
    
    /**
     * Return an error message, mentionning the fact that
     * nothing can be fight at the current position
     * @method fightError
     * @return {Object} view 
     * @public
     */
    var fightError = function () {
        return mDomUtils.createErrorText(
            "Nothing to fight here !"
        );
    };

    /**
     * TODO: review the fight implementation
     * @method fightSucess
     * @param {Object} _hero the hero
     * @param {Object} _monster the monster to fight
     * @param {Number} _monsterIndexPosition To be removed
     * @return {Object} View
     * @public
     */
    var fightSucess = function (
        _hero,
        _monster,
        _monsterIndexPosition
    ) {
        var content = [];

        //The hero attacks the _monster if alive
        if (! _hero.isDead()) {
            content.push(
                mDomUtils.createText(
                    "fight",
                    _hero.attack(_monster)
                )
            );
        } else {
            content.push(
                mDomUtils.createErrorText(
                    _hero.getDisplayName() + " died..."
                )
            );
        }
        
        //The _monster attacks back the hero if alive
        if (! _monster.isDead()) {
            content.push(
                mDomUtils.createText(
                    "fight",
                    _monster.attack(_hero)
                )
            );

            content.push(
                mDomUtils.createCommand(
                    "fight " + _monster.getId(),
                    "fight"
                )
            );
        } else {
            //TODO: Create a wrapper for this
            //Remove the _monster
            _hero.getPosition().getMonsters().splice(
                _monsterIndexPosition
            );

            content.push(
                mDomUtils.createText(
                    "victory",
                    _monster.getName() + " is dead."
                )
            );
        }
        
        //Add a shortcut to "whoami" to check your health
        content.push(mDomUtils.createCommand("whoami", "whoami"));
        
        return mDomUtils.appendArray(content);
    };

    return {
        fightError: fightError,
        fightSucess: fightSucess
    };
});
 
