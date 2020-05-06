// all items 
// - sellIn: days to sell the item
// - quality: denotes value of item

/*
  sellBy > 0, quality -= 1 per day
  sellby = 0, quality -= 2 per day

  quality >= 0 && quality <= 50

  if (agedBrie) quality += 1
  if (sulfuras) never has to be sold or loses quality
  if (backstagePasses) {
    if (sellIn > 10) quality -= 1
    elif (sellIn <= 10) quality += 2
    elif (sellIn <= 5) quality += 3
    else { quality = 0 }

  }





*/



class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn; // days to sell the item (lower daily)
    this.quality = quality; // value of item (lower daily)
  }
}

/*

other 
  sellIn -= 1
  if (quality > 0) quality -= 1
  if (quality > 0 && sellIn < 0) quality -= 1

aged brie 
  sellIn -= 1
  if (quality < 50) quality += 1
  if (sellIn < 0 && quality < 50) quality += 1

backstage passes
  sellIn -= 1
  if (sellIn > 10) quality += 1
    elif (sellIn <= 10) quality += 2
    elif (sellIn <= 5) quality += 3
    elif (sellIn < 0) quality = 0 

sulfuras



((if it's not 'aged brie' AND it's not 'backstage passes') and quality is positive) and it is not sulfuras -> reduce quality by 1
if not 'aged brie' or 'backstage passes' and quality is positive 
(if it is 'aged brie' or 'backstage passes') and quality is less than 50 -> increase quality by 1
((((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes') and sellIn is less than 11) and quality is less than 50 -> increase quality by 1

(if it is not 'sulfuras') -> reduce sellIn by 1
((((if sellIn is less than 0) and it is not 'aged brie') and it is not 'backstage passes') and quality is greater than 0) and it is not 'sulfuras' -> reduce quality by 1
((if sellIn is less than 0) and it is not 'aged brie') and it is 'backstage passes' -> set quality to 0
((if sellIn is less than 0) and it is 'aged brie') and quality is less than 50 -> increase quality by 1
*/

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
