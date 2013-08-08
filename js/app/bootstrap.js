// Bootstrap/Entry point of the application
define(["controllers/map", "models/hero", "controllers/monsters", "controllers/items", "utils/loggerZ", "models/attribute", "models/attributeType"], function(mMap, mHero, mMonsters, mItems, mLoggerZ, mAttribute, mAttributeType){
    
    function startup(){
        //Initialize the logger
        var log = new mLoggerZ.LoggerZ(true);
        
        log.info("Start the application");
        
        //Initialize the Hero
        var hero = new mHero.Hero(undefined, {
                attributes:[
                    new mAttribute.Attribute(mAttributeType.HP, 120, {max: 120}),
                    new mAttribute.Attribute(mAttributeType.DMG, 15, {min:10}),
                    new mAttribute.Attribute(mAttributeType.DEXTERITY, 5)
                ]
            }
        );
    
        var map = new mMap.Map();
        var monsters = new mMonsters.Monsters();
        var items = new mItems.Items();
        
         //Initialize the map and the hero location
        return map.loadMap("map").then(function(success){
        
            log.info("Map loaded");
            
            hero.position = map.getFirst();
            return success;
            
        },
        function(error){
        
            log.error("Something went wrong : " + error.responseText);
            
            return error;
            
        }).then(function(){
        
            //Initialize the monsters
            return monsters.loadMonsters().then(function(success){
                log.info("Monsters loaded");
            },
            function(error){
                log.error("Something went wrong : " + error.responseText);
            });
            
        }).then(function(){  
        
            //Initialize the items
            return items.loadItems().then(function(success){
                log.info("Items loaded");
            },
            function(error){
                log.error("Something went wrong : " + error.responseText);
            });
            
        }).then(function(){
        
            log.info("Finished loading everything.");
            
            var result = {
                map: map,
                monsters: monsters,
                items: items,
                hero: hero,
                log: log
            };
            
            return result;
        });
    }
    
    return {startup: startup};
    
});