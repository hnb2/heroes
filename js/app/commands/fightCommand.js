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
        var curPos = context.env.hero.getPosition();
                
        var monster;
        var mIndex = curPos.monsters.indexOf(args.id); //Position of the monster in the array
        if(typeof curPos.monsters !== "undefined" && mIndex !== -1){
            monster = context.env.monsters.getMonster(args.id);
        }
        else{
            return context.env.domHelper.createText("error", "Nothing to fight here !");
        }

        var heroDom;
        if(! context.env.hero.isDead()){
            heroDom = context.env.domHelper.createText("fight", context.env.hero.attack(monster));
        }
        else{
            heroDom = context.env.domHelper.createText("error", context.env.hero.name + " died...");
        }
        
        var monsterDom;
        if(! monster.isDead()){
            monsterDom = context.env.domHelper.createText("fight", monster.attack(context.env.hero));
        }
        else{
            curPos.monsters.remove(mIndex);
            monsterDom = context.env.domHelper.createText("victory", monster.name + " is dead.");
        }
        
        return context.env.domHelper.append(heroDom, monsterDom);
    };
    
    return {FightCommand: FightCommand};
});