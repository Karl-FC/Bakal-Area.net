import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedVariable } from '../../../shared.service';

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
  constructor(private http: HttpClient, sharedService: SharedVariable) { }

  selectedA: number | null = null;
  selectedRx: number | null = null;
  selectedType: string = '';
  selectedLabel: string = '';





  allBeamShapes: beamShape[] = [];
  filteredBeamShapes: beamShape[] = [];
  searchText: string = '';
  

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filterBeamShapes();
  }
  
    

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
      });
    }
    

    
    onBeamShapeSelected(AreaGrossString: string): void {
      // Convert the selected "A" value to a number
      this.selectedA = parseFloat(AreaGrossString);
    
      // Find the selected beam shape object based on the selected "A" value
      const selectedBeamShape = this.filteredBeamShapes.find(beamShape => beamShape.A === this.selectedA);
    
      // If a beam shape is found, extract and assign its properties to separate variables
      if (selectedBeamShape) {
        this.selectedRx = selectedBeamShape.rx;
        this.selectedType = selectedBeamShape.Type;
        this.selectedLabel = selectedBeamShape.AISC_Manual_Label;
      } else {
        // If no beam shape is found, reset the variables
        this.selectedRx = null;
        this.selectedType = '';
        this.selectedLabel = '';
      }
    
      // Do something with the extracted properties, such as passing them to another component
      // You can emit an event or directly assign them to properties in the other component
    }
    


    

    ngOnInit(): void {
      this.loadBeamShapes();
      this.filterBeamShapes();
    }
      
  }

  
