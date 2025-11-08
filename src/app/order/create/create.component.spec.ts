import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: OrderCreateComponent;
  let fixture: ComponentFixture<OrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
