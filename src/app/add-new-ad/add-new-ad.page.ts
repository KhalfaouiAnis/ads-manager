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

  newAd: AdModel | {} = {};

  ad_creator = 'Anis';
  title = '';
  description = '';
  category: "Education" | "Travel" = 'Education';
  creation_date = new Date();
  image_url = "";

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
      creation_date: this.creation_date,
      image: this.image_url ? this.image_url : ''
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

  loadImageFromDevice(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
      this.image_url = blobURL;
    };

    reader.onerror = (error) => {
      console.log("error uploading image: ", error)
    };
  };
}
