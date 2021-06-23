
window.onload = function getData(){
    let myRequest = new Request("./HOS log.json");
    fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data)
    })
}