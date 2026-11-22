import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({ selector: '[appReveal]' })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  constructor(private readonly el: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('show', 'visible');
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('show', 'visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    this.observer.observe(this.el.nativeElement);
  }
  ngOnDestroy(): void { this.observer?.disconnect(); }
}
