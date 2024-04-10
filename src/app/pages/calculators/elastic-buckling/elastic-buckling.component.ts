import { AfterViewChecked, Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { ElementsComponent } from '../elements/elements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ElasticBucklingService } from './elastic-buckling.service';

declare var MathJax: any;

@Component({
  selector: 'app-elastic-buckling',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './elastic-buckling.component.html',
  styleUrl: './elastic-buckling.component.scss'
})
export class ElasticBucklingComponent implements AfterViewChecked {
  @ViewChild('mathContent') mathContent!: ElementRef;

  constructor(private renderer: Renderer2, 
    private el: ElementRef, 
    public sharedService: SharedVariable,
    public elasticBucklingService: ElasticBucklingService) { }

    ngAfterViewChecked() {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.mathContent.nativeElement]);
  }
}
