

$(document).ready(function() {
	var age_child = 1577847; //czas w minutach okresu niemowlecego 130/min 0-3 lata
	
	var age_kid_total = 4207593 ;  //czas w minutach ou dziecka 100/min 3-8 lat
	var age_kid = age_kid_total - age_child;  //czas w minutach ou dziecka 100/min 3-8 lat
	
	var age_teen_total = 9467085; //czas w minutach u nastolatkja 85/min 8-18 
	var age_teen = age_teen_total - age_kid_total; //czas w minutach u nastolatkja 85/min 8-18 
	
	var age_matur_total = 31556952; //czas w minutach okresu doroslego 70/min 18-60
	var age_matur =age_matur_total -age_teen_total; //czas w minutach okresu doroslego 70/min 18-60

	var heart_bets_total;

	var cond_wyczyn_fem = 57;
	var cond_swietna_fem = 64;
	var cond_dobra_fem = 67;
	var cond_ponadprz_fem = 72;
	var cond_przec_fem = 76;
	var cond_slaba_fem = 80;
	var cond_zla_fem = 84;

	var cond_wyczyn_male = 53;
	var cond_swietna_male = 60;
	var cond_dobra_male = 65;
	var cond_ponadprz_male = 69;
	var cond_przec_male = 73;
	var cond_slaba_male = 79;
	var cond_zla_male = 83;
	

	$("#calculate").click(function(){

		var birthday = document.getElementById("birth_date").value;
		var birthday_hour = document.getElementById("birth_hour").value;
		var minutes = parseInt(birthday_hour.substring(0,2))*60 + parseInt(birthday_hour.substring(3,6));
	 	var now = moment(new Date(),"DD/MM/YYYY HH:mm"); //todays date
		
		var diff_years =now.diff(birthday,'years');
		var diff_minutes = now.diff(birthday,'minutes')  ;
		
	if(!minutes){minutes =0;}

	var diff = diff_minutes - minutes; //czas w minutach od urodzin po odjeciu godziny urodzenia
	
	var sex =document.getElementById('sex').value;
	var condition =document.getElementById('condition').value;
debugger;
		if(birthday){
			if(diff>0){
				heart_beats();
				document.getElementById('content').innerHTML = (heart_bets_total + " uderzen serca");
			}else{
				document.getElementById('content').innerHTML = ("data urodzin nie moze byc pozniejsza od dzisiejszej");
			}
		}else{
			document.getElementById('content').innerHTML = ("prosze wpisac date urodzin");
		}

		function heart_beats() {
			if(diff_years<=3){
				// calc_beats_child(130);
				heart_bets_total= diff*130;
			}else if(diff_years<=8){
				heart_bets_total = age_child*130+(diff-age_child)*100;
			}else if(diff_years<=18){
				heart_bets_total = age_child*130+(age_kid )*100 + (diff- age_kid_total)*85;
			}else if(diff_years<=60){
				switch(condition) {
				    case "dobra":
				   		(sex == "kobieta") ? beats = count_bets_condition(cond_dobra_fem) : beats = count_bets_condition(cond_dobra_male);
				        break;
				     case "wyczynowa":
				    	(sex == "kobieta") ? beats = count_bets_condition(cond_wyczyn_fem) : beats = count_bets_condition(cond_wyczyn_male);
				        break;
				    case "swietna":
				    	(sex == "kobieta") ? beats = count_bets_condition(cond_swietna_fem) : beats = count_bets_condition(cond_swietna_male);
				        break;
				    case "ponadprzecietna":
				    	(sex == "kobieta") ? beats = count_bets_condition(cond_ponadprz_fem) : beats = count_bets_condition(cond_ponadprz_male);
				        break;
				    case "przecietna":
				    	(sex == "kobieta") ? beats = count_bets_condition(cond_przec_fem) : beats = count_bets_condition(cond_przec_male);
				        break;
				    case "slaba":
				    	(sex == "kobieta") ? beats = count_bets_condition(cond_slaba_fem) : beats = count_bets_condition(cond_slaba_male);
				        break;
				    case "zla":
				    	(sex == "kobieta") ?  beats =  count_bets_condition(cond_zla_fem) : beats =  count_bets_condition(cond_zla_male);
				        break;
				           
					}

			     heart_bets_total = age_child*130+(age_kid )*100 +(age_teen)*85 + beats;
			}else{
				heart_bets_total = age_child*130 + (age_kid )*100 + (age_teen)*85 + (age_matur)*70 +(diff-age_matur_total)*60;			
			}
		}

		function count_bets_condition(beats_count) {
			return (diff - age_teen_total)*beats_count;
		}
	});
});

