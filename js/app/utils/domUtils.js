/**
 * Utility methods to handle DOM element creation
 * @class DomUtil
 * @author Pierre Guillemot
 */
define([], function () {

    /**
     * Basic method to create a DOM element 
     * @method createElement
     * @param {String} _tag     tag name
     * @param {String} _class   class name
     * @param {String} _content content of the tag
     * @return {Object} Dom element
     * @private
     */
    function createElement(_tag, _class, _content) {
        var dom = document.createElement(_tag);
        
        dom.className = _class;
        
        dom.appendChild(document.createTextNode(_content));
        
        return dom;
    }
    
    /**
     * Helper method to create a text DOM element
     * @method createText
     * @param {String} _class   class name
     * @param {String} _content content of the text element
     * @return {Object} DOM element
     * @public
     */
    function createText(_class, _content) {
        return createElement("p", _class, _content);
    }
    
    /**
     * Helper method to create an error text DOM element
     * @method createErrorText
     * @param {String} _content content of the text element
     * @return {Object} DOM element
     * @public
     */
    function createErrorText(_content) {
        return createElement("p", "error", _content);
    }

    /**
     * Helper method to create a command DOM element
     * @method createCommand
     * @param {String} _command command name
     * @param {String} _name    display name of the command
     * @return {Object} DOM element
     * @public
     */
    function createCommand(_command, _name) {
        var dom = createElement("span", "gcli-out-shortcut", _name);
        
        dom.setAttribute("onclick", "${onclick}");
        dom.setAttribute("ondblclick", "${ondblclick}");
        dom.setAttribute('data-command', _command);
        
        return dom;
    }

    /**
     * Helper method to create several DOM elements from an array
     * @method appendArray
     * @param {Array} _elements DOM elements
     * @return {Object} DOM element
     * @public
     */
    function appendArray(_elements) {
        //Create a parent container
        var dom = createElement("p", "main", "");
        
        //Loop on all the DOM elements to append them
        for (var i = 0; i < _elements.length; i++) {
            dom.appendChild(_elements[i]);
        }
        
        return dom;
    }

    return {
        createText: createText,
        createErrorText: createErrorText,
        appendArray: appendArray,
        createCommand: createCommand
    };
});
