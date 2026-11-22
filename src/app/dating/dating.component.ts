import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dating',
  templateUrl: './dating.component.html'
})
export class DatingComponent {
  registerOpen = false;
  menuOpen = false;

  openRegister(): void { this.registerOpen = true; this.menuOpen = false; }
  closeRegister(): void { this.registerOpen = false; }
  setMenu(open: boolean): void { this.menuOpen = open; }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') { this.registerOpen = false; this.menuOpen = false; }
  }
}
