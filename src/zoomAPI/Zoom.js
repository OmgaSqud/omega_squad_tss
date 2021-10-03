function ZoomMeeting(Topic) {
  const Axios = require("axios");
  let linkID;
  Axios.post("/newMeeting", { topic: Topic })
    .then((response) => {
      linkID = response.data.Meeting_Details.join_url;
      return linkID;
    })
    .catch((error) => {
      alert(error.message);
    });
}

module.exports = ZoomMeeting;
//export default ZoomMeeting;
