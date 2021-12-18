import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/// NgRx
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { createPost } from '../../posts/store/posts.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  form: FormGroup;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  public showDescriptionErrors(){
    const descriptionForm = this.form.get('description');
    if(descriptionForm.touched && !descriptionForm.valid){
      if(descriptionForm.errors.required){
        return 'Description is Required';
      }
      if (descriptionForm.errors.minlength){
        return 'Description Should be minimum 10 Characters Long';
      }
    }
  }

  public onAddPost(){
    if(!this.form.valid) return;
    const post: Post = {
      title: this.form.value.title,
      description: this.form.value.description,
    }

    this.store.dispatch(createPost({post}));
    
    console.log(this.form.value);
  }

}
