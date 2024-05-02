import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaxMomentsService } from './maxmoments.service';

@Component({
  selector: 'app-maxmoments',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './maxmoments.component.html',
  styleUrl: './maxmoments.component.scss'
})
export class MaxmomentsComponent {
  constructor(public MaxMomentsService: MaxMomentsService) {}
}
