/**
 * Types of attributes supported so far
 * @class AttributeType
 * @author Pierre Guillemot
 */
define([], function(){

    /**
     * Constructor
     * @method AttributeType
     * @return {Nothing}
     * @public
     */
    function AttributeType(){
    }
  
    //TODO: review the encapsulation system  
    return{
        HP: "hp",
        DEXTERITY: "dexterity",
        DMG: "dmg",
        LIGHT: "light",
        LOCKED: "locked"
    };
    
});
