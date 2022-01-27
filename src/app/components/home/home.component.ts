


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  releases : any[] = [];
  loading : boolean = false;
  error = false;
  mensajeError : string = "";

  constructor ( private spotifyService : SpotifyService ) {


    this.spotifyService.getNewReleases().subscribe((data : any) =>{

       this.releases = data;
       console.log(this.releases);
       this.error = false;

    }, ( errorService ) =>{
      this.error =true;
      console.log(errorService.message);
      this.mensajeError = errorService.message;

    });

   }

  ngOnInit() {
    this.loading = true;

    this.spotifyService.getToken().subscribe(data => {
      console.log(data);
      localStorage.setItem("access_token", data);
      this.loading = false;
    })
  }

}
