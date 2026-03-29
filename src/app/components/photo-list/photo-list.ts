import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { LucideLayoutDashboard,LucideLayoutGrid, LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import { Observable } from 'rxjs';
import { SupabaseStorageService } from '../../services/supabase-storage.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, LucideLayoutDashboard,LucideLayoutGrid, 
    LucideChevronLeft, LucideChevronRight],
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

  private photoList: string[] = [];

  constructor(private storageService: SupabaseStorageService) {}

  ngOnInit() {
    this.photoUrls$ = this.storageService.getAllPhotoUrls();

    // Cache locally for navigation
    this.photoUrls$.subscribe(urls => {
      this.photoList = urls || [];
    });
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
    event.stopPropagation();   // 🚨 ADD THIS
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