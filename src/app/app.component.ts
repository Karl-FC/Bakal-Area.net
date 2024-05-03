import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LeftsideComponent } from './shared/components/leftside/leftside.component';
import { CompAnalysisComponent } from './pages/COMPRESSION/comp-analysis/comp-analysis.component';
import { TitleComponent } from './shared/components/title/title.component';
import { SharedVariable } from './shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule,
    NavbarComponent, LeftsideComponent, CompAnalysisComponent, TitleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'bakal-area';
  header: string = 'Bakal-AREA.net';

  constructor(public sharedSettings: SharedVariable) {}

}
