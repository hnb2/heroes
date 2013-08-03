define(["ext/xhr", "models/monster", "models/attribute", "models/bonus"], function(mXhr, mMonster, mAttribute, mBonus){
    function Monsters(){
        this.monsters = new Array();
    }

    Monsters.prototype.loadMonsters = function loadMonsters(){
        //Make a local reference to the current instance
        var self = this;
        
        //Get the dictionnary of monsters
        return mXhr('GET', 'data/monsters.json').then(function(success){
            
            //Parse into an Object
            var obj = JSON.parse(success.responseText);
            
            //For each monsters
            obj.monsters.forEach(function(item){
            
                var attributes = new Array();
                if(item.attributes){
                
                    item.attributes.forEach(function(attr){
                    
                        var bonuses = new Array();
                        if(attr.bonuses){
                            attr.bonuses.forEach(function(bonus){
                                bonuses.push( new mBonus.Bonus(bonus.name, bonus.val) );
                            });
                        }
                        
                        attributes.push( new mAttribute.Attribute(attr.name, attr.val, {min: attr.min, max: attr.max, bonuses: bonuses}) );
                    });
                }
            
                //Add it to the array
                self.monsters.push( new mMonster.Monster( item.id, item.name, {attributes: attributes} ) );
            });
            
            return success.response;
        },
        function(error){
            console.log(error.response);
            
            return error.response;
        });
    };
    
    Monsters.prototype.getMonster = function getMonster(id){
        for(var i = 0; i < this.monsters.length; i++){
            if(this.monsters[i].id === id){
                return this.monsters[i];
            }
        }
        
        return undefined;   
    };
    
    return {Monsters : Monsters};
});