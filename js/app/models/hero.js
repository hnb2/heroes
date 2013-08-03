define(["models/creature"], function(mCreature){

    function Hero(name, opts){
        this.name = name;
        
        //Initialize the fields
        this.setOpts(opts);
        
        //A bag which contains items
        this.inventory = new Array();
    }
    
    //Hero inherits of Creature
    Hero.prototype = new mCreature.Creature();
    
    //Set the constructor
    Hero.prototype.constructor = Hero;
    
    //Return the inventory
    Hero.prototype.getInventory = function getInventory(){
        return this.inventory;
    };
    
    //Return the item corresponding to the ID (not an index !)
    Hero.prototype.getItem = function getItem(id){
        for(var i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].id === id){
                return this.inventory[i];
            }
        }
        
        return undefined;  
    };
    
    //Add an item to the inventory
    Hero.prototype.take = function take(item){
        this.inventory.push(item);
        
        return item.name + " has been added to the bag"; 
    };
    
    return {Hero : Hero};
});