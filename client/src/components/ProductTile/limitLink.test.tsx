import limitLink from "./limitLink";

test("returns a string", () => {
  expect(limitLink("test")).toBe("test");
});

test("removes http:// from beginning of string", () => {
  expect(limitLink("http://someaddress.com")).toBe("someaddress.com");
});

test("removes https:// from beginning of string", () => {
  expect(limitLink("https://someaddress.com")).toBe("someaddress.com");
});

test("shortens long addresses", () => {
  expect(
    limitLink(
      "https://someaddress.com/en/products/international/first/second/third/"
    )
  ).toBe("someaddress.com/en/products/international/first/...");
});

test("shortens very long addresses", () => {
  expect(
    limitLink(
      "https://www.deltalight.com/en/products/light/boxy/boxy-r?form=searchForm&reference_nr=&location=2&fixation=1&assembly=3&new=&is_essential=&type=light&region=int&is_deco=0"
    )
  ).toBe("www.deltalight.com/en/products/light/boxy/...");
});
