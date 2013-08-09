define(["commands/command"], function(mCommand){
    function WhoAmICommand(){
        mCommand.Command.call(this,
            'whoami', 
            'It is about time you get to know yourself !', 
            undefined, 
            'out'
        );
    }
    
    WhoAmICommand.prototype = Object.create(mCommand.Command.prototype);
    WhoAmICommand.prototype.constructor = WhoAmICommand;
    
    WhoAmICommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;

        var content = new Array();
        if(typeof env.hero.name === "undefined"){
            content.push( env.domHelper.createText( "info", "You should pick a name !" ) );
            content.push(env.domHelper.createCommand("name", "name"));
        }
        else{
            content.push( env.domHelper.createText( "info", env.hero.getName() ) );
        }
        content.push( env.domHelper.createText( "info", ">> " + env.hero.attributes.toString() ) );
        
        return env.domHelper.appendArray(content);
    };
    
    return {WhoAmICommand: WhoAmICommand};
});