/// <reference path="common.js" />
/// <reference path="../lodash.js" />

$(function () {
    console.log("load checkout");

    var session = app.Services.Session;
    var sKey = "checkoutSess";

    var checkoutApp = new Vue({
        el: "#checkoutApp",
        data: {
            items: [],
            total: 0
        },
        created: function () {
            //private membs
            this.updateSession = function (reset) {
                if (reset == true)
                    session.reset(sKey);
                else
                    session.set(sKey, { items: this.items, total: this.total });
            }

            $.Topic("checkout.openCheckout").subscribe(this.openCheckout);
            $.Topic("checkout.addItem").subscribe(this.addItem);
            var sess = session.get(sKey);
            if (sess != null) {
                this.items = sess.items;
                this.total = sess.total;
            }
        },
        methods: {
            openCheckout: function () {
                if(this.items.length > 0)
                    $("#checkoutModal").modal();
            },
            addItem: function (item) {
                this.items.push(item);
                var price = (item.Price * item.Count).toFixed(2);
                this.total = Number(Number(this.total) + price);
                this.updateSession();
            },
            removeItem: function (item) {               
                //_.remove(this.items, x => x.Id === item.Id);
                this.items.splice(this.items.indexOf(item), 1)
                console.log(this.items.length)
                var price = (item.Price * item.Count).toFixed(2);
                this.total = Number(Number(this.total) - price);
                this.updateSession();
               
                //remove from cart
                $.Topic("cart.removeItem").publish();
            },
            calcTotal: function () {
                this.total = _.reduce(this.items, function (sum, n) {
                    return sum + n;
                }, 0);
            },
            submitForm: function (e) {
                alert("Thank you for surrendering your identity, dumbass.");
                this.reset();
                $("#checkoutForm").reset();
                e.preventDefault();
            },
            reset: function () {
                $.Topic("cart.reset").publish();
                this.items = [];
                this.total = 0;
                this.updateSession(true);
            }
        }
    })
})