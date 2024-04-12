import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CompressionComponent } from './pages/calculators/slenderness/compression.component';
import { CompressionbeamshapesComponent } from './shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElasticBucklingComponent } from './pages/calculators/elastic-buckling/elastic-buckling.component';
import { ElementsComponent } from './pages/calculators/elements/elements.component';

import { CompAnalysisComponent } from './pages/COMPRESSION/comp-analysis/comp-analysis.component';
import { CompDesignComponent } from './pages/COMPRESSION/comp-design/comp-design.component';
import { TenAnalysisComponent } from './pages/TENSION/ten-analysis/ten-analysis.component';
import { TenDesignComponent } from './pages/TENSION/ten-design/ten-design.component';
import { LeftsideComponent } from './shared/components/leftside/leftside.component';

const appRoutes: Routes = [
  {path: 'compression-analysis', component: CompAnalysisComponent},
  {path: 'tension-analysis', component: TenAnalysisComponent},
];

@NgModule({
  imports: [
    BrowserModule, FormsModule, CommonModule,
    RouterModule.forRoot(
        appRoutes, {enableTracing: true}  // debugging purposes daw
        )
  ],
  declarations: [
    AppComponent, 
    NavbarComponent, 
    LeftsideComponent,

    CompressionComponent, 
    ElasticBucklingComponent, 
    ElementsComponent, 

    CompAnalysisComponent, CompDesignComponent, TenAnalysisComponent, TenDesignComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}