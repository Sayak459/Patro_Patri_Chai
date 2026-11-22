import { Component, EventEmitter, Output } from '@angular/core';
@Component({selector:'app-dating-register-banner',templateUrl:'./dating-register-banner.component.html'}) export class DatingRegisterBannerComponent { @Output() register=new EventEmitter<void>(); }
