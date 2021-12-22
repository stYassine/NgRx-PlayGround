import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, switchMap, filter, withLatestFrom } from 'rxjs/operators';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostsService } from '../services/posts.service';
import { createPost, createPostSuccess, deletePost, deletePostSuccess, dummyAction, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';
import { getPosts } from './posts.selectors';



@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions, 
    private postsService: PostsService,
    private store: Store<AppState>
    ) {}

  public loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts), 
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if(!posts.length || posts.length == 1){
          return this.postsService.getPosts().pipe(
            map(posts => {
              console.log(posts);
              return loadPostsSuccess({posts})
            })
          );
        }
        return of(dummyAction());

      })
    )
  });

  public getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((router: RouterNavigatedAction) => {
        return router.payload.routerState.url.startsWith('/posts/details')
      }),
      map((router: RouterNavigatedAction) => {
        return router.payload.routerState['params']['id']
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if(!posts.length){
          return this.postsService.getSinglePost(id)
            .pipe(
              map((post) => {
                const postData = [{id, ...post}];
                console.log(postData);
                return loadPostsSuccess({posts: postData});
              })
            )
        }
        return of(dummyAction());
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
            /// You Can Redirect Here
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
            const updatedPost : Update<Post> = {
              id: action.post.id,
              changes: {
                ...action.post
              }
            }
            return updatePostSuccess({post: updatedPost});
            /// You Can Redirect Here
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
            /// You Can Redirect Here
          })
        );
      })  
    )
  });


  


}
