import { Injectable } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { AnalysisTableRow } from './pages/calculators/elements/elements-table-row.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariable {
  mainTitle: string = 'Bakal-AREA.net';
  subTitle: string = 'Loading...';
  instructions  : string = 'Instructions: Input all the required variables in order and press "Calculate"';
  chosenBeamShape: BehaviorSubject<beamShape | null> = 
  new BehaviorSubject<beamShape | null>(null);
  chosenBeamShapeLabel = new BehaviorSubject<string>('');

  //ESSENTIALS
    E = new BehaviorSubject<number>(0);
    Fy = new BehaviorSubject<number>(0); 

    Fyield: FormControl = new FormControl(null); //If it works, dont touch it lol
    Ag: FormControl = new FormControl(null);
    Load: FormControl = new FormControl(null);
    d: FormControl = new FormControl(null); //depth

  //TENSION
    Fu: FormControl = new FormControl(null);
    t: FormControl = new FormControl(null);
    b: FormControl = new FormControl(null);
    SteelShapeSelect: number = 0; 
    isStaggered: boolean = false;
    boltDiameter: FormControl = new FormControl(null);
    boltAmount: FormControl = new FormControl(null);
    bolts: FormControl = new FormControl(null);
    shearLagFactor: number = 1; 
    totalSgt: number = 0; 


  //KLR TABLE
    KFactor = new BehaviorSubject<number>(1);
    maxKLr = new BehaviorSubject<number>(0);
    maxKL = new BehaviorSubject<number>(0);

    rx: FormControl = new FormControl(null);
    ry: FormControl = new FormControl(null);
    

  //SLENDERNESS CHECK
    bf2tf: FormControl = new FormControl(null);
    htw: FormControl = new FormControl(null);


    F_LamdaP: number = 0; 
    F_LamdaR: number = 0; 
    
    flangeStatus: string = 'Flange Status';
    WebStatus: string = 'Web Status';



    
  //FINDING CENTROID
    
    bf: FormControl = new FormControl(null); //base ng flange
    tw: FormControl = new FormControl(null); //thickness ng web
    tf: FormControl = new FormControl(null); //thickness ng flange
    Sx: FormControl = new FormControl(null);

        //Pag di symmetrical
        isSymmetry: boolean = true;
        bf2: FormControl = new FormControl(null); //base ng flange
        tf2: FormControl = new FormControl(null); //thickness ng flange
        bf2tf2: FormControl = new FormControl(null); //Lambda flange ng pangalawang flange



 
    constructor() { }

    noReloadPls(event: Event) {
      event.preventDefault();
    }

  }




export interface beamShape {
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

