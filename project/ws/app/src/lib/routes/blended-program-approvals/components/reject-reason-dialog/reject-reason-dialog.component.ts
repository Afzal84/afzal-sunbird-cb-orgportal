import { Component, Inject, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog'
import { preventHtmlAndJs } from '../../../validators/prevent-html-and-js.validator'

@Component({
  selector: 'ws-app-reject-reason-dialog',
  templateUrl: './reject-reason-dialog.component.html',
  styleUrls: ['./reject-reason-dialog.component.scss'],
})
export class RejectReasonDialogComponent implements OnInit {

  reasonForm!: UntypedFormGroup
  constructor(public dialogRef: MatDialogRef<RejectReasonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reasonForm = new UntypedFormGroup({
      reason: new UntypedFormControl('', [Validators.required, Validators.maxLength(500), preventHtmlAndJs()]),
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close(this.reasonForm.value)
  }

}
