# PPC Bibaho — Angular section

A componentised Angular implementation of the supplied Patro Patri Chai ecosystem HTML, adapted to sit inside an existing Angular website as the **Bibaho / wedding experience**. It keeps the original Newsreader + Inter typography, ink/wine/cream/blush/gold palette and Bengali wedding concepts, with upgraded responsive layouts, animated motifs, reveal transitions, a marquee, mobile navigation and an interactive Wedding Worlds selector.

## Folder layout

```text
bibaho/
├── bibaho.component.ts|html|css       # Root shell, navigation and section order
├── bibaho.module.ts                   # NgModule integration
├── bibaho-theme.css                   # Theme styles (load globally once)
└── components/
    ├── bibaho-hero/
    ├── bibaho-story-intro/
    ├── bibaho-ecosystem/
    ├── bibaho-why/
    ├── bibaho-story/
    ├── bibaho-matchmaking/
    ├── bibaho-ways-in/
    ├── bibaho-weddings/
    ├── bibaho-collection/
    ├── bibaho-worlds/                 # Interactive tier/theme selector
    ├── bibaho-bespoke/
    ├── bibaho-trust/
    ├── bibaho-future/
    └── bibaho-contact/
```

Each section has its own `.component.ts`, `.component.html`, and `.component.css`. The section copy and ideas are based on the uploaded HTML; the original standalone-page curtain, global canvas and cursor effects were not carried over because this is intended to be embedded inside your existing PPC site rather than take over the entire browser.

## Add to your Angular project

1. Copy the `bibaho/` folder into `src/app/`.
2. Load the theme stylesheet once. Either add `src/app/bibaho/bibaho-theme.css` to the `styles` array in `angular.json`, or add this line to `src/styles.css` (adjust the relative path if your folder is elsewhere):

   ```css
   @import './app/bibaho/bibaho-theme.css';
   ```

3. Import `BibahoModule` into the module that owns your PPC site:

   ```ts
   import { BibahoModule } from './bibaho/bibaho.module';

   @NgModule({
     imports: [BibahoModule]
   })
   export class AppModule {}
   ```

4. Replace the old wedding section/component in your site template with:

   ```html
   <app-bibaho></app-bibaho>
   ```

5. If your PPC app already has a shared site navbar/footer, remove the root shell's `bibaho-nav`, `bibaho-mobile-menu`, and `bibaho-footer` markup from `bibaho.component.html` to avoid duplicate navigation. The content sections can still be used individually.

## Notes

- Designed for Angular 14–16 module-based projects; no third-party animation library required.
- `CommonModule` is imported for `*ngFor` and `[ngStyle]`.
- All section anchor IDs are retained. If your main PPC app already uses the same IDs, rename them or use the Bibaho shell as the exclusive page content.
- External Google Fonts require an internet connection. The page remains usable with Georgia/system fallbacks.
- The contact buttons currently link to internal sections; replace those anchors with your actual contact or enquiry route when ready.
