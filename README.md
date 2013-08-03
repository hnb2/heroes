NOW
===
- Decide on a fixed amount of number for every attributes instead of sometimes % (dodge)
- Implement "locked" in position
- Prevent player to take an item if there is a monster
- Implement key behaviour (target a doorwith a position id)
- Add content in the map.json for the key, the manor and the wolf leader
- Make the 'to' clickable with the name (check position.js for current impl)
- Implement the gold coins
- Update the use function take the id of the item and the target if any (eg. throw small rocks at monster).

EXTRA
=====
- Simple webapp to create json data file (form, create object, JSON.stringify, html5 file storage ?)

LATER
=====
- Export gcli into another file after boostarting the app in "app.js"
- Make an option for restart (linked with the death of the hero)
- Review the fight command logic
- Review the min/max system and chance calculation
- Investigate on the necessity of creating child classes for every kind of attribute (dmg, hp, ...)