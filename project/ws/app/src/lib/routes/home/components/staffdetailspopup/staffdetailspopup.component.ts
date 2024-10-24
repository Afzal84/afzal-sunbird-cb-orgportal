import { Component, OnInit, Inject } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MdoInfoService } from '../../services/mdoinfo.service'
import { preventHtmlAndJs } from '../../../validators/prevent-html-and-js.validator'

@Component({
  selector: 'ws-app-staffdetailspopup',
  templateUrl: './staffdetailspopup.component.html',
  styleUrls: ['./staffdetailspopup.component.scss'],
})
export class StaffdetailspopupComponent implements OnInit {
  staffform: UntypedFormGroup
  designationsMeta: any = []
  formInputData: any
  addedposititons: any
  selectedDesignation: any

  constructor(private dialogRef: MatDialogRef<StaffdetailspopupComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    // tslint:disable-next-line:align
    private mdoinfoSrvc: MdoInfoService) {
    this.staffform = new UntypedFormGroup({
      designation: new UntypedFormControl('', [Validators.required]),
      posfilled: new UntypedFormControl('', [Validators.required, preventHtmlAndJs()]),
      posvacant: new UntypedFormControl('', [Validators.required, preventHtmlAndJs()]),
    })

    if (data.data) {
      this.formInputData = data.data
      this.addedposititons = data.addedposititons
      this.selectedDesignation = this.formInputData.position
      this.staffform.patchValue({
        designation: this.formInputData.position,
        posfilled: this.formInputData.totalPositionsFilled,
        posvacant: this.formInputData.totalPositionsVacant,
      })
    }
  }

  ngOnInit() {
    const desreq = {
      searches: [
        {
          type: 'POSITION',
          field: 'name',
          keyword: '',
        },
        {
          field: 'status',
          keyword: 'VERIFIED',
          type: 'POSITION',
        },
      ],
    }
    this.mdoinfoSrvc.getDesignations(desreq).subscribe(
      (data: any) => {
        this.designationsMeta = []
        this.designationsMeta = data.responseData
        if (this.addedposititons && this.addedposititons.length > 0) {
          this.addedposititons.forEach((desg: any) => {
            this.designationsMeta.forEach((ddesg: any, index: any) => {
              if (ddesg.name === desg.position) {
                this.designationsMeta.splice(index, 1)
              }
            })
          })
        }
      },
      (_err: any) => {
      })
  }

  addstaffdetails(form: any) {
    if (this.formInputData) {
      this.formInputData.position = this.staffform.value.designation
      this.formInputData.totalPositionsFilled = this.staffform.value.posfilled
      this.formInputData.totalPositionsVacant = this.staffform.value.posvacant
      this.dialogRef.close({ data: this.formInputData })
    } else {
      this.dialogRef.close({ data: form.value })
    }
  }

  // Only Integer Numbers
  keyPressNumbers(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault()
      return false
    }
    return true
  }

}
