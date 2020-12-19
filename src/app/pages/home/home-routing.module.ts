import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'table',
    loadChildren: () => import('./pages/table/table.module').then(m_ => m_.TableModule)
  },
  {
    path: 'table/:start/:limit',
    loadChildren: () => import('./pages/table/table.module').then(m_ => m_.TableModule)
  },
  {
    path:'contact-me',
    loadChildren: () => import('./pages/contact-me/contact-me.module').then(m_ => m_.ContactMeModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'table'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
