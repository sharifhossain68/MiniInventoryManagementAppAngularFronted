import { Component } from '@angular/core';

  

import { ProductService } from '../../services/product.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';

  

@Component({

  selector: 'app-view',

  standalone: true,

  imports: [],

  templateUrl: './view.component.html',

  styleUrl: './view.component.css'

})

export class ViewComponent {

  productId!: number;

  product!: Product;

  constructor(

    public productService: ProductService,

    private route: ActivatedRoute,

    private router: Router

   ) { }


  ngOnInit(): void {

    this.productId = this.route.snapshot.params['productId'];

    this.productService.find(this.productId).subscribe((data: Product)=>{

      this.product = data;

    });

  }

  

}