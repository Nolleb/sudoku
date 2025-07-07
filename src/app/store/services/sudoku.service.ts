import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DifficultyItem} from '../sudoku.slice';

@Injectable({
  providedIn: 'root'
})

export class SudokuService {
  private apiUrl = 'https://api.api-ninjas.com/v1/sudokugenerate'
  private apiKey: string = '4EYDKDe7OzR7r2K1HK5Smg==gltR8WpSCzvYjMpt'
  readonly http = inject(HttpClient)

  getSudoku(difficulty: DifficultyItem): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    })

    const params = new HttpParams().set('difficulty', difficulty.value)
    return this.http.get(this.apiUrl, { headers, params })
  }
}
