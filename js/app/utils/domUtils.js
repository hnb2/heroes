define([], function(){

    //Private method
    function createElement(type, className, content){
        var dom = document.createElement( type );
        
        dom.className = className;
        
        dom.appendChild( document.createTextNode( content ) );
        
        return dom;
    }
    
    //Wrapper for <p> element
    function createText(className, content){
        return createElement("p", className, content);
    }
    
    //elements...
    function append(elements){
        var dom = createElement("p", "main", "");
        
        for(var i = 0; i < arguments.length; i++){
            dom.appendChild(arguments[i]);
        }
        
        return dom;
    }
    
    //Array
    function appendArray(elements){
        var dom = createElement("p", "main", "");
        
        for(var i = 0; i < elements.length; i++){
            dom.appendChild(elements[i]);
        }
        
        return dom;
    }

    return {
        createText: createText,
        append: append,
        appendArray: appendArray
    };
});