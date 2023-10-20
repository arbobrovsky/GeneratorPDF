import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  srclink: any;
  base64: string;
}

@Component({
  selector: 'dialog-Main',
  templateUrl: 'dialogMain.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
  providers: [DataService]
})
export class DialogMain {
  base64: string = "";
  error: string = "";
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private dataService: DataService) { }

  openDialog(base64: string): void {
    if (base64 !== "" && base64 !== undefined) {
      let fileUrl = this.dataService.convertFromBase64toPDF(base64);

      if (fileUrl !== "") {
        let srclink = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
        const dialogRef = this.dialog.open(DialogOverview,
          {
            height: '592px;',
            width: '100%',
            data: { srclink: srclink },
          });

        dialogRef.afterClosed().subscribe(result => {

        });
      } else {
        this.error = "ERROR!"
      }
    }

  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverview {
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
