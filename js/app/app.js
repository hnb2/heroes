// Bootstrap/Entry point of the application
define(["bootstrap", "gcli/index", "utils/domUtils", "commands/commands"], function(mBootstrap, mGcli, mDomUtils, mCommands){

    mBootstrap.startup().then(function(env){

        // Array Remove - By John Resig (MIT Licensed)
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
                exec: item.exec
            });
        });
        
        //Add a DOM converter to render the commands (make them clickable)
        mGcli.addConverter({
            item: "converter",
            from: 'out',
            to: 'view',
            exec: function(dom, conversionContext) {
              return conversionContext.createView({
                html: dom,
                data: {
                  onclick: conversionContext.update,
                  ondblclick: conversionContext.updateExec
                }
              });
            }
        });
        
        /*************************** GCLI COMMANDS ***************************/
    
        //Add the environment
        mGcli.createDisplay({environment: env});  
                
    });
});