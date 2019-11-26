module.exports = {
    register () {
        const profile = walletApi.profiles.getCurrent();
        let phrases;
        try {
            phrases = require(`../${profile.language}.json`);
        } catch (error) {
            phrases = require("../en-US.json");
        }

        this.routes = [
            {
                path: "/delegate-monitor",
                name: "delegate-monitor",
                component: "delegate-monitor"
            }
        ];

        this.menuItems = [
            {
                routeName: "delegate-monitor",
                title: phrases["APP_NAME"]
            }
        ];
    },

    getComponentPaths () {
        return {
            "delegate-monitor": "pages/index.js"
        };
    },

    getRoutes () {
        return this.routes;
    },

    getMenuItems () {
        return this.menuItems;
    }
};