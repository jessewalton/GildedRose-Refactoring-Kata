class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (item.name == "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      if (item.name == "Aged Brie") {
        item.sellIn = item.sellIn - 1;
        item.quality = item.quality + 1;
    
        if (item.sellIn < 0) {
          item.quality = item.quality + 1;
        }

        if (item.quality > 50) {
          item.quality = 50;
        }
      }

      else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {

        item.sellIn = item.sellIn - 1;
  
        if (item.sellIn < 0) { 
          item.quality = 0;
        } else if (item.sellIn < 5) { 
          item.quality = item.quality += 3;
        } else if (item.sellIn < 10) {
          item.quality = item.quality += 2;
        } else if (item.sellIn >= 10) {
          item.quality = item.quality += 1;
        }

        if (item.quality > 50) {
          item.quality = 50;
        }
      }

      else { //other items
        item.quality = item.quality - 1;
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
          item.quality = item.quality - 1;
        }

        if (item.quality < 0) {
          item.quality = 0;
        }
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
