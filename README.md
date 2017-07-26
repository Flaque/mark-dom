# mark-dom

Mark-dom is basically jQuery but for markdown. 

If you've ever wanted to write a script that only edits a single part of a markdown doc and leaves the rest alone, then hopefully this brings you joy.

* [Docs](https://flaque.github.io/mark-dom/MarkdownNode.html)

## Example 

### Our Example Markdown
``` markdown
<!-- This is some markdown -->
# Hello there
I am some markdown

## Dogs are cool
They bring you friendly joy.

## World peace is cool
Let's bake some cakes and be nice to each other
```

### Get a header value
``` js
import mrk = require("mark-dom");

// Returns "World peace is cool"
mrk(thatMarkdownStr)
    .heading("## World peace *")
    .value();
```

### Change a header
``` js
import mrk = require("mark-dom");

// Return a new markdown string where the first header 
// is "Stuff that's cool"
mrk(thatMarkdownStr)
    .heading() // gets the first heading!
    .set("Stuff that's cool");
    .getAll();
```

### Change an entire paragraph
``` js 
import mrk = require("mark-dom");

// Change the "dogs" header and return a new markdown string
mrk(thatMarkdownStr)
    .heading("## * ") // Get the first sub header
    .paragraph()
    .set("They make you smile.")
    .getAll();
```



## Status
Mark-dom is really just an experiment at the moment and I haven't really fleshed out all of the API that I want yet. Things might change, at the time that I'm writing this, I don't think it even works.

## How's it work? 
Mark-dom uses [remark](https://github.com/wooorm/remark/tree/master/packages/remark) and it's ecosystem to parse the markdown into an Abstract Syntax Tree (AST), then it lets you navigate and edit the tree with an API and eventually construct a new markdown document by compiling the tree down to a string.

## What's the use case?
* Auto-generating README's
* Forcing standards/style-guides to docs
* ???
* Profit!
