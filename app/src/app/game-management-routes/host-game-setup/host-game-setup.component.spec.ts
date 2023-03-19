import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostGameSetupComponent } from './host-game-setup.component';

describe('HostGameComponent', () => {
  let component: HostGameSetupComponent;
  let fixture: ComponentFixture<HostGameSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostGameSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostGameSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
