/**
 * View for the inventory command
 * @class InventoryView
 * @author Pierre Guillemot
 */
define(["utils/domUtils"], function (mDomUtils) {
 
    /**
     * Returns the content of the bag of the hero
     * @method inventorySuccess
     * @param {Array} _bag the bag/inventory of the hero
     * @return {Object} View
     * @public
     */
    var inventorySuccess = function (_bag) {
        var dom = [];

        if (_bag.length > 0) {
            _bag.forEach(function (_item) {
                dom.push(
                    mDomUtils.createText(
                        "info",
                        _item.toString()
                    )
                );
            });

            return mDomUtils.appendArray(dom);
        }

        return mDomUtils.createText("error", "Empty bag...");
    };

    return {
        inventorySuccess: inventorySuccess
    };

});
