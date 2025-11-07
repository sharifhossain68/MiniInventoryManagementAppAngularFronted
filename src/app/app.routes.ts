// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';

  

import { IndexComponent } from './product/index/index.component';

import { ViewComponent } from './product/view/view.component';

import { CreateComponent } from './product/create/create.component';

import { EditComponent } from './product/edit/edit.component';
import { OrderViewComponent } from './order/view/view.component';
import { OrderCreateComponent } from './order/create/create.component';
  

export const routes: Routes = [

      { path: '*', redirectTo: 'product/index', pathMatch: 'full'},
      
      { path: 'product', redirectTo: 'product/index', pathMatch: 'full'},

      { path: 'product/index', component: IndexComponent },

      { path: 'product/:productId/view', component: ViewComponent },

      { path: 'product/create', component: CreateComponent },

      { path: 'product/:productId/edit', component: EditComponent } ,
      { path: 'order/create', component: OrderCreateComponent },
      { path: 'order/:productId/view', component: OrderViewComponent },

  ];