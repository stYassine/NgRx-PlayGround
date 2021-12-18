import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/posts.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>('https://vue-completecourse.firebaseio.com/posts.json')
    .pipe(
      map((data) => {
        let posts: Post[] = [];
        for(let key in data){
          posts.push({...data[key], id: key});
        }
        return posts;
      })
    );
  }

  public addPost(post: Post): Observable<{name: string}>{
    return this.httpClient.post<{name: string}>('https://vue-completecourse.firebaseio.com/posts.json', post);
  }

  public updatePost(post: Post) {
    const postData = {[post.description]: {title: post.title, description: post.description}};
    return this.httpClient.patch('https://vue-completecourse.firebaseio.com/posts.json', postData);
  }

  public deletePost(id: string) {
    return this.httpClient.delete(`https://vue-completecourse.firebaseio.com/posts/${id}.json`);
  }

}
