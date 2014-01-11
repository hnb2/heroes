/**
 * "fight <id>" fights a creature
 * @class FightCommand
 * @author Pierre Guillemot
 */
define(["commands/command"], function (mCommand) {

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
     * @params {Array}  _args    id: id of the creature to fight
     * @params {Object} _context contains the environment
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
            return env.domHelper.createText(
                "error",
                "Nothing to fight here !"
            );
        }

        var content = [];

        //The hero attacks the monster if alive
        if (! env.hero.isDead()) {
            content.push(
                env.domHelper.createText(
                    "fight",
                    env.hero.attack(monster)
                )
            );
        } else {
            content.push(
                env.domHelper.createText(
                    "error",
                    env.hero.getDisplayName() + " died..."
                )
            );
        }
        
        //The monster attacks back the hero if alive
        if (! monster.isDead()) {
            content.push(
                env.domHelper.createText(
                    "fight",
                    monster.attack(env.hero)
                )
            );

            content.push(
                env.domHelper.createCommand(
                    "fight " + monster.getId(),
                    "fight"
                )
            );
        } else {
            currentPosition.getMonsters().remove(monsterIndexPosition);

            content.push(
                env.domHelper.createText(
                    "victory",
                    monster.getName() + " is dead."
                )
            );
        }
        
        //Add a shortcut to "whoami" to check your health
        content.push(env.domHelper.createCommand("whoami", "whoami"));
        
        return env.domHelper.appendArray(content);
    };
    
    return {FightCommand: FightCommand};
});
