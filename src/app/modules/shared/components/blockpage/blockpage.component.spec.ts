import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockpageComponent } from './blockpage.component';

describe('BlockpageComponent', () => {
  let component: BlockpageComponent;
  let fixture: ComponentFixture<BlockpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
