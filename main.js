// Custom JavaScript DataFetcher class for WordPress REST API
// Author - visudo
// You can use this class to dynamically generate WP page content from page/post templates
// This file is open-source and free to distribute, change, and use 
// What you can't do is use this file commericially without my permission

export class DataFetcher {

  // Construct ID/type to be used in an instance of this class
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }

  // grabs JSON data from hard-coded endpoints
  getJSONData() {
    var myjson = [];
    // add/remove api endpoints here
    var apis = [];
    this.type.forEach(function(element) {
      var thisfetch = contains(apis, element);
	if (thisfetch != null) {
	  try {
	    const res = fetch(thisfetch)
	    .then(res => res.json())
	    .then(res => {
	      myjson.push(res);
	    })
	  }
	  catch(error) {
	    console.log(error);
	  }
	}
    })
    return myjson;
  }

  // Gets the page HTML from the elem.content.rendered field of the JSON
  generateHTMLtemplate(data) {
    var mydata = data;
    var ret = ``;
    if (mydata.length > 1) {
      mydata.forEach(function(element){
        element.forEach(function(elem){
          if (elem.type == "page" || elem.type == "post") {
            ret += `${elem.content.rendered}`;
          }
        })
      })
    }
    else {
      ret += `${mydata[0].content.rendered}`;
    }
    return ret;
  }

  // removes loading div tag and brings content into view
  bringIntoView(html) {
    var load = document.getElementById("loading");
    load.remove();
    document.getElementById("app").innerHTML = html;
  }
}

//helper funciton
function contains(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].name === val) return arr[i].value;
  }
  return null;
}
