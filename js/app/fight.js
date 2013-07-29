//Deprecated ?
define([], function(){

    function Fight(creature1, creature2){
        this.creature1 = creature1;
        this.creature2 = creature2;
    }
    
    //Private function, cannot be accessed outside
    function decide(){
        var rand = Math.round(Math.random());
        return (rand === 0);
    }
    
    //Return the winner of the fight
    Fight.prototype.fight = function fight(){
        //Loop indicator
        var end = true;
        
        //Init the var which will contains the ref of the creatures
        var first, second, winner;
        
        //Decide who goes first
        if(decide()){
            first = this.creature1;
            second = this.creature2;
        }
        else{
            first = this.creature2;
            second = this.creature1;           
        }
        
        //Start the fight
        while(end){
            if(! first.isDead()){
                first.attack(second);
            }
            else{
                winner = second;
                end = false;
            }
                
            if(! second.isDead()){
                second.attack(first);
            }
            else{
                winner = first;
                end = false;
            }
        }
        
        return winner;
    };

    return {Fight : Fight};
});