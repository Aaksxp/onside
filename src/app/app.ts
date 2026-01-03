import { Component, HostListener, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SupabaseStorageService } from './services/supabase-storage.service';
import { Observable } from 'rxjs';
import { PhotoList } from './components/photo-list/photo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoList],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
