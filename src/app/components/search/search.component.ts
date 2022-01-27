import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  artistas : any[] = [];
  constructor(private spotifeservice : SpotifyService) { }

buscar(search : string){



  this.spotifeservice.getArtistas( search ).subscribe( (data : any) => {

    this.artistas = data;
    console.log(data);

  })

}
}
