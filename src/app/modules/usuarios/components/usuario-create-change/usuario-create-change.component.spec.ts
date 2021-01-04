import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCreateChangeComponent } from './usuario-create-change.component';

describe('UsuarioCreateChangeComponent', () => {
  let component: UsuarioCreateChangeComponent;
  let fixture: ComponentFixture<UsuarioCreateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCreateChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCreateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
