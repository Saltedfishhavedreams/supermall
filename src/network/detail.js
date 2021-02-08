import { request } from 'network/request'

export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export class Goods{
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.realPrice = itemInfo.lowNowPrice
        this.columns = columns
        this.services = services
    }
}

export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }

export class GoodsParam {
    constructor(info, rule) {
        // img可能没有值(某些商品有值，某些商品没值)
        this.image = info.image ? info.image : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}