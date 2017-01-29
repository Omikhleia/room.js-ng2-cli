# room.js-ng2-cli
RoomJS angular2 client

**Alpha version - Work in Progress**

This is an _experimental_ browser-based client for Doughsay's [Room.JS](https://github.com/doughsay/room.js) MOO/MUD game engine.

The original (read: official) client is found [here](https://github.com/doughsay/room.js-client). It is based on Knockout.js for the view models, and on Babel and Rollup for transpiling and packaging its ECMAScript6 sources.

While obviously reusing similar concepts, this client project is my attempt at playing with Angular2, TypeScript and Angular-CLI.

Additionaly, this client aims at offering some sort of Graphical MOO/MUD, rather than a pure text experience:
- Sounds
- Images and maps
- Split views, pop-ups, etc.
- ...

For that purpose, the client expects some JSON structures to be sent from the game world. A specific  game world is therefore included, to be used in place of the standard demonstration provided with Room.JS.