define(["commands/command"], function(mCommand){
    function WhatCommand(){
        mCommand.Command.call(this,
            'what', 
            'Get information about an item', 
            [
                {
                  name: 'id',
                  type: 'number',
                  description: 'The id of the item'
                }
            ], 
            'dom'
        );
    }
    
    WhatCommand.prototype = Object.create(mCommand.Command.prototype);
    WhatCommand.prototype.constructor = WhatCommand;
    
    WhatCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
    
        var curPos = env.hero.getPosition();
        
        if(typeof curPos.items !== "undefined" && curPos.items.indexOf(args.id) !== -1){
            var item = env.items.getItem(args.id);
            
            return env.domHelper.createText("info", item.toString());
        }
        else{
            return env.domHelper.createText("error", "Not found !");
        }
    };
    
    return {WhatCommand: WhatCommand};
});