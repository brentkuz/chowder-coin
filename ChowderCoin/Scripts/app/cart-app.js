/// <reference path="common.js" />


$(function () {
    console.log("load cart");
    var cart = new Vue({
        el: "#cartApp",
        data: {
            count: 0
        },
        created: function () {
            $.Topic("cart.addItem").subscribe(this.addItem);
            $.Topic("cart.removeItem").subscribe(this.removeItem);
        },
        methods: {
            addItem: function () {
                this.count++;
                this.bounce();
            },
            removeItem: function () {
                if (this.count - 1 < 0)
                    this.count = 0;
                else
                    this.count--;
                this.bounce();
            },
            checkout: function () {  
                $.Topic("checkout.openCheckout").publish();
            },
            bounce: function () {
                $("#cartApp").effect("bounce", { times: 3 }, "slow");
            }
        }
    })

    
})