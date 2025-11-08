import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OrderService } from '../../services/order.service';

import { Product } from '../../models/product';
import { Orderitem } from '../../models/orderitem'
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormGroup,FormBuilder, FormArray,FormControl, Validators } from '@angular/forms';
@Component({

  selector: 'app-create',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './create.component.html',

  styleUrl: './create.component.css'

})

export class OrderCreateComponent {
  products: Product[] = [];
  orderItems : Orderitem[] = [];

  selectedItem: Product | undefined;
  form!: FormGroup;

  constructor(

   private fb: FormBuilder, public orderService:OrderService,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.orderService.getAll().subscribe((data: Product[])=>{

      this.products = data;

      console.log(this.products);
      
    this.addItem();
    this.onChanges();

    })  

    this.form = new FormGroup({
      productId :new FormControl(0),
      customerName: new FormControl('', [Validators.required]),
      totalAmount:new FormControl(''),
      status:new FormControl(0),
      items:new FormArray([])
      
    });
    

  }
   onChanges() {
    this.form.valueChanges.subscribe(() => this.updateTotal());
  }
onItemSelect(event: Event): void {
        const selectedId = (event.target as HTMLSelectElement).value;
        this.selectedItem = this.products.find(item => item.productId === +selectedId);
        console.log('Selected Item:', this.selectedItem);
      }
       updateTotal() {
    let total = 0;
    this.items.controls.forEach(control => {
      const productId = control.get('productId')?.value;
      const qty = control.get('quantity')?.value || 0;
      const product = this.products.find(p => p.productId == productId);
      if (product) total += product.price * qty;
    });
    this.form.get('totalAmount')?.setValue(total, { emitEvent: false });
  }
  get f(){

    return this.form.controls;

  }
 get items() { return this.form.get('items') as FormArray; }

  submit(){

    console.log(this.form.value);

    this.orderService.create(this.form.value).subscribe((res:any) => {

         console.log('Order created successfully!');

         this.router.navigateByUrl('order/index');

    })

  }
  addItem() {
  this.items.push(
    this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    })
    
  );
}
  removeItem(i: number) { this.items.removeAt(i); }

  

}
