/// <reference path="common.js" />


$(function () {
    console.log("load cart");

    var session = app.Services.Session;
    var sKey = "cartSess";

    var cart = new Vue({
        el: "#cartApp",
        data: {
            count: 0
        },
        created: function () {
            this.updateSession = function (reset) {
                if (reset == true)
                    session.reset(sKey);
                else
                    session.set(sKey, { count: this.count });
            }

            $.Topic("cart.addItem").subscribe(this.addItem);
            $.Topic("cart.removeItem").subscribe(this.removeItem);
            $.Topic("cart.reset").subscribe(this.reset);
            var sess = session.get(sKey);
            if (sess != null)
                this.count = sess.count;
        },
        methods: {
            addItem: function () {
                this.count++;
                this.updateSession();
                this.bounce();
            },
            removeItem: function () {
                if (this.count - 1 < 0)
                    this.count = 0;
                else
                    this.count--;
                this.updateSession();
                this.bounce();
            },
            reset: function () {
                this.count = 0;
                this.updateSession(true);
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