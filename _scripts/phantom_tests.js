casper.test.begin('Home page', 1, function suite(test) {
  casper.start("./dist/index.html", function() {
    test.assertTitle("Galway 5km series", "Galway 5km series title is the one expected");
  });

  casper.run(function() {
    test.done();
  });
});
