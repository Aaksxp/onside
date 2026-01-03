import { Component, OnInit,HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseStorageService } from '../../services/supabase-storage.service';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-photo-list',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './photo-list.html',
  styleUrl: './photo-list.scss',
})
export class PhotoList implements OnInit {
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
