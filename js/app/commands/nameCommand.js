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
            'dom'
        );
    }
    
    NameCommand.prototype = Object.create(mCommand.Command.prototype);
    NameCommand.prototype.constructor = NameCommand;
    
    NameCommand.prototype.exec = function(args, context){
        if(typeof args.name === "undefined"){
            return context.env.domHelper.createText("error", "Please enter a valid name.");
        }
                    
        if(!context.env.setName){
            context.env.hero.name = args.name;
            context.env.setName = true;
    
            return context.env.domHelper.createText("name", "Thou shall now be known as " + context.env.hero.name);
        }
        else{
            return context.env.domHelper.createText("error", "It is too late for you " + context.env.hero.name + " !");
        }
    };
    
    return {NameCommand: NameCommand};
});