// DEPRECATED FOR NOW
define(["fight", "hero", "monster", "ext/xhr"], function(mFight, mHero, mMonster, mXhr){

    function Arena(){
        //Clear the console
        //console.clear();
        
        //Hero
        this.hero = new mHero.Hero("Waylander", {});
        
        //Monsters
        this.monsters = new Array();
        
        //Round counter
        this.round = 1;
    }
    
    Arena.prototype.getMonsters = function getMonsters(){
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
    
    Arena.prototype.begin = function begin(){
        console.log(">> ROUND " + this.round + " :" + this.hero.name + " VS " + this.monsters[this.round-1].name + " <<");

        var res = new mFight.Fight(this.hero, this.monsters[this.round-1]).fight();
        
        if(res.constructor.name === "Hero" && this.round < this.monsters.length){
            this.round ++; //Increase the round counter
            this.monster = this.monsters[this.round-1]; //Get the next monster
            this.hero.heal(10); //Heal the hero a little
            this.begin();//Start the new wave
        }
        else{
            if(res.constructor.name === "Hero")
                console.log(this.hero.name + " has successfully won all the " + this.round + " rounds !");
            else
                console.log(this.hero.name + " has perished at round " + this.round + " ...");
        }
    };
    
    return {Arena : Arena};

});