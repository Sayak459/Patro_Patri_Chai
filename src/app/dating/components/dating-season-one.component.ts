import { Component } from '@angular/core';

@Component({
  selector: 'app-dating-season-one',
  templateUrl: './dating-season-one.component.html',
})
export class DatingSeasonOneComponent {

  playing: number | null = null;

  toggle(n: number): void {
    this.playing = this.playing === n ? null : n;
  }

  openVideo(url: string): void {
    window.open(url, '_blank');
  }

}