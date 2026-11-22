import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RevealDirective } from './shared/reveal.directive';
import { LandingComponent } from './landing/landing.component';
import { DatingComponent } from './dating/dating.component';
import { DatingNavbarComponent } from './dating/components/dating-navbar.component';
import { DatingHeroComponent } from './dating/components/dating-hero.component';
import { DatingMarqueeComponent } from './dating/components/dating-marquee.component';
import { DatingAboutComponent } from './dating/components/dating-about.component';
import { DatingJourneyComponent } from './dating/components/dating-journey.component';
import { DatingDatesComponent } from './dating/components/dating-dates.component';
import { DatingRewardsComponent } from './dating/components/dating-rewards.component';
import { DatingSeasonOneComponent } from './dating/components/dating-season-one.component';
import { DatingStoriesComponent } from './dating/components/dating-stories.component';
import { DatingSeasonTwoComponent } from './dating/components/dating-season-two.component';
import { DatingCreatorComponent } from './dating/components/dating-creator.component';
import { DatingRegisterBannerComponent } from './dating/components/dating-register-banner.component';
import { DatingFooterComponent } from './dating/components/dating-footer.component';
import { DatingRegisterModalComponent } from './dating/components/dating-register-modal.component';
import { WeddingComponent } from './wedding/wedding.component';
import { WeddingHeaderComponent } from './wedding/components/wedding-header.component';
import { WeddingHeroComponent } from './wedding/components/wedding-hero.component';
import { WeddingSeasonOneComponent } from './wedding/components/wedding-season-one.component';
import { WeddingAudienceComponent } from './wedding/components/wedding-audience.component';
import { WeddingFashionComponent } from './wedding/components/wedding-fashion.component';
import { WeddingSeasonTwoComponent } from './wedding/components/wedding-season-two.component';
import { WeddingContactComponent } from './wedding/components/wedding-contact.component';
import { WeddingFooterComponent } from './wedding/components/wedding-footer.component';
import { ThreeBackgroundComponent } from './landing/three-background/three-background.component';
import { BibahoModule } from './bibaho/bibaho.module';
@NgModule({
  declarations: [
    AppComponent, LandingComponent, DatingComponent, RevealDirective,
    DatingNavbarComponent, DatingHeroComponent, DatingMarqueeComponent,
    DatingAboutComponent, DatingJourneyComponent, DatingDatesComponent,
    DatingRewardsComponent, DatingSeasonOneComponent, DatingStoriesComponent,
    DatingSeasonTwoComponent, DatingCreatorComponent, DatingRegisterBannerComponent,
    DatingFooterComponent, DatingRegisterModalComponent,
    WeddingComponent, WeddingHeaderComponent, WeddingHeroComponent,
    WeddingSeasonOneComponent, WeddingAudienceComponent, WeddingFashionComponent,
    WeddingSeasonTwoComponent, WeddingContactComponent, WeddingFooterComponent, ThreeBackgroundComponent,
    
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, BibahoModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
