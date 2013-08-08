define(["commands/command"], function(mCommand){
    function WhoCommand(){
        mCommand.Command.call(this,
            'who', 
            'Get information about a creature', 
            [
                {
                  name: 'id',
                  type: 'number',
                  description: 'The id of the creature'
                }
            ], 
            'dom'
        );
    }
    
    WhoCommand.prototype = Object.create(mCommand.Command.prototype);
    WhoCommand.prototype.constructor = WhoCommand;
    
    WhoCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
    
        var curPos = env.hero.getPosition();
        
        if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
            var monster = env.monsters.getMonster(args.id);

            return env.domHelper.createText("info", monster.toString());
        }
        else{
            return env.domHelper.createText("error", "Not found !");
        }
    };
    
    return {WhoCommand: WhoCommand};
});