define(["ext/xhr", "monster"], function(mXhr, mMonster){
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
                //Add it to the array
                self.monsters.push( new mMonster.Monster( item.name, {hp: item.hp, atk: item.atk, id: item.id} ) );
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