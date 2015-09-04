Bootstrap-less
==============

This package contains only the less files of bootstrap.
This should be used when compiling bootstrap from source using less.

This repository is about 220 kb.

This package should be added to your less `paths` settings:

    gulp.pipe(less({
        paths: [
            '.',
            './node_modules/bootstrap-less'
        ]
    }))

Then bootstrap can be included in any less file:

	@import "bootstrap";

Note: this internally links to the file `@import "bootstrap/index.less"`

Individual files can also be imported:

	@import "bootstrap/grid";
