import { Component, HostListener, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SupabaseStorageService } from './services/supabase-storage.service';
import { Observable } from 'rxjs';
import { PhotoList } from './components/photo-list/photo-list';
import { VideoContainer } from './components/video-container/video-container';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoList, VideoContainer, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
