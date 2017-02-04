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
  private volume: number = 50;
  private muted: boolean = false;
  
  constructor(private soundService: SoundService) { }

  ngOnInit() {
  }

  private onChange(event: any) {
    this.soundService.volume(this.volume);
  }
  
  private onClick(event: any) {
    this.muted = !this.muted;
    this.soundService.mute(this.muted);
  }

}
