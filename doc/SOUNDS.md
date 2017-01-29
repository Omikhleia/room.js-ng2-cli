# Adding sounds in your RoomJS MUD/MOO world

The sound system relies on the fact that [transferable](https://www.w3.org/TR/html5/infrastructure.html#transferable-objects) JavaScript objects can be conveyed on Websockets (Socket.IO).

Therefore, instead of raw text, an object may also be sent to the client side. The client an object having the following structure:

```javascript
  { ambiant: Array, 
    effect: Array, 
    text: String }
```

Where all fields are optional:
- *ambiant* and *effect* specifies the set of sounds, in the form:
```javascript
  [ ['sound1', volume1], ['sound2', volume2], ... ]
```
- *text* allows sending also a regular text message, so that text and sounds may be sent in a single command from the game engine (e.g. to avoid extra loops when broadcasting sounds and messages to all players in a location).

If the appropriate sounds exist on the client-side, they will be played. The client looks for audio files in its *assets/sounds/* subdirectory, in .webm, .ogg or .mp3 format. Audio files must be present in all three formats, and the underlying sound library ([Howler](https://github.com/goldfire/howler.js/)) will pick the format best adapted for the user's browser.

Two different types of sounds are supported:
- Effects are played just once;
- Ambiant sounds are looping until replaced, with a smooth fade effect applied on transitions. Sending an empty array `[]` for ambiant sounds terminates them all. Otherwise, sending a new set of sounds will update the current ambiant sounds. Those not present in the new set are faded out, new sounds are faded in, and common sounds have their volume adapted (if different).

Volumes are expressed as a percentage (0..100) applied to the audio file, so you will have to try what is best depending on your own set of audio recordings.

In your RoomJS world, the most basic way to use the sound system would look as follows:
```javascript
player.send({ ambiant: [['fly', 30]], effect: [['door_creaky', 20]], 
              text: 'The door cracks, and a fly starts running around.' });
```

