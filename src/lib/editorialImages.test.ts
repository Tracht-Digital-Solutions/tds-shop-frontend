import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { bandIds, bandSrc, shelfBanner } from "./editorialImages";
import { imageInfo } from "./imageCatalog";

describe("shelf banners", () => {
  it("ship every width and a catalogue entry for each banner", () => {
    for (const id of bandIds) {
      for (const w of [480, 960, 1440, 1920]) {
        expect(existsSync(`public${bandSrc(id, w)}`), bandSrc(id, w)).toBe(true);
      }
      expect(imageInfo(bandSrc(id))?.height, id).toBe(360);
    }
  });

  it("gives a banner only to categories that have one", () => {
    expect(shelfBanner("webauftritt")).toBe("web");
    expect(shelfBanner("schulung")).toBe("training");
    expect(shelfBanner("netzwerk")).toBeNull();
    expect(shelfBanner("unbekannt")).toBeNull();
  });
});
