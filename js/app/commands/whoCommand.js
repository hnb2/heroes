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
            'out'
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

            var content = new Array();
            content.push( env.domHelper.createText( "info", monster.name ) );
            content.push( env.domHelper.createText( "info", ">> " + monster.attributes.toString() ) );
            content.push(env.domHelper.createCommand("fight " + monster.id, "fight"));
            
            return env.domHelper.appendArray(content);
        
        }
        else{
            return env.domHelper.createText("error", "Not found !");
        }
    };
    
    return {WhoCommand: WhoCommand};
});