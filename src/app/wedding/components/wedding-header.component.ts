import { Component } from '@angular/core';
import { scrollToSection } from '../../shared/scroll.util';
@Component({selector:'app-wedding-header',templateUrl:'./wedding-header.component.html'})
export class WeddingHeaderComponent { menu=false; seasonOpen=false; scroll(id:string){this.menu=false;scrollToSection(id);} toggleMenu(){this.menu=!this.menu;} toggleSeason(){this.seasonOpen=!this.seasonOpen;} }
