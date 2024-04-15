import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { ElementsComponent } from '../elements/elements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ElasticBucklingService } from './elastic-buckling.service';


@Component({
  selector: 'app-elastic-buckling',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './elastic-buckling.component.html',
  styleUrl: './elastic-buckling.component.scss'
})
export class ElasticBucklingComponent  {
  constructor(public elasticBucklingService: ElasticBucklingService) {}

}
