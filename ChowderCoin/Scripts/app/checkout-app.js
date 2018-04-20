/// <reference path="common.js" />
/// <reference path="../lodash.js" />

$(function () {
    console.log("load checkout");

    var checkoutApp = new Vue({
        el: "#checkoutApp",
        data: {
            items: [],
            total: 0
        },
        created: function () {
            $.Topic("checkout.openCheckout").subscribe(this.openCheckout);
            $.Topic("checkout.addItem").subscribe(this.addItem);
        },
        methods: {
            openCheckout: function () {
                $("#checkoutModal").modal();
            },
            addItem: function (item) {
                this.items.push(item);
                var price = (item.Price * item.Count).toFixed(2);
                this.total = Number(Number(this.total) + price);                
            },
            removeItem: function (item) {
                this.items.remove(item);
                var price = (item.Price * item.Count).toFixed(2);
                this.total = Number(Number(this.total) - price);

                //remove from cart
                $.Topic("cart.removeItem").publish();
            },
            calcTotal: function () {
                this.total = _.reduce(this.items, function (sum, n) {
                    return sum + n;
                }, 0);
            }
        }
    })
})