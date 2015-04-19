
# App launcher and autoupdater

This is an app launcher and autoupdater using
[forever](https://github.com/foreverjs) as process monitor and
[gpg](https://www.gnupg.org/) for package verification.

## Preparing your app

* Run `launchify init` in your application root directory.
* Create an application package:
  * tar cvzf my-app-1.0.tar.gz my-app/
* Sign the package
  * gpg -b -u <your key id> my-app-1.0.tar.gz

Upload both files to your repository and update your `RELEASE` file.

## Repository layout

The repository should be located on a webserver like 
`http://my-app.example.com/app-updates/` with the following 
repository structure:

    /app-updates
    /app-updates/my-app-gnu-linux-1.23.42b.tar.gz
    /app-updates/my-app-gnu-linux-1.23.42b.tar.gz.sig

And versioning information:

    /app-updates/RELEASE

## `RELEASE` file format

The `RELEASE` file contains the following plaintext information:

    CURRENT 1.23.42b my-app-gnu-linux-1.23.42b.tar.gz
    
The version string may only contain hexadecimal characters.

## App configuration

An app is configured by placing a `launchify.yml` into it's root directory.

Options:

* `app`
  * `.exec`     - Run the app by executing this in the app working directory ./app.
  * `.forever`  - True if the app should be automaticaly restarted
  * `.kill`     - Kill option (for graceful shutdown)
* `updates`
  * `.server` - Where to pull the updates from
  * `.keep`   - False, all old releases will be discareded. Or number of kept releases.
  * `.gpg`
    * `.key` - The short hash / id of the signing GPG key.

## Deploy an application
    
    $ mkdir my-app
    $ launchify http://updates.example.com/app-updates/
    
This will download the current application version
and install it into the current folder.

## Updates

The updater will periodicaly check the `RELEASE` file as configured
in `config/app.json`, will download the current version
and launch the app.

After downloding the app, the launcher will extract the archive (into 
a temp folder) and will move it to `releases/#{app_name}-#{version}`.

It cwds to the downloaded version and
It executes the before symlink hook.

It cwds to the deploy directory
It kills the currently running application (if there is any)
It removes the `current` symlink and
It creates a new symlink to the current release in `releases`

It cwds to `current`
It starts the application by executing `app.exec`


DRAFT:
The launcher creates a socket, so a remote `check for updates` command
can be issued.




