import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  tags: string[] = [];
  @Output() update = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  tag: string = '';

  constructor() { }

  ngOnInit() {
  }

  saveTag() {
    const tagsArray = this.tag.split(' ');
    this.tags.push(...tagsArray);
    this.tag = '';
    this.update.emit({
      tags: this.tags
    });
  }

  clearTags() {
    this.tags = [];
    this.tag = '';
    this.update.emit({
      tags: this.tags
    });
  }

}
