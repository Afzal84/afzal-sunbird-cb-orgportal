
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApprovalsService } from '../../services/approvals.service'
// import moment from 'moment'
import { ITableData } from '@sunbird-cb/collection/lib/ui-org-table/interface/interfaces'
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material'
/* tslint:disable */
import _ from 'lodash'
import { EventService } from '@sunbird-cb/utils'
import { TelemetryEvents } from '../../../../head/_services/telemetry.event.model'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ReportsVideoComponent } from '../reports-video/reports-video.component'
/* tslint:enable */
@Component({
  selector: 'ws-app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
})
export class ApprovalsComponent implements OnInit, OnDestroy {
  data: any = []
  currentFilter = 'pending'
  discussionList!: any
  discussProfileData!: any
  departName = ''
  approvalTotalCount = 0
  limit = 20
  pageIndex = 0
  currentOffset = 0
  tabledata: ITableData = {
    // actions: [{ name: 'Approve', label: 'Approve', icon: 'remove_red_eye', type: 'Approve' },
    // { name: 'Reject', label: 'Reject', icon: 'remove_red_eye', type: 'Reject' }],
    actions: [],
    columns: [
      { displayName: 'Full name', key: 'fullname' },
      { displayName: 'Requested on', key: 'requestedon' },
      { displayName: 'Fields', key: 'fields', isList: true },
      { displayName: 'Tags', key: 'tag', isList: true },
    ],
    needCheckBox: false,
    needHash: false,
    sortColumn: 'fullname',
    sortState: 'asc',
    needUserMenus: false,
  }
  configSvc: any
  reportsNoteList: string[] = []

  constructor(
    private router: Router,
    private apprService: ApprovalsService,
    private activeRouter: ActivatedRoute,
    private route: ActivatedRoute,
    private events: EventService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private snackbar: MatSnackBar) {
    this.configSvc = this.route.parent && this.route.parent.snapshot.data.configService
    if (this.activeRouter.parent && this.activeRouter.parent.snapshot.data.configService.unMappedUser.channel
    ) {
      this.departName = _.get(this.activeRouter, 'parent.snapshot.data.configService.unMappedUser.channel')
    }
  }

  ngOnInit() {
    this.currentFilter = this.route.snapshot.params['tab']
    this.currentFilter = this.currentFilter === 'upload' ? 'uploadApprovals' : 'pending'
    if (this.currentFilter === 'pending') {
      this.fetchApprovals()
    }

    this.reportsNoteList = [
      // tslint:disable-next-line: max-line-length
      `Profile Verifications: Review and approve/reject user requests for verification of one or more primary fields.`,
      // tslint:disable-next-line: max-line-length
      `Transfers: Manage user transfer requests, including approving/rejecting transfers. You will receive these request in the “Transfers” section.`,
      // tslint:disable-next-line: max-line-length
      `You can update multiple user profiles in one go by using Bulk Profile Update.`,
    ]
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  openVideoPopup() {
    this.dialog.open(ReportsVideoComponent, {
      data: {
        videoLink: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1',
      },
      disableClose: true,
      width: '50%',
      height: '60%',
      panelClass: 'overflow-visable',
    })
  }

  filter(key: string | 'timestamp' | 'best' | 'saved') {
    if (key) {
      this.currentFilter = key
      if (key === 'pending') {
        this.fetchApprovals()
      }
    }
  }

  public tabTelemetry(label: string, index: number) {
    const data: TelemetryEvents.ITelemetryTabData = {
      label,
      index,
    }
    this.events.handleTabTelemetry(
      TelemetryEvents.EnumInteractSubTypes.APPROVAL_TAB,
      data,
    )
  }

  onApprovalClick(approval: any) {
    if (approval && approval.userWorkflow.userInfo) {
      this.router.navigate([`/app/approvals/${approval.userWorkflow.userInfo.wid}/to-approve`])
    }
    // this.telemetrySvc.impression()
    this.events.raiseInteractTelemetry(
      {
        type: TelemetryEvents.EnumInteractTypes.CLICK,
        subType: TelemetryEvents.EnumInteractSubTypes.CARD_CONTENT,
        id: TelemetryEvents.EnumIdtype.APPROVAL_ROW,
      },
      {
        id: approval.userWorkflow.userInfo.wid,
        type: TelemetryEvents.EnumIdtype.WORK_ORDER,
      }
    )

  }

  fetchApprovals() {
    const conditions = [
      ['location', 'Country'],
      ['designation', 'Designation'],
      ['group', 'Group'],
      ['name', 'Organisation Name'],
      ['orgNameOther', 'Other Organisation Name'],
      ['industry', 'Industry'],
      ['industryOther', 'Other Industry'],
      ['doj', 'Date of Joining'],
      ['organisationType', 'Type of Organisation'],
      ['orgDesc', 'Organisation Description'],
      ['verifiedKarmayogi', 'Verified Karmayogi'],
    ]

    if (this.departName) {
      const req = {
        serviceName: 'profile',
        applicationStatus: 'SEND_FOR_APPROVAL',
        deptName: this.departName,
        offset: this.currentOffset,
        limit: this.limit,
      }
      this.apprService.getApprovals(req).subscribe(res => {
        this.data = []
        let currentdate: Date
        this.approvalTotalCount = res.result.count
        const resData = res.result.data
        resData.forEach((approval: any) => {
          let keys = ''
          approval.wfInfo.forEach((wf: any) => {
            currentdate = new Date(wf.createdOn)
            if (typeof wf.updateFieldValues === 'string') {
              const fields = JSON.parse(wf.updateFieldValues)
              if (fields.length > 0) {
                fields.forEach((field: any) => {
                  if (Object.keys(field.fromValue).length > 0) {

                    keys += `${_.first(Object.keys(field.fromValue))}, `
                  } else {
                    keys += `${_.first(Object.keys(field.toValue))}, `
                  }
                })
              }
            }
          })

          this.data.push({

            fullname: approval.userInfo ? `${approval.userInfo.first_name}` : '--',
            // fullname: approval.userInfo ? `${approval.userInfo.first_name} ${approval.userInfo.last_name}` : '--',
            // requestedon: `${currentdate.getDate()}
            //   requestedon: `${currentdate.getDate()}
            // ${moment(currentdate.getMonth() + 1, 'MM').format('MMM')}
            // ${currentdate.getFullYear()}
            // ${currentdate.getHours()} :
            // ${currentdate.getMinutes()} :
            // ${currentdate.getSeconds()}`,
            // requestedon: this.datePipe.transform(currentdate, 'dd MMM y'),
            // fields: keys.slice(0, -1),
            requestedon: currentdate,
            fields: this.replaceWords(keys, conditions),
            userWorkflow: approval,
            tag: (approval.userInfo && approval.userInfo.tag) ? `${approval.userInfo.tag}` : '',
          })
        })
      })
    } else {
      this.snackbar.open('Please connect to your SPV admin, to update MDO name.')
    }
  }

  get getTableData() {
    if (this.data.length > 0) {
      this.data.forEach((element: any) => {
        // element.requestedon = this.datePipe.transform(element.requestedon, 'dd MMM y')
        element.requestedon = element.requestedon
      })
    }
    return this.data
  }

  replaceWords(inputString: any, wordConditions: any) {
    return wordConditions.reduce((acc: any, [word, condition]: any) => {
      return acc.replace(new RegExp(word, 'gi'), condition)
    },                           inputString)
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.limit = event.pageSize
    this.currentOffset = event.pageIndex
    this.fetchApprovals()
  }

  ngOnDestroy(): void { }
}
