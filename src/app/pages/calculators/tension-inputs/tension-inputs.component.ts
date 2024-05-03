import { Component, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompressionbeamshapesComponent } from '../../../shared/data/compressionbeamshapes/compressionbeamshapes.component';
import { SharedVariable } from '../../../shared.service';
import { CompressionComponent } from '../slenderness/compression.component';
import { CommonModule } from '@angular/common';
import { ErrorAlertService } from '../../../shared/components/error-alert/error-alert.service';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { TenDesignService } from '../../TENSION/ten-design/ten-design.service';
import { TendesignTableService } from '../../DesignTables/tendesign-table/tendesign-table.service';

@Component({
  selector: 'app-tension-inputs',
  standalone: true,
  imports: [CommonModule, CompressionComponent, FormsModule, ReactiveFormsModule, ErrorAlertComponent],
  templateUrl: './tension-inputs.component.html',
  styleUrl: './tension-inputs.component.scss'
})
export class TensionInputsComponent {
  @Output() updateTableEvent = new EventEmitter<void>();

  constructor( public sharedService: SharedVariable, 
    public sharedTension: TenDesignService,
    public updater: TendesignTableService,
    private errAlert: ErrorAlertService) {}


refreshTable() {
  this.updater.loadTable();
}


}

