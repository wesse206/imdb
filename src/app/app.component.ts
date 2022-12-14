import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


export interface Movies {
  results: any[]
}

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) { }
  apiUrl = 'https://imdb-api.com/API/AdvancedSearch/k_9qsnleq1/?count=5&title='

  getMovies(query: string) {
    return this.http.get<Movies>(this.apiUrl + query)
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: Movies | undefined

  constructor(private movieService: MovieService) { }

  @ViewChild('search') search !: ElementRef;

  getMovies(query: string) {  
    this.movieService.getMovies(query)
      .subscribe((data: Movies) => {
        this.movies = {
        results: data.results
      }
        
        
  })
    
  }
  
}

