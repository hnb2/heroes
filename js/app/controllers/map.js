define(["ext/xhr", "models/position", "models/attribute", "models/bonus"], function(mXhr, mPosition, mAttribute, mBonus){
    function Map(){
        this.map = new Array();
    }
    
    Map.prototype.loadMap = function loadMap(map){
        var self = this;
        return mXhr("Get", "data/" + map + ".json").then(function(success){
            var obj = JSON.parse(success.responseText);
            
            obj.path.forEach(function(item){

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
                self.map.push( new mPosition.Position(item.id, item.to, item.name, item.desc, {monsters: item.monsters, items: item.items, attributes: attributes}) );
            });
            
            return success.response;
        }, 
        function(error){
            console.log(error);
            
            return error.response;
        });
    };
    
    Map.prototype.getFirst = function getFirst(){
        return this.map[0];
    };
    
    Map.prototype.getPosition = function getPosition(id){
        for(var i = 0; i < this.map.length; i++){
            if(this.map[i].id === id){
                return this.map[i];
            }
        }
        
        return undefined;
    };
    
    return {Map : Map};
});