import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { CreateEventComponent } from './routes/create-event/create-event.component'
import { ViewEventComponent } from './routes/view-event/view-event.component'
import { ListEventComponent } from './routes/list/list-event.component'
import { ParticipantsComponent } from './components/participants/participants.component'
import { SuccessComponent } from './components/success/success.component'
import { EventListViewComponent } from './components/event-list-view/event-list-view.component'
import { EventsHomeComponent } from './routes/events-home/events-home.component'
import { EventThumbnailComponent } from './components/event-thumbnail/event-thumbnail.component'
import { RouterModule } from '@angular/router'
import { EventsRoutingModule } from './events.routing.module'
import { BreadcrumbsOrgModule, ScrollspyLeftMenuModule } from '@sunbird-cb/collection'
import { PipeFilterModule, PipeHtmlTagRemovalModule, PipeOrderByModule, PipeRelativeTimeModule } from '@sunbird-cb/utils'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete'
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog'
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list'
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu'
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator'
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner'
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio'
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSortModule } from '@angular/material/sort'
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PipeEmailModule } from '../pipes/pipe-email/pipe-email.module'

@NgModule({
    declarations: [
        CreateEventComponent,
        ViewEventComponent,
        ParticipantsComponent,
        ListEventComponent,
        EventListViewComponent,
        EventsHomeComponent,
        EventThumbnailComponent,
        SuccessComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        EventsRoutingModule,
        BreadcrumbsOrgModule,
        MatSidenavModule,
        MatListModule,
        ScrollspyLeftMenuModule,
        MatProgressSpinnerModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatRadioModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatSortModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatPaginatorModule,
        PipeFilterModule,
        PipeHtmlTagRemovalModule,
        PipeRelativeTimeModule,
        PipeOrderByModule,
        BreadcrumbsOrgModule,
        WidgetResolverModule,
        ScrollspyLeftMenuModule,
        MatRadioModule,
        MatExpansionModule,
        MatDividerModule,
        PipeEmailModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        MatDatepickerModule,
        MatNativeDateModule,
        DatePipe,
    ]
})
export class EventsModule { }
