/**
 * Should be used for debug/error output
 * TODO: Write the documentation + jshint this class
 * @class LoggerZ
 * @author Pierre Guillemot
 */
define([""], function(){

    //Initialize the constants
    function LoggerZ(firebugMod){
    
        //Uses console.log or console.log/warn/error
        if(firebugMod)
            this.firebugMod = true;
        else
            this.firebugMod = false;
    
        //Ugly spacing
        this.INFO = "[INFO]    ";
        this.WARNING = "[WARNING] ";
        this.SEVERE = "[SEVERE]  ";
        
        this.delimiter = " >> ";
        
        this.template = "#LEVEL# #DATE# #DELIMITER# #MSG#";
    }
    
    //Format the message through a template using "regex"
    LoggerZ.prototype.templater = function templater(level, msg){
        var res = this.template.replace("#LEVEL#", level)
                                .replace("#DATE#", new Date())
                                .replace("#DELIMITER#", this.delimiter)
                                .replace("#MSG#", msg);
        
        return res;
    };
    
    //INFO log
    LoggerZ.prototype.info = function info(msg){
        if(! this.firebugMod)
            console.log(this.templater(this.INFO, msg));
        else
            console.log(this.templater(this.INFO, msg));
    };
        
    //WARNING log
    LoggerZ.prototype.warning = function warning(msg){
        if(! this.firebugMod)
            console.log(this.templater(this.WARNING, msg));
        else
            console.warn(this.templater(this.WARNING, msg));
    };
    
    //SEVERE log
    LoggerZ.prototype.severe = function severe(msg){
        if(! this.firebugMod)
            console.log(this.templater(this.SEVERE, msg));
        else
            console.error(this.templater(this.SEVERE, msg));
    };
    
    //Clear the console
    LoggerZ.prototype.clear = function clear(){
            console.clear();
    };
        
    return{ 
        LoggerZ : LoggerZ
    };
});
