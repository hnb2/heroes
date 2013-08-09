define(["commands/command"], function(mCommand){
    function FightCommand(){
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
    
    FightCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
    
        var curPos = env.hero.getPosition();
                
        var monster;
        var mIndex = curPos.monsters.indexOf(args.id); //Position of the monster in the array
        if(typeof curPos.monsters !== "undefined" && mIndex !== -1){
            monster = env.monsters.getMonster(args.id);
        }
        else{
            return env.domHelper.createText("error", "Nothing to fight here !");
        }

        /** DOM CONSTRUCTION **/
        var content = new Array();
        if(! env.hero.isDead()){
            content.push( env.domHelper.createText( "fight", env.hero.attack(monster) ) );
        }
        else{
            content.push( env.domHelper.createText( "error", env.hero.getName() + " died..." ) );
        }
        
        if(! monster.isDead()){
            content.push( env.domHelper.createText( "fight", monster.attack(env.hero) ) );
            content.push(env.domHelper.createCommand("fight " + monster.id, "fight"));
        }
        else{
            curPos.monsters.remove(mIndex);
            content.push( env.domHelper.createText( "victory", monster.name + " is dead." ) );
        }
        /** DOM CONSTRUCTION **/
        
        content.push(env.domHelper.createCommand("whoami", "whoami"));
        
        return env.domHelper.appendArray(content);
    };
    
    return {FightCommand: FightCommand};
});