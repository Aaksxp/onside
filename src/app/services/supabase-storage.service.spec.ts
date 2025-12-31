import { TestBed } from '@angular/core/testing';

import { SupabaseStorageService } from './supabase-storage.service';

describe('SupabaseService', () => {
  let service: SupabaseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
