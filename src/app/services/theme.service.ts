import { Injectable, signal } from '@angular/core';

export type Theme =  'dark' | 'light';

const STORAGE_KEY = 'wave-gallery-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>('dark');

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.apply(initial);
  }

  toggle() {
    this.apply(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private apply(theme: Theme) {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }
}
