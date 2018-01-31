// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on our friends.
// ===============================================================================

var friendData = require("../data/friendData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests.
    // It will do this by sending out the value of the most compatable person who is not you.
    // req.body is available since we're using the body-parser middleware
    
    // if (friendData) {
      

      //This does not appear to write to the friendData.js file, is that correct?
      console.log(req.body);
      friendData.push(req.body);
      console.log(friendData);
    //        !!   Logic for compatibility is to be entered here.  !!
    //  Need to develop several nested loops to avoid repititious code, calculating a total difference (absolute) and then comparing it to
    //previous iteration calcs to return the  most compatible person.
      for (var i = 0; i < friendData.length; i++) {
        var DiffQ1 = friendData[i].scores[0] - parseInt(req.body.scores[0]);
        var DiffQ2 = friendData[i].scores[1] - req.body.scores[1];
        var DiffQ3 = friendData[i].scores[2] - req.body.scores[2];
        var DiffQ4 = friendData[i].scores[3] - req.body.scores[3];
        var DiffQ5 = friendData[i].scores[4] - req.body.scores[4];
      }
      //response should be from the location in the Array that was most compatible
      res.json(friendData[0]);
    // }
    // else {
    //   res.json(false);
    // }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   tableData = [];
  //   waitListData = [];

  //   console.log(tableData);
  // });
};
