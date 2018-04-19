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
            addItem: function (cnt) {
                if(cnt > 0)
                    this.count += cnt;
            },
            removeItem: function (cnt) {
                if (this.count - cnt < 0)
                    this.count = 0;
                else
                    this.count -= cnt;
            },
            checkout: function () {  
                $.Topic("checkout.openCheckout").publish();
            }
        }
    })

    
})