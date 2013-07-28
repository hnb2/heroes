// Bootstrap/Entry point of the application
define(["arena", "utils/loggerZ", "gcli/index"], function(mArena, mLoggerZ, mGcli){

    //Create an arena
    var arena = new mArena.Arena();
    
    //Initialize the logger
    var log = new mLoggerZ.LoggerZ(true);
    
    log.info("Start the application");
    
    //Load the monsters
    arena.getMonsters().then(function(success){
        log.info("Monsters loaded successfully, beginning the arena.");
        //Then start the fights
        //arena.begin();
        
        mGcli.addCommand({
          name: 'start',
          description: 'Start the arena',
          params: [
            {
              name: 'name',
              type: 'string',
              description: 'The name to greet'
            }
          ],
          returnType: 'string',
              exec: function(args, context) {
                return arena.begin();
              }
        });
    
        mGcli.createDisplay();  
        
        
    }, function(error){
        log.error("Something went wrong : " + error.responseText);
    });
});