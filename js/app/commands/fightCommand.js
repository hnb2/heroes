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
            'dom'
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

        var heroDom;
        if(! env.hero.isDead()){
            heroDom = env.domHelper.createText("fight", env.hero.attack(monster));
        }
        else{
            heroDom = env.domHelper.createText("error", env.hero.name + " died...");
        }
        
        var monsterDom;
        if(! monster.isDead()){
            monsterDom = env.domHelper.createText("fight", monster.attack(env.hero));
        }
        else{
            curPos.monsters.remove(mIndex);
            monsterDom = env.domHelper.createText("victory", monster.name + " is dead.");
        }
        
        return env.domHelper.append(heroDom, monsterDom);
    };
    
    return {FightCommand: FightCommand};
});