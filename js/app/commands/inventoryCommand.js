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
        var bag = context.env.hero.getInventory();
        
        var dom = new Array();

        if(bag.length > 0){
            bag.forEach(function(item){
                dom.push( context.env.domHelper.createText( "info", item.toString() ) );
            });
            return context.env.domHelper.appendArray(dom);
        }
        else{
            return context.env.domHelper.createText("error", "Empty bag...");
        }
    };
    
    return {InventoryCommand: InventoryCommand};
});