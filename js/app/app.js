// Bootstrap/Entry point of the application
define(["map", "hero", "monsters", "utils/loggerZ", "gcli/index"], function(mMap, mHero, mMonsters, mLoggerZ, mGcli){
    
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
    
    //Initialize the monsters
    var monsters = new mMonsters.Monsters();
    monsters.loadMonsters().then(function(success){
        log.info("Monsters loaded");
    },
    function(error){
        log.error("Something went wrong : " + error.responseText);
    });
    
    /** GCLI COMMANDS */
    
    //WHERE
    mGcli.addCommand({
      name: 'where',
      description: 'Check what is around you',
      returnType: 'string',
          exec: function(args, context) {
            var pos = hero.getPosition();
            var out = hero.name + " : " + pos.name + "; " + pos.description;
            out += "\t you can go to : [" + pos.to + "]";
            if(pos.monsters){
              out += "\t " + pos.monsters.length + " monster(s) :"; 
              pos.monsters.forEach(function(item){
                    var m = monsters.getMonster(item);
                    out += "\t [ID=" + m.id + "] " + m.name;
              });
            }
            
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
            if(typeof curPos.monsters !== "undefined"){
                monster = monsters.getMonster(args.id);
            }
            else{
                return "Not found !";
            }
            
            var out = monster.name + " - " + monster.hp + " hp - " + monster.atk + " max dmg"; 
            
            return out;
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
            if(typeof curPos.monsters !== "undefined"){
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
                out += monster.attack(hero);
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