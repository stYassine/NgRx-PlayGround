import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/posts.model';

/////////////////////
/// No NgRx/Entity
/////////////////////
export interface PostsState_OLD{
  posts: Post[]
}
export const initialState_OLD: PostsState_OLD ={
  // posts: [
  //   {id: '1', title: 'Title 1', description: 'Long and Amazing Useful Description 1'},
  //   {id: '2', title: 'Title 2', description: 'Long and Amazing Useful Description 2'},
  //   {id: '3', title: 'Title 3', description: 'Long and Amazing Useful Description 3'},
  //   {id: '4', title: 'Title 4', description: 'Long and Amazing Useful Description 4'},
  //   {id: '5', title: 'Title 5', description: 'Long and Amazing Useful Description 5'}
  // ]
  posts: null
}


// Without Ngrx/Entity
// const posts = [{id: 1, post1},{id: 2, post2},{id: 3, post3},];

// With Ngrx/Entity
// const posts = {
//   ids: [1, 2, 3],
//   entities: {1: post1, 2: post2, 3: post3,}
// }


/////////////////////
/// No NgRx/Entity
/////////////////////
export interface PostsState extends EntityState<Post>{
  count: number
}

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: sortByName
});


export const initialState: PostsState = postsAdapter.getInitialState({
  count: 0 /// see reducer to this updated
});


function sortByName(a: Post, b: Post){
  const compare = a.title.localeCompare(b.title);

  if(compare > 0){
    return -1;
  }
  if(compare < 0){
    return 1;
  }


  return compare
}