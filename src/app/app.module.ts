import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContentService } from './services/content.service';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { ContenidoListComponent } from './contenido/contenido-list/contenido-list.component';
import { ContentComponent } from './contenido/contenido-list/content.component';
import { ContentDetailComponent } from './contenido/content-detail/content-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {FormsModule} from '@angular/forms';


const  appRoutes: Routes = [
  {path:'',redirectTo:'/contenido',pathMatch:'full'},
  {path:'contenido',component:ContenidoComponent},
  {path:'login',component:LoginComponent},
  {path:'perfil',component:PerfilComponent},
  {path:'admin',component:AdminComponent}
];


const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContenidoComponent,
    ContenidoListComponent,
    ContentComponent,
    ContentDetailComponent,
    PerfilComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
