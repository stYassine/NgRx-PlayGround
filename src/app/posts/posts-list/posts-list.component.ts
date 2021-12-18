import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getPosts } from '../../posts/store/posts.selectors';
import { deletePost, loadPosts } from '../../posts/store/posts.actions';
import { AppState } from 'src/app/store/app.state';
import { Post } from 'src/app/models/posts.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts$ = this.store.pipe(select(getPosts));
    this.store.dispatch(loadPosts());
  }

  public onPostDelete(postId){
    if(confirm('Are you sure you want to delete ?')){
      this.store.dispatch(deletePost({id: postId}));
    }
  }

}
