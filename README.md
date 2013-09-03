#Heroes
Heroes is a full javascript (i think i saw some HTML around too...) text based RPG. I use :

- GCli to render a nice and elegant out of the box graphical console
- RequireJs to separate each class into modules (AMD)
- [Eclipse Orion](http://eclipse.org/orion/)'s Xhr and Deferred classes to execute Xhr Request and make use of Deferred object and promises
- Chance.js to generate random values

I make a fairly heavy use of the Composite design pattern and prototypes for the classes (first time I use it, hurray !)

# Why
I have always wanted to make a RPG, and after working a bit on the Eclipse Orion I wanted to reuse their client architecture to make a small project, as a training. And I started making this, little by little. There is still lots of work to do, I even started a maker to create your own monsters and items, which should be pushed to Github soon.

## Ever heard of graphics ?
No, I have not.

# Behold the almighty todo list !
Thou shall find what one must do to complete what one once began...

## NOW
- Convert the rest of the commands using the new ViewConverter
- Cleanup old code ( output in methods + toString() )
- Review the fight command logic ?
- Review the use command logic (add target to object ?)
- Implement "locked" in position
- Add content in the map.json for the key, the manor and the wolf leader
- Add more log output in the developer console

## EXTRA
- Update Heroes maker

## LATER
- Make a loading screen
- Make an option for restart (linked with the death of the hero)
- Put the orion stuff in ext/orion/
- Implement the gold coins