export default function parseFilename(productName: string) {
  let parsedString = productName
    .split(" ")
    .join("-")
    .split("_")
    .join("-")
    .toLowerCase();
  return `${parsedString}__${Date.now()}.jpeg`;
}
