import { Injectable } from '@angular/core';

const items = {
  'UNKNOWN': 'unknown_item.png',
  'empty mug': 'mug_empty.png',
  'empty cup': 'cup_empty.png',
  'empty glass': 'glass_empty.png',
  'mug of ale': 'mug_ale.png',
  'glass of wine': 'glass_full.png',
  'cup of tea': 'cup_full.png',
  'stick of bread': 'bread.png',
  'grilled lamb chop': 'lamb.png',
  'grilled pork tenderloin': 'pork.png',
  'staff of creation': 'staff.png',
  'antique key': 'key.png',
  'lantern': 'lantern.png',
  'mouse': 'mouse.png',
  'table': 'table.png',
  'chest': 'chest.png',
  'oak tree': 'tree.png',
  'Adam Baker': 'npc_baker.png',
  'Paul Butcher': 'npc_butcher.png',
  'Sarah': 'npc_barmaid.png',
  'pocket watch': 'pocketwatch.png',
  'guitar': 'guitar.png'
};

const unknownItem = 'unknown_item.png';

@Injectable()
export class ImageService {
  private images: Map<string, HTMLImageElement>;
  private data: Map<string, string>;

  constructor() {
    this.images = new Map();
    this.data = new Map();

    // Preload all images
    const prefix = './assets/images/items/';
    Object.keys(items).forEach(name => {
      const img = new Image();
      img.onload = () => {
        this.images.set(name, img);
      };
      img.src = prefix + items[name];
    });
  }

  public getImage(name: string): string {
    let img = this.images.get(name);
    if (img === undefined) {
      img = this.images.get('UNKNOWN');
    }
    return img.src;
  }
}
