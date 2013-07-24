define(["fight", "hero", "monster"], function(mFight, mHero, mMonster){

    function Arena(){
        //Clear the console
        console.clear();
        
        //Hero
        this.hero = new mHero.Hero("Waylander", {});
        
        //Monsters
        this.monsters = new Array();
        this.monsters.push(new mMonster.Monster("Small kitten", {}));
        this.monsters.push(new mMonster.Monster("kitten", {hp: 55}));
        this.monsters.push(new mMonster.Monster("Cat", {hp: 55, atk: 7}));
        this.monsters.push(new mMonster.Monster("Tomcat", {hp: 60, atk: 7}));
        this.monsters.push(new mMonster.Monster("Badass Tomcat", {hp: 70, atk: 7}));
        this.monsters.push(new mMonster.Monster("Berzerk grizzly bear", {hp: 100, atk: 15}));
        
        //Round counter
        this.round = 1;
    }
    
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
            console.log(this.hero.name + " has perished at round " + this.round + " ...");
        }
    }
    
    return {Arena : Arena};

});