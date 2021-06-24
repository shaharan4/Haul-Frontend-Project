//function to read json file and store it in a variable
window.onload = function getData(){
    let myRequest = new Request("./HOS log.json");
    fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data)

        //store the driver data in a single array that contains each trip
        driver_data = [];
        count = 0;
        for( i=0; i<data.length; i++){
            for(j=0; j<data[i].data.length; j++){
                driver_data.push(data[i].data[j]);
            }
        }
        console.log(driver_data);
    })

}


function showWork(event){
    let myRequest = new Request("./HOS log.json");
    fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){

        //store the driver data in a single array that contains each trip
        driver_data = [];
        for( i=0; i<data.length; i++){
            for(j=0; j<data[i].data.length; j++){
                driver_data.push(data[i].data[j]);
            }
        }
        
        //getting information about the date hovered over and making the current date in a string
        var date = "2021-";
        if (event.target.parentNode.parentNode.id=="january_calendar"){
            date = date + "01-";
        }
        else if(event.target.parentNode.parentNode.id=="february_calendar"){
            date = date + "02-";
        }
        else if(event.target.parentNode.parentNode.id=="march_calendar"){
            date = date + "03-";
        }
        //adding 0's to single digit dates for easier processing
        if(event.target.innerHTML<10){
            date = date + "0" + event.target.innerHTML;
        }
        else{  
            date = date + event.target.innerHTML;
        }
        //iterating over our driver data to see if any of the start dates match the date hovered over. Then we get the start and end times and calculate hours and total pay.
        var total_hours;
        var hours;
        var pay;
        var duration;
        for(i=0; i<driver_data.length; i++){
            if(driver_data[i].startTime.substring(0,10)==date){
                duration = driver_data[i].dutyStatusDurations.activeDurationMs
                minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            
              hours = (hours < 10 ) ? "0" + hours : hours;
              minutes = (minutes < 10) ? "0" + minutes : minutes;
              total_hours = (parseInt(hours) + parseInt((minutes))/60).toFixed(2);
              pay = total_hours*22;
            }
 
        }
        if(typeof total_hours!="undefined"){
            console.log(total_hours);
        }

        if(typeof pay!="undefined"){
            console.log(pay);
        }     
        
    })
}
function weeklySummary(event){
    let myRequest = new Request("./HOS log.json");
    fetch(myRequest)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data)

        //store the driver data in a single array that contains each trip
        driver_data = [];
        for( i=0; i<data.length; i++){
            for(j=0; j<data[i].data.length; j++){
                driver_data.push(data[i].data[j]);
            }
        }
        var row = event.target.parentNode;
        var month = row.parentNode.id;
        var x = document.getElementById(month);
        var y = x.children;
        var date_list = [];
        for(i=0; i<y.length; i++){
            if (y[i].classList.contains(row.className)){
                date_list.push(y[i].children);
            }
        }
        var dates = []
        for (i=0;i<date_list[0].length-1; i++){
            dates.push(date_list[0][i]);
        }
        var date = "2021-";
        if(month=="january_calendar"){
            date = date + "01-";
        }
        else if(month=="february_calendar"){
            date = date + "02-"
        }
        else if(month=="march_calendar"){
            date = date + "03-";
        }
        weekly_pay = 0;
        weekly_hours = 0;
        for(i=0; i<dates.length; i++){
            if(dates[i].innerHTML.length<2){
                temp_date=date + "0" + dates[i].innerHTML; 
            }
            else{
                 temp_date=date + dates[i].innerHTML;}
            for(j=0; j<driver_data.length; j++){
                if(driver_data[j].startTime.substring(0,10)==temp_date){
                    duration = driver_data[j].dutyStatusDurations.activeDurationMs
                    minutes = Math.floor((duration / (1000 * 60)) % 60),
                    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
                
                  hours = (hours < 10 ) ? "0" + hours : hours;
                  minutes = (minutes < 10) ? "0" + minutes : minutes;
                  total_hours = (parseInt(hours) + parseInt((minutes))/60).toFixed(2);
                  pay = total_hours*22;
                  weekly_hours = weekly_hours + parseFloat(total_hours);
                  weekly_pay = weekly_pay + pay;
                }

            }

        }
        
    
    })

}