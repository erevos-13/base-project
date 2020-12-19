import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@scr/environments/environment";
import { Observable } from "rxjs";

export interface IPostInput{
  title?: string;
  body?: string;
  userId?: number;
  id?: number;
}

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
        _limit: limit.toString(),
        userId: "1"
      },
      responseType: "json",
      observe: "response"
    });
  }


  public addPost(input: IPostInput): Observable<any> {
    return this.http.post(`${environment.URL}${this.path}`,input,{
      responseType: "json",
      observe: "response"
    });
  }

  public deletePost(id: number): Observable<any> {
    return this.http.delete(`${environment.URL}${this.path}/${id}`,{
      responseType: "json",
      observe: "response"
    });
  }

  public editPost(input: IPostInput): Observable<any> {
    return this.http.put(`${environment.URL}${this.path}/${input.id}`,input,{
      responseType: "json",
      observe: "response"
    });
  }
}
