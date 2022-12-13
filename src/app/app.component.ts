import { Component, OnInit } from '@angular/core';
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
  apiUrl = 'https://imdb-api.com/API/AdvancedSearch/k_9qsnleq1/?title=Avengers'

  getMovies() {
    return this.http.get<Movies>(this.apiUrl)
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movies | undefined

  constructor(private movieService: MovieService) { }

  getMovies() {
    this.movieService.getMovies()
      .subscribe((data: Movies) => {
        this.movies = {
        results: data.results
      }
        console.log(JSON.stringify(this.movies))}
      )
    
  }

  ngOnInit() {
    this.getMovies()
    
  }
  
}

