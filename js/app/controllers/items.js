define(["ext/xhr", "models/actionItem", "models/action"], function(mXhr, mActionItem, mAction){

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
                //Add it to the array
                switch(item.type){
                    case "ActionItem":
                        var action = new mAction.Action(item.action.actionName, {effects: item.action.effects, output: item.action.output});
                        var itemz = new mActionItem.ActionItem( item.item.id, item.item.name, item.item.desc, item.item.value, action);
                        self.items.push(itemz);
                        break;
                }
            });
            
            return success.response;
        },
        function(error){
            console.log(error.response);
            
            return error.response;
        });
    };
    
    Items.prototype.getItem = function getItem(id){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].id === id){
                return this.items[i];
            }
        }
        
        return undefined;   
    };
    
    return {Items : Items};
});