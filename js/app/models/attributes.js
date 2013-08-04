define([], function(){

    function Attributes(opts){
        this.attributes = new Array();
        
        if(typeof opts !== "undefined")
            this.setOpts(opts);
    }
    
    //USED ONLY ONCE FOR INITIALIZATION
    Attributes.prototype.setOpts = function setOpts(opts){
        var self = this;
        opts.forEach(function(item){
            self.add(item);
        });
    };
    
    Attributes.prototype.add = function add(attr){
        this.set(attr);
    };
    
    Attributes.prototype.get = function get(name){
        for(var i = 0; i < this.attributes.length; i++){
            if(this.attributes[i].name === name){
                return this.attributes[i];
            }
        }
        
        return undefined;
    };
    
    Attributes.prototype.set = function set(attr){
        if(typeof attr === "undefined"){
            throw new Error("Error, the attribute is undefined !");
        }
        else{
            var ref = this.get(attr.getName());
            
            if(typeof ref === "undefined"){
                this.attributes.push(attr); //Do not exists = add
            }
            else{
                ref = attr; //Exists = replace
            } 
        }
    };
    
    Attributes.prototype.toString = function toString(){
        var delimiter = " || ";
        var out = "";
        this.attributes.forEach(function(item){
            out += item.toString();
            out += delimiter;
        });
        
        //Remove the extra delimiter
        out = out.substr(0, out.length - delimiter.length);
        
        return out;
    };
    
    Attributes.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };
    
    return {Attributes : Attributes};
});