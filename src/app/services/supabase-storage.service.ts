import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseStorageService {
  private supabase: SupabaseClient;
  private bucketName = 'Photos';

  constructor() {
    this.supabase = createClient(
      'https://serikqivnrxebjfdkqxm.supabase.co',
      'sb_publishable_7JD-EtN26-UpCLBllsbXmw_OTtWlAvP'
    );
  }

  getAllPhotoUrls(): Observable<string[]> {
    return from(
      this.supabase.storage
      .from('Photos')
      .list('', { // '' = root; give folder name if inside folder
        limit: 100,
        offset: 0,
      })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        return data
          .filter(file => !file.name.includes('.emptyFolderPlaceholder'))
          .map(file => {
            const { data: urlData } = this.supabase.storage
              .from(this.bucketName)
              .getPublicUrl(file.name);
            return urlData.publicUrl;
          });
      }),
      catchError(error => {
        console.error('Error fetching photos:', error);
        return of([]);
      })
    );
  }
}
