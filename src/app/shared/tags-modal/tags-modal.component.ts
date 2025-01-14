import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-tags-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './tags-modal.component.html',
  styleUrl: './tags-modal.component.scss'
})
export class TagsModalComponent {
  userTags = inject(MAT_DIALOG_DATA);
}
