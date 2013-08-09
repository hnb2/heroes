define(["commands/command"], function(mCommand){
    function MoveCommand(){
        mCommand.Command.call(this,
            'move', 
            'Move to a destination', 
            [
                {
                  name: 'id',
                  type: 'number',
                  description: 'The id of the location to go'
                }
            ], 
            'out'
        );
    }
    
    MoveCommand.prototype = Object.create(mCommand.Command.prototype);
    MoveCommand.prototype.constructor = MoveCommand;
    
    MoveCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
        
        var curPos = env.hero.getPosition();
        
        //If the next position is part of the available path of the current position, go on
        var pos;
        if(curPos.to.indexOf(args.id) !== -1){
            pos = env.map.getPosition(args.id);
        }
        
        if(typeof pos === "undefined")
            return env.domHelper.createText("error", env.hero.name + " has lost his way ! Remember to use where in trouble...");
        
         /** DOM CONSTRUCTION **/
        var content = new Array();
    
        //Dark
        if(env.hero.position.isDark())
            return env.domHelper.createText("dark", "You cannot find your way in the dark...");
            
        //Monsters    
        var monsters = env.hero.position.monsters;
        if(monsters && monsters.length > 0){
            return env.domHelper.createText("error", "Monster(s) are blocking the way !");
        }
        else{
            content.push( env.domHelper.createText("info", env.hero.getName() + " has moved from " + env.hero.position.name + " to " + pos.name + ".")) ;
            content.push(env.domHelper.createCommand("where", "where"));
            
            //Move the hero
            env.hero.move(pos);
        }
        
        /** DOM CONSTRUCTION **/
    
        return env.domHelper.appendArray(content);
        

    };
    
    return {MoveCommand: MoveCommand};
});