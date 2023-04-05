import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserEmulatorComponent } from './file-browser-emulator.component';

describe('FileBrowserEmulatorComponent', () => {
  let component: FileBrowserEmulatorComponent;
  let fixture: ComponentFixture<FileBrowserEmulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileBrowserEmulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileBrowserEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
