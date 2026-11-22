import { Component, EventEmitter, Input, Output } from '@angular/core';
import { scrollToSection } from '../../shared/scroll.util';

@Component({ selector:'app-dating-navbar', templateUrl:'./dating-navbar.component.html' })
export class DatingNavbarComponent {
  @Input() menuOpen = false;
  @Output() menuChange = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<void>();
  scroll(id:string):void { this.menuChange.emit(false); scrollToSection(id); }
  toggle():void { this.menuChange.emit(!this.menuOpen); }
}
