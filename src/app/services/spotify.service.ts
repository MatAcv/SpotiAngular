import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo')
   }

   getQuery( query : string){

    const url = `https://api.spotify.com/v1/${query}`;
    let token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`

    });

    return this.http.get(url,{headers});
   }


   getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
    .pipe( map( (data : any) => data.albums.items));
   }

   getArtistas(termino : string)
   {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( (data : any) => data.artists.items));
   }

   getArtista(id : string)
   {
    return this.getQuery(`artists/${id}`)
    // .pipe( map( (data : any) => data.artists.items));
   }

   getTopTracks(id : string){
    return this.getQuery(`artists/${id}/top-tracks?market=ES`)
    .pipe( map( (data : any) => data.tracks))

   }

   getToken(){
    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', '7aab03a31db0409aaaad189f23bd8f54');
    body.set('client_secret', '77f5f4ab97c145c883d27278ff96526c');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };


    return this.http.post("https://accounts.spotify.com/api/token",body.toString(), options)
    .pipe(map ((data : any) => {

      return data.access_token;
    }));

   }
}

