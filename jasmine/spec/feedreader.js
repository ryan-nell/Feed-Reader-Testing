/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
since some of these tests may require DOM elements.
We want to ensure they don't run until the DOM is ready. */
$(function() {

  // Test suite of the RSS Feeds
  describe('RSS Feeds', function() {
    // Check to make sure feeds are defined and that theyre not an empty strings
    it('Feeds Defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Check if urls are defined and that theyre not an empty strings
    it('Urls Defined', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    // Check if feed names are defined and that theyre not an empty strings
    it('Names Defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  // Test suite of menu funciton
  describe('The Menu', function() {

    // Check is menu is hidden by default
    it('Hidden By Default', function() {
      const body = document.querySelector('body');
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

    // Check menu toggle
    it('Menu Toggles On/Off', function() {
      const body = document.querySelector('body');
      const menu = document.querySelector('.menu-icon-link');

      // Open menu
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);

      // Hidden Menu
      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  // Test suite for intial entries
  describe('Initial Entries', function() {

    // Load and wait for until work is done
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    // Check to see if theres content when the feed load completes
    it('Completes Feed Load', function() {
      // Entry length variable.
      let feedEntry = document.querySelectorAll('.feed .entry').length;
      // Length check
      expect(feedEntry).toBeGreaterThan(0);
    });
  });

  // Test suite to check new feed content
  describe('New Feed Selection', function() {
    let firstFeed, secondFeed;
    // Load and compare feeds
    beforeEach(function(done) {
      // First feed load
      loadFeed(0, function(){
        firstFeed = document.querySelector('.feed').innerText;
        // Load the second feed
        loadFeed(1, done);
      });
    });
    // Compare the first feed data the new feed data
    it('Feed Content Changes', function(){
      secondFeed = document.querySelector('.feed').innerText;
      expect(secondFeed).not.toBe(firstFeed);
    });
  });
}());
