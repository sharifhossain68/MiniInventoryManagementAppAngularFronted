import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

  

import { ProductService } from '../../services/product.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

  

@Component({

  selector: 'app-edit',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './edit.component.html',

  styleUrl: './edit.component.css'

})

export class EditComponent {

  

  productId!: number;

  product!: Product;

  form!: FormGroup;


  constructor(

    public productService: ProductService,

    private route: ActivatedRoute,

    private router: Router

  ) { }

    

  ngOnInit(): void {

    this.productId = this.route.snapshot.params['productId'];

    this.productService.find(this.productId).subscribe((data: Product)=>{
      this.product = data;
      console.log(data);
    }); 

        
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description:new FormControl(''),
      price:new FormControl(0, [Validators.required]),
      stockQuantity: new FormControl(0, [Validators.required]),

    });

  }

  get f(){

    return this.form.controls;

  }
  submit(){

    console.log(this.form.value);

    this.productService.update(this.productId, this.form.value).subscribe((res:any) => {

         console.log('Product updated successfully!');

         this.router.navigateByUrl('product/index');

    })

  }

  

}