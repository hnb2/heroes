/**
 * Base class for all the commands, they must inherits this class
 * and override the exec method.
 * @class Command
 * @author Pierre Guillemot
 */
define([], function () {

    /**
     * Constructor
     * @method Command
     * @param {String} _name        name of the command
     * @param {String} _description description of the command
     * @param {Array} _params       parameters of the command
     * @param {String} _returnType  return type of the command
     * @return {Nothing}
     * @public
     */
    function Command(_name, _description, _params, _returnType) {
        /**
         * Name of the command
         * @property name
         * @type String
         */
        var name;

        /**
         * Description of the command, can be seen in the help
         * @property description
         * @type String
         */
        var description;

        /**
         * Parameters of the command, can be empty
         * @property params
         * @type Array
         */
        var params;

        /**
         * What the command should return
         * @property returnType
         * @type String
         */
        var returnType;

        /**
         * Getter for name
         * @method getName
         * @return {String} name
         * @public
         */
        this.getName = function () {
            return name;
        };

        /**
         * Getter for description
         * @method getDescription
         * @return {String} description
         * @public
         */
        this.getDescription = function () {
            return description;
        };

        /**
         * Getter for params
         * @method getParams
         * @return {Array} params
         * @public
         */
        this.getParams = function () {
            return params;
        };

        /**
         * Getter for returnType
         * @method getReturnType
         * @return {String} returnType
         * @public
         */
        this.getReturnType = function () {
            return returnType;
        };

        name = _name;
        description = _description;
        params = _params;
        returnType = _returnType;
    }
   
    /**
     * This method should be overriden by all the child classes.
     * Contains the command's execution code, will be called by
     * the console's API.
     * @method exec
     * @param {Array} _args     arguments
     * @param {Object} _context dictionnary of objects used
     *      as a context, it is possible to pass custom ones.
     * @return {Nothing}
     * @public
     */
    Command.prototype.exec = function (_args, _context) {
        throw new Error("Must be implemented !!!");
    };
    
    /**
     * Return a string representation of the command
     * @method toString
     * @return {String} A description of the command
     * @public
     */
    Command.prototype.toString = function () {
        var numberOfParameters = (this.getParams() !== undefined)
            ? this.getParams().length
            : 0;

        return this.getName() +
            " - " +
            this.getDescription() +
            " - " +
            numberOfParameters +
            " param(s) - " +
            this.getReturnType();
    };
   
    return {Command: Command};
});
