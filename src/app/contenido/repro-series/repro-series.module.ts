import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { ReproSeriesComponent } from './repro-series.component';
import { VgBufferingModule } from 'videogular2/buffering';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgForm } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        VgCoreModule,
        VgControlsModule,
        VgBufferingModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [ ReproSeriesComponent ]
})
export class ReproSeriesModule {
}
