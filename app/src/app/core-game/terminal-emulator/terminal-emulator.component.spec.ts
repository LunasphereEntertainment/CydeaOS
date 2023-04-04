import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalEmulatorComponent } from './terminal-emulator.component';

describe('TerminalEmulatorComponent', () => {
  let component: TerminalEmulatorComponent;
  let fixture: ComponentFixture<TerminalEmulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalEmulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
