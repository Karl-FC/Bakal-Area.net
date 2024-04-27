import { Component } from '@angular/core';
import { FlexresultsService } from './flexresults.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flexresults',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flexresults.component.html',
  styleUrl: './flexresults.component.scss'
})
export class FlexresultsComponent {
  constructor(public FlexresultsService: FlexresultsService) {}

}
