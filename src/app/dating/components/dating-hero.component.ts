
import { Component, EventEmitter, Output } from '@angular/core';
import { scrollToSection } from '../../shared/scroll.util';

@Component({
  selector: 'app-dating-hero',
  templateUrl: './dating-hero.component.html'
})
export class DatingHeroComponent {

  @Output() register = new EventEmitter<void>();

  scroll(id: string): void {
    scrollToSection(id);
  }

  nodes = [
    ['MEET COUPLES', '💑', 'top-1'],
    ['CONNECT & CHAT', '💬', 'top-2'],
    ['FAMILY INTRODUCTION', '👨‍👩‍👧‍👦', 'top-3'],
    ['ENGAGEMENT', '💍', 'top-4'],
    ['WEDDING CELEBRATION', '💒', 'top-5'],

    ['CATERING SERVICES', '🍽️', 'bottom-1'],
    ['PHOTOGRAPHY & VIDEOGRAPHY', '📸', 'bottom-2'],
    ['ENTERTAINMENT & EVENTS', '🎤', 'bottom-3'],
    ['DECORATION & VENUE SETUP', '💐', 'bottom-4'],
    ['WEDDING LOGISTICS', '🚘', 'bottom-5']
  ];

}
