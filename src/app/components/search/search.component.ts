import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  tags: string[] = [];
  @Output() update = new EventEmitter<any>();
  tag: string = '';

  constructor() { }

  ngOnInit() {
  }

  saveTag() {
    this.tags.push(this.tag);
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
