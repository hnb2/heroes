define(["ext/xhr", "models/actionItem", "models/bonus"], function(mXhr, mActionItem, mBonus){

    function Items(){
        this.items = new Array();
    }

    Items.prototype.loadItems = function loadItems(){
        //Make a local reference to the current instance
        var self = this;
        
        //Get the dictionnary of monsters
        return mXhr('GET', 'data/items.json').then(function(success){
            //Parse into an Object
            var obj = JSON.parse(success.responseText);
            
            //For each monsters
            obj.items.forEach(function(item){
            
                var bonuses = new Array();
                if(item.bonuses){
                    item.bonuses.forEach(function(bonus){
                        bonuses.push( new mBonus.Bonus(bonus.name, bonus.val) );
                    });
                }
                
                self.items.push(new mActionItem.ActionItem( item.id, item.name, item.description, item.value, {bonuses: bonuses, constraint: item.constraint} ));
            });
            
            return success.response;
        },
        function(error){
            console.log(error.response);
            
            return error.response;
        });
    };
    
    Items.prototype.getItem = function (_id) {
        for (var i = 0; i < this.items.length; i++) {
            var currentItem = this.items[i];
            if (currentItem.getId() === _id) {
                return currentItem;
            }
        }
        
        return undefined;
    };
    
    return {Items : Items};
});
