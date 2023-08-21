import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DifferentialAnalysisComponent} from "./differential-analysis/differential-analysis.component";

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
  {path: "differential-analysis-qfeatures", component: DifferentialAnalysisComponent},
  {path: ':settings', component: HomeComponent},
  {path: "**", redirectTo:"home"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
