import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContentService } from './services/content.service';
import { SuscripcionService } from './services/suscripcion.service';
import { HttpModule } from '@angular/http';

import { SocialLoginModule } from "angular4-social-login";
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import {LoginGuard} from './login.guard';
import {NoLoginGuard} from './no-login.guard';

import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';
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
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ViewcontentliveComponent } from './viewcontentlive/viewcontentlive.component';
import { AdminTenantComponent } from './admin-tenant/admin-tenant.component';
import { AltaContentComponent } from './admin-tenant/alta-content/alta-content.component';
import { ContenidoComunModule } from './contenido/contenido-comun/contenido-comun.module';
import { ContenidoVivoModule } from './contenido/contenido-vivo/contenido-vivo.module';
import { ROUTES } from './routes/routes';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { CeiboShare } from 'ng2-social-share';
import { ContentCatComponent } from './contenido/categorias/content.catComponent';
import { ContenidoCategoriaComponent } from './contenido/categorias/contenido-categoria.component';
import { AltaContentDestacadoComponent } from './admin-tenant/alta-content-destacado/alta-content-destacado.component';
import { AltaContentVivoComponent } from './admin-tenant/alta-content/alta-content-vivo.component';
import { PruebaComponent } from './prueba/prueba.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import { ContentListEventComponent } from './contenido/contenido-list-evento/content-list-evento.component';
import { ContentEventComponent } from './contenido/contenido-list-evento/content-evento.component';
import { PeliculasListComponent } from './contenido/peliculas/peliculas-list.component';
import { SeriesComponentUnidad } from './contenido/series/series.component';
import { SeriesListComponent } from './contenido/series/series-list.component';
import { CategoriasComponent } from './contenido/categorias.component';
import { SeriesComponent } from './contenido/series.component';
import { PeliculasComponent } from './contenido/peliculas.component';

//import { AltaEpisodioComponent } from './admin-tenant/alta-content/alta-episodios.component';
import { ShareComponent } from './share/share.component';
import { AltaEpisodioComponent } from './admin-tenant/alta-content/alta-episodios.component';
import { PeliculasComponentUnidad } from './contenido/peliculas/peliculas.component';
//import { PeliculasListComponent } from './contenido/peliculas/peliculas-list.component';
//import { SeriesComponentUnidad } from './contenido/series/series.component';
//import { SeriesListComponent } from './contenido/series/series-list.component';
//import { CategoriasComponent } from './contenido/categorias.component';
//import { SeriesComponent } from './contenido/series.component';
//import { PeliculasComponent } from './contenido/peliculas.component';
import { SuscribirComponent } from './suscripcion/suscribir.component';
import { SucceessComponent } from './succeess/succeess.component';
import { CancelComponent } from './cancel/cancel.component';
import { ContenidoVivoComponent } from './contenido/contenido-vivo.component';
import { BloqueoUsuarioComponent } from './admin/bloqueo-usuario/bloqueo-usuario.component';
import { BloqueoContenidoComponent } from './admin/bloqueo-contenido/bloqueo-contenido.component';


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
  {path:'viewcontentlive',component:ViewcontentliveComponent,canActivate: [LoginGuard]},
  {path:'admintenant',component:AdminTenantComponent,canActivate: [LoginGuard]},
  {path:'altacontenidoomdb',component:AltaContentComponent,canActivate: [LoginGuard]},
  {path:'altaadmin',component:AltaadminComponent,canActivate: [LoginGuard]},
  {path:'altaempresa',component:AltaempresaComponent,canActivate: [LoginGuard]},
  {path:'categoria/:Id', component:ContenidoCategoriaComponent, canActivate: [LoginGuard]},
  {path:'altacontenidodestacado', component:AltaContentDestacadoComponent, canActivate: [LoginGuard]},
  {path:'altaevento',component:AltaContentVivoComponent,canActivate: [LoginGuard]},
  {path:'contenidodetalle/:Id', component:ContentDetailComponent, canActivate: [LoginGuard]},
  //{path:'eventos', component:ContenidoVivoComponent, canActivate: [LoginGuard]},
  //{path:'eventos', component:ContentListEventComponent, canActivate: [LoginGuard]},
  {path:'share', component:ShareComponent, canActivate: [LoginGuard]},
  //{path:'altaepisodio',component:AltaEpisodioComponent,canActivate: [LoginGuard]},
  {path:'peliculas', component:PeliculasComponent, canActivate: [LoginGuard]},
  {path:'series', component:SeriesComponent, canActivate: [LoginGuard]},
  {path:'altaepisodio',component:AltaEpisodioComponent,canActivate: [LoginGuard]},
  //{path:'share', component:ShareComponent, canActivate: [LoginGuard]},
  {path:'suscribir', component:SuscribirComponent, canActivate: [LoginGuard]},
  {path:'suscribir/:id', component: SuscribirComponent, canActivate: [LoginGuard]},
  {path:'success', component:SucceessComponent, canActivate: [LoginGuard]},
  {path:'cancel', component:CancelComponent, canActivate: [LoginGuard]},
  {path:'bloqueo-contenido', component:BloqueoContenidoComponent, canActivate:[LoginGuard]},
  {path:'bloqueo-usuario', component:BloqueoUsuarioComponent, canActivate:[LoginGuard]},
];



const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("723433196483-67ug7hrca2643ure46up5n7r1t75oe6a.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContenidoComponent,
    ContenidoListComponent,
    ContentComponent,
    ContentDetailComponent,
    ContentListEventComponent,
    ContentEventComponent,
    PerfilComponent,
    LoginComponent,
    AdminComponent,
    AltaempresaComponent,
    RegistrarComponent,
    AltaadminComponent,
    NavarUserComponent,
    NavarSuperAdminComponent,
    NavarAdminComponent,
    AltaCategoriaComponent,
    AltaActorComponent,
    AltaDirectorComponent,
    FooterComponent,
    ViewcontentliveComponent,
    AdminTenantComponent,
    AltaContentComponent,
    CeiboShare,
    ContentCatComponent,
    ContenidoCategoriaComponent,
    AltaContentDestacadoComponent,
    AltaContentVivoComponent,
    ShareComponent,
    PeliculasListComponent,
    PeliculasComponent,
    PeliculasComponentUnidad,
    SeriesListComponent,
    SeriesComponentUnidad,
    SeriesComponent,
    AltaEpisodioComponent,
    ShareComponent,
    AltaEpisodioComponent,
    SuscribirComponent,
    SucceessComponent,
    CancelComponent,
    ContenidoVivoComponent,
    BloqueoUsuarioComponent,
    BloqueoContenidoComponent

  ],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true }),
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot(),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    SocialLoginModule,
    HttpClientModule,
    SwiperModule.forRoot(SWIPER_CONFIG),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ContenidoComunModule,
    ContenidoVivoModule,
    SimpleNotificationsModule
    
  ],
  providers: [ContentService,LoginGuard,NoLoginGuard, SuscripcionService, [
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      }
    ],
    AngularFireModule,
    AngularFireDatabaseModule,
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
