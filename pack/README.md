# ICIX UI Directory Structure and Build Process



## For developers:

At the core of this build system is the component. As features as described in the **user story** should

### How to add a new feature.

#### Step 1: Determine what where you component should go.

Based on the **user story** assignment you should determine the primary location that your component will be used. Will it be used in one of the pages below: home, partners, products, requests. or a new page? If the component will go in an existing page make copy of this folder using the angular generator and the instructions below. If it is a new Visual Force page select a name and create it with the angular generator.

Using the angular generator( [installation guide](https://github.com/CodeScience/slush-angular-webpack) ) run the following commands:



```bash
slush angular-webpack
```

The generator will then ask you to enter the project ( Enter the name of your new visual force page or the name of page to copy. Example: products_feature_us2343 ).

```bash
What would you like to name your project or VisualForce page?
```

Followed by:

```bash
Is this a Salesforce project? (Y/n) y
```

The generator will then create your new Visualforce page and the corresponding Static Resource on your remote Salesforce Org.
Then it will build the project inside of a new folder with the app name you entered.

#### Step 2: Copy an existing project into your newly created project folder. 

In its current state the generator template is behind the newest pattern we are using. For the short term use the example of the other folders a match that pattern.

You also need to copy the updated code from an existing Visualforce page then update resource and controller names as needed.

#### Step:3 Build and deploy your component to your dev org.

The simplest way to deploy your changes to your Org is to run the following command one time per dev session.

```bash
npm run-script sf-auto-build-deploy
```

 The script will start a watch process within webpack and on successful build the changes will deployed to current Org.




### Example:

```
cd partners
```
then run:

```
npm run-script sf-auto-build-deploy
```
This will build and deploy the bundle.js file within an static resource to your salesforce org.

### Step:4 Commit and push your changes

Once you have built and tested your feature within your development org take care to only add the changes you made to your feature branch.

Make sure to include the following:

	- VisualForce.page
	- VisualForceController.cls***
	- VisualForceController.cls-meta.xml***
	- VisualForce.page-meta.xml
	- BundleSrcFolder(home,products,etc.)
	- BundleStatic.resource
	- BundleStatic.resource-meta.xml
	- ApexComponent.component***
	- ApexComponent.component-meta.xml***
	- ApexComponentController.cls***
	- ApexComponentController.cls-meta.xml***

*** (if needed)

Its recommended to use two folders to mange your mavenmate project and the code pulled from github.

- **Folder A** - Contains you mavensmate project linked to your development org.

- **Folder B** - Contains your git repository that points to "dev" as its remote origin.

This allows you to manually control what code you add to the repository folder. It also gives you isolation so you can branch, rebase and rebuild the repository as needed with risk of destroying your working code with in the mavensmate project folder.

When you need to update your dev org with code from the git repo simple use the ant commands to deploy directly into your remote org. Then use mavesmate's refresh function to pull down the newest changes.


[Two Folder Example](https://drive.google.com/file/d/0B7Kjjp5dNoVvc29ySi1sUHdEM1E/view?usp=sharing "Title")


## Structure

 The directory below represents the current state of the ICIX UI build directory. This directory represents the merged and tested source that will go in the final package.

***Please do not add or change this structure. Add your features in seperate folders an pages and they will be merged to this package by others***.

- pack/
    - common/
		- karma.conf.js
        - package.json
        - webpack.config.js
        - webpack.config.js
        - webpack.salesforce.js
        - webpack.salesforce.deploy.js
        - app/
            - index.html
            - index.js
            - components/
                - autoComplete
				- docAttachment
				- navBar
				- objectForm
				- toolbar
	- home/
		- karma.conf.js
        - package.json
        - webpack.config.js
        - webpack.config.js
        - webpack.salesforce.js
        - webpack.salesforce.deploy.js
		- app/
            - index.html
            - index.js
            - components/
				- main/
				- dashboard/
	- partners/
		- karma.conf.js
        - package.json
        - webpack.config.js
        - webpack.config.js
        - webpack.salesforce.js
        - webpack.salesforce.deploy.js
		- app/
            - index.html
            - index.js
            - components/
				- main/
				- partnerProfile/
	- products/
		- karma.conf.js
        - package.json
        - webpack.config.js
        - webpack.config.js
        - webpack.salesforce.js
        - webpack.salesforce.deploy.js
		- app/
            - index.html
            - index.js
            - components/
				- main/
	- requests/
		- karma.conf.js
        - package.json
        - webpack.config.js
        - webpack.config.js
        - webpack.salesforce.js
        - webpack.salesforce.deploy.js
		- app/
            - index.html
            - index.js
            - components/
				- main/
				- notification/
				- taskList/