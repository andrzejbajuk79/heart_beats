

// u niemowląt: 130/min 0-3 lata ,  1,577,847 minutes
// u dzieci: 100/min 3-8 lat , 8 lat = 4,207,593 minutes
// u młodzieży: 85/min 8-18 lat 18 lat = 9,467,085
// u dorosłych: 70/min 18-60 lat 60 lat = 31,556,952;
// u ludzi starszych: 60/min powyzej 60 lat
$(document).ready(function() {

	$("#calculate").click(function(){
		
	var age_child = 1577847; //czas w minutach okresu niemowlecego 130/min 0-3 lata
	
	var age_kid_total = 4207593 ;  //czas w minutach ou dziecka 100/min 3-8 lat
	var age_kid = age_kid_total - age_child;  //czas w minutach ou dziecka 100/min 3-8 lat
	
	var age_teen_total = 9467085; //czas w minutach u nastolatkja 85/min 8-18 
	var age_teen = age_teen_total - age_kid_total; //czas w minutach u nastolatkja 85/min 8-18 
	
	var age_matur_total = 31556952; //czas w minutach okresu doroslego 70/min 18-60
	var age_matur =age_matur_total -age_teen_total; //czas w minutach okresu doroslego 70/min 18-60
	
	var heart_bets_per_min;
	
	var birthday = document.getElementById("birth_date").value;
	var birthday_hour = document.getElementById("birth_hour").value;
	var minutes = parseInt(birthday_hour.substring(0,2))*60 + parseInt(birthday_hour.substring(3,6));
 	var now = moment(new Date(),"DD/MM/YYYY HH:mm"); //todays date
	
	var diff_years =now.diff(birthday,'years');
	var diff_minutes = now.diff(birthday,'minutes')  ;
	if(!minutes){
		minutes =0;
	}

	var diff = diff_minutes - minutes; //czas w minutach od urodzin po odjeciu godziny urodzenia
	debugger;
	var sex =document.getElementById('sex').value;


	if(birthday){
		if(diff>0){

			switch(sex) {
			    case "kobieta":
			    	women();
			        console.log("kobieta");
			        break;
			    case "mezczyzna":
			    	male();
			        console.log("mezczyzna");
			        break;
			  
			        
			}
		
			document.getElementById('content').innerHTML = (heart_bets_per_min + " uderzen serca");
		}else{
			document.getElementById('content').innerHTML = ("data urodzin nie moze byc pozniejsza od dzisiejszej");
		}
	}else{
		document.getElementById('content').innerHTML = ("prosze wpisac date urodzin");
	}



			function male() {
				if(diff_years<=3){
					// calc_beats_child(130);
					heart_bets_per_min= diff*130;
				}else if(diff_years<=8){
					heart_bets_per_min = age_child*130+(diff-age_child)*100;
				}else if(diff_years<=18){
					heart_bets_per_min = age_child*130+(age_kid )*100 + (diff- age_kid_total)*85;
				}else if(diff_years<=60){
				    heart_bets_per_min = age_child*130+(age_kid )*100 +(age_teen)*85 + (diff - age_teen_total)*70;
				}else{
					heart_bets_per_min = age_child*130 + (age_kid )*100 + (age_teen)*85 + (age_matur)*70 +(diff-age_matur_total)*60;			
				}

			}

			function women() {
				if(diff_years<=3){
					// calc_beats_child(130);
					heart_bets_per_min= diff*135;
				}else if(diff_years<=8){
					heart_bets_per_min = age_child*135+(diff-age_child)*105;
				}else if(diff_years<=18){
					heart_bets_per_min = age_child*135+(age_kid )*105 + (diff- age_kid_total)*90;
				}else if(diff_years<=60){
				    heart_bets_per_min = age_child*135+(age_kid )*105 +(age_teen)*90 + (diff - age_teen_total)*80;
				}else{
					heart_bets_per_min = age_child*135 + (age_kid )*105 + (age_teen)*90 + (age_matur)*75 +(diff-age_matur_total)*60;			
				}


			}


	});
});

