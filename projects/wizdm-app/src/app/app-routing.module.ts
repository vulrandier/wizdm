import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentResolver } from '@wizdm/content';

import { NavComponent } from './navigator/navigator.component';
import { AuthGuardService } from './navigator/guards/auth-guard.service';
import { PageGuardService } from './navigator/guards/page-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsPrivacyComponent } from './pages/terms-privacy/terms-privacy.component';
import { LoginComponent } from './pages/login/login.component';
import { HandlerComponent } from './pages/handler/handler.component';
import { UserComponent } from './pages/user/user.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { ProjectComponent } from './pages/project/project.component';
import { BrowserComponent } from './pages/browser/browser.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Define navigation routes
const routes: Routes = [

  // Global NotFound page using default language content
  { path: 'not-found', component: NotFoundComponent },

  // Redirection handler (for firebase password confirmation/reset and stuff)
  { path: 'handler', component: HandlerComponent },

  // Redirect to the language resolver asking for auto detection of the browser language
  { path: '', redirectTo: 'auto', pathMatch: 'full' },

  // Load the navigation with the selected language
  { path: ':lang', component: NavComponent,
    
    // Uses the content manager resolver to pre-fetch language data to be used by navigation
    resolve: { lang: ContentResolver },

    // Localized pages
    children: [
    
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'terms', redirectTo: 'terms/short', pathMatch: 'full' },
      { path: 'terms/:version', component: TermsPrivacyComponent },

      // Guarded pages requiring authentication
      { path: '', 
        
        canActivateChild: [AuthGuardService],
        
        children: [
          { path: 'profile', component: UserComponent, canDeactivate: [PageGuardService] },
          { path: 'apply', component: ApplyComponent, canDeactivate: [PageGuardService] },
          { path: 'projects', component: BrowserComponent }, //canDeactivate: [PageGuardService] },
          { path: 'projects/:id', component: ProjectComponent, canDeactivate: [PageGuardService] },
          { path: 'upload', component: UploadComponent }, //, canDeactivate: [PageGuardService] },
          { path: 'messages', component: ConversationsComponent }, //, canDeactivate: [PageGuardService] },
          //{ path: 'messages/:id', component: ConversationsComponent }, //, canDeactivate: [PageGuardService] }
        ]
      },
    
      // NotFound page with localized translation loaded
      { path: 'not-found', component: NotFoundComponent },
      
      // Localized redirector to missing pages
      { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
    ]
  },

  // Global redirector to missing pages unlocalized
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)//, { onSameUrlNavigation: 'reload'} ),//, { useHash: true });
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}