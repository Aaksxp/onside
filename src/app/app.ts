import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseStorageService } from './services/supabase-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  selectedImage: string | null = null;
  photoUrls$!: Observable<string[]>;
  isClosing = false; // Flag for close animation

  constructor(private storageService: SupabaseStorageService) {}

  ngOnInit() {
    this.photoUrls$ = this.storageService.getAllPhotoUrls();
  }

  openImage(url: string) {
    this.selectedImage = url;
    this.isClosing = false;
  }

  closeImage() {
    this.isClosing = true;
    // Wait for animation to complete before removing modal
    setTimeout(() => {
      this.selectedImage = null;
      this.isClosing = false;
    }, 200); // Match animation duration
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.selectedImage && !this.isClosing) {
      this.closeImage();
    }
  }
}
