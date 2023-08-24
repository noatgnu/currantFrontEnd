import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DifferentialAnalysisComponent} from "./differential-analysis/differential-analysis.component";
import {
  DifferentialAnalysisQfeaturesComponent
} from "./differential-analysis-qfeatures/differential-analysis-qfeatures.component";
import {ImputationQfeaturesComponent} from "./imputation-qfeatures/imputation-qfeatures.component";
import {NormalizationQfeaturesComponent} from "./normalization-qfeatures/normalization-qfeatures.component";
import {CorrelationMatrixRComponent} from "./correlation-matrix-r/correlation-matrix-r.component";

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: "home/:settings", component: HomeComponent
      }
    ],

  },
  {path: "differential-analysis-alpha", component: DifferentialAnalysisComponent},
  {path: "differential-analysis-qfeatures", component: DifferentialAnalysisQfeaturesComponent},
  {path: "imputation-qfeatures", component: ImputationQfeaturesComponent},
  {path: "normalization-qfeatures", component: NormalizationQfeaturesComponent},
  {path: "correlation-matrix-r", component: CorrelationMatrixRComponent},
  {path: ':settings', component: HomeComponent},
  {path: "**", redirectTo:"home"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
