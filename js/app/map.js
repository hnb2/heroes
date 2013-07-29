define(["ext/xhr", "position"], function(mXhr, mPosition){
    function Map(){
        this.map = new Array();
    }
    
    Map.prototype.loadMap = function loadMap(map){
        var self = this;
        return mXhr("Get", "data/" + map + ".json").then(function(success){
            var obj = JSON.parse(success.responseText);
            
            obj.path.forEach(function(item){
                self.map.push( new mPosition.Position(item.id, item.to, item.name, item.desc, item.monsters) );
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