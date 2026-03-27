import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { LucideLayoutDashboard,LucideLayoutGrid } from '@lucide/angular';
import { Observable } from 'rxjs';
import { SupabaseStorageService } from '../../services/supabase-storage.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, LucideLayoutDashboard,LucideLayoutGrid],
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

  // 🖼 Open image
  openImage(url: string, index: number) {
    this.selectedImage = url;
    this.selectedIndex = index;
    this.isClosing = false;
  }

  // ❌ Close image
  closeImage() {
    this.isClosing = true;

    setTimeout(() => {
      this.selectedImage = null;
      this.isClosing = false;
    }, 200);
  }

  // ⬅️ Previous
  prevImage(event: Event) {
    event.stopPropagation();

    if (this.photoList.length === 0) return;

    this.selectedIndex =
      (this.selectedIndex - 1 + this.photoList.length) % this.photoList.length;

    this.selectedImage = this.photoList[this.selectedIndex];
  }

  // ➡️ Next
  nextImage(event: Event) {
    event.stopPropagation();

    if (this.photoList.length === 0) return;

    this.selectedIndex =
      (this.selectedIndex + 1) % this.photoList.length;

    this.selectedImage = this.photoList[this.selectedIndex];
  }

  // ⌨️ Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {

    if (!this.selectedImage || this.isClosing) return;

    if (event.key === 'Escape') {
      this.closeImage();
    }

    if (event.key === 'ArrowRight') {
      this.nextImage(event);
    }

    if (event.key === 'ArrowLeft') {
      this.prevImage(event);
    }
  }

  // 🎨 Layout switch
  setLayout(mode: 'masonry' | 'grid') {
    this.layoutMode = mode;
  }

  // ⚡ Performance
  trackByUrl(index: number, url: string) {
    return url;
  }

  // 🖼 Lazy load styling
  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}