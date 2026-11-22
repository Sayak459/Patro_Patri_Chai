import { Component, EventEmitter, Output } from '@angular/core';
import { scrollToSection } from '../../shared/scroll.util';
@Component({ selector: 'app-dating-rewards', templateUrl: './dating-rewards.component.html' })
export class DatingRewardsComponent { @Output() register = new EventEmitter<void>(); rewards = [['🎁', 'Hampers', 'Little surprises waiting for participants along the journey.'], ['🏆', 'Prizes', 'Because being part of PPC should come with a few unforgettable wins.'], ['💝', 'Gifts', 'Thoughtful moments that make the PPC experience even sweeter.'], ['🍽️', 'Sponsored Dates', 'Special date experiences brought to life with our amazing sponsors.']]; scroll(id: string) { scrollToSection(id); } }
