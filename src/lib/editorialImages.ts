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
