// stylelint.config.cjs

module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-order"],
  overrides: [
    // SCSS / CSS
    {
      files: ["**/*.{css,scss}"],
      customSyntax: "postcss-scss",
    },
    // Astro
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    // Astroの :global() を許可
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],

    // BEM許可
    "selector-class-pattern": null,

    // 空コメント許可
    "scss/comment-no-empty": null,

    // プロパティ並び順
    "order/properties-order": [
      {
        groupName: "Content",
        properties: ["content", "list-style", "list-style-type", "list-style-position", "list-style-image", "counter-reset", "counter-increment", "quotes"],
      },
      {
        groupName: "Positioning",
        properties: ["position", "z-index", "top", "right", "bottom", "left", "inset"],
      },
      {
        groupName: "Box Model",
        properties: ["margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "margin-inline", "margin-inline-start", "margin-inline-end", "margin-block", "margin-block-start", "margin-block-end", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "padding-inline", "padding-inline-start", "padding-inline-end", "padding-block", "padding-block-start", "padding-block-end", "width", "min-width", "max-width", "height", "min-height", "max-height"],
      },
      {
        groupName: "Display",
        properties: ["display", "flex", "flex-direction", "flex-wrap", "flex-flow", "justify-content", "justify-items", "justify-self", "align-items", "align-content", "align-self", "gap", "row-gap", "column-gap", "grid", "grid-template", "grid-template-columns", "grid-template-rows", "grid-column", "grid-row", "grid-area", "visibility", "float", "clear", "overflow", "overflow-x", "overflow-y"],
      },
      {
        groupName: "Typography",
        properties: ["font", "font-family", "font-size", "font-weight", "font-style", "font-variant", "line-height", "letter-spacing", "word-spacing", "text-align", "text-decoration", "text-transform", "text-indent", "text-overflow", "white-space", "word-break", "word-wrap"],
      },
      {
        groupName: "Visual",
        properties: ["color", "background", "background-color", "background-image", "background-position", "background-size", "background-repeat", "border", "border-top", "border-right", "border-bottom", "border-left", "border-width", "border-style", "border-color", "border-radius", "box-shadow", "outline"],
      },
      {
        groupName: "Decoration",
        properties: ["opacity", "transform", "transform-origin", "transition", "transition-property", "transition-duration", "animation", "animation-name", "animation-duration", "cursor", "pointer-events", "user-select", "will-change", "appearance"],
      },
    ],
  },
};
