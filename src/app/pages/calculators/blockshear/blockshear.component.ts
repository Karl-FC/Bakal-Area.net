import { Component } from '@angular/core';
import { BlockshearService } from './blockshear.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blockshear',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './blockshear.component.html',
  styleUrl: './blockshear.component.scss'
})
export class BlockshearComponent {
  constructor(public BlockshearService: BlockshearService) {}

}
