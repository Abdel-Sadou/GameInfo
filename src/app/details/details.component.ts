import { Component, OnInit } from '@angular/core';
import {Game} from "../models";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameRating: number ;
  gameId: string ;
  game: Game;
  routeSub : Subscription  ;
  gameSub : Subscription ;

  constructor(
              private activatedRoute : ActivatedRoute,
              private httpService : HttpService
              ) {
    this.gameRating=0;
    this.gameId="";
    this.game = <Game>new Object();
    this.routeSub = new Subscription();
    this.gameSub = new Subscription();


  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }
  getColor(value: number) : string {
    if (value> 75){
      return '#5ee432';
    }else if (value>50) {
      return '#fffa50'
    } else if (value > 30){
      return '#f7aa38';
    }else {
      return '#ef4655'
    }
  }

  private getGameDetails(id: string):void {

      this.gameSub = this.httpService
        .getGameDetails(id).subscribe((gameResp: Game) => {
          this.game = gameResp;
          setTimeout(() => {
              this.gameRating =this.game.metacritic;
          },1000)
        })

  }
}
