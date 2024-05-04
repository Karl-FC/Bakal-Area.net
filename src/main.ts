import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { CompAnalysisComponent } from './app/pages/COMPRESSION/comp-analysis/comp-analysis.component';
import { CompDesignComponent } from './app/pages/COMPRESSION/comp-design/comp-design.component';
import { TenAnalysisComponent } from './app/pages/TENSION/ten-analysis/ten-analysis.component';
import { TenDesignComponent } from './app/pages/TENSION/ten-design/ten-design.component';
import { ShearDesignComponent } from './app/pages/SHEAR/shear-design/shear-design.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
      provideRouter(
        [
          /*{path: 'Home', component: CompAnalysisComponent},*/
          {path: 'home', redirectTo: 'Home', pathMatch: 'full'},
          {path: 'Tension', redirectTo: 'Tension/Analysis', pathMatch: 'full'},
          {path: 'Compression', redirectTo: 'Compression/Analysis', pathMatch: 'full'},
          {path: 'Shear', redirectTo: 'Shear/Analysis', pathMatch: 'full'},

          {path: '', redirectTo: 'Home', pathMatch: 'full'},
           
            {path: 'Home', 
            loadComponent: () => import('./app/shared/components/homepage/homepage.component')
                .then(c => c.HomepageComponent)},

            {path: 'About', 
            loadComponent: () => import('./app/shared/data/about-us/about-us.component')
            .then(c => c.AboutUsComponent)},

          {path: 'Compression/Analysis', 
          loadComponent: () => import('./app/pages/COMPRESSION/comp-analysis/comp-analysis.component')
              .then(c => c.CompAnalysisComponent)},

          {path: 'Compression/Design', 
          loadComponent: () => import('./app/pages/COMPRESSION/comp-design/comp-design.component')
              .then(c => c.CompDesignComponent)},

          {path: 'Tension/Analysis', 
          loadComponent: () => import('./app/pages/TENSION/ten-analysis/ten-analysis.component')
              .then(c => c.TenAnalysisComponent)},

          {path: 'Tension/Design', 
          loadComponent: () => import('./app/pages/TENSION/ten-design/ten-design.component')
              .then(c => c.TenDesignComponent)},

          {path: 'Bending/Analysis', 
          loadComponent: () => import('./app/pages/BENDING/bend-analysis/bend-analysis.component')
              .then(c => c.BendAnalysisComponent)},

          {path: 'Bending/Design', 
          loadComponent: () => import('./app/pages/BENDING/bend-design/bend-design.component')
              .then(c => c.BendDesignComponent)},

        {path: 'Shear/Analysis', 
          loadComponent: () => import('./app/pages/SHEAR/shear-analysis/shear-analysis.component')
              .then(c => c.ShearAnalysisComponent)},
              
        {path: 'Shear/Design', 
          loadComponent: () => import('./app/pages/SHEAR/shear-design/shear-design.component')
              .then(c => c.ShearDesignComponent)},
        ]), provideAnimationsAsync()
        
    ]
})
.catch((err) => console.error(err));
