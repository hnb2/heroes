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
        var pos = context.env.hero.getPosition();
        
        return context.env.domHelper.createText("info", pos.toString());
    };
    
    return {WhereCommand: WhereCommand};
});