import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-library-header',
  templateUrl: './library-header.component.html',
  styleUrls: ['./library-header.component.scss']
})
export class LibraryHeaderComponent {
    @Input() public icon: string;
    @Input() public title: string;
    @Input() public description: string;
}
