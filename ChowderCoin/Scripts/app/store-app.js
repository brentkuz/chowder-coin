/// <reference path="../jquery-1.10.2.js" />
/// <reference path="common.js" />
/// <reference path="models.js" />


$(function () {
    console.log("load store");

    var valServ = app.Services.ValuesService;

    var rates = valServ.getRates();
    var denoms = valServ.getDenominations();

    var items = [];

    //build items
    var id = 1;
    rates.forEach((rate, i) => {
        denoms.forEach((denom, j) => {
            var item = new StoreItem(id++, rate.Type + " (" + denom.Text + ")", (rate.Rate * denom.Value).toFixed(2), 1);
            items.push(item);
        })
    });

    alert(JSON.stringify(items));

    var checkoutApp = new Vue({
        el: "#storeApp",
        data: {
            items: items
        },
        create: function () {
            
        },
        methods: {
            addItem: function (item) {

            }
        }
    })
})