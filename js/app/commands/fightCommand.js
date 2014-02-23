/**
 * "fight <id>" fights a creature
 * @class FightCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/fightView"],
    function (mCommand, mFightView) {

    /**
     * Constructor
     * @method FightCommand
     * @return {Nothing}
     * @public
     */
    function FightCommand() {
        mCommand.Command.call(this,
            'fight',
            'Fight a monster',
            [
                {
                    name: 'id',
                    type: 'number',
                    description: 'The id of the monster to fight'
                }
            ],
            'out'
        );
    }
    
    FightCommand.prototype = Object.create(mCommand.Command.prototype);
    FightCommand.prototype.constructor = FightCommand;
   
    /**
     * Fights a creature: A inflicts damage to B, B takes the damages
     * then the opposite occurs from B to A.
     * @method exec
     * @param {Array}  _args    id: id of the creature to fight
     * @param {Object} _context contains the environment
     * @return {Object} view object
     * @public
     */
    FightCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
   
        //Get the current position 
        var currentPosition = env.hero.getPosition();
                
        var creatureId = _args.id;

        //Position of the monster in the array
        var monsterIndexPosition = currentPosition
            .getMonsters()
            .indexOf(creatureId);

        var monster;
        if (currentPosition.hasMonsters() && monsterIndexPosition !== -1) {
            monster = env.monsters.getMonster(creatureId);
        } else {
            return mFightView.fightError();
        }

        return mFightView.fightSucess(
            env.hero,
            monster,
            monsterIndexPosition
        );
    };
    
    return {FightCommand: FightCommand};
});
