import { Injectable } from '@angular/core';
import { Howl } from "howler";

/**
 * Sound service module.
 * Audio playing for effects (one-time sounds) and ambiants (looping background sounds).
 */

@Injectable()
export class SoundService {
  private sounds: Map<string,Howl>;
  private ambiants: Map<string,any>;
  private fadeDelay: number = 2000;

  constructor() {
    /* Keep a record of cached sounds */
    this.sounds = new Map();
    /* Keep a record of currently playing ambiant sounds */
    this.ambiants = new Map();
  }

  /**
   * Return a Howler sound object, registering it on first invocation.
   *
   * @params    name    Name of a sound
   * @returns           Howler sound object.
   */
  private fetchSound(name: string): Howl {
    let sound: Howl = this.sounds.get(name);
    if (sound === undefined) {
      // Register the new sound
      // (with volume to zero by default)
      sound = new Howl({
        src: [`assets/sounds/${name}.webm`,
              `assets/sounds/${name}.ogg`,
              `assets/sounds/${name}.mp3`,
             ],
        volume: 0,
      });
      this.sounds.set(name, sound);
    }
    return sound;
  }

  /**
   * Play a set of sounds once.
   *
   * @params {Array} array Array of sounds, in the form
   *                      [['sound1', volume1], ['sound2, volume2], ...]
   */
  effect(array: any) {
    const sounds: any = new Map(array);
    sounds.forEach((volume: number, name: string) => {
      const sound = this.fetchSound(name);
      let vol;
      if (volume < 0) {
        vol = 0;
      } else if (volume > 100) {
        vol = 100;
      } else {
        vol = volume;
      }

      const id = sound.play();
      sound.volume(vol / 100, id);
    });
  }

  /**
   * Play a set of ambiant sounds (i.e. looping, with fade-in/out effects).
   *
   * @params {Array}  array  Array of ambiant sounds, in the form
   *                         [ ['sound1', volume1], ['sound2, volume2], ... ]
   */
  ambiant(array: any) {
    const sounds = new Map(array);

    // First, fade out all other ambiant sounds.
    this.ambiants.forEach((ambiant: any, name: string) => {
      const { sound, id } = ambiant;
      if (sounds.get(name) === undefined) {
        sound.once('fade', (idx: any) => {
          // Stop when faded, for recycling
          sound.stop(idx);
        }, id);
        sound.fade(sound.volume(id), 0, this.fadeDelay, id);
        this.ambiants.delete(name);
      }
    });

    // Then, enable all requested sounds
    sounds.forEach((volume: number, name: string) => {
      const ambiant = this.ambiants.get(name);
      let vol: number;
      if (volume < 0) {
        vol = 0;
      } else if (volume > 100) {
        vol = 100;
      } else {
        vol = volume;
      }

      if (ambiant === undefined) {
        // New ambiant sound: fade volume in.
        const sound: Howl = this.fetchSound(name);
        const id: any = sound.play();
        sound.fade(0, vol / 100, this.fadeDelay, id);
        sound.loop(true, id);
        this.ambiants.set(name, { sound, id });
      } else {
        // Active ambiant sound: fade volume to new value (i.e. adapt volume).
        const { sound, id } = ambiant;
        if (sound.volume(id) !== vol / 100) {
          sound.fade(sound.volume(id), vol / 100, this.fadeDelay, id);
        }
      }
    });
  }

  /**
   * Stop all sounds and reset ambiant sound records.
   */
  stop() {
    // Stop all sounds.
    this.sounds.forEach((sound: Howl) => {
      sound.stop();
    });
    // Reset map of ambiant sounds.
    this.ambiants = new Map();
  }
}
