import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm}  from "@angular/forms";
import {LoaderService} from "../services/loader.service";
import {faInfo} from "@fortawesome/free-solid-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  iconfaInfo = faInfo;
  faPhone = faPhone;
  faFolderOpen= faFolderOpen;
  faBars =faBars;
  constructor(private router : Router, public loaderService: LoaderService) {

  }

  ngOnInit(): void {
  }

    onSubmit(f: NgForm) {
      this.router.navigate(['search',f.value.search]);
      console.log(f.value.search);
    }


}
