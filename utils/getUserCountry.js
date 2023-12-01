
function getUserCountry() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://ipinfo.io/json?token=da800d7bb6c070")
        .then((response) => {
          const data = response.data;
          resolve(data.country);
        })
        .catch(() => {
          resolve("");
        });
    });
  }

  getUserCountry()
  .then((countryCode) => {
    userCountry = countryCode;
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  export let userCountry;
