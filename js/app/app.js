// Bootstrap/Entry point of the application
define(["map", "hero", "monsters", "utils/loggerZ", "gcli/index"], function(mMap, mHero, mMonsters, mLoggerZ, mGcli){
    
    //Initialize the logger
    var log = new mLoggerZ.LoggerZ(true);
    
    log.info("Start the application");
    
    //Global var to check if the hero set its name or not
    var setName = false;
    
    //TEST GLOBAL VAR DOCUMENT
    var doc = document;
    
    //Initialize the Hero
    var hero = new mHero.Hero("The one without a name", {});

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
      returnType: 'dom',
          exec: function(args, context) {
             var dom = doc.createElement('p');
             dom.className = "name";
            
            if(!setName){
                hero.name = args.name;
                setName = true;
                
                dom.innerHTML = "Thou shall now be known as " + hero.name;
            }
            else{
                dom.innerHTML = "It is too late for you " + hero.name + " !";
            }
            
            return dom;
          }
    });
    
    //WHERE
    mGcli.addCommand({
      name: 'where',
      description: 'Check what is around you',
      returnType: 'dom',
          exec: function(args, context) {
            var pos = hero.getPosition();
            var dom = doc.createElement('p');
            dom.className = "info";
            
            dom.innerHTML = pos.toString();
            
            return dom;
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
      returnType: 'dom',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            
            var dom = doc.createElement('p');
            dom.className = "info";
            
            //If the next position is part of the available path of the current position, go on
            var pos;
            if(curPos.to.indexOf(args.id) !== -1){
                pos = map.getPosition(args.id);
            }
            
            if(typeof pos === "undefined"){
                dom.innerHTML = hero.name + " has lost his way ! Remember to use where in trouble...";
            }
            else{
                dom.innerHTML = hero.move(pos);
            }
            
            return dom;
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
      returnType: 'dom',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            
            var dom = doc.createElement('p');
            dom.className = "info";
            
            if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
                var monster = monsters.getMonster(args.id);
                dom.innerHTML = monster.toString();
            }
            else{
                dom.innerHTML = "Not found !";
            }
            
            return dom;
          }
    });
    
    //WHOAMI
    mGcli.addCommand({
      name: 'whoami',
      description: 'It is about time you get to know yourself !',
      returnType: 'dom',
          exec: function(args, context) {
            var dom = doc.createElement('p');
            dom.className = "info";
            dom.innerHTML=hero.toString();
            
            return dom;
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
      returnType: 'dom',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            
            var dom = doc.createElement('p');
            dom.className = "fight";
            
            var monster;
            if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
                monster = monsters.getMonster(args.id);
            }
            else{
                dom.innerHTML = "Nothing to fight here !";
                return dom;
            }

            var heroDom = doc.createElement('p');
            
            if(! hero.isDead()){
                heroDom.innerHTML = hero.attack(monster);
            }
            else{
                heroDom.innerHTML =  hero.name + " died...";
            }
            
            var monsterDom = doc.createElement('p');
                
            if(! monster.isDead()){
                monsterDom.innerHTML = monster.attack(hero);
            }
            else{
                monsterDom.innerHTML = monster.name + " is dead.";
                monsterDom.className = "victory";
                curPos.monsters = undefined; //Instead of making a whole array undef, should be only the dead monster
            }
            
            dom.appendChild(heroDom);
            dom.appendChild(monsterDom);
            
            return dom;
          }
    });
    
    /** GCLI COMMANDS */

    mGcli.createDisplay();  
});