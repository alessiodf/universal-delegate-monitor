# Universal Delegate Monitor

## Introduction

This repository contains the Universal Delegate Monitor plugin for the ARK Desktop Wallet. You can use it to check the health of the active delegates on various ARK-powered networks along with their estimated forging times, and you can also monitor specific delegates of your choice to check their statuses and forging times at a glance.

## Installation

Use the Plugin Manager within the ARK Desktop Wallet to find and install the plugin. If you can't find it, search for `Universal Delegate Monitor`.

## Running

If everything has gone to plan, you should see `Universal Delegate Monitor` in the list of installed plugins, which you can launch by clicking it.

It will, by default, connect to a node for the network currently in use by the active profile within the ARK Desktop Wallet if available. You can change the network shown in the Universal Delegate Monitor by choosing one of the networks in the `Select Network` dropdown list. If the network you want to monitor is not there, you can connect to a `Custom or Unlisted Network` and enter the details of a node running the [Universal Delegate Monitor Server](https://github.com/alessiodf/universal-delegate-monitor-server), which is a plugin for ARK Core. You can also register the network, described in more detail below, to make it available for everybody in the `Select Network` list.

You can also choose to monitor specific delegates to see their forging status and time until forging at the top of the screen without having to scroll through the full list of delegates. To do that, click `Monitor Delegates` and enter the name of each delegate you'd like to monitor.

## Registration

If you run a node on a fork or bridgechain powered by ARK Core that is not currently supported by the Universal Delegate Monitor, you are encouraged to add it by registering the network. This will make it appear for all users worldwide via the `Select Network` dropdown list. Alternatively, if the network is already registered but you would like to add your own relay node to the list of available servers, you can register your node too. This is recommended as it improves availability and decentralisation.

At the present time, to register a custom network or add additional nodes, please fork this repository and then edit the `manifest.json` file as indicated below and [make a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request). This will be changed in future to be fully decentralised using a smartbridge registration mechanism on the ARK Public Network.

### Registering a new network

To register a new network, add a new section to the `manifest.json` file using the format below:

```
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX": {
        "name": "My Network Name",
        "icon": "https://path.to.icon/logo.png",
        "urls": [
            "ws://X.X.X.X:5003"
        ]
    },
```

... where `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` is the nethash of your fork or bridgechain, `https://path.to.icon/logo.png` is a valid URL pointing to a 150x150 pixel image of the logo of your network and `ws://X.X.X.X:5003` is the path to a node that is running the [Universal Delegate Monitor Server](https://github.com/alessiodf/universal-delegate-monitor-server) plugin for ARK Core.

### Adding your node to an existing network

If you would like to add an additional node to an existing network, just add your server to the `urls` array for the relevant network in `manifest.json`. For example:

```
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX": {
        "name": "My Network Name",
        "icon": "https://path.to.icon/",
        "urls": [
            "ws://X.X.X.X:5003",
            "ws://Y.Y.Y.Y:5003"
        ]
    },
```

When you have made the required changes to `manifest.json`, [open a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) to this repository where it will be merged. Once merged, all users worldwide will automatically download the update when they next launch the Universal Delegate Monitor.

## Credits

-   [All Contributors](../../contributors)
-   [alessiodf](https://github.com/alessiodf)

## License

[GPLv3](LICENSE) © [alessiodf](https://github.com/alessiodf)
