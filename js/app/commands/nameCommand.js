define(["commands/command"], function(mCommand){
    function NameCommand(){
        mCommand.Command.call(this,
            'name', 
            'Set your name !', 
            [
              {
                  name: 'name',
                  type: 'string',
                  description: 'The name you chose to bear for eternity...'
                }
            ], 
            'out'
        );
    }
    
    NameCommand.prototype = Object.create(mCommand.Command.prototype);
    NameCommand.prototype.constructor = NameCommand;
    
    NameCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
                    
        if(typeof env.hero.name === "undefined"){
            if(typeof args.name === "undefined"){
                var content = new Array();
                content.push( env.domHelper.createText("error", "Please enter a valid name.") );
                content.push(env.domHelper.createCommand("name", "name"));
                
                return env.domHelper.appendArray(content);
            }
            else{
                //Set the name
                env.hero.name = args.name;
        
                return env.domHelper.createText("name", "Thou shall now be known as " + env.hero.name);
            }
        }
        else{
            return env.domHelper.createText("error", "It is too late for you " + env.hero.name + " !");
        }
    };
    
    return {NameCommand: NameCommand};
});