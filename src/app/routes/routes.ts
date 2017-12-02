import { Routes } from "@angular/router";
import { ContenidoComunComponent } from "../contenido/contenido-comun/contenido-comun.component";
import { ContenidoVivoComponent } from "../contenido/contenido-vivo/contenido-vivo.component";
import { ReproSeriesComponent } from "../contenido/repro-series/repro-series.component";

export const ROUTES: Routes = [
    { path: 'reproComun', component: ContenidoComunComponent },
    { path: 'reproVivo', component: ContenidoVivoComponent },
    { path: 'reproSeries/:idindex', component: ReproSeriesComponent }
];
