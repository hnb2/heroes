define(["ext/chance"], function(Chance){

    //Return a random value between min and max
    function rand(min, max){
         var c = new Chance();
         
         return c.integer({min: min, max: max});
    }
    
    //Return random true of false according to the given likelihood
    function chance(ch){
        var c = new Chance();
    
        return c.bool({likelihood: ch});
    }
    
    return {rand : rand,
            chance : chance};

});