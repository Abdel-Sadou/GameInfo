import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {environment as env} from "../../environments/environment";
import {APIResponse, Game} from "../models";
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private  http : HttpClient, public loaderService: LoaderService) {

  }

  getGameList(
    ordering:string,
    search?: string
  ): Observable<APIResponse<Game>>|any{
    let params = new HttpParams().set('ordering',ordering);
    if (search){
      params = new HttpParams().set('ordering',ordering).set('search',search);
  }
    return this.http.get<APIResponse<Game>>(`https://rawg-video-games-database.p.rapidapi.com/games`,{
      params : params,});

  }

  // search(name : string):Observable<String>{
  //   name = name && name.trim();
  //   if (name){
  //         return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
  //           params : new HttpParams().set('search',name)
  //         }).pipe(
  //           map(game=> game.results.map())
  //         )
  //
  //   }
  //
  // }

  getGameByPageOfSize(page : number,page_size?:number) : Observable<APIResponse<Game>>{
    let params = new HttpParams().set('page', page);
    if (page_size) {
      params = new HttpParams().set('page', page).set('page_size', page_size);
    }

    return this.http.get<APIResponse<Game>>(`https://rawg-video-games-database.p.rapidapi.com/games`,{
      params:params,
    })

  }

  getGameDetails(id:string):Observable<Game>{
    const gameInfoRequest = this.http.get(`https://rawg-video-games-database.p.rapidapi.com/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `https://rawg-video-games-database.p.rapidapi.com/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `https://rawg-video-games-database.p.rapidapi.com/games/${id}/screenshots`
    )
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest
    }).pipe(
      map((resp:any)=>{
        return{
          ...resp['gameInfoRequest'],
          screenshots : resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results
        };
      })
    )
  }
}

