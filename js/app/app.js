// Bootstrap/Entry point of the application
define(["controllers/map", "models/hero", "controllers/monsters", "controllers/items", "utils/loggerZ", "gcli/index"], function(mMap, mHero, mMonsters, mItems, mLoggerZ, mGcli){
    
    //Initialize the logger
    var log = new mLoggerZ.LoggerZ(true);
    
    log.info("Start the application");
    
    //Global var to check if the hero set its name or not
    var setName = false;
    
    //Global var to hold the document
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
    
    //Initialize the items
    var items = new mItems.Items();
    items.loadItems().then(function(success){
        log.info("Items loaded");
    },
    function(error){
        log.error("Something went wrong : " + error.responseText);
    });
    
    // Array Remove - By John Resig (MIT Licensed)
    //TODO : Should be put in a util file
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };
    
    /*************************** GCLI COMMANDS ***************************/
    
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
             
             if(typeof args.name === "undefined"){
                dom.innerHTML = "Please enter a valid name.";
                dom.className = "error";
                return dom;
             }
            
            if(!setName){
                hero.name = args.name;
                setName = true;
                
                dom.className = "name";
                dom.innerHTML = "Thou shall now be known as " + hero.name;
            }
            else{
                dom.className = "error";
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
            
            //If the next position is part of the available path of the current position, go on
            var pos;
            if(curPos.to.indexOf(args.id) !== -1){
                pos = map.getPosition(args.id);
            }
            
            if(typeof pos === "undefined"){
                dom.className = "error";
                dom.innerHTML = hero.name + " has lost his way ! Remember to use where in trouble...";
            }
            else{
                dom.className = "info";
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
            
            if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
                var monster = monsters.getMonster(args.id);
                dom.className = "info";
                dom.innerHTML = monster.toString();
            }
            else{
                dom.className = "error";
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
            
            var monster;
            var mIndex = curPos.monsters.indexOf(args.id); //Position of the monster in the array
            if(typeof curPos.monsters !== "undefined" && mIndex !== -1){
                monster = monsters.getMonster(args.id);
            }
            else{
                dom.className = "error";
                dom.innerHTML = "Nothing to fight here !";
                return dom;
            }

            dom.className = "fight";
            
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
                curPos.monsters.remove(mIndex);
            }
            
            dom.appendChild(heroDom);
            dom.appendChild(monsterDom);
            
            return dom;
          }
    });
    
    //WHAT
    mGcli.addCommand({
      name: 'what',
      description: 'Get information about an item',
      params: [
      {
          name: 'id',
          type: 'number',
          description: 'The id of the item'
        }
      ],
      returnType: 'dom',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            
            var dom = doc.createElement('p');
            
            if(typeof curPos.items !== "undefined" && curPos.items.indexOf(args.id) !== -1){
                var item = items.getItem(args.id);
                dom.className = "info";
                dom.innerHTML = item.toString();
            }
            else{
                dom.className = "error";
                dom.innerHTML = "Not found !";
            }
            
            return dom;
          }
    });
    
    //TAKE
    mGcli.addCommand({
      name: 'take',
      description: 'Take an item',
      params: [
      {
          name: 'id',
          type: 'number',
          description: 'The id of the item'
        }
      ],
      returnType: 'dom',
          exec: function(args, context) {
            var curPos = hero.getPosition();
            
            var dom = doc.createElement('p');
            
            var iIndex = curPos.items.indexOf(args.id); //Position of the item in the array
            if(typeof curPos.items !== "undefined" && iIndex !== -1){
                var item = items.getItem(args.id);
                
                dom.className = "action";
            
                //The hero take the item
                dom.innerHTML = hero.take(item);
                
                //We remove it from the position
                curPos.items.remove(iIndex);
            }
            else{
                dom.className = "error";
                dom.innerHTML = "Not found !";
            }
            
            return dom;
          }
    });
    
    //INVENTORY
    mGcli.addCommand({
      name: 'inventory',
      description: 'Check your bag',
      returnType: 'dom',
          exec: function(args, context) {
            var bag = hero.getInventory();
            
            var dom = doc.createElement('p');

            if(bag.length > 0){
                dom.className = "info";
                
                bag.forEach(function(item){
                    var itemDom = doc.createElement('p');
                    itemDom.innerHTML = item.toString();
                    dom.appendChild(itemDom);
                });
            }
            else{
                dom.className = "error";
                dom.innerHTML = "Empty bag...";
            }
            
            return dom;
          }
    });
    
    //USE
    mGcli.addCommand({
      name: 'use',
      description: 'Use an item',
      params: [
      {
          name: 'id',
          type: 'number',
          description: 'The id of the item'
        }
      ],
      returnType: 'dom',
          exec: function(args, context) {
            var dom = doc.createElement('p');
            
            var item = hero.getItem(args.id);
            if(typeof item !== "undefined"){
                dom.className = "action";
                dom.innerHTML = hero.use(hero, item);
            }
            else{
                dom.className = "error";
                dom.innerHTML = "Not found in your inventory !";
            }
            
            return dom;
          }
    });
    
    /*************************** GCLI COMMANDS ***************************/

    mGcli.createDisplay();  
});