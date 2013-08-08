define(["commands/command"], function(mCommand){
    function InventoryCommand(){
        mCommand.Command.call(this,
            'inventory', 
            'Check your bag', 
            undefined, 
            'dom'
        );
    }
    
    InventoryCommand.prototype = Object.create(mCommand.Command.prototype);
    InventoryCommand.prototype.constructor = InventoryCommand;
    
    InventoryCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
            
        var bag = env.hero.getInventory();
        
        var dom = new Array();

        if(bag.length > 0){
            bag.forEach(function(item){
                dom.push( env.domHelper.createText( "info", item.toString() ) );
            });
            return env.domHelper.appendArray(dom);
        }
        else{
            return env.domHelper.createText("error", "Empty bag...");
        }
    };
    
    return {InventoryCommand: InventoryCommand};
});