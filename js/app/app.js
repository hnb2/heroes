// Bootstrap/Entry point of the application
define(["arena"], function(mArena){
    //Create an arena
    var arena = new mArena.Arena();
    
    //Load the monsters
    arena.getMonsters().then(function(){
        //Then start the fights
        arena.begin();
    });
});