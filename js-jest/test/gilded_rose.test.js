const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {

  describe("other items", function() {
    it("should decrement expiration date", function() {
      const gildedRose = new Shop([new Item("", 25, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(24);
    });

    it("should decrement expiration date past 0", function() {
      const gildedRose = new Shop([new Item("", 0, 50)]);
      let items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
    });

    it("should degrade quality", function() {
      const gildedRose = new Shop([new Item("", 50, 25)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(24);
    });

    it("should degrade quality twice as fast if past expiration date", function() {
      const gildedRose = new Shop([new Item("", 0, 25)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it("should not degrade quality below 0 if before expiration date", function() {
      const gildedRose = new Shop([
        new Item("", 50, 1),
        new Item("", 50, 0)
      ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].quality).toBe(0);
    });

    it("should not degrade quality below 0 if after expiration date", function() {
      const gildedRose = new Shop([
        new Item("", 0, 2),
        new Item("", 0, 1)
      ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Aged Brie", function() {
    it("should decrement expiration date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 25, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(24);
    });

    it("should decrement expiration date past 0", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 1)]);
      let items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
    });

    it("should increase in quality by 1 if before expiration date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 50, 0)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });
    
    it("should increase in quality twice as fast if past expiration date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    it("should limit quality to 50 if before expiration date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 50, 50)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it("should limit quality to 50 if past expiration date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe("backstage passes", function() {
    it("should decrement expiration date", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 25, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(24);
    });

    it("should decrement expiration date past 0", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1)]);
      let items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
    });

    it("should increase in quality by 1 if more than 10 days before expiration date", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });

    it("should increase quality by 2 if between 6 and 10 days before expiration date", function() {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)
      ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
      expect(items[1].quality).toBe(2);
    });

    it("should increase quality by 3 if between 1 and 5 days before expiration date", function() {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 0),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)
      ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(3);
      expect(items[1].quality).toBe(3);
    });

    it("should set quality to 0 if past expiration date", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should never let quality be over 50", function() {
      const tickets = [];
      for (let i = 0; i < 50; i++) {
        tickets.push(new Item("Backstage passes to a TAFKAL80ETC concert", i, 50));
      }
      const gildedRose = new Shop(tickets);
      let items = gildedRose.updateQuality();
      for (let i = 0; i < 50; i++) {
        expect(items[i].quality).toBeLessThanOrEqual(50);
      }
    });
  });

  describe("sulfuras", function() {
    it("should not expire", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 25, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(25);
    });

    it("should not lose value", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 25, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(25);
    });
  });
});


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

boolean logic notes:
((if it's not 'aged brie' AND it's not 'backstage passes') and quality is positive) and it is not sulfuras -> reduce quality by 1
if not 'aged brie' or 'backstage passes' and quality is positive 
(if it is 'aged brie' or 'backstage passes') and quality is less than 50 -> increase quality by 1
((((if it is 'aged brie' or 'backstage passes') and quality is less than 50) and it is 'backstage passes') and sellIn is less than 11) and quality is less than 50 -> increase quality by 1

(if it is not 'sulfuras') -> reduce sellIn by 1
((((if sellIn is less than 0) and it is not 'aged brie') and it is not 'backstage passes') and quality is greater than 0) and it is not 'sulfuras' -> reduce quality by 1
((if sellIn is less than 0) and it is not 'aged brie') and it is 'backstage passes' -> set quality to 0
((if sellIn is less than 0) and it is 'aged brie') and quality is less than 50 -> increase quality by 1
*/