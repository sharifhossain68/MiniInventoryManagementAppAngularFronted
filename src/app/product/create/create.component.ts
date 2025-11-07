import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';

import { Router } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

  

@Component({

  selector: 'app-create',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './create.component.html',

  styleUrl: './create.component.css'

})

export class CreateComponent {

  form!: FormGroup;

  constructor(

    public productService:   ProductService,

    private router: Router

  ) { }


  ngOnInit(): void {

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

    this.productService.create(this.form.value).subscribe((res:any) => {

         console.log('Product created successfully!');

         this.router.navigateByUrl('product/index');

    })

  }

  

}