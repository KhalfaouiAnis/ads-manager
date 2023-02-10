import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddNewAdPage } from '../add-new-ad/add-new-ad.page';
import { AdModel } from '../models/AdModel';
import { AdsService } from '../services/ads.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ads: AdModel[] = []
  today: number = Date.now();
  username: string | null | undefined = '';

  constructor(
    private auth: Auth,
    private modalCtlr: ModalController,
    private adsService: AdsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getAllAds()
    this.username = this.auth.currentUser.email.split("@")[0];
  }

  async createAd() {
    const modal = await this.modalCtlr.create({
      component: AddNewAdPage,
    })
    modal.onDidDismiss().then(() => {
      this.getAllAds().then()
    })
    return await modal.present()
  }

  async getAllAds() {
    this.ads = await this.adsService.getAllAds()
  }

  async filterAds(e: any) {
    if (e.target.checked) {
      this.ads = await this.adsService.getMyAds(this.username)
    } else {
      await this.getAllAds()
    }
  }

  async deleteAd(id: number) {
    await this.adsService.deleteAd(id)
    await this.getAllAds()
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/', { replaceUrl: true })
  }
}
