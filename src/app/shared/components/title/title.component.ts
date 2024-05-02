import { Component } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  header: string = 'Bakal-AREA.net';
  heading: string;
  sharedService: SharedVariable;

  constructor(sharedService:SharedVariable) {
    this.sharedService = sharedService;
    this.heading = this.sharedService.mainTitle;
  }
}

