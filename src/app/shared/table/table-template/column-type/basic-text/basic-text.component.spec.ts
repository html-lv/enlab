import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTextComponent } from './basic-text.component';

describe('BasicTextComponent', () => {
  let component: BasicTextComponent;
  let fixture: ComponentFixture<BasicTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
