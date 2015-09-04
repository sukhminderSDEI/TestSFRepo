Bootstrap-less
==============

This package contains only the less files of bootstrap and is configured to deploy the compiled css to a "bootstrap.resource" with same project.

Make sure you create a bootstrap-less folder on the same level as src if it does not already exist.

If the "bootstrap.resource" folder is present in your project. You can simply run the command below to compile your changes to the bootstrap.resoucre folder located in the resource bundles folder

```bash
gulp less
```

If you need to add the contents of the fonts folder to your resource bundle just run

```bash
gulp fonts
```
## Deployment

Then using Sublime/MavensMate enter:

`('command/control' + shift + p)`  to open Sublime's smart search and begin to type: `Deploy Resource Bundle`

Select this option and then pick "bootstrap.resouce" by pressing enter.

MavensMate will then compress the resource bundle and deploy it as your updated static resource.

You can now open your new Visualforce page and see your changes.