import { CommonModule } from '@angular/common';
import { Component,Renderer2, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})


export class NavbarComponent implements OnInit {
  selectedTheme: string = localStorage.getItem('theme') || 'neutral'; // Initialized

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private renderer: Renderer2) { }

    ngOnInit(): void {
      // When the application loads, apply the saved theme
      this.applyTheme(this.selectedTheme);
    }
  
    onThemeChange(theme: string): void {
      // When a theme is selected, save it to local storage
      localStorage.setItem('theme', theme);
      this.selectedTheme = theme;
      this.applyTheme(theme);
    }
  
    private applyTheme(theme: string): void {
      // Apply the theme
      document.documentElement.setAttribute('data-theme', theme);
    }
  


    
  goToDesign() {
    let currentRoute = this.route.snapshot.url[0].path;
    let baseRoute = currentRoute.includes('Compression/') ? 'Compression/' : 'Tension/';
    this.router.navigate([`/${baseRoute}Design`]);
  }
  
  
  
  goToAnalysis() {
    let currentRoute = this.route.snapshot.url[0].path;
    this.router.navigate([`${currentRoute}/Analysis`]);
  }
  
  reLoad(event: Event) {
    event.preventDefault();
    location.reload();
  }

  togglemenu(event: Event) {
    event.stopPropagation();

    let dropmenu = document.getElementById("dropmenu")
    this.renderer.setStyle(dropmenu,'display', 'block');
  }
  

}
