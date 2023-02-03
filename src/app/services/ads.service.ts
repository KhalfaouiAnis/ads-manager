import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AdModel } from '../models/AdModel';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create()
  }

  async createAd(ad: AdModel) {
    this.getAllAds().then(async (ads: AdModel[]) => {
      if (ads && ads.length) {
        await this.storage.set("ads", [ad, ...ads])
      } else {
        await this.storage.set("ads", [ad])
      }
    })
  }

  deleteAd(id: number) {
    this.getAllAds().then((ads: AdModel[]) => {
      this.storage.set("ads", [...ads.filter((item) => item.id !== id)])
    })
  }

  async getAllAds() {
    return await this.storage.get('ads');
  }

  async getMyAds() {
    const ads: AdModel[] = await this.storage.get('ads')
    return ads.filter(ad => ad.ad_creator === "Anis")
  }
}