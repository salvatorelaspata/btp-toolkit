sap.ui.define([
    "ui5/quickstart/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "ui5/quickstart/libs/main",
    "sap/ui/model/json/JSONModel"
], (BaseController, MessageToast, MessageBox, lib, JSONModel) => {
    "use strict";

    return BaseController.extend("ui5.quickstart.controller.Dashboard", {
        onInit: function () {
            this.getRouter().getRoute("Dashboard").attachPatternMatched(this._onRouteMatched, this);
            const oModel = new JSONModel({
                config: {
                    cli_is_installed: false, // true or false
                    cli_version: "", // version cli
                    help: "", // help text,
                    api_endpoint: "https://cli.btp.cloud.sap", // api endpoint
                    username: "salvatore.laspata@gotonext.it", // api username
                    password: "", // api password
                    global_account: "", // global account
                    authenticated: false,
                    targets: ""
                },
                checks: []
            });
            this.setModel(oModel, 'dashboardModel');

            (async () => {
                const result = await lib.check_btp()
                this.getModel('dashboardModel').setProperty('/config/cli_is_installed', result);

                if(!result) {
                    const cliErrorMessage = this.getResourceBundle().getText("dashboard.check.btp_cli_not_installed_description");
                    return MessageToast.show(cliErrorMessage);
                }

                const version = await lib.get_cli_version();
                this.getModel('dashboardModel').setProperty('/config/cli_version', version);

                const help = await lib.help();
                this.getModel('dashboardModel').setProperty('/config/help', help);
            })()
        },
        _onRouteMatched: function () {
            console.log("Dashboard route matched");
        },
        goToCockpit: function () {
            this.navTo("Cockpit");
        },
        goToInfo: function () {
            this.navTo("Info");
        },
        doLogin: function () {
            const oModel = this.getModel('dashboardModel');
            const endpoint = oModel.getProperty('/config/api_endpoint');
            const username = oModel.getProperty('/config/username');
            const password = oModel.getProperty('/config/password');
            const globalAccount = oModel.getProperty('/config/global_account');
            (async () => {
                const res = await lib.login({endpoint, username, password, globalAccount});
                if(res) {
                    oModel.setProperty('/config/authenticated', true);

                    // get the list of targets
                    try {
                        const targets = await lib.target_list();
                        oModel.setProperty('/config/targets', targets);
                        MessageBox.success(this.getResourceBundle().getText("dashboard.login.success") + targets);
                    } catch (error) {
                        console.log(error);
                    }

                } else {
                    console.log(res)
                    MessageToast.show(this.getResourceBundle().getText("dashboard.login.error") + " " + res);
                }
            })()
        },
        doLogout: function () {
            const oModel = this.getModel('dashboardModel');
            oModel.setProperty('/config/authenticated', false);
            MessageBox.success(this.getResourceBundle().getText("dashboard.logout.success"));
        }
    });
});