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
    
    //Wrapper for <span> command
    function createCommand(command, name){
        var dom = createElement("span", "gcli-out-shortcut", name);
        
        dom.setAttribute("onclick", "${onclick}");
        dom.setAttribute("ondblclick", "${ondblclick}");
        dom.setAttribute('data-command', command);
        
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
        appendArray: appendArray,
        createCommand: createCommand
    };
});