const fetch = require("node-fetch");

export default class Anime_Info {
  
    constructor() {
      this.error = null
      this.weekday_info = null
    }

    async initializeWeekdayInfo(weekday) {
      
      
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      const weekdayInfoRaw = await fetch("https://api.jikan.moe/v3/schedule/" + weekday, requestOptions)
        .then(response => response.json())
        .then(result => {
          return result
          })
        .catch(error => {
          return {"error" : "Network issue!"}
        });
      
      
      if ("error" in weekdayInfoRaw) {
        this.error = weekdayInfoRaw["error"]
      } else {
        this.weekday_info = weekdayInfoRaw[weekday]
      }
    }

    getError() {
      return this.error
    }

    getWeekdayInfo() {
      return this.weekday_info
    }

}



