import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionInternaComponent } from './publicacion-interna.component';

describe('PublicacionInternaComponent', () => {
  let component: PublicacionInternaComponent;
  let fixture: ComponentFixture<PublicacionInternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionInternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
