import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedVariable } from '../../../shared.service';
import { beamShape } from '../../../shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockshearService } from '../../../pages/calculators/blockshear/blockshear.service';

@Component({
  selector: 'app-tensionbeamshapes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './tensionbeamshapes.component.html',
  styleUrl: './tensionbeamshapes.component.scss'
})
export class TensionbeamshapesComponent implements OnInit {
  constructor(private http: HttpClient, 
    public sharedService: SharedVariable,
    private blockshear: BlockshearService) { }

  SteelShape: number = 0;
  selectedA: number | null = null;
  selectedRx: number | null = null;
  selectedType: string = '';
  selectedManualLabel: string = '';

  get areaGross() {
    // AccessAGfromsharedservice
    return this.sharedService.Ag;
  }




  allBeamShapes: beamShape[] = [];
  filteredBeamShapes: beamShape[] = [];
  searchText: string = '';
  
    LoadSteelShapes() {
      let database: string = '';
                if (this.SteelShape == 1) {
                    database = 'assets/db/AISC15-imperial-Lshapes.json';
                    this.blockshear.SteelShapeServe = 1;}
                else if (this.SteelShape == 2) {
                  database = 'assets/db/AISC15-imperial-Ibeams.json';
                  this.blockshear.SteelShapeServe = 2;}
                else if (this.SteelShape == 4) {
                  database = 'assets/db/AISC15-imperial-Cshapes.json';
                  this.blockshear.SteelShapeServe = 4;}

      if (this.SteelShape != 3 && this.SteelShape != 0) { //Yun mga di na need magload ng shapes
      this.http.get<beamShape[]>(database).subscribe(data => {
        this.allBeamShapes = data;
        this.filteredBeamShapes = data;
        console.log("LoadSteelShapes is working");
      });}
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
          // May function sa baba na maga handle sa selected value
          this.handleSelectedBeamShape(selectedBeamShape);
          this.sharedService.chosenBeamShape.next(selectedBeamShape);
          this.sharedService.chosenBeamShapeLabel.next(selectedBeamShape.AISC_Manual_Label);
          console.log("Shared beamshape: " + this.sharedService.chosenBeamShapeLabel.getValue())

              //Error handle
              const elemError = document.getElementById('elemError');
              if (elemError) elemError.style.display = 'none';
          
                  // Get Thiccness
                  this.sharedService.t.setValue(selectedBeamShape.t);
                  console.log("t is:", selectedBeamShape.t);

                  // Get Base
                  this.sharedService.b.setValue(selectedBeamShape.b);
                  console.log("b is:", selectedBeamShape.b);

                  // Get depth
                  this.sharedService.d.setValue(selectedBeamShape.d);
                  console.log("d is:", selectedBeamShape.d);

                  // Get Ag
                  this.sharedService.Ag.setValue(selectedBeamShape.A);
                  console.log("Area Gross (Ag) is:", selectedBeamShape.A);

                  // Get bf2tf
                  this.sharedService.bf2tf.setValue(selectedBeamShape['bf/2tf']);
                  console.log("Lamba Flange (bf2tf) is:", selectedBeamShape['bf/2tf']);

                  // Get htw
                  this.sharedService.htw.setValue(selectedBeamShape['h/tw']);
                  console.log("Lamba Web (htw) is:", selectedBeamShape['h/tw']);

                  // Get rx
                  this.sharedService.rx.setValue(selectedBeamShape.rx);
                  console.log("rX is:", selectedBeamShape.rx);

                  // Get ry
                  this.sharedService.ry.setValue(selectedBeamShape.ry);
                  console.log("rY is:", selectedBeamShape.ry);



                  // Get bf
                  this.sharedService.bf.setValue(selectedBeamShape.bf);
                  console.log("bf is:", selectedBeamShape.bf);

                  // Get tf
                  this.sharedService.tf.setValue(selectedBeamShape.tf);
                  console.log("tf is:", selectedBeamShape.tf);

                  // Get tw
                  this.sharedService.tw.setValue(selectedBeamShape.tw);
                  console.log("tw is:", selectedBeamShape.tw);

                  
        }
      }
    }
    
    handleSelectedBeamShape(beamShape: beamShape): void {
      console.log("Selected beam shape is:", beamShape.AISC_Manual_Label);
    }
    
    onCheckChange() {
      this.sharedService.SteelShapeSelect = this.SteelShape
      this.LoadSteelShapes();
      this.blockshear.ChooseThickness(0)
      this.blockshear.thiccness = 0
      this.blockshear.useFlange = 0
    }
    


    

    ngOnInit(): void {
      this.LoadSteelShapes();
    }
      
  }
