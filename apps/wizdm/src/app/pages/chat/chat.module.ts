import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { ContentRouterModule, RoutesWithContent } from '@wizdm/content';
import { RedirectModule } from '@wizdm/redirect';
import { GtagModule } from '@wizdm/gtag';
import { AvatarModule } from '@wizdm/elements/avatar';
import { IconModule } from '@wizdm/elements/icon';
import { ReadmeModule } from '@wizdm/elements/readme';
import { DialogModule } from '@wizdm/elements/dialog';
import { ActionbarModule } from 'app/navigator/actionbar';
import { SidenavModule } from 'app/navigator/sidenav';
import { AuthGuard } from 'app/utils/auth-guard';
import { CanLeaveModule, CanLeaveGuard } from 'app/utils/can-leave';
import { ChatConversationModule } from './conversation';
import { ChatMessageModule } from './message';
import { ChatComposerModule } from './composer';
import { ChatComponent } from './chat.component';

const routes: RoutesWithContent = [
  {
    path: '',
    content: ['chat', 'emoji-keys'],
    component: ChatComponent,
    canActivate: [ AuthGuard ],
    canDeactivate: [ CanLeaveGuard ]
  }
];

@NgModule({
  declarations: [ ChatComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule,
    RedirectModule,
    GtagModule,
    IconModule, 
    AvatarModule,
    ReadmeModule,
    DialogModule,
    ActionbarModule,
    SidenavModule,
    //ScrollModule,
    CanLeaveModule,
    ChatConversationModule,
    ChatMessageModule,
    ChatComposerModule,
    ContentRouterModule.forChild(routes)
  ]
})
export class ChatModule { }
