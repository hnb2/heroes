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
                
                    item.attributes.attributes.forEach(function(attr){
                    
                        var bonuses = new Array();
                        if(attr.bonuses){
                            attr.bonuses.forEach(function(bonus){
                                bonuses.push( new mBonus.Bonus( bonus.name, parseInt(bonus.val, 10) ) );
                            });
                        }
                        
                        attributes.push( new mAttribute.Attribute(attr.name, parseInt(attr.val, 10), {min: parseInt(attr.min, 10), max: parseInt(attr.max, 10), bonuses: bonuses}) );
                    });
                }
            
                //Add it to the array
                self.monsters.push(
                    new mMonster.Monster(
                        parseInt(item.id, 10),
                        item.name,
                        {attributes: attributes}
                    )
                );
            });
            
            return success.response;
        },
        function (error) {
            console.log(error.response);
            
            return error.response;
        });
    };
    
    Monsters.prototype.getMonster = function (_id) {
        for (var i = 0; i < this.monsters.length; i++) {
            var currentMonster = this.monsters[i];
            if (currentMonster.getId() === _id) {
                return currentMonster;
            }
        }
        
        return undefined;
    };
    
    return {Monsters : Monsters};
});
