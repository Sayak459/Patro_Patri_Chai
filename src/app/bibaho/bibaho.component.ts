import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({ selector: 'app-bibaho', templateUrl: './bibaho.component.html', styleUrls: ['./bibaho.component.css'] })
export class BibahoComponent {

  constructor(private router: Router) { }

  goToLanding(): void {
    this.router.navigate(['/']);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();

    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  goToTop(event: Event): void {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrolled = false;
  menuOpen = false;
  @HostListener('window:scroll')

  onWindowScroll(): void { this.scrolled = window.scrollY > 24; }
}