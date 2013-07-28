// Bootstrap/Entry point of the application
define(["arena", "utils/loggerZ"], function(mArena, mLoggerZ){
    //Start the GCLI
    //mGcli.createDisplay();

    //Create an arena
    var arena = new mArena.Arena();
    
    //Initialize the logger
    var log = new mLoggerZ.LoggerZ(true);
    
    log.info("Start the application");
    
    //Load the monsters
    arena.getMonsters().then(function(success){
        log.info("Monsters loaded successfully, beginning the arena.");
        //Then start the fights
        arena.begin();
    }, function(error){
        log.error("Something went wrong : " + error.responseText);
    });
});