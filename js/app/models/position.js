define(["models/attributes", "models/attributeType"], function(mAttributes, mAttributeType){
    function Position(id, to, name, desc, opts){
        this.id = id;
        this.to = to;
        this.name = name;
        this.desc = desc;
        
        this.setOpts(opts);
    }
    
    Position.prototype.setOpts = function setOpts(opts){
        if(typeof opts === "undefined")
            opts = {};
            
        this.monsters = opts.monsters || new Array();
        this.items = opts.items || new Array();
        this.attributes = new mAttributes.Attributes(opts.attributes);
    };
     
    //Helper method to retrieve attributes
    Position.prototype.getAttr = function getAttr(name){
        return this.attributes.get(name);
    };
    
    Position.prototype.update = function update(bonus){
        var attr = this.getAttr( bonus.getName() );
        if(typeof attr !== "undefined"){
            attr.addBonus(bonus);
        }
    };
    
    Position.prototype.toString = function toString(){
        var light = this.getAttr( mAttributeType.LIGHT );

        var out = (typeof light !== "undefined" && light.getVal() === 0)?"[DARK] ":"";
        
        out += this.name + " : " + this.desc + " You can move to : " + this.to + ".";
        
        if(this.monsters && this.monsters.length > 0){
            out += "\t " + this.monsters.length + " monster(s) : " + this.monsters + "."; 
        }
        
        if(this.items && this.items.length > 0){
            out += "\t " + this.items.length + " items(s) : " + this.items + "."; 
        }
        
        return out;
    };
    
    return {Position : Position};
});