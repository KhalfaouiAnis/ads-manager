import { Component } from '@angular/core';
import { CheckboxChangeEventDetail, ModalController } from '@ionic/angular';
import { AddNewAdPage } from '../add-new-ad/add-new-ad.page';
import { AdModel } from '../models/AdModel';
import { AdsService } from '../services/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ads: AdModel[] = []
  today: number = Date.now();

  constructor(public modalCtlr: ModalController, public adsService: AdsService) {
    this.getAllAds()
  }

  async createAd() {
    const modal = await this.modalCtlr.create({
      component: AddNewAdPage,
    })
    modal.onDidDismiss().then((data) => {
      this.getAllAds().then()
    })
    return await modal.present()
  }

  async getAllAds() {
    this.ads = await this.adsService.getAllAds()
  }

  async filterAds(e: any) {
    if (e.target.checked) {
      this.ads = await this.adsService.getMyAds()
    } else {
      await this.getAllAds()
    }
  }

  async deleteAd(id: number) {
    await this.adsService.deleteAd(id)
    await this.getAllAds()
  }
}
