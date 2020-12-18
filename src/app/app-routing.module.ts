import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth-routing.module').then(m_ => m_.AuthRoutingModule)
      },
      {
        path: "static",
        loadChildren: () => import('./pages/static/static.module').then((m_) => m_.StaticModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/static/error'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
