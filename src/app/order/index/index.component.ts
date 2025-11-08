import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';

@Component({

  selector: 'app-index',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './index.component.html',

  styleUrl: './index.component.css'

})

export class OrderIndexComponent {

  orders: Order[] = [];

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {

    this.orderService.getAllOrder().subscribe((data: Order[])=>{

      this.orders = data;

      console.log(this.orders);

    })  
    

  }

}