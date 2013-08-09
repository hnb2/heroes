define(["commands/command"], function(mCommand){
    function WhereCommand(){
        mCommand.Command.call(this,
            'where', 
            'Check what is around you', 
            undefined, 
            'out'
        );
    }
    
    WhereCommand.prototype = Object.create(mCommand.Command.prototype);
    WhereCommand.prototype.constructor = WhereCommand;
    
    WhereCommand.prototype.exec = function(args, context){
        //Creating a "shortcut"
        var env = context.environment;
        
        //Getting the position of the hero
        var pos = env.hero.getPosition();
        
        /** DOM CONSTRUCTION **/
        var content = new Array();
        
        //Dark
        if(pos.isDark())
            content.push(env.domHelper.createText("dark", "[DARK]"));
        
        //Basic description
        content.push(env.domHelper.createText("info", pos.name + " : " + pos.desc));
        
        //Directions
        content.push(env.domHelper.createText("info", "You can move to :"));
        pos.to.forEach(function(item){
            content.push(env.domHelper.createCommand("move " + item, item));
        });
        
        //Monsters
        var monsters = pos.getMonsters();
        if(monsters && monsters.length > 0){
            content.push(env.domHelper.createText("info", monsters.length + " monster(s) :"));
            monsters.forEach(function(monster){
                content.push(env.domHelper.createCommand("who " + monster, monster));
            });
        }
        
        //Items
        var items = pos.getItems();
        if(items && items.length > 0){
            content.push(env.domHelper.createText("info", items.length + " items(s) :"));
            items.forEach(function(item){
                content.push(env.domHelper.createCommand("what " + item, item));
            });
        }
        
        /** DOM CONSTRUCTION **/
        
        return env.domHelper.appendArray(content);
    };
    
    return {WhereCommand: WhereCommand};
});