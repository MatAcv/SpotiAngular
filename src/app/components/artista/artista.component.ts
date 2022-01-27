import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista : any = {};
  topTracks : any[] = [];
  loading : boolean = false;

  constructor(private router : ActivatedRoute,
              private spotifyService: SpotifyService) {

    this.router.params.subscribe ((params: any) => {
      console.log(params.id);
      this.getArtista(params.id);
      this.getTopTracks(params.id);

    })
  }

  ngOnInit(): void {
  }


  getArtista( id : string){
    this.loading = true;

    this.spotifyService.getArtista(id).subscribe(data =>{
      console.log(data);
      this.artista = data;
      this.loading = false;
    })

  }


  getTopTracks( id : string){

    this.spotifyService.getTopTracks(id).subscribe (data => {
      console.log(data);
      this.topTracks = data;
    })

  }

}
