import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, max } from 'rxjs';
import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompDesignComponent } from '../../COMPRESSION/comp-design/comp-design.component';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { BehaviorSubject } from 'rxjs';
import { BeamshapesComponent } from '../../../shared/data/beamshapes/beamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { TenDesignService } from '../../TENSION/ten-design/ten-design.service';

export interface BeamShape {
  AISC_Manual_Label: string;
  Fy: number;
  A: number;
  rx: number;
  ry: number;
  rz: number;
  rmin: number;
  'bf/2tf': number; //Lambda Flange
  'h/tw': number;   //Lambda Web
  PuLoad: number; // 1.2DL + 1.6LL
  PnLRFD: number;
  PaLoad: number; // DL + LL
  PnASD: number; 
  Fcondition: string;
  Wcondition: string;
  LRFDstatus: string;
  ASDstatus: string;
  maxkLr: number;
  kLr_x: number;
  kLr_y: number;
  Fe: number;
  Fcr: number;
  Pcr: number;
  Lamda_Pf: number;
  Lamda_Rf: number;
  Lamda_Pw: number;
  Lamda_Rw: number;
  W: number;

  rDemand: number;

  Aholes: number;
  AgLRFD: number;

  AgASD: number;
  tf: number;
  tw: number;
  t: number;

  AgDemandASD: number;
  AgDemandLRFD: number;

  GovernASD: number;
  GovernLRFD: number;
}

@Injectable({
  providedIn: 'root'
})
export class TendesignTableService {
  public _beamShapes = new BehaviorSubject<BeamShape[]>([]);
  beamShapes$ = this._beamShapes.asObservable();
  beamFilter: BehaviorSubject<number> = new BehaviorSubject(16);
  DL: FormControl = new FormControl(null);
  LL: FormControl = new FormControl(null);
  maxkLr:number = 0;
  hPunch:number = 0;
  hDamage:number = 0;
  Tu:number = 0;
  Ta:number = 0;
  FactoredLoad:number = 0;
  
  LRFDYield:number = 0;
  AnLRFD:number = 0;
  ASDYield:number = 0;
  AnASD:number = 0;

  AeLRFD:number = 0;
  AeASD:number = 0;

  AgLRFD:number = 0;
  AgASD:number = 0;
  AgDemandLRFD:number = 0;
  AgDemandASD:number = 0;
  GovernLRFD:number = 0;
  GovernASD:number = 0;

  Length: FormControl = new FormControl(null);
  
  constructor(public TenDesignService: TenDesignService,
    public sharedService: SharedVariable,
     private http: HttpClient) {}

     calculateStatus(beamShape: BeamShape) {
      let L = this.Length.value
             console.log("used L: " + L)
      let DL = this.DL.value;
             console.log("used DL: " + DL)
      let LL = this.LL.value
             console.log("used LL: " + LL)
      let Fy = this.sharedService.Fyield.value
      let Fu = this.sharedService.Fu.value

      let isholePunch = this.TenDesignService.isholePunch
      let isholeDmg = this.TenDesignService.isholeDmg

      // Get values from TenDesignServices
             console.log("used DL: " + DL)
             console.log("used LL: " + LL)

      //Mga variables sa pagsolve sa analysis
                    console.log("used Fy: " + Fy)
                    console.log("used Fu: " + Fu)

                   console.log("used Length: " + L)

                   this.hPunch = isholePunch ? 1/16 : 0;
                   this.hDamage = isholeDmg ? 1/16 : 0;


//ANALYSUS PROPER 
      //Tu = 1.2DL + 1.6LL                  
      this.Tu = (1.2*DL) + (1.6*LL);
                    console.log("Ultimate Demand: " + this.Tu)
      this.Ta = DL + LL;
                    console.log("Applicable Demand: " + this.Ta)

      //Yielding
        this.LRFDYield = this.Tu/(0.9*Fy)
        this.ASDYield = (1.67*this.Ta)/Fy //Ag

        //Fracture
          this.AeLRFD = this.Tu/(0.75*Fu)
          this.AeASD = (2*this.Ta)/Fu //Ae

        //Aslume u = 0.8
              let U = 0.8

        //Ae = UAn
        this.AnLRFD = this.AeLRFD/U
        this.AnASD = this.AeASD/U //An

              //Check, U=0.85
                this.AgLRFD = this.AnLRFD/0.85
                this.AgASD = this.AnASD/0.85

                if (this.AgLRFD > this.LRFDYield) {this.GovernLRFD = this.AnLRFD}
                if (this.AgASD > this.ASDYield) {this.GovernASD = this.AnASD}

        //Slenderness Ratio
          let rDemand = (L*12)/300
          beamShape.rDemand = rDemand

          if (beamShape.rx && beamShape.ry && beamShape.rz) {beamShape.rmin = Math.min(beamShape.rx,beamShape.ry, beamShape.rz)}
          else {beamShape.rmin = beamShape.ry};


                  console.log(`
                  LRFD Yield (LRFDYield): ${this.LRFDYield}
                  ASD Yield (ASDYield): ${this.ASDYield}
                  Ae for LRFD (AeLRFD): ${this.AeLRFD}
                  Ae for ASD (AeASD): ${this.AeASD}
                  U: ${U}
                  An for LRFD (AnLRFD): ${this.AnLRFD}
                  An for ASD (AnASD): ${this.AnASD}
                  Ag for LRFD (AgLRFD): ${this.AgLRFD}
                  Ag for ASD (AgASD): ${this.AgASD}
                  Ag Demand for LRFD (AgDemandLRFD): ${this.AgDemandLRFD}
                  Ag Demand for ASD (AgDemandASD): ${this.AgDemandASD}
                  Slenderness Ratio (rmin): ${beamShape.rmin}
                `);
        

          //Bolts
          let n = this.sharedService.boltAmount.value;
          let db = this.sharedService.boltDiameter.value;
          if (beamShape.t) {
          beamShape.Aholes = n*beamShape.t*(db+this.hDamage+this.hPunch)}
          else {beamShape.Aholes = n*beamShape.tw*(db+this.hDamage+this.hPunch)}
            beamShape.GovernLRFD = this.GovernLRFD
            beamShape.GovernASD = this.GovernASD
          beamShape.AgDemandLRFD = Number(beamShape.GovernLRFD)+Number(beamShape.Aholes)
          beamShape.AgDemandASD = Number(beamShape.GovernASD)+Number(beamShape.Aholes)
                  console.log(`
                  Bolt Amount (n): ${n}
                  Bolt Diameter (db): ${db}
                  Aholes (if beamShape.t exists): ${beamShape.t ? beamShape.Aholes : 'Not calculated'}
                  Aholes (if beamShape.t does not exist): ${!beamShape.t ? beamShape.Aholes : 'Not calculated'}
                  Govern for LRFD (GovernLRFD): ${beamShape.GovernLRFD}
                  Govern for ASD (GovernASD): ${beamShape.GovernASD}
                  Ag Demand for LRFD (AgDemandLRFD): ${beamShape.AgDemandLRFD}
                  Ag Demand for ASD (AgDemandASD): ${beamShape.AgDemandASD}
                `);
        



        return {
          AgDemandLRFD: this.AgDemandLRFD,
          AgDemandASD: this.AgDemandASD,};
          

      
    }


    setBeamFilter(filter: number) {
      this.beamFilter.next(filter);
      this.loadTable();
      console.log("changing filter to " + filter)
    }

    loadTable() {
      //Beam Filter
      console.log("LOADING TABLE WITH FILTER = " + this.beamFilter)
      let database: string = 'assets/db/AISC15-imperial-Wshapes.json';
                if (this.beamFilter.value == 1) {
                    database = 'assets/db/AISC15-imperial-Wshapes.json';}
                  else  if (this.beamFilter.value == 2) {
                    database = 'assets/db/imperial_W4-8.json';}
                  else  if (this.beamFilter.value == 3) {
                    database = 'assets/db/imperial_W10.json';}
                  else  if (this.beamFilter.value == 4) {
                    database = 'assets/db/imperial_W12.json';}
                  else  if (this.beamFilter.value == 5) {
                    database = 'assets/db/imperial_W14.json';}
                  else  if (this.beamFilter.value == 6) {
                    database = 'assets/db/imperial_W16.json';}
                  else  if (this.beamFilter.value == 7) {
                    database = 'assets/db/imperial_W18.json';}
                  else  if (this.beamFilter.value == 8) {
                    database = 'assets/db/imperial_W21.json';}
                  else  if (this.beamFilter.value == 9) {
                    database = 'assets/db/imperial_W24.json';}
                  else  if (this.beamFilter.value == 10) {
                    database = 'assets/db/imperial_W27.json';}
                  else  if (this.beamFilter.value == 11) {
                    database = 'assets/db/imperial_W33.json';}
                  else  if (this.beamFilter.value == 12) {
                    database = 'assets/db/imperial_W40.json';}
                  else  if (this.beamFilter.value == 13) {
                    database = 'assets/db/imperial_W44.json';}
                  else  if (this.beamFilter.value == 14) {
                    database = 'assets/db/AISC15-imperial-Ibeams.json';}
                  else  if (this.beamFilter.value == 15) {
                    database = 'assets/db/AISC15-imperial.json';}
                  else  if (this.beamFilter.value == 16) {
                    database = 'assets/db/AISC15-imperial-Lshapes.json';}
                  else  if (this.beamFilter.value == 17) {
                    database = 'assets/db/AISC15-imperial-Cshapes.json';}
                  else  if (this.beamFilter.value == 0) {
                    database = 'assets/db/AISC15-imperial-Ibeams.json';}


      this.http.get<BeamShape[]>(database).subscribe(data => {
        // For each beam shape, calculate status then ilalagay sa beamShape na array
                data.forEach(beamShape => {
                  // Call the function
let status = this.calculateStatus(beamShape);
                        console.log("~~BEAMSHAPE: " + beamShape.AISC_Manual_Label + "~~~~~")


            //CHECKKKKKKKKKKK HAHAHHAHAA
                if (beamShape.AgDemandLRFD <= beamShape.A) {
                  beamShape.LRFDstatus = "SAFE"
                } else beamShape.LRFDstatus = "UNSAFE";

                if (beamShape.AgDemandASD <= beamShape.A) {
                  beamShape.ASDstatus = "SAFE"
                } else beamShape.ASDstatus = "UNSAFE";



            });

            
            
      


            // Update the BehaviorSubject with the new data
            this._beamShapes.next(data);
        });
    }
    

    private _updateTable = new Subject<void>();
    updateTable$ = this._updateTable.asObservable();

  triggerUpdate() {
    this._updateTable.next();
  }

  calculateKLr(k: number, L: number, r: number): number {
    return (k * L) / r;
  }
  

}