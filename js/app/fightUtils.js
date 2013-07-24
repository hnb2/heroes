define([], function(){

    //Return a random value between min and max
    function rand(min, max){
         return  Math.floor(Math.random()*(max - min)+1) + min;
    }
    
    //Return true if the random value is found between the [min,max] interval
   function chance(min, max){
        var rand = Math.floor(Math.random()*100);
        
        return (rand < max && rand >= min);
    }
    
    return {rand : rand,
            chance : chance};

});