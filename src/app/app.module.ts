import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './main-page/navigation-bar/navigation-bar.component';
import { SmartIconComponent } from './main-page/smart-icon/smart-icon.component';
import { SliderNavigationComponent } from './main-page/slider-navigation/slider-navigation.component';
import { MainPageContentComponent } from './main-page/main-page-content/main-page-content.component';
import { MainPageBackgroundComponent } from './main-page/main-page-background/main-page-background.component';
import { LoginOverlayComponent } from './main-page/login-overlay/login-overlay.component';
import { MainPageAboutComponent } from './main-page/main-page-about/main-page-about.component';
import { MainPageServicesComponent } from './main-page/main-page-services/main-page-services.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ApplicationComponent } from './application/application.component';
import { AppNavigationBarComponent } from './application/app-navigation-bar/app-navigation-bar.component';
import { FormsModule } from '@angular/forms';
import { AccountMenuComponent } from './application/account-menu/account-menu.component';
import { HomeGridLayoutComponent } from './application/home-grid-layout/home-grid-layout.component';
import { SelectMenuBoxComponent } from './application/select-menu-box/select-menu-box.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceManagerComponent } from './application/device-manager/device-manager.component';
import { DeviceManagerItemsComponent } from './application/device-manager-items/device-manager-items.component';
import { HouseGroundPlanComponent } from './application/house-ground-plan/house-ground-plan.component';
import { HomePageComponent } from './application/home-page/home-page.component';
import { RoomDetailsOverlayComponent } from './application/room-details-overlay/room-details-overlay.component';
import { SensorPickerOverlayComponent } from './application/sensor-picker-overlay/sensor-picker-overlay.component';
import { WeatherWidgetComponent } from './application/widgets/weather-widget/weather-widget.component';
import { TimeWidgetComponent } from './application/widgets/time-widget/time-widget.component';
import { WelcomeWidgetComponent } from './application/widgets/welcome-widget/welcome-widget.component';
import { GraphWidgetComponent } from './application/widgets/graph-widget/graph-widget.component';
import { TemperatureWidgetComponent } from './application/widgets/temperature-widget/temperature-widget.component';
import { SensorWidgetComponent } from './application/widgets/sensor-widget/sensor-widget.component';
import { HelpMenuComponent } from './application/help-menu/help-menu.component';
import { GraphSecondWidgetComponent } from './application/widgets/graph-second-widget/graph-second-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SmartIconComponent,
    SliderNavigationComponent,
    MainPageContentComponent,
    MainPageBackgroundComponent,
    LoginOverlayComponent,
    MainPageAboutComponent,
    MainPageServicesComponent,
    MainPageComponent,
    ApplicationComponent,
    AppNavigationBarComponent,
    AccountMenuComponent,
    HomeGridLayoutComponent,
    SelectMenuBoxComponent,
    DeviceManagerComponent,
    DeviceManagerItemsComponent,
    HouseGroundPlanComponent,
    HomePageComponent,
    RoomDetailsOverlayComponent,
    SensorPickerOverlayComponent,
    WeatherWidgetComponent,
    TimeWidgetComponent,
    WelcomeWidgetComponent,
    GraphWidgetComponent,
    TemperatureWidgetComponent,
    SensorWidgetComponent,
    HelpMenuComponent,
    GraphSecondWidgetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
