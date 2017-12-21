import { NgModule } from '@angular/core';
import { UvLevelPipe } from './uv-level/uv-level';
import { DegSymbolPipe } from './deg-symbol/deg-symbol';
import { IconSetPipe } from './icon-set/icon-set';
@NgModule({
	declarations: [UvLevelPipe, DegSymbolPipe, IconSetPipe],
	imports: [],
	exports: [UvLevelPipe, DegSymbolPipe, IconSetPipe]
})
export class PipesModule { }
