﻿using System.Web;
using System.Web.Optimization;

namespace ChowderCoin
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                        "~/Scripts/vue.js",
                        "~/Scripts/lodash.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/app/models.js",
                        "~/Scripts/app/common.js",
                        "~/Scripts/app/cart-app.js",
                        "~/Scripts/app/checkout-app.js"));

            //apps
            bundles.Add(new ScriptBundle("~/bundles/rates-conversion").Include(
                        "~/Scripts/app/rates-conversion-app.js"));
            bundles.Add(new ScriptBundle("~/bundles/store-app").Include(
                        "~/Scripts/app/store-app.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/popper.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
