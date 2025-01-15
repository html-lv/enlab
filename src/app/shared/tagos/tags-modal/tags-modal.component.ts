import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
  }

  togglePanel(index: number, currentSlug: string): void {
    if (this.panelOpenState === index) {
      this.panelOpenState = null;
    } else {
      this.panelOpenState = index;
      this.tempEditValue = currentSlug;
    }
  }

  saveTag(index: number): void {
    this.userTags[index].slug = this.tempEditValue;
    this.panelOpenState = null;
  }
}
