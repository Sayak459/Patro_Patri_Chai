import { Component, EventEmitter, Output } from '@angular/core';
@Component({selector:'app-dating-season-two',templateUrl:'./dating-season-two.component.html'})
export class DatingSeasonTwoComponent { @Output() register=new EventEmitter<void>(); }
