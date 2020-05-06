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

    // for each item
    for (let i = 0; i < this.items.length; i++) {

      // if it's not 'aged brie' AND it's not 'backstage passes'
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {

        // (if it's not 'aged brie' AND it's not 'backstage passes') and quality is positive
        if (this.items[i].quality > 0) {

          // ((if it's not 'aged brie' AND it's not 'backstage passes') and quality is positive) and it is not sulfuras
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {

            // reduce quality by 1
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } 
      // if it is 'aged brie' or 'backstage passes'
      else {

        // (if it is 'aged brie' or 'backstage passes') and quality is less than 50
        if (this.items[i].quality < 50) {

          // increase quality by 1
          this.items[i].quality = this.items[i].quality + 1;

          // ((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes'
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {

            // (((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes') and sellIn is less than 11
            if (this.items[i].sellIn < 11) {
              
              // ((((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes') and sellIn is less than 11) and quality is less than 50
              if (this.items[i].quality < 50) {

                // increase quality by 1
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

            // (((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes') and sellIn is less than 6
            if (this.items[i].sellIn < 6) {

              // ((((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes') and sellIn is less than 6) and quality is less than 50
              if (this.items[i].quality < 50) {

                // increase quality by 1
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      // if it is not 'sulfuras'
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {

        // reduce sellIn by 1
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // if sellIn is less than 0
      if (this.items[i].sellIn < 0) {

        // (if sellIn is less than 0) and it is not 'aged brie'
        if (this.items[i].name != 'Aged Brie') {

          // ((if sellIn is less than 0) and it is not 'aged brie') and it is not 'backstage passes'
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {

            // (((if sellIn is less than 0) and it is not 'aged brie') and it is not 'backstage passes') and quality is greater than 0
            if (this.items[i].quality > 0) {

              // ((((if sellIn is less than 0) and it is not 'aged brie') and it is not 'backstage passes') and quality is greater than 0) and it is not 'sulfuras'
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {

                // reduce quality by 1
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } 

          // ((if sellIn is less than 0) and it is not 'aged brie') and it is 'backstage passes'
          else {

            // set quality to 0
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } 
        
        // (if sellIn is less than 0) and it is 'aged brie'
        else {

          // ((if sellIn is less than 0) and it is 'aged brie') and quality is less than 50
          if (this.items[i].quality < 50) {

            // increase quality by 1
            this.items[i].quality = this.items[i].quality + 1;
          }
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
