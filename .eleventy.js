const {DateTime} = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/images');

  eleventyConfig.addFilter("postDate",(dateObj) =>{
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "pug",

    dir: {
      input: "src",
      output: "public"
    }
  }
};
