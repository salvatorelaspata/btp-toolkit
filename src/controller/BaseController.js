sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("ui5.quickstart.controller.BaseController", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },
        navTo: function (sRouteName, oParameters, bReplace) {
            this.getRouter().navTo(sRouteName, oParameters, bReplace);
        },
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },
        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        onNavBack: function(){
            this.getOwnerComponent().getRouter().navTo("Dashboard");
        }
        // byId: function (sId) {
        //     return this.getView().byId(sId);
        // }
    });

});