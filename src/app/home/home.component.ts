import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIResponse, Game} from "../models";
import {HttpService} from "../services/http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy{
   public sort: string | undefined;
  games: Array<Game> | undefined;

  private gameSub : Subscription | undefined;
  private routeSub : Subscription | undefined;
  private noItemShowInitially : number = 1;

  private page_size : number = 80;
  public gamesToshow: Array<Game> |undefined
  public isFullListDisplayed= false;
  constructor(
    private httpService : HttpService,
    private activatedRoute : ActivatedRoute,
    private router : Router

  ) { }

  ngOnInit(): void {
   this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      if (params['game-search']){
        this.searchGames('metacrit',params['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    })
      this.httpService.getGameByPageOfSize(this.noItemShowInitially).subscribe((gameT)=>{
          this.games = gameT.results;
      })

  }

  public searchGames(sort:string|undefined,search?:string) :void{
    if (typeof sort =='string'){
    this.gameSub =  this.httpService
        .getGameList(sort,search)
        .subscribe((gameList:APIResponse<Game>)=>{
          this.games = gameList.results;
          console.log(gameList.results);
        })
    }

  }

  public Games(sort:string|undefined,search?:string) :void{
    if (typeof sort =='string'){
    this.gameSub =  this.httpService
        .getGameList(sort,search)
        .subscribe((gameList:APIResponse<Game>)=>{
          this.games = gameList.results;
          console.log(gameList);
        })
    }

  }

  public openGameDetails(id:string): void{
    this.router.navigate(['details',id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub){
      this.gameSub.unsubscribe();
    }
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

    onScroll() {
        console.log('click')
      if (this.noItemShowInitially<= this.page_size){
          this.noItemShowInitially ++;
          this.httpService.getGameByPageOfSize(this.noItemShowInitially).subscribe(
              (gameT)=>{
                  console.log(this.games?.concat(gameT.results));
               this.games= this.games?.concat(gameT.results);


          })
      }else {
          this.isFullListDisplayed = true;
      }
    }
}
