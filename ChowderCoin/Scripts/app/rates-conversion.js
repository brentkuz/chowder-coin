/// <reference path="../vue.js" />

function Rate(id, type, rate, percentChange) {
    this.Id = id;
    this.Type = type;
    this.Rate = rate;
    this.Change = percentChange;
};



$(function () {
    console.log("load RatesConversion");

    var rates = [
        new Rate(1, "Clam", .55, 18),
        new Rate(2, "Corn", .31, -7),
        new Rate(3, "Potato", .34, 3),
        new Rate(4, "Seafood", .63, 13)
    ];

    var types = [];
    rates.forEach((val, idx) => {
        types.push({ value: val.Id, text: val.Type });
    })

    var denominations = [
        { value: 1, text: "1 oz" },
        { value: 5, text: "5 oz" },
        { value: 10, text: "10 oz" }
    ];


    var ratesApp = new Vue({
        el: "#ratesApp",
        data: {
            rates: rates
        }
    });
    
    var chowderToUSDApp = new Vue({
        el: "#chowderToUSDApp",
        data: {
            types: types,
            selectedType: 1,
            denoms: denominations,
            selectedDenom: 1,
            quantity: 0,
            result: (0).toFixed(2)
        },
        methods: {
            submitForm: function (e) {
                var perUnitPrice = _.find(rates, { Id: this.selectedType }).Rate;
                this.result = (perUnitPrice * this.selectedDenom * this.quantity).toFixed(2);

                e.preventDefault();
            }
        }
    });

    var usdToChowderApp = new Vue({
        el: "#usdToChowderApp",
        data: {
            types: types,
            selectedType: 1,
            denoms: denominations,
            selectedDenom: 1,
            amount: (0).toFixed(2),
            result: 0
        },
        methods: {
            submitForm: function (e) {
                var perUnitPrice = _.find(rates, { Id: this.selectedType }).Rate;
                if (this.amount > .01) {
                    this.result = Math.floor(this.amount / (this.selectedDenom * perUnitPrice));
                }

                e.preventDefault();
            }
        }
    });
}); 