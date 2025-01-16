import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsService } from '../../../core/services/tag/tags.service';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule, MatExpansionModule, CommonModule, FormsModule],
  templateUrl: './tags-modal.component.html',
  styleUrls: ['./tags-modal.component.scss']
})
export class TagsModalComponent {
  panelOpenState: number | null = null;
  tempEditValue: string = '';
  user = inject(MAT_DIALOG_DATA);
  userTags = this.user?.employee?.tags || [];
  userId: number = 0;

  editingTags: { [index: number]: string } = {};

  constructor(
    private tags: TagsService,
    private dialogRef: MatDialogRef<TagComponent>
  ) {
  }

  ngOnInit(): void {
    this.userId = this.user.employee.id;
    this.tags.getTagsById(this.userId).subscribe((res) => {
      this.userTags = res;
    });
  }

  togglePanel(index: number, currentSlug: string): void {
    if (this.panelOpenState === index) {
      this.panelOpenState = null;
    } else {
      this.panelOpenState = index;
      this.tempEditValue = currentSlug;
      this.editingTags[index] = currentSlug;
    }
  }

  saveTag(index: number): void {
    const tag = {
      id: this.userTags[index].id,
      user_id: this.userId,
      slug: this.editingTags[index]
    };

    this.tags.editTag(tag.id, tag).subscribe(
      (res) => {
        console.log('Tag updated');
        this.userTags[index].slug = this.editingTags[index];
        delete this.editingTags[index];
        this.panelOpenState = null;
      },
      (error) => {
        console.error('Error :', error);
      }
    );
  }

  deleteTag(index: number): void {
    const tagId = this.userTags[index]?.id;
    this.tags.deleteTag(tagId).subscribe(() => {
      this.userTags.splice(index, 1);
      this.dialogRef.close();
    });
  }
}

