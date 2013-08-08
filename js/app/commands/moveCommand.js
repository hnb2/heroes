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
            'dom'
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
        
        if(typeof pos === "undefined"){
            return env.domHelper.createText("error", env.hero.name + " has lost his way ! Remember to use where in trouble...");
        }
        else{
            return env.domHelper.createText("info", env.hero.move(pos));
        }
    };
    
    return {MoveCommand: MoveCommand};
});