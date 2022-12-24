const fg = require('fast-glob');
const projectImages = fg.sync(['**/img/**/*', '!**/_site/img/**/*']);
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addCollection('gallery', function(collection) {
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
