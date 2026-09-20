import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({ selector: 'app-footer', standalone: true, imports: [RouterLink], templateUrl: './footer.component.html', styleUrl: './footer.component.css' })
export class FooterComponent {
  readonly year = new Date().getFullYear();
  constructor(public readonly i18n: LanguageService) {}
}
