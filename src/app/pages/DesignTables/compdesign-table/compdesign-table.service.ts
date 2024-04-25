import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, max } from 'rxjs';
import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompDesignComponent } from '../../COMPRESSION/comp-design/comp-design.component';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { CompdesignTableComponent } from './compdesign-table.component';
import { BehaviorSubject } from 'rxjs';
import { BeamshapesComponent } from '../../../shared/data/beamshapes/beamshapes.component';

export interface BeamShape {
  AISC_Manual_Label: string;
  Fy: number;
  A: number;
  rx: number;
  ry: number;
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
}

@Injectable({
  providedIn: 'root'
})
export class CompdesignTableService {
  private _beamShapes = new BehaviorSubject<BeamShape[]>([]);
  beamShapes$ = this._beamShapes.asObservable();
  beamFilter: BehaviorSubject<number> = new BehaviorSubject(1);
  maxkLr:number = 0;
  
  constructor(private sharedElement: CompDesignService,
     private http: HttpClient) {}

    calculateStatus(beamShape: BeamShape) {
      // Get values from sharedElements
      let kL = this.sharedElement.chosenkL.value
            console.log("used kL: " + kL)
      let KFactor = this.sharedElement.chosenKFactor.value
            console.log("used KFactor: " + KFactor)
      let L = this.sharedElement.chosenElemLength.value
             console.log("used L: " + L)
      let element = this.sharedElement.chosenElem.value
             console.log("used elmenet: " + element)
      let DL = this.sharedElement.DL.value;
             console.log("used DL: " + DL)
      let LL = this.sharedElement.LL.value;
             console.log("used LL: " + LL)

          



      //Mga variables sa pagsolve sa analysis
      let E = this.sharedElement.E.value;
                   console.log("used E: " + E)
      let Fy = this.sharedElement.Fy.value;
                    console.log("used Fy: " + Fy)
      let maxkLr = this.sharedElement.maxkLr.value;
                   console.log("used maxkLr: " + maxkLr)
      let Ag = beamShape.A
                   console.log("used Ag: " + Ag)







//ANALYSUS PROPER                   
      let PuLoad = 1.2 * DL + 1.6 * LL;
                    console.log("Ultimate Demand: " + PuLoad)
      let PaLoad = DL + LL
                    console.log("Applicable Demand: " + PaLoad)

      // ANALYSIS
      let Fcheck = 4.71 * Math.sqrt(E / Fy);
      let Fe = (Math.pow(Math.PI, 2) * E) / Math.pow(maxkLr, 2);
      let Fcr = Fe <= Fcheck ? Math.pow(0.658, Fy / Fe) * Fy : 0.877 * Fe;
      let Pcr = Fcr * Ag;
      let PuLRFD = 0.9 * Pcr;
      let PuASD = Pcr / 1.67;
          console.log("Fcheck = " + Fcheck)
            beamShape.Fe = Fe;
          console.log("Fe = " + Fe)
            beamShape.Fcr = Fcr;
          console.log("E = " + E + "   maxkLr =" + maxkLr)
          beamShape.maxkLr = maxkLr;
          beamShape.Pcr = Pcr;
          console.log("Fcr = " + Fcr)
          console.log("Pcr = " + Pcr)

      //status
      let LRFDstatus = PuLRFD > PuLoad ? 'SAFE' : 'UNSAFE'; // Compare kung mas malaki Pn(capacity) sa Pu(demand)
      let ASDstatus = PuASD > PaLoad ? 'SAFE' : 'UNSAFE'; // Compare kung mas malaki Pn(capacity) sa Pa(demand)
          console.log("PnLRFD = " + PuLRFD)
          console.log("PnASD = " + PuASD)
      

      // Para makuha yun values
      return { LRFDstatus, ASDstatus, PuLoad, PaLoad };
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
                    database = 'assets/db/AISC15-imperial.json';}


      this.http.get<BeamShape[]>(database).subscribe(data => {
        // For each beam shape, calculate status then ilalagay sa beamShape na array
                data.forEach(beamShape => {
                  let status = this.calculateStatus(beamShape);
                        console.log("~~BEAMSHAPE: " + beamShape.AISC_Manual_Label + "~~~~~")
                  beamShape.LRFDstatus = status.LRFDstatus;
                  beamShape.ASDstatus = status.ASDstatus;
                  beamShape.PuLoad = status.PuLoad;
                  beamShape.PaLoad = status.PaLoad;

        // Calculate kLr for each beam shape
              let k = this.sharedElement.chosenKFactor.value;
              let L = this.sharedElement.chosenElemLength.value;
              let kLr_x = (k * L) / beamShape.rx;
                  console.log("SO rx is " + beamShape.rx)
              let kLr_y = (k * L) / beamShape.ry;
                    console.log("SO ry is " + beamShape.ry)
                    

              // Add kLr to the beam shape
              beamShape.kLr_x = kLr_x;
                  console.log("SO kLx is " + beamShape.kLr_x + "(" + k + ") * (" + L +" /" + beamShape.rx)  
              beamShape.kLr_y = kLr_y;
              
                  console.log("SO kLy is " + beamShape.kLr_y + "(" + k + ") * (" + L +" /" + beamShape.ry) 
                  console.log("FOR COMPARISON: " +
                       "this.maxkLr = " + this.maxkLr + 
                       " kLr_x ~ kLr_y ==" + kLr_x + " ~ " + kLr_y +
                       ">> this.sharedElement.maxkLr.value " + this.sharedElement.maxkLr.value);

              // Update maxkLr if current kLr is greater
              if (kLr_x > kLr_y) {
                this.maxkLr = kLr_x;
                beamShape.maxkLr=kLr_x;
                console.log("Max kL/r updated to X:" + beamShape.maxkLr)
               } else
              if (kLr_y > kLr_x) {
                this.maxkLr = kLr_y;
                beamShape.maxkLr=kLr_y;
                console.log("Max kL/r updated to Y:" + beamShape.maxkLr)
              } else console.log("Max kLr not updated huhu")

          //GEH SOLVE SOLVE NAAAA
                  let E = this.sharedElement.E.value
                  let Fy = this.sharedElement.Fy.value
                  
                  let maxkLr = beamShape.maxkLr
                  let Fcheck = 4.71 * Math.sqrt(E/Fy);

                  beamShape.Fe = (Math.pow(Math.PI, 2) * E) / Math.pow(maxkLr, 2);
                  beamShape.Fcr = beamShape.Fe <= Fcheck ? Math.pow(0.658, Fy / beamShape.Fe) * Fy : 0.877 * beamShape.Fe;
                  beamShape.Pcr = beamShape.Fcr * beamShape.A;

                  beamShape.PnLRFD = 0.9 * beamShape.Pcr;
                  beamShape.PnASD = beamShape.Pcr / 1.67;
                      console.log("Fcheck = " + Fcheck)
                      console.log("Fe = " + beamShape.Fe)
                      console.log("E = " + this.sharedElement.E.value + "   maxkLr =" + beamShape.maxkLr)
                      console.log("Fcr = " + beamShape.Fcr)
                      console.log("Pcr = " + beamShape.Pcr)


            //CHECKKKKKKKKKKK HAHAHHAHAA
                if (beamShape.PuLoad <= beamShape.PnLRFD) {
                  beamShape.LRFDstatus = "SAFE"
                } else beamShape.LRFDstatus = "UNSAFE";

                if (beamShape.PaLoad <= beamShape.PnASD) {
                  beamShape.ASDstatus = "SAFE"
                } else beamShape.ASDstatus = "UNSAFE";

//HANEP MALIPGNAN PA SU SLENDERNESS CHECK
              //SLENDERNESS CHECK MUNA
            //COMPACTNESS PALANNN
                console.log(E + " , " + Fy)
            beamShape.Lamda_Pf = 0.38 * Math.sqrt(E / Fy);
            beamShape.Lamda_Rf = 1.0 * Math.sqrt(E / Fy);
            beamShape.Lamda_Pw = 3.76 * Math.sqrt(E / Fy);
            beamShape.Lamda_Rw = 5.70 * Math.sqrt(E / Fy);                   

              if (beamShape['bf/2tf'] < beamShape.Lamda_Pf ) 
                    {beamShape.Fcondition = "COMPACT";}
                else if (beamShape['bf/2tf'] >= beamShape.Lamda_Pf && beamShape['bf/2tf'] < beamShape.Lamda_Rf)
                  {beamShape.Fcondition = "NONCOMPACT";}
                else if (beamShape['bf/2tf'] >= beamShape.Lamda_Rf)
                  {beamShape.Fcondition = "SLENDER";}
                console.log("Lamba F, Pf, and Rf:   "+ beamShape['bf/2tf'] + " , " + beamShape.Lamda_Pf + ' + ' + beamShape.Lamda_Rf);
                
              if (beamShape['h/tw'] < beamShape.Lamda_Pw) 
                    {beamShape.Wcondition = "COMPACT";}
                else if (beamShape['h/tw'] >= beamShape.Lamda_Pw && beamShape['h/tw'] < beamShape.Lamda_Rw)
                  {beamShape.Wcondition = "NONCOMPACT";}
                else if (beamShape['h/tw'] >= beamShape.Lamda_Rw)
                  {beamShape.Wcondition = "SLENDER";}
                console.log("Lamba W, Pw, and Rw:   "+ beamShape['h/tw'] + " , " + beamShape.Lamda_Pw + ' + ' + beamShape.Lamda_Rw);


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