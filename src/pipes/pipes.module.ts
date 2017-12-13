import { NgModule } from '@angular/core';
import { UvLevelPipe } from './uv-level/uv-level';
import { DegSymbolPipe } from './deg-symbol/deg-symbol';
@NgModule({
	declarations: [UvLevelPipe, DegSymbolPipe],
	imports: [],
	exports: [UvLevelPipe, DegSymbolPipe]
})
export class PipesModule {}
