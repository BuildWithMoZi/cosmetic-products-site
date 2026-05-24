export const HERO_ID = "hero";

export function scrollToHero() {
  const hero = document.getElementById(HERO_ID);
  if (hero) {
    hero.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
