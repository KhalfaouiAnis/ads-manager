import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdModel } from '../models/AdModel';
import { AdsService } from '../services/ads.service';

@Component({
  selector: 'app-add-new-ad',
  templateUrl: './add-new-ad.page.html',
  styleUrls: ['./add-new-ad.page.scss'],
})
export class AddNewAdPage implements OnInit {
  categories: ("Education" | "Travel")[] = [];
  selectedCategory: "Education" | "Travel" = "Education";

  newAd: AdModel = {
    id: 0,
    ad_creator: "",
    category: 'Education',
    creation_date: new Date(),
    description: '',
    title: ''
  };

  ad_creator = '';
  title = '';
  description = '';
  category: "Education" | "Travel" = 'Education';
  creation_date = new Date();

  constructor(public modalCtlr: ModalController, public adsService: AdsService) {

  }

  ngOnInit() {
    this.categories.push('Education', 'Travel')
  }

  async createAd() {
    this.newAd = ({
      id: Math.random(),
      ad_creator: this.ad_creator,
      title: this.title,
      description: this.description,
      category: this.selectedCategory,
      creation_date: this.creation_date
    })

    try {
      await this.adsService.createAd(this.newAd)
    } catch (error) {
      console.log("can't save empty Ad");
    }

    this.dismiss()
  }

  selectCategory(index: number) {
    this.selectedCategory = this.categories[index]
  }

  async dismiss() {
    await this.modalCtlr.dismiss(this.newAd)
  }
}
