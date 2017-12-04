import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContentService } from './services/content.service';
import { SuscripcionService } from './services/suscripcion.service';
import { ReportesService } from './services/reportes.service';
import { HttpModule } from '@angular/http';

//Graficos
import { ChartsModule } from 'ng2-charts';

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
import { ReproSeriesModule } from './contenido/repro-series/repro-series.module';
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

import { ShareComponent } from './share/share.component';
import { AltaEpisodioComponent } from './admin-tenant/alta-content/alta-episodios.component';
import { PeliculasComponentUnidad } from './contenido/peliculas/peliculas.component';
import { SuscribirComponent } from './suscripcion/suscribir.component';
import { SucceessComponent } from './succeess/succeess.component';
import { CancelComponent } from './cancel/cancel.component';
import { ContenidoVivoComponent } from './contenido/contenido-vivo.component';
import { BloqueoUsuarioComponent } from './admin/bloqueo-usuario/bloqueo-usuario.component';
import { BloqueoContenidoComponent } from './admin/bloqueo-contenido/bloqueo-contenido.component';
import { ContentDetailSerieComponent } from './contenido/content-detail-series/content-detail-serie.component';

import { ReportesAdminComponent } from './reportes/reportes-admin/reportes-admin.component';
import { HorasVistasxanioComponent} from './reportes/reportes-admin/horas-vistasxanio/horas-vistasxanio.component';
import { HorasVistasxdiaComponent} from './reportes/reportes-admin/horas-vistasxdia/horas-vistasxdia.component';
import { HorasVistasxmesComponent} from './reportes/reportes-admin/horas-vistasxmes/horas-vistasxmes.component';
import { HorasVistasxsemanaComponent} from './reportes/reportes-admin/horas-vistasxsemana/horas-vistasxsemana.component';
import { ReportesSuperadminComponent } from './reportes/reportes-superadmin/reportes-superadmin.component';
import { HorasVitasxdiaComponent } from './reportes/reportes-superadmin/horas-vitasxdia/horas-vitasxdia.component';
import { HorasVitasxsemanaComponent } from './reportes/reportes-superadmin/horas-vitasxsemana/horas-vitasxsemana.component';
import { HorasVitasxmesComponent } from './reportes/reportes-superadmin/horas-vitasxmes/horas-vitasxmes.component';
import { HorasVitasxanioComponent } from './reportes/reportes-superadmin/horas-vitasxanio/horas-vitasxanio.component';
import { ReportesUsuariosComponent } from './reportes/reportes-usuarios/reportes-usuarios.component';
import { UsuariosTotalesComponent } from './reportes/reportes-superadmin/usuarios-totales/usuarios-totales.component';
import { UsuariosHabilitComponent } from './reportes/reportes-superadmin/usuarios-habilit/usuarios-habilit.component';
import { HorasVisualizadasComponent } from './reportes/reportes-superadmin/horas-visualizadas/horas-visualizadas.component';
import { ProvCantidadComponent } from './reportes/reportes-superadmin/prov-cantidad/prov-cantidad.component';
import { ProvCanthorasComponent } from './reportes/reportes-superadmin/prov-canthoras/prov-canthoras.component';
import { HorasTotalesComponent } from './reportes/reportes-usuarios/horas-totales/horas-totales.component';
import { HorasCategoriasComponent } from './reportes/reportes-usuarios/horas-categorias/horas-categorias.component';
import { ContenidoFavnvistoComponent } from './reportes/reportes-usuarios/contenido-favnvisto/contenido-favnvisto.component';
import { ContenidoMpnvistoComponent } from './reportes/reportes-usuarios/contenido-mpnvisto/contenido-mpnvisto.component';


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
  {path:'share', component:ShareComponent, canActivate: [LoginGuard]},
  {path:'peliculas', component:PeliculasComponent, canActivate: [LoginGuard]},
  {path:'series', component:SeriesComponent, canActivate: [LoginGuard]},
  {path:'altaepisodio',component:AltaEpisodioComponent,canActivate: [LoginGuard]},
  {path:'suscribir', component:SuscribirComponent, canActivate: [LoginGuard]},
  {path:'suscribir/:id', component: SuscribirComponent, canActivate: [LoginGuard]},
  {path:'success', component:SucceessComponent, canActivate: [LoginGuard]},
  {path:'cancel', component:CancelComponent, canActivate: [LoginGuard]},
  {path:'bloqueo-contenido', component:BloqueoContenidoComponent, canActivate:[LoginGuard]},
  {path:'bloqueo-usuario', component:BloqueoUsuarioComponent, canActivate:[LoginGuard]},
  {path:'eventos', component:ContenidoVivoComponent, canActivate: [LoginGuard]},
  {path:'contenidodetalleserie/:Id', component:ContentDetailSerieComponent, canActivate: [LoginGuard]},
  {path:'reportesadmin',component:ReportesAdminComponent/*,canActivate: [LoginGuard]*/},
  {path:'rahorastotvis',component:HorasVisualizadasComponent/*,canActivate: [LoginGuard]*/},
  {path:'racantvis',component:ProvCantidadComponent/*,canActivate: [LoginGuard]*/},
  {path:'rahorasxdia',component:HorasVistasxdiaComponent/*,canActivate: [LoginGuard]*/},
  {path:'rahorasxsemana',component:HorasVistasxsemanaComponent/*,canActivate: [LoginGuard]*/},
  {path:'rahorasxmes',component:HorasVistasxmesComponent/*,canActivate: [LoginGuard]*/},
  {path:'rahorasxanio',component:HorasVistasxanioComponent/*,canActivate: [LoginGuard]*/},
  {path:'reportessuperadmin',component:ReportesSuperadminComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsausutotales',component:UsuariosTotalesComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsausuhabilit',component:UsuariosHabilitComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsahorastotvis',component:HorasVisualizadasComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsaprovcant',component:ProvCantidadComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsaprovcanthoras',component:ProvCanthorasComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsahorasxdia',component:HorasVitasxdiaComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsahorasxsemana',component:HorasVitasxsemanaComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsahorasxmes',component:HorasVitasxmesComponent/*,canActivate: [LoginGuard]*/},
  {path:'rsahorasxanio',component:HorasVitasxanioComponent/*,canActivate: [LoginGuard]*/},
  {path:'reportesusuarios',component:ReportesUsuariosComponent/*,canActivate: [LoginGuard]*/},
  {path:'ruhorastot',component:ReportesUsuariosComponent/*,canActivate: [LoginGuard]*/},
  {path:'ruhorascat',component:HorasCategoriasComponent/*,canActivate: [LoginGuard]*/},
  {path:'rucontfavnvisto',component:ReportesUsuariosComponent/*,canActivate: [LoginGuard]*/},
  {path:'rucontmpnvisto',component:ReportesUsuariosComponent/*,canActivate: [LoginGuard]*/},
  
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
    BloqueoContenidoComponent,
    ContentDetailSerieComponent,
    ReportesAdminComponent,
    HorasVistasxsemanaComponent,
    HorasVistasxmesComponent,
    HorasVistasxdiaComponent,
    HorasVistasxanioComponent,
    ReportesSuperadminComponent,
    HorasVitasxdiaComponent,
    HorasVitasxsemanaComponent,
    HorasVitasxmesComponent,
    HorasVitasxanioComponent,
    ReportesUsuariosComponent,
    UsuariosTotalesComponent,
    UsuariosHabilitComponent,
    HorasVisualizadasComponent,
    ProvCantidadComponent,
    ProvCanthorasComponent,
    HorasTotalesComponent,
    HorasCategoriasComponent,
    ContenidoFavnvistoComponent,
    ContenidoMpnvistoComponent

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
    ReproSeriesModule,
    SimpleNotificationsModule,
    ChartsModule
    
  ],
  providers: [ReportesService, ContentService,LoginGuard,NoLoginGuard, SuscripcionService, [
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