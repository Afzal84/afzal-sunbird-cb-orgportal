import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PipeDurationTransformModule, PipeFilterModule, PipeHtmlTagRemovalModule, PipeOrderByModule, PipeRelativeTimeModule } from '@sunbird-cb/utils'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import {
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRadioModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDatepickerModule,
} from '@angular/material'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { InitResolver } from './resolvers/init-resolve.service'
import { RouterModule } from '@angular/router'
import { HomeRoutingModule } from './home.rounting.module'
import { HomeComponent } from './routes/home/home.component'
import { UsersViewComponent } from './routes/users-view/users-view.component'
import { AvatarPhotoModule, BreadcrumbsOrgModule, UIORGTableModule, ScrollspyLeftMenuModule } from '@sunbird-cb/collection'
import { AboutComponent } from './routes/about/about.component'
import { RolesAccessComponent } from './routes/roles-access/roles-access.component'
import { ApprovalsComponent } from './routes/approvals/approvals.component'
import { WorkallocationComponent } from './routes/workallocation/workallocation.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { ExportAsModule } from 'ngx-export-as'
import { WorkallocationModule } from '../workallocation/workallocation.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { UIAdminTableModule } from '../../head/work-allocation-table/ui-admin-table.module'
import { WelcomeComponent } from './routes/welcome/welcome.component'
import { RainDashboardsModule } from '@sunbird-cb/rain-dashboards'
import { MdoinfoComponent } from './routes/mdoinfo/mdoinfo.component'
import { LeadershipComponent } from './routes/leadership/leadership.component'
import { StaffComponent } from './routes/staff/staff.component'
import { BudgetComponent } from './routes/budget/budget.component'
import { LeftMenuComponent } from './components/left-menu/left-menu.component'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSortModule } from '@angular/material/sort'
import { LeadershiptableComponent } from './components/leadershiptable/leadershiptable.component'
import { BudgettableComponent } from './components/budgettable/budgettable.component'
import { AdduserpopupComponent } from './components/adduserpopup/adduserpopup.component'
import { StaffdetailspopupComponent } from './components/staffdetailspopup/staffdetailspopup.component'
import { MdoInfoService } from './services/mdoinfo.service'
import { BudgetschemepopupComponent } from './components/budgetschemepopup/budgetschemepopup.component'
import { BudgetproofspopupComponent } from './components/budgetproofspopup/budgetproofspopup.component'
import { UploadService } from './services/upload.service'
import { AdmintableComponent } from './components/admintable/admintable.component'
import { UsersModule } from '../users/users.module'
import { BlendedApprovalsComponent } from './routes/blended-approvals/blended-approvals.component'
import { ReportsSectionComponent } from './routes/reports-section/reports-section.component'
import { TrainingPlanDashboardComponent } from './routes/training-plan-dashboard/training-plan-dashboard.component'
import { TrainingPlanDashboardService } from './services/training-plan-dashboard.service'
import { AdminsTableComponent } from './routes/admins-table/admins-table.component'
import { ReportsVideoComponent } from './routes/reports-video/reports-video.component'
import { ProfleApprovalBulkUploadComponent } from './routes/profle-approval-bulk-upload/profle-approval-bulk-upload.component'
import { LeftMenuModule } from '../../head/left-menu/left-menu.module'
import { UserCardComponent } from './components/user-cards/user-card.component'
import { SearchComponent } from './components/search/search.component'
import { FilterComponent } from './components/filter/filter.component'
import { FilterSearchPipeModule } from '../pipes/filter-search/filter-search.module'
import { ApprovalPendingComponent } from './routes/approvals/approval-pending/approval-pending.component'
import { BulkUploadComponent } from './routes/approvals/bulk-upload/bulk-upload.component'
import { RejectionPopupComponent } from './components/rejection-popup/rejection-popup.component'

@NgModule({
  declarations: [
    HomeComponent,
    UsersViewComponent,
    AboutComponent,
    RolesAccessComponent,
    ApprovalsComponent,
    WorkallocationComponent,
    WelcomeComponent,
    MdoinfoComponent,
    LeadershipComponent,
    StaffComponent,
    BudgetComponent,
    LeftMenuComponent,
    LeadershiptableComponent,
    AdmintableComponent,
    BudgettableComponent,
    AdduserpopupComponent,
    StaffdetailspopupComponent,
    BudgetschemepopupComponent,
    BudgetproofspopupComponent,
    BlendedApprovalsComponent,
    ReportsSectionComponent,
    TrainingPlanDashboardComponent,
    AdminsTableComponent,
    ReportsVideoComponent,
    ProfleApprovalBulkUploadComponent,
    UserCardComponent,
    SearchComponent,
    FilterComponent,
    ApprovalPendingComponent,
    BulkUploadComponent,
    RejectionPopupComponent,
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    UIORGTableModule,
    WidgetResolverModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    FormsModule,
    RouterModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    PipeFilterModule,
    PipeHtmlTagRemovalModule,
    PipeRelativeTimeModule,
    AvatarPhotoModule,
    // EditorSharedModule,
    // CkEditorModule,
    PipeOrderByModule,
    BreadcrumbsOrgModule,
    WidgetResolverModule,
    ScrollspyLeftMenuModule,
    MatRadioModule,
    ExportAsModule,
    WorkallocationModule,
    NgxPaginationModule,
    UIAdminTableModule,
    RainDashboardsModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    UsersModule,
    MatDatepickerModule,
    PipeDurationTransformModule,
    LeftMenuModule,
    FilterSearchPipeModule,
  ],
  entryComponents: [
    AdduserpopupComponent,
    StaffdetailspopupComponent,
    BudgetschemepopupComponent,
    BudgetproofspopupComponent,
    ReportsVideoComponent,
    UserCardComponent,
    SearchComponent,
    FilterComponent,
    RejectionPopupComponent,
  ],
  providers: [
    // CKEditorService,
    // LoaderService,
    InitResolver,
    MdoInfoService,
    UploadService,
    TrainingPlanDashboardService,
  ],
})
export class HomeModule {

}
