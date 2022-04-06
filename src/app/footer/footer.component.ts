import { Component, OnInit } from '@angular/core';
import { faTwitter,  faFacebookF, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebookF;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  constructor() { }

  ngOnInit(): void {
  }

}
