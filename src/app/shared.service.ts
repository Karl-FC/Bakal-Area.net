import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnalysisTableRow } from './pages/calculators/elements/elements-table-row.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariable {
  chosenBeamShape: BehaviorSubject<beamShape | null> = 
  new BehaviorSubject<beamShape | null>(null);
  KFactor = new BehaviorSubject<number>(1);

    Ag: FormControl = new FormControl(null);
    bf2tf: FormControl = new FormControl(null);
    htw: FormControl = new FormControl(null);
    
    rx: FormControl = new FormControl(null);
    ry: FormControl = new FormControl(null);

    E: number = 0; 
    Fy: number = 0; 

    F_Lamda: number = 0; 
    W_Lamda: number = 0; 

    flangeStatus: string = 'Flange Status';
    WebStatus: string = 'Web Status';


    


    
 
    constructor() { }
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

