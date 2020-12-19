import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@scr/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostApi {
  private readonly path: string = '/posts';
  constructor(private http: HttpClient) {}
  public getPosts(start: number = 0, limit: number = 5): Observable<any> {
    return this.http.get(`${environment.URL}${this.path}`,{
      params: {
        _start: start.toString(),
        _limit: limit.toString()
      },
      responseType: "json",
      observe: "response"
    });
  }
}
