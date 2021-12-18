import { Post } from '../../models/posts.model';

export interface PostsState{
  posts: Post[]
}

export const initialState: PostsState ={
  // posts: [
  //   {id: '1', title: 'Title 1', description: 'Long and Amazing Useful Description 1'},
  //   {id: '2', title: 'Title 2', description: 'Long and Amazing Useful Description 2'},
  //   {id: '3', title: 'Title 3', description: 'Long and Amazing Useful Description 3'},
  //   {id: '4', title: 'Title 4', description: 'Long and Amazing Useful Description 4'},
  //   {id: '5', title: 'Title 5', description: 'Long and Amazing Useful Description 5'}
  // ]
  posts: null
}