// Get our requirements, installed by npm
var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
	collections = require('metalsmith-collections'),
	feed 		= require('metalsmith-feed'),
	atomfeed 	= require('metalsmith-feed-atom'),
	gravatar 	= require('metalsmith-gravatar'),
	multiLanguage = require('metalsmith-multi-language'),
	twitterCard = require('metalsmith-twitter-card'),
	youtube 	= require('metalsmith-youtube');
	

// Run Metalsmith in the current directory.
// When the .build() method runs, this reads
// and strips the frontmatter from each of our
// source files and passes it on to the plugins.
Metalsmith(__dirname)
	.metadata({
    site: {
      title: 'Geocities',
      url: 'http://example.com',
      author: 'Philodemus'
    }})
	.use(gravatar({
	  stevenschobert: "Cobradabest@aol.com"
	}))

	.use(multiLanguage({ default: 'sco', locales: ['sco', 'en'] }))
	.use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
      },
    }))

	.use(feed({collection: 'articles'}))
	//.use(atomfeed({collection: 'articles'}))

    // Use metalsmith-markdown to convert
    // our source files' content from markdown
    // to HTML fragments.
    .use(markdown())

	.use(youtube({
	  width: 560,      // optional, width video (default 560)
	  height: 315,     // optional, height video (default 560)
	  suggested: false,       // optional, display suggested videos
	  controls: true,     // optional, display controls
	  showTitle: true // optional, show video title and player actions
	  //privacy : true  // optional, enable privacy-enhaced mode
	}))

	.use(twitterCard({
		siteurl: 'twitter.com',
		card: 'summary_large_image', // Sets default card type.
		site: '@Cobradile94',          // Sets default twitter username.
		title: 'title',              // By default will use title property from file metadata as twitter card title.
		description: 'description'   // By default will use description property
									 // from file metadata as twitter card description.
	  }))
	
    // Put the HTML fragments from the step above
    // into our template, using the Frontmatter
    // properties as template variables.
    .use(layouts())

    // And tell Metalsmith to fire it all off.
    .build(function(err, files) {
        if (err) { throw err; }
    });