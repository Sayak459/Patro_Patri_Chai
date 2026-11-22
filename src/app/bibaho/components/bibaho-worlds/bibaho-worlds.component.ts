import { Component } from '@angular/core';
type WeddingTheme = { name: string; mood: string };
type WeddingTier = { key: string; label: string; a: string; b: string; themes: WeddingTheme[] };
@Component({ selector: 'app-bibaho-worlds', templateUrl: './bibaho-worlds.component.html', styleUrls: ['./bibaho-worlds.component.css'] })
export class BibahoWorldsComponent {
  tiers: WeddingTier[] = [
    { key: 'classic', label: 'Classic', a: '#3a1220', b: '#6b1420', themes: [
      { name: 'Laal Paar', mood: 'Red and white. Alpana underfoot, conch shells at the threshold. Traditional flowers and rituals, elegantly kept.' },
      { name: 'Bonedi Bari', mood: 'Old Kolkata interiors — heritage houses, antique furniture, chandeliers holding the light of another century.' },
      { name: 'Shubho Bibaho', mood: 'The timeless Bengali wedding. Traditional rituals, a warm family room, nothing overdone.' },
      { name: 'Rajbari', mood: 'Grand Bengal royalty. Majestic décor, dramatic entrances, a regal hand in every detail.' },
      { name: 'Phooler Biye', mood: 'A wedding built from flowers — garden settings, floral installations, romantic light and fragrance.' }
    ]},
    { key: 'signature', label: 'Signature', a: '#241033', b: '#4a1942', themes: [
      { name: 'Whimsical Bengal', mood: 'A Bengali fairytale, told with a contemporary hand.' },
      { name: 'Calcutta Romance', mood: 'Old Kolkata cafés, trams and letters — heritage architecture read in a modern voice.' },
      { name: 'Adda', mood: 'Conversation, food, music and people. The Bengali social spirit, staged as a wedding.' },
      { name: 'Bengal in Monsoon', mood: 'Rain, greenery, flowers and lamps. Umbrellas and atmospheric light.' },
      { name: 'Bengali Summer', mood: 'White cotton, cane, tropical Bengal, aam, gondhoraj and long afternoon light.' }
    ]},
    { key: 'bespoke', label: 'Bespoke', a: '#1f0a1c', b: '#6b1420', themes: [
      { name: 'Your Story', mood: 'Every couple’s story is different. The wedding becomes a visual interpretation of your own story, memories and rituals.' }
    ]},
    { key: 'luxury', label: 'Luxury', a: '#0f0a12', b: '#3a1220', themes: [
      { name: 'Royal Bengal', mood: 'Coming soon — built with intention.' },
      { name: 'Grand Calcutta', mood: 'Coming soon — built with intention.' },
      { name: 'Bengali × European', mood: 'Coming soon — built with intention.' },
      { name: 'Destination Bengali', mood: 'Coming soon — built with intention.' },
      { name: 'Immersive Weddings', mood: 'Coming soon — built with intention.' },
      { name: 'After-Dark Weddings', mood: 'Coming soon — built with intention.' },
      { name: 'Large-Scale Productions', mood: 'Coming soon — built with intention.' }
    ]}
  ];
  activeTier: WeddingTier = this.tiers[0];
  activeThemeIndex = 0;
  get activeTheme(): WeddingTheme { return this.activeTier.themes[this.activeThemeIndex] || this.activeTier.themes[0]; }
  selectTier(tier: WeddingTier): void { this.activeTier = tier; this.activeThemeIndex = 0; }
  selectTheme(index: number): void { this.activeThemeIndex = index; }
}