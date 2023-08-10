// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from 'ngx-clipboard';
// Perfect ScrollBar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialPreviewComponent } from './material-preview.component';
// Core Module
import { PortletModule } from '../portlet/portlet.module';
// Highlight JS
import { HighlightModule } from 'ngx-highlightjs';
import {CoreModule} from "../../../../../core/core.module";

@NgModule({
    imports: [
        CommonModule,
        HighlightModule,
        PerfectScrollbarModule,
        PortletModule,
        ClipboardModule,

        // angular material modules
        MatTabsModule,
        MatExpansionModule,
        MatCardModule,
        MatIconModule,
        CoreModule,
    ],
	exports: [MaterialPreviewComponent],
	declarations: [MaterialPreviewComponent]
})
export class MaterialPreviewModule {
}
