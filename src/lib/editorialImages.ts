/** Decorative category scenes; never substitute these for product photography. */
const categories: Record<string, string> = {
  netzwerk: 'network', peripherie: 'workplace', technik: 'network',
  webauftritt: 'web', 'seo-sichtbarkeit': 'seo', 'e-mail-domain': 'email',
  'wartung-betrieb': 'maintenance', 'recht-datenschutz': 'legal',
  digitalisierung: 'digital', schulung: 'training', leistungspakete: 'packages',
  ausstattung: 'workplace', datensicherung: 'backup', 'mobiles-arbeiten': 'mobile',
};
export const soonArtwork = ['web','seo','email','maintenance','legal','digital','training','packages'];
export function categoryArtwork(category: string | null): string | null {
  return category === null ? 'hero' : categories[category] ?? null;
}
export const editorialSrc = (id: string, width = 960): string => `/images/editorial/${id}-2026-${width}.webp`;
export const editorialSrcset = (id: string): string => [480,960,1440].map(w => `${editorialSrc(id,w)} ${w}w`).join(', ');
/** Wide 4:1 banners over the front-page shelves; a 16:9 scene cropped to that strip loses its subject. */
/** Categories that have a banner; any other shelf shows no picture rather than a cropped scene. */
export const bandIds = ['web','seo','email','maintenance','legal','digital','training','packages'] as const;
export function shelfBanner(category: string): string | null {
  const id = categoryArtwork(category);
  return id !== null && (bandIds as readonly string[]).includes(id) ? id : null;
}
export const bandSrc = (id: string, width = 1440): string => `/images/editorial/${id}-band-2026-${width}.webp`;
export const bandSrcset = (id: string): string => [480,960,1440,1920].map(w => `${bandSrc(id,w)} ${w}w`).join(', ');
