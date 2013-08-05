// Bootstrap/Entry point of the application
define(["bootstrap", "gcli/index", "utils/domUtils"], function(mBootstrap, mGcli, mDomUtils){

    mBootstrap.startup().then(function(result){
        //Get the variables initialized in the bootstrap
        var log = result.log;
        var hero = result.hero;
        var monsters = result.monsters;
        var items = result.items;
        var map = result.map;
    
        //Global var to check if the hero set its name or not
        var setName = false;
    
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
                 
                 if(typeof args.name === "undefined"){
                    return mDomUtils.createText("error", "Please enter a valid name.");
                 }
                
                if(!setName){
                    hero.name = args.name;
                    setName = true;

                    return mDomUtils.createText("name", "Thou shall now be known as " + hero.name);
                }
                else{
                    return mDomUtils.createText("error", "It is too late for you " + hero.name + " !");
                }

              }
        });
        
        //WHERE
        mGcli.addCommand({
          name: 'where',
          description: 'Check what is around you',
          returnType: 'dom',
              exec: function(args, context) {
                var pos = hero.getPosition();
                
                return mDomUtils.createText("info", pos.toString());
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
                
                //If the next position is part of the available path of the current position, go on
                var pos;
                if(curPos.to.indexOf(args.id) !== -1){
                    pos = map.getPosition(args.id);
                }
                
                if(typeof pos === "undefined"){
                    return mDomUtils.createText("error", hero.name + " has lost his way ! Remember to use where in trouble...");
                }
                else{
                    return mDomUtils.createText("info", hero.move(pos));
                }
                
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
                
                if(typeof curPos.monsters !== "undefined" && curPos.monsters.indexOf(args.id) !== -1){
                    var monster = monsters.getMonster(args.id);

                    return mDomUtils.createText("info", monster.toString());
                }
                else{
                    return mDomUtils.createText("error", "Not found !");
                }
                
              }
        });
        
        //WHOAMI
        mGcli.addCommand({
          name: 'whoami',
          description: 'It is about time you get to know yourself !',
          returnType: 'dom',
              exec: function(args, context) {
                return mDomUtils.createText("info", hero.toString());
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
                
                var monster;
                var mIndex = curPos.monsters.indexOf(args.id); //Position of the monster in the array
                if(typeof curPos.monsters !== "undefined" && mIndex !== -1){
                    monster = monsters.getMonster(args.id);
                }
                else{
                    return mDomUtils.createText("error", "Nothing to fight here !");
                }

                var heroDom;
                if(! hero.isDead()){
                    heroDom = mDomUtils.createText("fight", hero.attack(monster));
                }
                else{
                    heroDom = mDomUtils.createText("error", hero.name + " died...");
                }
                
                var monsterDom;
                if(! monster.isDead()){
                    monsterDom = mDomUtils.createText("fight", monster.attack(hero));
                }
                else{
                    curPos.monsters.remove(mIndex);
                    monsterDom = mDomUtils.createText("victory", monster.name + " is dead.");
                }
                
                return mDomUtils.append(heroDom, monsterDom);
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
                
                if(typeof curPos.items !== "undefined" && curPos.items.indexOf(args.id) !== -1){
                    var item = items.getItem(args.id);
                    
                    return mDomUtils.createText("info", item.toString());
                }
                else{
                    return mDomUtils.createText("error", "Not found !");
                }
                
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
                
                var iIndex = curPos.items.indexOf(args.id); //Position of the item in the array
                if(typeof curPos.items !== "undefined" && iIndex !== -1){
                    var item = items.getItem(args.id);
                    
                    //Check for monsters
                    if(typeof curPos.monsters !== "undefined" && curPos.monsters.length > 0){
                        return mDomUtils.createText("error", "You cannot take the item, monster(s) are around...");
                    }
                    else{
                        //We remove it from the position
                        curPos.items.remove(iIndex);
                        
                        return mDomUtils.createText("action", hero.take(item));
                    }
                }
                else{
                    return mDomUtils.createText("error", "Not found !");
                }
                
              }
        });
        
        //INVENTORY
        mGcli.addCommand({
          name: 'inventory',
          description: 'Check your bag',
          returnType: 'dom',
              exec: function(args, context) {
                var bag = hero.getInventory();
                
                var dom = new Array();
    
                if(bag.length > 0){
                    bag.forEach(function(item){
                        dom.push( mDomUtils.createText( "info", item.toString() ) );
                    });
                    return mDomUtils.appendArray(dom);
                }
                else{
                    return mDomUtils.createText("error", "Empty bag...");
                }
                
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
            },
            {
              name: 'target',
              type: 'string',
              description: 'Which target (env, me, monster)'
            }
          ],
          returnType: 'dom',
              exec: function(args, context) {
                
                var pos = hero.getPosition();
                var item = hero.getItem(args.id);
                
                if(typeof item !== "undefined"){
                
                    var target;
                    switch(args.target){
                        case "env":
                            target = hero.getPosition();
                            break;
                        case "me":
                            target = hero;
                            break;
                        default:
                            target = hero;
                    }
                
                    if(typeof item.constraint !== "undefined"){
                    
                        if( item.constraint === pos.id ){
                            return mDomUtils.createText("action", hero.use(target, item));
                        }
                        else{
                            return mDomUtils.createText("error", "You cannot use this here !");
                        }
                    }
                    else{        
                        return mDomUtils.createText("action", hero.use(target, item));
                    }
                }
                else{
                    return mDomUtils.createText("error", "Not found in your inventory !");
                }
                
              }
        });
        
        /*************************** GCLI COMMANDS ***************************/
    
        mGcli.createDisplay();  
                
    });
});