import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiModule } from './services/api/api.module';
import { PostService } from './services/post.service';
import { InterceptorService } from './interceptor.service';
import { StoreModule } from '@ngrx/store';
import { appReducer, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      name: 'Portfolio'
    }),
  ],
  providers: [PostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
