const fg = require('fast-glob');
const projectImages = fg.sync(['**/img/**/*', '!**/_site/img/**/*']);
const { DateTime } = require("luxon");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });
  eleventyConfig.addCollection('gallery', function (collection) {
    return projectImages;
  });
  return {
    dir: {
      input: "./",
      output: "./_site",
      layouts: "./_layouts",
    },
    templateFormats: ["html", "liquid", "md", "njk"],
  };
};