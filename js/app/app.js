// Bootstrap/Entry point of the application
define(["map", "hero", "utils/loggerZ", "gcli/index"], function(mMap, mHero, mLoggerZ, mGcli){
    
    //Initialize the logger
    var log = new mLoggerZ.LoggerZ(true);
    
    log.info("Start the application");
    
    //Initialize the Hero
    var hero = new mHero.Hero("Waylander", {});

    //Initialize the map and the hero location
    var map = new mMap.Map();
    map.loadMap("map").then(function(success){
        log.info("Map loaded");
        
        hero.position = map.getFirst();
    },
    function(error){
        log.error("Something went wrong : " + error.responseText);
    });
    
    /** GCLI COMMANDS */
    
    //WHERE
    mGcli.addCommand({
      name: 'where',
      description: 'Check where you are',
      returnType: 'string',
          exec: function(args, context) {
            var pos = hero.getPosition();
            var out = hero.name + " : " + pos.name + "; " + pos.description;
            out += " you can go to : " + pos.to;
            
            return out;
          }
    });
    
    //MOVE
    mGcli.addCommand({
      name: 'move',
      description: 'Move to a destination',
      params: [
      {
          name: 'id',
          type: 'number',
          description: 'The id of the location to go'
        }
      ],
      returnType: 'string',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            
            //If the next position is part of the available path of the current position, go on
            var pos;
            if(curPos.to.indexOf(args.id) !== -1)
                pos = map.getPosition(args.id);
            else
                pos = undefined;
            
            var out;
            if(typeof pos === "undefined")
                out = hero.name + " has lost his way ! Remember to use where in trouble...";
            else
                out= hero.move(pos);
            
            return out;
          }
    });

    mGcli.createDisplay();  
});