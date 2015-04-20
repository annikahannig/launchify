
# App launcher and autoupdater

This is an app launcher and autoupdater using
[forever](https://github.com/foreverjs) as process monitor and
[gpg](https://www.gnupg.org/) for package verification.

## Preparing your app

* Run `launchify init` in your application root directory.
  Answer some questions about your app and your configuration
  will be created.

* Create an application package: `$ tar cvzf my-app-1.0.tar.gz my-app/`
* Sign the package: `$ gpg -b -u <your key id> my-app-1.0.tar.gz`

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
    
The version string consisting of MAJOR.MINOR.PATCH may only 
contain hexadecimal characters.
 
## Deploy your application
    
    $ mkdir my-app
    $ cd my-app && launchify http://updates.example.com/app-updates/
    
This will download and install the current application version.

Launch your application by running
    $ launchify 
in your application root directory.

## App configuration

An app is configured by placing a `launchify.yml` into it's root directory.

Options:

* `app`
  * `.name`     - The application name
  * `.exec`     - Run the app by executing this in the app working directory ./app.
  * `.kill`     - Kill option (for graceful shutdown)

* `updates`
  * `.repository` - Where to pull the updates from
  * `.keep`       - False, all old releases will be discareded. Or number of kept releases.
  * `.interval`   - Check for updates every `15 minutes 32 seconds`.
  * `.gpg`
    * `.key` - The short hash / id of the signing GPG key.
    * `.uid` - The signing users GPG uid.
    * `.fingerprint` - The gpg key fingerprint.


## Updates

The updater will periodicaly check the `RELEASE` file as configured
in the `launchify.yml` file and will download the current version.

The launcher will restart the app as needed.

## Contributing

1. Fork it ( https://github.com/mhannig/launchify/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

MIT

