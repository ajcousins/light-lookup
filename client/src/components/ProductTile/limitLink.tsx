const limitLink = (link: string) => {
  let shortened = link.replace(/^(http:\/\/|https:\/\/)/, "");
  if (shortened.length < 50) return shortened;
  shortened = shortened.split("/").reduce((prev, cur) => {
    if (prev.length + cur.length + 1 <= 50) return prev + "/" + cur;
    else return prev;
  });
  if (shortened.charAt(shortened.length - 1) !== "/")
    shortened = shortened + "/";

  return shortened + "...";
};

export default limitLink;
