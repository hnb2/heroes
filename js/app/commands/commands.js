define(["commands/nameCommand", "commands/whereCommand", "commands/moveCommand", "commands/whoCommand", "commands/whoAmICommand",
"commands/fightCommand", "commands/whatCommand", "commands/takeCommand", "commands/inventoryCommand", "commands/useCommand"], 
function(mNameCommand, mWhereCommand, mMoveCommand, mWhoCommand, mWhoAmICommand, 
mFightCommand, mWhatCommand, mTakeCommand, mInventoryCommand, mUseCommand){

    function Commands(){
        this.commands = new Array();
        
        //Will keep a dictionnary of commands
        this.register(new mNameCommand.NameCommand());
        this.register(new mWhereCommand.WhereCommand());
        this.register(new mMoveCommand.MoveCommand());
        this.register(new mWhoCommand.WhoCommand());
        this.register(new mWhoAmICommand.WhoAmICommand());
        this.register(new mFightCommand.FightCommand());
        this.register(new mWhatCommand.WhatCommand());
        this.register(new mTakeCommand.TakeCommand());
        this.register(new mInventoryCommand.InventoryCommand());
        this.register(new mUseCommand.UseCommand());
    }
    
    //Useful ?
    Commands.prototype.register = function register(command){
        console.log(command.toString());
        this.commands.push(command);
    };
    
    Commands.prototype.getCommands = function getCommands(){
        return this.commands;
    };

    return {Commands: Commands};
});