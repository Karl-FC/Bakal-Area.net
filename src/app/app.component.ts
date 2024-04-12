import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LeftsideComponent } from './shared/components/leftside/leftside.component';
import { CompAnalysisComponent } from './pages/COMPRESSION/comp-analysis/comp-analysis.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule,
    NavbarComponent, LeftsideComponent, CompAnalysisComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'bakal-area';
  

  constructor(private route: ActivatedRoute) { }

  header: string = 'Bakal-AREA.net';

  updateHeader() {
    const path = this.route.snapshot.url[0].path;
    switch (path) {
      case 'Compression/Analysis':
        this.header = 'Steel Compression Analysis Calculator';
        break;
      case 'Compression/Design':
        this.header = 'Steel Compression Design Calculator';
        break;
      case 'Tension/Analysis':
        this.header = 'Steel Tension Analysis Calculator';
        break;
      case 'Tension/Design':
        this.header = 'Steel Tension Design Calculator';
        break;
      case 'Bending/Analysis':
        this.header = 'Steel Bending Analysis Calculator';
        break;
      case 'Bending/Design':
        this.header = 'Steel Bending Design Calculator';
        break;
      default:
        this.header = 'Bakal-AREA.net';
    }
  }
  
  

ngOnInit() {
  this.updateHeader();
}


}
