/// <reference path="../vue.js" />





$(function () {
    console.log("load RatesConversion");

    var valServ = app.Services.ValuesService;

    var rates = valServ.getRates();
   

    var types = [];
    rates.forEach((val, idx) => {
        types.push({ Value: val.Id, Text: val.Type });
    })


    var denominations = valServ.getDenominations();

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