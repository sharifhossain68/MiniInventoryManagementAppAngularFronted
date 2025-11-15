import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

  

import { OrderService } from '../../services/order.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';
import { Orderitem } from '../../models/orderitem';


import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class OrderViewComponent {
    orderId!: number;
   products: Product[]=[];
  orderitem: Orderitem[]=[];
   SL!:number;
  form!: FormGroup;


  constructor(

    public orderService: OrderService,

    private route: ActivatedRoute,

    private router: Router

  ) { }

    

  ngOnInit(): void {

    this.orderId = this.route.snapshot.params['orderId'];

    this.orderService.getAllItems(this.orderId).subscribe((data: Orderitem[])=>{
      this.orderitem = data;
      console.log(data);
      this.orderService.getAll().subscribe((data: Product[])=>{
      this.products = data;
      console.log(data);
    }); 

    });
  }
    // this.form = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   description:new FormControl(''),
    //   price:new FormControl(0, [Validators.required]),
    //   stockQuantity: new FormControl(0, [Validators.required]),

    // });

     getProductName(productid: number): string {
    const product = this.products.find(p => p.productId === productid);
    return product ? product.name : '';
  }

  get f(){

    return this.form.controls;

  }
  Completed(id :number){

    this.orderService.update(id,1 ).subscribe((res:any) => {

         console.log('Order updated successfully!');

         this.router.navigateByUrl('order/index');

    })

  }
  Cancelled(id :number){

    this.orderService.delete( id).subscribe((res:any) => {

         console.log('Cancelled successfully!');

         this.router.navigateByUrl('order/index');

    })

  }
  

}
