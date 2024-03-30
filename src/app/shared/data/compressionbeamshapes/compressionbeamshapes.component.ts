import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../../../pages/calculators/slenderness/compression.component';

interface beamShape {
  AISC_Manual_Label: string;
  Type: string;
  EDI_Std_Nomenclature: string;
  T_F: string;
  W: number;
  A: number;
  d: number;
  ddet: string;
  HT: string;
  h: string;
  OD: string;
  bf: number;
  bfdet: string;
  B: string;
  b: string;
  ID: string;
  tw: number;
  twdet: string;
  'twdet/2': string;
  tf: number;
  tfdet: string;
  t: string;
  tnom: string;
  tdes: string;
  kdes: number;
  kdet: string;
  k1: string;
  x: string;
  y: string;
  eo: string;
  xp: string;
  yp: string;
  'bf/2tf':number;
  'b/t': string;
  'b/tdes': string;
  'h/tw': number;
  'h/tdes': string;
  'D/t': string;
  Ix: number;
  Zx: number;
  Sx: number;
  rx: number;
  Iy: number;
  Zy: number;
  Sy: number;
  ry: number;
  Iz: number;
  rz: number;
  Sz: number;
  J: number;
  Cw: number;
  C: string;
  Wno: number;
  Sw1: number;
  Sw2: string;
  Sw3: string;
  Qf: number;
  Qw: number;
  ro: string;
  H: string;
  'tan(a)': string;
  Iw: string;
  zA: string;
  zB: string;
  zC: string;
  wA: string;
  wB: string;
  wC: string;
  SwA: string;
  SwB: string;
  SwC: string;
  SzA: string;
  SzB: string;
  SzC: string;
  rts: number;
  ho: number;
  PA: number;
  PA2: string;
  PB: number;
  PC: number;
  PD: number;
  T: number;
  WGi: string;
  WGo: string;
}

@Component({
  selector: 'app-compressionbeamshapes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compressionbeamshapes.component.html',
  styleUrl: './compressionbeamshapes.component.scss'
})
export class CompressionbeamshapesComponent implements OnInit {
  constructor(private http: HttpClient, private sharedService: SharedVariable) { }

  selectedA: number | null = null;
  selectedRx: number | null = null;
  selectedType: string = '';
  selectedManualLabel: string = '';

  get areaGross() {
    // Access areaGross from the shared service
    return this.sharedService.Ag;
  }




  allBeamShapes: beamShape[] = [];
  filteredBeamShapes: beamShape[] = [];
  searchText: string = '';
  

  /*onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filterBeamShapes();
  }*/
  
    

    filterBeamShapes() {
      if (this.searchText.trim() !== '') {
        this.filteredBeamShapes = this.allBeamShapes.filter(beamShape =>
          beamShape.AISC_Manual_Label.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        this.filteredBeamShapes = this.allBeamShapes;
      }
    };    

    loadBeamShapes() {
      this.http.get<beamShape[]>('assets/db/AISC15-imperial.json').subscribe(data => {
        this.allBeamShapes = data;
        this.filteredBeamShapes = data;
        console.log("Loadbeamshapes is working");
      });
    }
    
    calcCompact(): void {
      // ITO YUN NAGNONOTIFY SA UPDATE. naol
      console.log("calcCompact is executed");
    }
    
    onBeamShapeSelected(event: Event): void {
      console.log("onBeamShapeSelected is working");
    
      const target = event.target as HTMLSelectElement;
      const selectedManualLabel = target.value;

      //Get Label//
      if (selectedManualLabel) {
        const selectedBeamShape = this.filteredBeamShapes.find(
          beamShape => beamShape.AISC_Manual_Label === selectedManualLabel);
          this.calcCompact(); //Para mag update
        
        if (selectedBeamShape) {
          // Assuming may function to handle the selected value
          this.handleSelectedBeamShape(selectedBeamShape);
          
          
                  // Get Ag
                  this.sharedService.Ag.setValue(selectedBeamShape.A);
                  console.log("Area Gross (Ag) is:", selectedBeamShape.A);

                  // Get bf2tf
                  this.sharedService.bf2tf.setValue(selectedBeamShape['bf/2tf']);
                  console.log("Lamba Flange (bf2tf) is:", selectedBeamShape['bf/2tf']);

                  // Get htw
                  this.sharedService.htw.setValue(selectedBeamShape['h/tw']);
                  console.log("Lamba Web (htw) is:", selectedBeamShape['h/tw']);
                  
        }
      }
    }
    
    handleSelectedBeamShape(beamShape: beamShape): void {
      // Perform actions based on the selected beam shape
      console.log("Selected beam shape is:", beamShape.AISC_Manual_Label);
      // You can call other functions, update component properties, etc.
    }
    
    
    


    

    ngOnInit(): void {
      this.loadBeamShapes();
      this.filterBeamShapes();
    }
      
  }

  
