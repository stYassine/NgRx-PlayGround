import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { createPost, createPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';



@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions, 
    private postsService: PostsService) {}

  public loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts), 
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map(posts => {
            console.log(posts);
            return loadPostsSuccess({posts})
          })
        );
      })  
    )
  });

  public createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createPost), 
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map(data => {
            const post = {...action.post, id: data.name};
            // console.log(data);
            return createPostSuccess({post});
          })
        );
      })  
    )
  });

  public updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost), 
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map(data => {
            console.log(data);
            return updatePostSuccess({post: action.post});
          })
        );
      })  
    )
  });

  public deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost), 
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(data => {
            console.log(data);
            return deletePostSuccess({id: action.id});
          })
        );
      })  
    )
  });


  


}
