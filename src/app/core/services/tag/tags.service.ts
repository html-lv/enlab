import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagInterface } from '../../interfaces/tag-interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private api: string = "http://localhost:6600/tags";

  constructor(
    private http: HttpClient
  ) { }

  getAllTags(): Observable<any>{
    return this.http.get<any>(this.api);
  }

  getTagsById(id:number): Observable<any>{
    return this.http.get<any>(`${this.api}/${id}`);
  }

  editTag(id: number, data: { id: number; user_id: number; slug: string }): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
}

  deleteTag(id: number): Observable<any>{
    return this.http.delete<any>(`${this.api}/${id}`);
  }

  createTag(data: TagInterface): Observable<any> {
    return this.http.post<TagInterface>(`${this.api}`, {
      id: data.id,
      user_id: data.user_id,
      slug: data.slug,
    });
  }
  

}
