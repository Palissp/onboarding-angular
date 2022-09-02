import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLibraryComponent } from './main-library.component';

describe('LibraryComponent', () => {
  let component: MainLibraryComponent;
  let fixture: ComponentFixture<MainLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
