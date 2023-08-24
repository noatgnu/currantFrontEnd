import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { DifferentialAnalysisComponent } from './differential-analysis/differential-analysis.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {FileSaverDirective} from "ngx-filesaver";
import {MatSnackBar} from "@angular/material/snack-bar";
import { TaskLogComponent } from './task-log/task-log.component';
import { DifferentialAnalysisQfeaturesComponent } from './differential-analysis-qfeatures/differential-analysis-qfeatures.component';
import {MatMenuModule} from "@angular/material/menu";
import { SettingsComponent } from './settings/settings.component';
import {NgOptimizedImage} from "@angular/common";
import { ImputationQfeaturesComponent } from './imputation-qfeatures/imputation-qfeatures.component';
import { NormalizationQfeaturesComponent } from './normalization-qfeatures/normalization-qfeatures.component';
import {PlotlyModule} from "angular-plotly.js";
import * as PlotlyJS from 'plotly.js-dist-min';
import { SampleAndConditionAssignmentComponent } from './sample-and-condition-assignment/sample-and-condition-assignment.component';
import { FileInputComponent } from './file-input/file-input.component';
import { CorrelationMatrixRComponent } from './correlation-matrix-r/correlation-matrix-r.component';

PlotlyModule.plotlyjs = PlotlyJS

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DifferentialAnalysisComponent,
    TaskLogComponent,
    DifferentialAnalysisQfeaturesComponent,
    SettingsComponent,
    ImputationQfeaturesComponent,
    NormalizationQfeaturesComponent,
    SampleAndConditionAssignmentComponent,
    FileInputComponent,
    CorrelationMatrixRComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        HttpClientModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        MatGridListModule,
        FileSaverDirective,
        MatMenuModule,
        NgOptimizedImage,
        PlotlyModule
    ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
