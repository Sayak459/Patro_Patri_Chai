import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BibahoComponent } from './bibaho.component';
describe('BibahoComponent', () => { let component: BibahoComponent; let fixture: ComponentFixture<BibahoComponent>; beforeEach(async () => { await TestBed.configureTestingModule({ declarations: [BibahoComponent] }).compileComponents(); fixture = TestBed.createComponent(BibahoComponent); component = fixture.componentInstance; fixture.detectChanges(); }); it('should create', () => expect(component).toBeTruthy()); });
