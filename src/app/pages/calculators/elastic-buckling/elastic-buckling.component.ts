import { Component, Renderer2, ElementRef } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { ElementsComponent } from '../elements/elements.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-elastic-buckling',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './elastic-buckling.component.html',
  styleUrl: './elastic-buckling.component.scss'
})
export class ElasticBucklingComponent {
  constructor(private renderer: Renderer2, private el: ElementRef, public sharedService: SharedVariable) { }


  
}
