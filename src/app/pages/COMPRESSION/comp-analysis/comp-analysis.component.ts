import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CompressionComponent } from '../../calculators/slenderness/compression.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { ElementsComponent } from '../../calculators/elements/elements.component';
import { ElasticBucklingComponent } from '../../calculators/elastic-buckling/elastic-buckling.component';
import { LeftsideComponent } from '../../../shared/components/leftside/leftside.component';
import { SharedVariable } from '../../../shared.service';

@Component({
  selector: 'app-comp-analysis',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, 
    NavbarComponent, LeftsideComponent,
    CompressionComponent, 
    CompressionbeamshapesComponent, 
    ElementsComponent, 
    ElasticBucklingComponent
  ],
  templateUrl: './comp-analysis.component.html',
  styleUrl: './comp-analysis.component.scss'
})
export class CompAnalysisComponent implements OnInit {  


  constructor(private sharedService: SharedVariable) {
  }

  ngOnInit() {
    this.sharedService.mainTitle = 'Analysis Calculator for Axial Compression';
    this.sharedService.subTitle = 'Slenderness Check';
    this.sharedService.instructions = `Instructions: Input all the required variables in order and then click "Determine Slenderness" to see if the chosen Wsection is compact, non-compact or slender.`;
    this.sharedService.extrainstructions = `Afterwhich use the Table of Elements to assign elements and their properties, then click "Calculate.`
  }
}
