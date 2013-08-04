define(["models/baseAttribute"], function(mBaseAttribute){

    function Attribute(name, val, opts){
        this.name = name;
        this.val = val;
        
        this.setOpts(opts);
    }
    
    Attribute.prototype = new mBaseAttribute.BaseAttribute();
    Attribute.prototype.constructor = Attribute;
    
    //USED ONLY ONCE FOR INITIALIZATION
    Attribute.prototype.setOpts = function setOpts(opts){
        this.originalVal = this.val.valueOf();
    
        if(!opts)
            opts = {};
        
        this.min = opts.min || 0;
        this.max = opts.max || undefined; //The maximum is optional
        
        this.bonuses = opts.bonus || new Array();
    };
    
    
    //PRIVATE
    Attribute.prototype.setVal = function setVal(val){
        if( val >= this.min ){
            //If there is a max
            if( typeof this.max !== "undefined" ){
                if( val <= this.max )
                    this.val = val;
                else
                    this.val = this.max;
            }
            else{ //If not
                this.val = val;
            }
        }
        else if(val < this.min){
            this.val = 0;
        }
    };
    
    Attribute.prototype.increaseCoeff = function increaseCoeff(coeff){
        this.setVal(this.val + (this.val *= coeff));
    };
    
    
    Attribute.prototype.decreaseCoeff = function decreaseCoeff(coeff){
        this.setVal(this.val - (this.val *= coeff));
    };
    
    Attribute.prototype.increase = function increase(val){
        this.setVal(this.val + val);
    };
    
    
    Attribute.prototype.decrease = function decrease(val){
        this.setVal(this.val - val);
    };
    
    Attribute.prototype.reset = function reset(){
        this.val = this.originalVal;
    };
    
    Attribute.prototype.addBonus = function addBonus(bonus){
        this.bonuses.push(bonus);
        this.calculateBonus();
    };
    
    Attribute.prototype.removeBonus = function removeBonus(bonus){
        //IMPLEMENT HERE
        this.calculateBonus();
        throw new Error("Not implemented yet !");
    };
    
    Attribute.prototype.calculateBonus = function calculateBonus(){
        this.originalVal = this.val;
        
        var self = this;
        this.bonuses.forEach(function(item){
            self.increase( item.getVal() );
        });
    };
    
    Attribute.prototype.toString = function toString(){
        var out = this.name + " : " + this.val;
        
        if(typeof this.max !== "undefined")
            out += "/" + this.max;
            
        return out;
    };
    
    Attribute.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };
    
    return {Attribute : Attribute};
});