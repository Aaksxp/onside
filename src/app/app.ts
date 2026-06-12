import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowUp } from '@lucide/angular';
import { ThemeService } from './services/theme.service';
import { PhotoList } from './components/photo-list/photo-list';
import { VideoContainer } from './components/video-container/video-container';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoList, VideoContainer, Footer, LucideArrowUp],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  showScrollTop = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
