import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsPromptComponent } from './permissions-prompt.component';

describe('PermissionsPromptComponent', () => {
  let component: PermissionsPromptComponent;
  let fixture: ComponentFixture<PermissionsPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
