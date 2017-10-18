import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContentService } from './services/content.service';
import { HttpModule } from '@angular/http';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import {LoginGuard} from './login.guard';
import {NoLoginGuard} from './no-login.guard';

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
import { FormsModule } from '@angular/forms';
import { AltaempresaComponent } from './admin/altaempresa/altaempresa.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AltaadminComponent } from './admin/altaadmin/altaadmin.component';
import { NavarUserComponent } from './navar-user/navar-user.component';
import { NavarSuperAdminComponent } from './navar-super-admin/navar-super-admin.component';
import { NavarAdminComponent } from './navar-admin/navar-admin.component';
import { AltaCategoriaComponent } from './admin/alta-categoria/alta-categoria.component';
import { AltaActorComponent } from './admin/alta-actor/alta-actor.component';
import { AltaDirectorComponent } from './admin/alta-director/alta-director.component';
import { FooterComponent } from './footer/footer.component';
//import { EmpresaComponent } from './Empresa/Empresa.component';
//import { AdminEmpresaComponent } from './admin-empresa/admin-empresa.component';


const  appRoutes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'contenido',component:ContenidoComponent, canActivate: [LoginGuard]},
  {path:'registrar',component:RegistrarComponent},
  {path:'login',component:LoginComponent},
  {path:'perfil',component:PerfilComponent,canActivate: [LoginGuard]},
  {path:'altaempresa',component:AltaempresaComponent,canActivate: [LoginGuard]},
  {path:'admin',component:AdminComponent,canActivate: [LoginGuard]},
  {path:'altacategoria',component:AltaCategoriaComponent,canActivate: [LoginGuard]},
  {path:'altadirector',component:AltaDirectorComponent,canActivate: [LoginGuard]},
  {path:'altaactor',component:AltaActorComponent,canActivate: [LoginGuard]},
  {path:'altaadmin',component:AltaadminComponent,canActivate: [LoginGuard]},
  //{path:'admin-empresa',component:AdminEmpresaComponent,canActivate: [LoginGuard]},

  {path:'altaadmin',component:AltaadminComponent,canActivate: [LoginGuard]},
  {path:'altaempresa',component:AltaempresaComponent,canActivate: [LoginGuard]},
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
    AdminComponent,
   // EmpresaComponent,
    AltaempresaComponent,
    RegistrarComponent,
    AltaadminComponent,
    NavarUserComponent,
    NavarSuperAdminComponent,
    NavarAdminComponent,
    AltaCategoriaComponent,
    AltaActorComponent,
    AltaDirectorComponent,
    FooterComponent
    //AdminEmpresaComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [ContentService,LoginGuard,NoLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
