// Bootstrap/Entry point of the application
define(["map", "hero", "monsters", "utils/loggerZ", "gcli/index"], function(mMap, mHero, mMonsters, mLoggerZ, mGcli){
    
    //Initialize the logger
    var log = new mLoggerZ.LoggerZ(true);
    
    log.info("Start the application");
    
    //Global var to check if the hero set its name or not
    var setName = false;
    
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
    
    //Initialize the monsters
    var monsters = new mMonsters.Monsters();
    monsters.loadMonsters().then(function(success){
        log.info("Monsters loaded");
    },
    function(error){
        log.error("Something went wrong : " + error.responseText);
    });
    
    /** GCLI COMMANDS */
    
    //NAME
    mGcli.addCommand({
      name: 'name',
      description: 'Set your name !',
      params: [
      {
          name: 'name',
          type: 'string',
          description: 'The name you chose to bear for eternity...'
        }
      ],
      returnType: 'string',
          exec: function(args, context) {
            if(!setName){
                hero.name = args.name;
                setName = true;
                
                return "Thou shall now be known as " + hero.name;
            }
            else{
                return "It is too late for you " + hero.name + " !";
            }
          }
    });
    
    //WHERE
    mGcli.addCommand({
      name: 'where',
      description: 'Check what is around you',
      returnType: 'string',
          exec: function(args, context) {
            var pos = hero.getPosition();
            var out = pos.toString();
            
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
            if(curPos.to.indexOf(args.id) !== -1){
                pos = map.getPosition(args.id);
            }
            
            var out;
            if(typeof pos === "undefined"){
                out = hero.name + " has lost his way ! Remember to use where in trouble...";
            }
            else{
                out= hero.move(pos);
            }
            
            return out;
          }
    });
    
    //WHO
    mGcli.addCommand({
      name: 'who',
      description: 'Get information about a creature',
      params: [
      {
          name: 'id',
          type: 'number',
          description: 'The id of the creature'
        }
      ],
      returnType: 'string',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            var monster;
            if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
                monster = monsters.getMonster(args.id);
            }
            else{
                return "Not found !";
            }
            
            return monster.toString();
          }
    });
    
    //WHOAMI
    mGcli.addCommand({
      name: 'whoami',
      description: 'It is about time you get to know yourself !',
      returnType: 'string',
          exec: function(args, context) {
            return hero.toString();
          }
    });
    
    //FIGHT
    mGcli.addCommand({
      name: 'fight',
      description: 'Fight a monster',
      params: [
      {
          name: 'id',
          type: 'number',
          description: 'The id of the monster to fight'
        }
      ],
      returnType: 'string',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            var monster;
            if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
                monster = monsters.getMonster(args.id);
            }
            else{
                return "Nothing to fight here !";
            }

            var out = "";
            
            if(! hero.isDead()){
                out += hero.attack(monster);
            }
            else{
                out += hero.name + " died...";
            }
                
            if(! monster.isDead()){
                out += " *|* " + monster.attack(hero);
            }
            else{
                out += monster.name + " is dead.";
                curPos.monsters = undefined; //Instead of making a whole array undef, should be only the dead monster
            }
            
            return out;
          }
    });

    mGcli.createDisplay();  
});