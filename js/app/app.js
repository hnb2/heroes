// Bootstrap/Entry point of the application
define(["bootstrap", "gcli/index", "utils/domUtils", "commands/commands"], function(mBootstrap, mGcli, mDomUtils, mCommands){

    mBootstrap.startup().then(function(env){
        //Get the variables initialized in the bootstrap
        var log = env.log;
        var hero = env.hero;
        var monsters = env.monsters;
        var items = env.items;
        var map = env.map;

        // Array Remove - By John Resig (MIT Licensed)
        //TODO : Should be put in a util file
        Array.prototype.remove = function(from, to) {
          var rest = this.slice((to || from) + 1 || this.length);
          this.length = from < 0 ? this.length + from : from;
          return this.push.apply(this, rest);
        };
        
        /*************************** GCLI COMMANDS ***************************/
        
        //Add the DOM utility to the environment
        env.domHelper = mDomUtils;
        
        //Add all the commands registered in the Commands class
        var commands = new mCommands.Commands();
        commands.getCommands().forEach(function(item){
            mGcli.addCommand({
                name: item.name,
                description: item.description,
                params: item.params,
                returnType: item.returnType,
                exec: function(args, context){
                    //Way of injecting the environment inside the context
                    context.env = env;
                    console.log(context);
                    return item.exec.call(this, args, context);
                }
            });
        });
        
        /*************************** GCLI COMMANDS ***************************/
    
        mGcli.createDisplay();  
                
    });
});