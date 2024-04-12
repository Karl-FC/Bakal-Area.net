import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CompressionComponent } from './pages/calculators/slenderness/compression.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompressionbeamshapesComponent } from './shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElementsComponent } from './pages/calculators/elements/elements.component';
import { ElasticBucklingComponent } from './pages/calculators/elastic-buckling/elastic-buckling.component';
import { LeftsideComponent } from './shared/components/leftside/leftside.component';


@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'bakal-area';
}
