import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m_ => m_.AuthModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m_ => m_.HomeModule)
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
  { path: 'table', loadChildren: () => import('./pages/home/pages/table/table.module').then(m => m.TableModule) },
  { path: 'contact-me', loadChildren: () => import('./pages/home/pages/contact-me/contact-me.module').then(m => m.ContactMeModule) },
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
