import {describe,expect,it} from 'vitest';
import {existsSync,readFileSync} from 'node:fs';
import {productImageCatalog,withProductImage,productImageAttributes,productImageSchema} from './productImages';
import type {CatalogProduct} from './types';

describe('unique service product images',()=>{
 it('ships one complete responsive image per published product in both languages',()=>{
  const unique=new Map(Object.values(productImageCatalog).map(r=>[r.slug,r]));
  expect(unique.size).toBe(43);
  for(const r of unique.values()){
   for(const lang of ['de','en'] as const){expect(productImageCatalog[r.slugs[lang]]).toEqual(r);expect(r.alt[lang].length).toBeGreaterThan(30);}
   for(const width of [480,960,1440])for(const ext of ['webp','avif']){
    const p='public'+r.src.replace('.webp',(width===1440?'':'-'+width)+'.'+ext);expect(existsSync(p),p).toBe(true);
   }
   expect(readFileSync('public'+r.src).includes(Buffer.from('trainedAlgorithmicMedia')),r.slug).toBe(true);
  }
 });
 it('keeps merchant images and later CMS uploads intact',()=>{
  const slug=Object.keys(productImageCatalog)[0];
  const p={slug,offers:[{kind:'affiliate'}],imageUrl:'https://example.com/real-product.webp'} as CatalogProduct;
  expect(withProductImage(p)).toBe(p);
  const custom={...p,offers:[{kind:'own'}],imageUrl:'https://api.tracht-digital.de/content/uploads/custom.webp'} as CatalogProduct;
  expect(withProductImage(custom)).toBe(custom);
 });
 it('uses the same source and description for the visible photo and structured data',()=>{
  const slug=Object.keys(productImageCatalog)[0];
  const p=withProductImage({slug,title:'Service',url:'https://shop.tracht-digital.de/produkt/'+slug,offers:[{kind:'own'}],imageUrl:null} as CatalogProduct);
  expect(productImageAttributes(p,'de')?.alt).toBe(productImageSchema(p,'de')?.caption);
  expect(productImageSchema(p,'de')?.contentUrl).toBe(p.imageUrl);
 });
});
