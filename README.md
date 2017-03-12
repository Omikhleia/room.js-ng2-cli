# room.js-ng2-cli
Room.JS Angular client

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

## Installation
Steps:

1. install **room.js** referring to its own documentation
1. Install **room.js-ng2-cli**
1. Replace the default demonstration world in Room.JS by the one provided with the client (*demo* subfolder)
1. Start the server
1. Go to *roomjs-client2* and run `npm install`
1. Edit the environment files in *roomjs-client2/src/environments* and configure the **serverURL** key to point to your own Room.JS instance (address and port)
1. Build and/or serve the client with Angular-CLI, as detailed in its own *README*

## Work in Progress
High level features and TODO list:
- [x] Basic communication logic
  - [x] Login logic with menus/popups
  - [x] Command line
  - [x] Text view (as in original client)
  - [x] Players in current location, with status
- [x] Verb/Function editing (as in original client)
  - [x] Look-up, code retrieval and display
  - [x] Save to game engine
- [x] Sound system
  - [x] Effects (one-shot) sounds
  - [x] Ambiant sounds
  - [x] User settings control (UI)
- [ ] Image/Map system
  - [x] Isometric basic view
  - [ ] Environment specific assets (indoor, outdoor...)
  - [x] Room contents
- [ ] Inventory system
  - [x] View
  - [ ] Simple interactions (use item)
  - [ ] Drag and drop interations (use item on item)
  - [ ] Trade (with other players, etc.)
