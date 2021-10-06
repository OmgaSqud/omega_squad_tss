function ZoomMeeting(link, Topic) {
  const Axios = require("axios");
  var links = {
    startLink: null,
    joinLink: null,
  };

  if (link === true) {
    Axios.post("/newMeeting", { topic: Topic })
      .then((response) => {
        // console.log(response.data.Meeting_Details.start_url);
        // console.log(response.data.Meeting_Details.join_url);
        links = {
          startLink: response.data.Meeting_Details.start_url,
          joinLink: response.data.Meeting_Details.join_url,
        };
        return links;
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    return null;
  }
}

module.exports = ZoomMeeting;
