const clientID = 'JZCAWJMRWCKLLIOKPYZR3VWDAKAFKGT1NTTKLIR2HJYMIXBY';
const clientSecret = 'UAULBVBHNHJUYBUQFMN0EAZKZ5GS3R5DU5WYUR0EFHPTM31K';
const version = '20180810';


export const getDetails = (id) =>
fetch(`https://api.foursquare.com/v2/venues/${id}?&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`)
.then(response => response.json())
.then(data => {
  const data.response.venue)

//if there is an error dispaly the message
.catch('error')
