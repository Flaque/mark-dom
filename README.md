**YOU CAN USE IT BUT ITS PROBABLY BROKEN**

![sad gif](https://media.giphy.com/media/K1QnLV1caRpuw/giphy.gif)

# mark-dom

Mark-dom is basically jQuery but for markdown. 

If you've ever wanted to write a script that only edits a single part of a markdown doc and leaves the rest alone, then you're gonna like mark-dom. 

* [Docs](https://flaque.github.io/mark-dom/MarkdownNode.html)

## Example 

``` js 
const mark = require('mark-dom');

const str = `
# Now
this is a story all about how
## My Life
got flipped-turned upside down
### And
I'd like to take a minute
#### To Sit Right There
I'll tell you how I became the prince of a town called Bel Air
`;

const output = mark(str)
    .heading()
        .paragraph()
        .set("this is a tv-show all about how")
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
