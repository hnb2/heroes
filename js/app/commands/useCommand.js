define(["commands/command"], function(mCommand){
    function UseCommand(){
        mCommand.Command.call(this,
            'use', 
            'Use an item', 
            [
                {
                  name: 'id',
                  type: 'number',
                  description: 'The id of the item'
                },
                {
                  name: 'target',
                  type: 'string',
                  description: 'Which target (env, me, monster)'
                }
            ], 
            'dom'
        );
    }
    
    UseCommand.prototype = Object.create(mCommand.Command.prototype);
    UseCommand.prototype.constructor = UseCommand;
    
    UseCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
    
        var pos = env.hero.getPosition();
        var item = env.hero.getItem(args.id);
        
        if(typeof item !== "undefined"){
        
            var target;
            switch(args.target){
                case "env":
                    target = env.hero.getPosition();
                    break;
                case "me":
                    target = env.hero;
                    break;
                default:
                    target = env.hero;
            }
        
            if(typeof item.constraint !== "undefined"){
            
                if( item.constraint === pos.id ){
                    return env.domHelper.createText("action", env.hero.use(target, item));
                }
                else{
                    return env.domHelper.createText("error", "You cannot use this here !");
                }
            }
            else{        
                return env.domHelper.createText("action", env.hero.use(target, item));
            }
        }
        else{
            return env.domHelper.createText("error", "Not found in your inventory !");
        }

    };
    
    return {UseCommand: UseCommand};
});