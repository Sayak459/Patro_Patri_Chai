import { Component, EventEmitter, Output } from '@angular/core';
@Component({selector:'app-dating-register-modal',templateUrl:'./dating-register-modal.component.html'})
export class DatingRegisterModalComponent { @Output() close=new EventEmitter<void>(); name=''; email=''; phone=''; about=''; submit(){this.close.emit(); window.alert('Thank you! Your PPC registration has been noted for this demo.');} }
