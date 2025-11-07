import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product';

@Component({

  selector: 'app-index',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './index.component.html',

  styleUrl: './index.component.css'

})

export class IndexComponent {

  products: Product[] = [];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {

    this.productService.getAll().subscribe((data: Product[])=>{

      this.products = data;

      console.log(this.products);

    })  

  }


  delete(id:number){

    this.productService.delete(id).subscribe(res => {

         this.products = this.products.filter(item => item.productId !== id);

         console.log('Product deleted successfully!');

    })

  }

  

}