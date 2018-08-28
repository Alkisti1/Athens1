const clientID = 'JZCAWJMRWCKLLIOKPYZR3VWDAKAFKGT1NTTKLIR2HJYMIXBY';
const clientSecret = 'UAULBVBHNHJUYBUQFMN0EAZKZ5GS3R5DU5WYUR0EFHPTM31K';
const version = '20180810';


export const getDetails = (id) =>
fetch(`https://api.foursquare.com/v2/venues/${id}?&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`)
.then(response => response.json())
.then(data => data.response.venue)

//if there is an error dispaly the message
.catch('error')



// getMarkerInfo(marker) {
  //   var self = this;
  //   var clientId = "TPIDDHBKB2QFBWEV2MPDOFGUSWXCXGAA5IVOWEMN5ASR3UJW";
  //   var clientSecret = "4HB1ZZJBVXC3F0BREBPSGXYK0VZ5ALS4XRNJZSBP1JROG0DE";
  //   var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
    // fetch(url)
      //   .then(
        //     function (response) {
          //       if (response.status !== 200) {
          //           self.state.infowindow.setContent("Sorry data can't be loaded");
          //           return;
          //       }

                 // Examine the text in the response
          //       response.json().then(function (data) {
            //         var location_data = data.response.venues[0];
            //         var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
            //         var checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
            //         var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
            //         var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
            //         var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
            //         self.state.infowindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
          //       });
        //     }
        // )
      //   .catch(function (err) {
      //       self.state.infowindow.setContent("Sorry data can't be loaded");
      //   });
// }
