define(["commands/command"], function(mCommand){
    function WhoAmICommand(){
        mCommand.Command.call(this,
            'whoami', 
            'It is about time you get to know yourself !', 
            undefined, 
            'dom'
        );
    }
    
    WhoAmICommand.prototype = Object.create(mCommand.Command.prototype);
    WhoAmICommand.prototype.constructor = WhoAmICommand;
    
    WhoAmICommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
        
        return env.domHelper.createText("info", env.hero.toString());
    };
    
    return {WhoAmICommand: WhoAmICommand};
});