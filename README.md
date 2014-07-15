# Heroes
Heroes is a full javascript (i think i saw some HTML around too...) text based RPG. I use :

 * VIM to write code
 * JSHint for code quality
 * GCli to render a nice and elegant out of the box graphical console
 * RequireJs to separate each class into modules (AMD)
 * [Eclipse Orion](http://eclipse.org/orion/)'s Xhr and Deferred classes to execute Xhr Request and make use of Deferred object and promises
*  Chance.js to generate random values

I make a fairly heavy use of the Composite design pattern and prototypes for the classes (first time I use it, hurray !)

## Why
I have always wanted to make a RPG, and after working a bit on the Eclipse Orion I wanted to reuse their client architecture to make a small project, as a training. And I started making this, little by little. There is still lots of work to do, I even started a maker to create your own monsters and items, which should be pushed to Github soon.

## Ever heard of graphics ?
No, I have not.

## Preparing the development environment
Simply run `npm install` at the root of the project. It will download locally the node modules necessary for generating the documenation and running unit tests.

## Documentation ?
You can generate the documentation by calling this at the root of heroes:

`yuidoc -c yuidoc.json`

## Running tests ?
You need to run the Karma test runner server:

`karma start`

Then you can either call:

`karma run`

in a separate terminal, or simply edit the code and have the tests be launched automatically, each time you make a modification.

## Behold the almighty todo list !
Thou shall find what one must do to complete what one once began...

### NOW
 * Reach a satisfactory test coverage
 * Update the external libraries
 * Refactor "Controllers" usign DAO pattern
 * Review the fight command logic
 * Review the use command logic
 * Implement "locked" in position
 * Add content in the map.json for the key, the manor and the wolf leader

### EXTRA
 * Integrate in this project Heroes maker

### LATER
 * Make a loading screen
 * Make an option for restart (linked with the death of the hero)
 * Put the orion stuff in ext/orion/
 * Implement the gold coins
