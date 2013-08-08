define(["commands/command"], function(mCommand){
    function WhereCommand(){
        mCommand.Command.call(this,
            'where', 
            'Check what is around you', 
            undefined, 
            'dom'
        );
    }
    
    WhereCommand.prototype = Object.create(mCommand.Command.prototype);
    WhereCommand.prototype.constructor = WhereCommand;
    
    WhereCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
        
        var pos = env.hero.getPosition();
        
        return env.domHelper.createText("info", pos.toString());
    };
    
    return {WhereCommand: WhereCommand};
});