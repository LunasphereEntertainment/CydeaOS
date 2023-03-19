import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLauncherComponent } from './game-launcher.component';

describe('GameLauncherComponent', () => {
  let component: GameLauncherComponent;
  let fixture: ComponentFixture<GameLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameLauncherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
