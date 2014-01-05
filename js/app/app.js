/**
 * Entry point of the application, it will load all the 
 * commands once everything has been loaded.
 * @author Pierre Guillemot
 */
define(["bootstrap", "gcli/index", "utils/domUtils", "commands/commands"],
    function (mBootstrap, mGcli, mDomUtils, mCommands) {

    mBootstrap.startup().then(function (_env) {
        
        //Add the DOM utility to the environment
        _env.domHelper = mDomUtils;
        
        //Add all the commands registered in the Commands class
        var commands = new mCommands.Commands();
        commands.getCommands().forEach(function (command) {
            mGcli.addCommand({
                name: command.getName(),
                description: command.getDescription(),
                params: command.getParams(),
                returnType: command.getReturnType(),
                exec: command.exec
            });
        });
        
        //Add a DOM converter to render the commands (make them clickable)
        mGcli.addConverter({
            item: "converter",
            from: 'out',
            to: 'view',
            exec: function (dom, conversionContext) {
                return conversionContext.createView({
                    html: dom,
                    data: {
                        onclick: conversionContext.update,
                        ondblclick: conversionContext.updateExec
                    }
                });
            }
        });
        
        //Add the environment
        mGcli.createDisplay({environment: _env});
                
    });
});
