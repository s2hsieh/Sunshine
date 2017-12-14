import { ForecastListComponent } from './forecast-list/forecast-list';
import { NgModule } from '@angular/core';
import { HeaderButtonsComponent } from './header-buttons/header-buttons';
import { IonicModule } from 'ionic-angular/module';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
	declarations: [HeaderButtonsComponent, ForecastListComponent],
	imports: [IonicModule, PipesModule],
	exports: [HeaderButtonsComponent, ForecastListComponent]
})
export class ComponentsModule {}
