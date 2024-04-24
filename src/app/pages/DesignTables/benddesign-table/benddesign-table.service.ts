import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, max } from 'rxjs';
import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompDesignComponent } from '../../COMPRESSION/comp-design/comp-design.component';
import { CompDesignService } from '../../COMPRESSION/comp-design/comp-design.service';
import { CompdesignLoadsComponent } from '../../calculators/compdesign-loads/compdesign-loads.component';
import { BehaviorSubject } from 'rxjs';
import { BeamshapesComponent } from '../../../shared/data/beamshapes/beamshapes.component';
import { BendDesignComponent } from '../../BENDING/bend-design/bend-design.component';
import { BenddesignLoadsComponent } from '../../calculators/benddesign-loads/benddesign-loads.component';
import { BendDesignService } from '../../BENDING/bend-design/bend-design.service';

interface BeamShape {
  AISC_Manual_Label: string;
  W: number;
  Wu: number;
  Wa: number;
  Fy: number;
  Ix: number;
  Sx: number;
  Zx: number;
  rx: number;
  ry: number;
  'bf/2tf': number; //Lambda Flange
  'h/tw': number;   //Lambda Web
  MuDemand: number;
  MaDemand: number;
  MuCapacity: number;
  MaCapacity: number;

  kc: number;
  MuLoad: number; // 1.2DL + 1.6LL
  MnLRFD: number;
  MaLoad: number; // DL + LL
  MnASD: number; 
  Fcondition: string;
  Wcondition: string;
  LRFDstatus: string;
  ASDstatus: string;
  ZU: number;
  ZA: number;
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
  beamCase: number;
}

@Injectable({
  providedIn: 'root'
})
export class BenddesignTableService {
  private _beamShapes = new BehaviorSubject<BeamShape[]>([]);
  beamShapes$ = this._beamShapes.asObservable();
  onlyWbeams:boolean = true;
  
  constructor(private sharedElement: BendDesignService,
     private http: HttpClient) {}

    calculateStatus(beamShape: BeamShape) {

      //Mga variables sa pagsolve sa analysis  
      
      
      let L = this.sharedElement.chosenElemLength.value
             console.log("used L: " + L)
      let DL = this.sharedElement.DL.value;
             console.log("used DL: " + DL)
      let LL = this.sharedElement.LL.value;
             console.log("used LL: " + LL)
      let beamCase = this.sharedElement.beamCase.value;
            console.log("Beam Case: " + beamCase)
              
      let E = this.sharedElement.E.value;
                   console.log("used E: " + E)
      let Fy = this.sharedElement.Fy.value;
                    console.log("used Fy: " + Fy)
      let Zx = beamShape.Zx
                   console.log("used Zx: " + Zx)
      let Ix = beamShape.Ix
                   console.log("used Ix: " + Ix)
      let Sx = beamShape.Sx
                   console.log("used Sx: " + Sx)




  //Prelim ANALYSUS (Ito yun mga assuming natin since di natin alam ang weight ng mismong beam)                   
        let WuLoad = 1.2 * DL + 1.6 * LL; //LRFD
                      console.log("*LRFD weight w/o self-weight: " + WuLoad);
        let WaLoad = DL + LL              //ASD
                      console.log("*ASD weight w/o self-weight: " + WaLoad);
        let TempLRFD = this.CaseCondition(beamCase, WuLoad, L);
                      console.log("Assumed LRFD Load: " + TempLRFD);
        let TempASD = this.CaseCondition(beamCase, WaLoad, L);
                      console.log("Assumed ASD Load: " + TempASD);

  //Assume na compact ang flange para makuha kung anong Zx ang kelangan
        let ZU = ((TempLRFD*12)/(0.9*Fy));        //Mu = 0.9FyZx
            console.log("Zx accrd to LRFD is: " + ZU)
            beamShape.ZU = ZU;
        let ZA = (TempASD*1.67*12) / (Fy);      //Ma = (FyZx)/1.67
            console.log("Zx accrd to ASD is: " + ZA)
            beamShape.ZU = ZA;

      // ANALYSIS
      let MuDemand:number = 0;
      let MaDemand:number = 0;

      let Weight = (beamShape.W/1000) //Need natin i-divide by 1000 para maadd sa deadload na kips
          console.log("Weight should be " + beamShape.W + "divided by 1000, which is " + Weight)

      beamShape.Wu = (1.2*(DL + Weight)) + 1.6*LL
          console.log("*LRFD weight with self-weight: " + beamShape.Wu);
      beamShape.Wa = (DL + Weight) + LL
          console.log("*ASD weight with self-weight: " + beamShape.Wa);

      MuDemand = this.CaseCondition(beamCase, beamShape.Wu, L);
        console.log("*MuDemand: " + MuDemand);
      MaDemand = this.CaseCondition(beamCase, beamShape.Wa, L);
      console.log("*MaDemand: " + MaDemand);

      beamShape.MuDemand = MuDemand
      console.log("*beamShape.MuDemand: " + beamShape.MuDemand);
      beamShape.MaDemand = MaDemand
      console.log("*beamShape.MaDemand: " + beamShape.MaDemand);  


      //Check Compactness
        let compactresult = this.SlenderCheck(E,Fy,beamShape)
          beamShape.Fcondition = compactresult.Fcondition
                console.log("Flange condition: " + beamShape.Fcondition);
          beamShape.Wcondition = compactresult.Wcondition
                console.log("Web condition: " + beamShape.Wcondition);

        let Lamda_Pf = compactresult.Lamda_Pf;
            console.log("Lambda Pf = " + Lamda_Pf);
        let Lamda_Rf = compactresult.Lamda_Rf;
            console.log("Lambda Rf = " + Lamda_Rf);
        let Lamda_Pw = compactresult.Lamda_Pw;
        let Lamda_Rw = compactresult.Lamda_Rw;

        //Kung compact,
      let MuCapacity:number = 0;
      let MaCapacity:number = 0;
      let pf = beamShape.Lamda_Pf
      let rf = beamShape.Lamda_Rf

                  if (beamShape.Fcondition == "COMPACT") {
                    let MpLRFD = (Fy*Zx* (1/12) )
                    let MpASD = (Fy*Zx* (1/12) )
                    
                     MuCapacity = (0.9*MpLRFD);
                        console.log("MuCapacity, Fy, ZU, Zx:::   " + MuCapacity + " , " + Fy + " , " + ZU + " , " + Zx)
                     MaCapacity = (MpASD)/(1.67); 
                        console.log("beamShape.MuCapacity, Fy, ZU, Zx:::   " + beamShape.MuCapacity + " , " + beamShape.Fy + " , " + beamShape.ZU + " , " + beamShape.Zx)
                     console.log("FLANGE IS " + beamShape.Fcondition)
                    }
                  else if (beamShape.Fcondition == "NONCOMPACT") {
                    console.log("FLANGE IS " + beamShape.Fcondition)
                    let MpLRFD = (Fy*ZU* (1/12) )
                        
                    let MpASD = (Fy*ZA* (1/12) )
                      let FySx = (0.7*Fy*Sx);
                      let part2 = (((beamShape['bf/2tf'])-pf) / (rf-pf));
                      let productLRFD = (MpLRFD-FySx) * part2;
                      let productASD = (MpASD-FySx) * part2;
                    
                      console.log("MuCapacity, Fy, ZU::   " + MuCapacity + " , " + Fy + " , " + ZU)
                    MuCapacity = MpLRFD - productLRFD;
                    MaCapacity = MpASD - productASD;
                    }
                  else if (beamShape.Fcondition == "SLENDER") {
                    console.log("FLANGE IS " + beamShape.Fcondition) 
                    MuCapacity = (0.9*Fy*ZU)/12;
                     MaCapacity = (Fy*ZU)/(1.67*12);
                         }
                         
                  console.log("MuCapacity" + MuCapacity);
                  console.log("MaCapacity" + MaCapacity);


      //status
      let LRFDstatus = MuCapacity > MuDemand ? 'SAFE' : 'UNSAFE'; // Compare kung mas malaki Pn(capacity) sa Pu(demand)
      let ASDstatus = MaCapacity> MaDemand ? 'SAFE' : 'UNSAFE'; // Compare kung mas malaki Pn(capacity) sa Pa(demand)
          
      

      // Para makuha yun values
      return { LRFDstatus, ASDstatus, 
        MuDemand, MaDemand, 
        MuCapacity, MaCapacity,
      ZU, ZA};
    }


    loadTable() {
      const database = this.onlyWbeams ? 'assets/db/AISC15-imperial-Wshapes.json' : 'assets/db/AISC15-imperial.json';
      this.http.get<BeamShape[]>(database).subscribe(data => {
        // For each beam shape, calculate status then ilalagay sa beamShape na array
                data.forEach(beamShape => {
                  let calculateds = this.calculateStatus(beamShape);
                        console.log("~~BEAMSHAPE: " + beamShape.AISC_Manual_Label + "~~~~~")
                  beamShape.LRFDstatus = calculateds.LRFDstatus;
                  beamShape.ASDstatus = calculateds.ASDstatus;
                  beamShape.ZU = calculateds.ZU;
                  beamShape.ZA = calculateds.ZA;
                  beamShape.MuCapacity = calculateds.MuCapacity;
                  beamShape.MaCapacity = calculateds.MaCapacity;
                  beamShape.MuDemand = calculateds.MuDemand;
                  beamShape.MaDemand = calculateds.MaDemand;            
                  console.log("FINAL Ultimate MuCapacity = " + beamShape.MuCapacity)
                  console.log("FINAL Applied MaCapacity = " + beamShape.MaCapacity)
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

  
  
  CaseCondition(beamCase: number, w: number, L: number): number {
    let MnLoad: number = 0;
    let beamCond: string = '';
  
    if (beamCase == 1 ) { //Uniformed Load: Simply Supp 
      MnLoad = (w * Math.pow(L,2)) / 8;
      console.log("MnLoad = (" + w + " * " + "Math.pow(" + L + ",2)) / 8 ==    " + MnLoad)
      beamCond = "Uniformed Load: Simply Supp";
    }
    else if (beamCase == 2 ) { //Uniformed Load: Fixed at one end, supported at other
      MnLoad = (w * Math.pow(L,2)) / 8;
      console.log("MnLoad = (" + w + " * " + "Math.pow(" + L + ",2)) / 8 ==    " + MnLoad)
      beamCond = "Uniformed Load: Fixed at one end, supported at other";
    }
    else if (beamCase == 3 ) { //Uniformed Load: Cantilevered
      MnLoad = (w * Math.pow(L,2)) / 2;
      console.log("MnLoad = (" + w + " * " + "Math.pow(" + L + ",2)) / 2 ==    " + MnLoad)
      beamCond = "Uniformed Load: Cantilevered";
    }
  
    console.log("beamCase = " + beamCase + "      Condition: " + beamCond);
    return MnLoad;
  }
  

  SlenderCheck(E: number, Fy: number, beamShape: any): any {
    console.log(E + " , " + Fy);
    beamShape.Lamda_Pf = 0.38 * Math.sqrt(E / Fy);
    beamShape.Lamda_Rf = 1.0 * Math.sqrt(E / Fy);
    beamShape.Lamda_Pw = 3.76 * Math.sqrt(E / Fy);
    beamShape.Lamda_Rw = 5.70 * Math.sqrt(E / Fy);
  
    if (beamShape['bf/2tf'] < beamShape.Lamda_Pf ) {
      beamShape.Fcondition = "COMPACT";
    } else if (beamShape['bf/2tf'] >= beamShape.Lamda_Pf && beamShape['bf/2tf'] < beamShape.Lamda_Rf) {
      beamShape.Fcondition = "NONCOMPACT";
    } else if (beamShape['bf/2tf'] >= beamShape.Lamda_Rf) {
      beamShape.Fcondition = "SLENDER";
    }
    console.log("Lamba F, Pf, and Rf:   "+ beamShape['bf/2tf'] + " , " + beamShape.Lamda_Pf + ' + ' + beamShape.Lamda_Rf);
  
    if (beamShape['h/tw'] < beamShape.Lamda_Pw) {
      beamShape.Wcondition = "COMPACT";
    } else if (beamShape['h/tw'] >= beamShape.Lamda_Pw && beamShape['h/tw'] < beamShape.Lamda_Rw) {
      beamShape.Wcondition = "NONCOMPACT";
    } else if (beamShape['h/tw'] >= beamShape.Lamda_Rw) {
      beamShape.Wcondition = "SLENDER";
    }
    console.log("Lamba W, Pw, and Rw:   "+ beamShape['h/tw'] + " , " + beamShape.Lamda_Pw + ' + ' + beamShape.Lamda_Rw);
  
    return {
      Lamda_Pf: beamShape.Lamda_Pf,
      Lamda_Rf: beamShape.Lamda_Rf,
      Lamda_Pw: beamShape.Lamda_Pw,
      Lamda_Rw: beamShape.Lamda_Rw,
      Fcondition: beamShape.Fcondition,
      Wcondition: beamShape.Wcondition
    };
  }
  
  

}


