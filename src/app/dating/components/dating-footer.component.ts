import { Component, EventEmitter, Output } from '@angular/core';
import { scrollToSection } from '../../shared/scroll.util';
@Component({selector:'app-dating-footer',templateUrl:'./dating-footer.component.html'}) export class DatingFooterComponent { @Output() register=new EventEmitter<void>(); scroll(id:string){scrollToSection(id);} }
