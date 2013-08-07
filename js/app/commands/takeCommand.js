define(["commands/command"], function(mCommand){
    function TakeCommand(){
        mCommand.Command.call(this,
            'take', 
            'Take an item', 
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
    
    TakeCommand.prototype = Object.create(mCommand.Command.prototype);
    TakeCommand.prototype.constructor = TakeCommand;
    
    TakeCommand.prototype.exec = function(args, context){
        var curPos = context.env.hero.getPosition();
        
        var iIndex = curPos.items.indexOf(args.id); //Position of the item in the array
        if(typeof curPos.items !== "undefined" && iIndex !== -1){
            var item = context.env.items.getItem(args.id);
            
            //Check for monsters
            if(typeof curPos.monsters !== "undefined" && curPos.monsters.length > 0){
                return context.env.domHelper.createText("error", "You cannot take the item, monster(s) are around...");
            }
            else{
                //We remove it from the position
                curPos.items.remove(iIndex);
                
                return context.env.domHelper.createText("action", context.env.hero.take(item));
            }
        }
        else{
            return context.env.domHelper.createText("error", "Not found !");
        }
    };
    
    return {TakeCommand: TakeCommand};
});