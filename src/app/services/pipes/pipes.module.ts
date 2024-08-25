import { NgModule } from '@angular/core';
import { AssetTypePipe } from './asset-pipe/asset-type.pipe';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';

@NgModule({
    imports: [],
    declarations: [
        AssetTypePipe,
        SafeHtmlPipe
    ],
    exports: [
        AssetTypePipe,
        SafeHtmlPipe
    ]
})
export class PipesModule {

}
