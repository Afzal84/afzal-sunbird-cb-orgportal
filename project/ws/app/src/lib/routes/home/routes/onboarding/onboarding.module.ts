import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OnboardingComponent } from './onboarding.component'
import { ConfigResolveService } from '../../resolvers/config-resolve.service'
import { PageResolve } from '@sunbird-cb/utils'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { CustomSelfRegistrationComponent } from './custom-self-registration/custom-self-registration.component'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { LoadingPopupComponent } from './loading-popup/loading-popup.component'
import { BulkUploadComponent } from '../users-view/bulk-upload/bulk-upload.component'
import { UsersListResolve } from '../../resolvers/users-list-resolve.service'
import { SingleUserCreationComponent } from '../users-view/single-user-creation/single-user-creation.component'
import { MatExpansionModule } from '@angular/material/expansion'

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    data: {
      pageId: 'home/onboarding',
      module: 'onboarding',
      pageType: 'feature',
      pageKey: 'onboarding',
      path: '',
    },
    resolve: {
      configService: ConfigResolveService,
      pageData: PageResolve,
    },
    children: [
      {
        path: '',
        redirectTo: 'self-registration',
        pathMatch: 'full',
      },
      {
        path: 'self-registration',
        component: CustomSelfRegistrationComponent,
        data: {
          pageId: 'home/onboarding/self-registration',
          module: 'onboarding',
          path: 'self-registration',
        },
      },
      {
        path: 'single-user',
        component: SingleUserCreationComponent,
        data: {
          pageId: 'users',
          module: 'User',
          pageType: 'feature',
          pageKey: 'users-view',
        },
        resolve: {
          usersList: UsersListResolve,
          pageData: PageResolve,
          configService: ConfigResolveService,
        },
      },
      {
        path: 'bulk-creation',
        component: BulkUploadComponent,
        data: {
          pageId: 'users',
          module: 'User',
          pageType: 'feature',
          pageKey: 'users-view',
        },
        resolve: {
          usersList: UsersListResolve,
          pageData: PageResolve,
          configService: ConfigResolveService,
        },
      },

    ],

  },
]

@NgModule({
  declarations: [OnboardingComponent, CustomSelfRegistrationComponent, LoadingPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatExpansionModule,
  ],
})
export class OnboardingModule { }
