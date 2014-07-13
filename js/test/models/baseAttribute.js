/**
 *
 */
define(['js/app/models/baseAttribute'], function (mBaseAttribute) {
    "use strict";

    var MOCK_NAME = 'Strength';
    var MOCK_VALUE = 100;

    var get_mock_obj = function () {
        return new mBaseAttribute.BaseAttribute(
            MOCK_NAME,
            MOCK_VALUE
        );
    };

    describe('Model: BaseAttribute', function () {

        describe('Constructor', function () {

            it(
                'Should initialize the model with correct values',
                function () {
                var base = get_mock_obj();

                expect(base).toBeDefined();

                expect(base.getName()).toEqual(MOCK_NAME);

                expect(base.getValue()).toEqual(MOCK_VALUE);
            });

        });

        describe('setName', function () {

            it('Should update the name', function () {

                var base = get_mock_obj();

                expect(base.getName()).toEqual(MOCK_NAME);

                base.setName('Dexterity');

                expect(base.getName()).toEqual('Dexterity');
            });


        });

    });

});
