import { Component, OnInit } from '@angular/core';

import { SoundService } from '../sound.service';

/**
 * Volume settings UI
 */

@Component({
  selector: 'app-sound-settings',
  templateUrl: './sound-settings.component.html',
  styleUrls: ['./sound-settings.component.css']
})
export class SoundSettingsComponent implements OnInit {
  public volume = 50;
  public muted = false;

  constructor(private soundService: SoundService) { }

  ngOnInit() {
  }

  public onChange(event: any) {
    this.soundService.volume(this.volume);
  }

  public onClick(event: any) {
    this.muted = !this.muted;
    this.soundService.mute(this.muted);
  }

}
