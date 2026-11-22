import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibahoComponent } from './bibaho.component';
import { BibahoHeroComponent, BibahoStoryIntroComponent, BibahoEcosystemComponent, BibahoWhyComponent, BibahoStoryComponent, BibahoMatchmakingComponent, BibahoWaysInComponent, BibahoWeddingsComponent, BibahoCollectionComponent, BibahoWorldsComponent, BibahoBespokeComponent, BibahoTrustComponent, BibahoFutureComponent, BibahoContactComponent } from './components';

@NgModule({
  declarations: [BibahoComponent, BibahoHeroComponent,
    BibahoStoryIntroComponent,
    BibahoEcosystemComponent,
    BibahoWhyComponent,
    BibahoStoryComponent,
    BibahoMatchmakingComponent,
    BibahoWaysInComponent,
    BibahoWeddingsComponent,
    BibahoCollectionComponent,
    BibahoWorldsComponent,
    BibahoBespokeComponent,
    BibahoTrustComponent,
    BibahoFutureComponent,
    BibahoContactComponent],
  imports: [CommonModule],
  exports: [BibahoComponent]
})
export class BibahoModule {}
