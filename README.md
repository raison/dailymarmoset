The Daily Marmoset
================================

Demo is running at http://phonephreak.net/dailymarmoset/

This is a little Angular app that pulls in articles about Marmosets and displays them.  It is responsive and has two different ways to display the articles.  For the desktop view, a vertical infinite scroll will fetch pages json of article information.  Right now there are only 10 articles in page one, and page two returns an empty array so the infinite scroller knows to quit fetching.  For the mobile view, just the first page is fetched and unpacked into a horizontal swipe-able carousel.  A TODO could be adding pagination to the carousel.

Please refer to the commit history and in the code for comments about the process of putting this together.

Thanks!
