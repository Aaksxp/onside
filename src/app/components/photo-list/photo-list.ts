import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { LucideLayoutDashboard, LucideLayoutGrid, LucideChevronLeft, LucideChevronRight,
  LucideSun, LucideMoon } from '@lucide/angular';
import { Observable } from 'rxjs';
import { SupabaseStorageService } from '../../services/supabase-storage.service';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe, CommonModule } from '@angular/common';

const DEFAULT_LOGO = 'samuthra.ico';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, LucideLayoutDashboard, LucideLayoutGrid,
    LucideChevronLeft, LucideChevronRight, LucideSun, LucideMoon],
  templateUrl: './photo-list.html',
  styleUrl: './photo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoList implements OnInit {

  photoUrls$!: Observable<string[]>;

  selectedImage: string | null = null;
  selectedIndex = 0;

  isClosing = false;
  layoutMode: 'masonry' | 'grid' = 'grid';

  logoSrc = DEFAULT_LOGO;
  private showingHourLogo = false;

  private photoList: string[] = [];

  constructor(
    private storageService: SupabaseStorageService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.photoUrls$ = this.storageService.getAllPhotoUrls();

    // Cache locally for navigation
    this.photoUrls$.subscribe(urls => {
      this.photoList = urls || [];
    });
  }

  get isDarkTheme() {
    return this.themeService.theme() === 'dark';
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  toggleLogo() {
    if (this.showingHourLogo) {
      this.logoSrc = DEFAULT_LOGO;
    } else {
      this.logoSrc = this.hourLogoFilename(new Date().getHours());
    }
    this.showingHourLogo = !this.showingHourLogo;
  }

  private hourLogoFilename(hour: number): string {
    if (hour === 0) return '12am.png';
    if (hour < 12) return `${hour}am.png`;
    if (hour === 12) return '12pm.png';
    return `${hour - 12}pm.png`;
  }

  openImage(url: string, index: number) {
    if (this.selectedImage !== null) return;

    this.selectedImage = url;
    this.selectedIndex = index;
  }

  onBackdropClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.closeImage();
  }

  closeImage() {
    if (!this.selectedImage) return;

    this.selectedImage = null;
    this.isClosing = false;
  }

  prevImage(event: Event) {
    event.stopPropagation();

    if (this.photoList.length === 0) return;

    this.selectedIndex =
      (this.selectedIndex - 1 + this.photoList.length) % this.photoList.length;

    this.selectedImage = this.photoList[this.selectedIndex];
  }

  nextImage(event: Event) {
    event.stopPropagation();

    if (this.photoList.length === 0) return;

    this.selectedIndex =
      (this.selectedIndex + 1) % this.photoList.length;

    this.selectedImage = this.photoList[this.selectedIndex];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.selectedImage || this.isClosing) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.closeImage();
    }

    if (event.key === 'ArrowRight') {
      this.nextImage(event);
    }

    if (event.key === 'ArrowLeft') {
      this.prevImage(event);
    }
  }

  setLayout(mode: 'masonry' | 'grid') {
    this.layoutMode = mode;
  }

  trackByUrl(index: number, url: string) {
    return url;
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
