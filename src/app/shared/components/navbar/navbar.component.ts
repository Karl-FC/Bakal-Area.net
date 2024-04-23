import { Component,Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})


export class NavbarComponent {

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private renderer: Renderer2) { }

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
