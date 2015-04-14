
# App launcher and autoupdater

Given a webserver `http://my-app.example.com/app-updates/` with the following 
repository structure:

    /app-updates
    /app-updates/my-app-gnu-linux-1.23.42b.tar.gz
    /app-updates/my-app-gnu-linux-1.23.42b.tar.gz.sig

And versioning information:

    /app-updates/VERSION


## `VERSION` file format

This is a first draft.
Format is plaintext and contains following information:

    CURRENT 1.23.42b my-app-gnu-linux-1.23.42b.tar.gz
    
Optional:
    RELEASE icecream-soda-popsticle

To make things simpler the version string may only contain 
hexadecimal characters.


## App configuration

There is an app configuration file located in `config/app.json`

Options:

* `app`
* * `.exec`     - Run the app by executing this in the app working directory ./app.
* * `.forever`  - True if the app should be automaticaly restarted
* * `.kill`     - Kill option (for graceful shutdown)
* * `.version`  - The last downloaded app version.
* * `.release`  - The release (See `VERSION`)
* * `.last_update` - Timestamp of the last download.
* `updates`
* * `.server` - Where to pull the updates from
* * `.basic_auth` - Username and password credentials in case the repository is private.
* * `.gpg`
* * * `.key` - The short hash / id of the signing GPG key.
    
## Updates

The updater will periodicaly check the `VERSION` file as configured
in `config/app.json`, will download the current version
and launch the app.

DRAFT:
The launcher creates a socket, so a remote `check for updates` command
can be issued.




