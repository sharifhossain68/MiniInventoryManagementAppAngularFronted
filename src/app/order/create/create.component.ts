//import { Component } from '@angular/core';
//
//@Component({
//  selector: 'app-create',
//  standalone: true,
//  imports: [],
//  templateUrl: './create.component.html',
//  styleUrl: './create.component.css'
//})
//export class CreateComponent {
//
//}
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OrderService } from '../../services/order.service';

import { Product } from '../../models/product';

import { Router } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({

  selector: 'app-create',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './create.component.html',

  styleUrl: './create.component.css'

})

export class OrderCreateComponent {
  products: Product[] = [];
  selectedItem: Product | undefined;
  form!: FormGroup;

  constructor(

    public orderService:OrderService,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.orderService.getAll().subscribe((data: Product[])=>{

      this.products = data;

      console.log(this.products);

    })  

    this.form = new FormGroup({
      productId :new FormControl(0),
      customerName: new FormControl('', [Validators.required]),
      totalAmount:new FormControl(''),
      status:new FormControl(0),
      
    });

  }
onItemSelect(event: Event): void {
        const selectedId = (event.target as HTMLSelectElement).value;
        this.selectedItem = this.products.find(item => item.productId === +selectedId);
        console.log('Selected Item:', this.selectedItem);
      }
  get f(){

    return this.form.controls;

  }


  submit(){

    console.log(this.form.value);

    this.orderService.create(this.form.value).subscribe((res:any) => {

         console.log('Order created successfully!');

         this.router.navigateByUrl('order/index');

    })

  }

  

}
