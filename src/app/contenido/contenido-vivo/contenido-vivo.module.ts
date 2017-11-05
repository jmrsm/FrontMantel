import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContenidoVivoComponent } from "./contenido-vivo.component";
import { FormsModule } from "@angular/forms";
import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";
import { SimpleTimer } from 'ng2-simple-timer';

@NgModule({
    providers: [SimpleTimer],
  imports: [
      CommonModule,
      FormsModule,
      VgCoreModule,
      VgControlsModule,
      VgOverlayPlayModule,
      VgBufferingModule
  ],
  declarations: [ ContenidoVivoComponent ]
})

export class ContenidoVivoModule {
}