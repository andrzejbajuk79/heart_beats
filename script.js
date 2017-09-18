

$(document).ready(function() {
	var age_child = 1577847; //czas w minutach okresu niemowlecego 0-3 lata, srednie tetno : 130/min 
	
	var age_kid_total = 4207593 ;  //calkowit czas w minutach ou dziecka 8 lat , srednie tetno : 100/min 
	var age_kid = age_kid_total - age_child;  //czas w minutach ou dziecka miedzy 3-8 rokiem zycia
	
	var age_teen_total = 9467085; //calkowity czas w minutach u nastolatkja 18 lat,   srednie tetno 85/min 
	var age_teen = age_teen_total - age_kid_total; //czas w minutach u nastolatkja miedzy 8-18  rokiem zycia
	
	var age_matur_total = 31556952; //calkowity czas w minutach okresu doroslego 60lat ,srednie tetno 70/min 
	var age_matur =age_matur_total -age_teen_total; //czas w minutach okresu doroslego miedzy  18-60 rokiem zycia
    // 60/minute srednie tetno dla osob powyzej 60 roku zycia
    
	var heart_beats_total;
	var child_puls =130; //sredni puls dla noworodka
	var kids_puls =100;  // sredni puls dla dziecka
	var teen_puls =85;   // sredni puls dla nastolatka
	var old_puls =60;    //sredni puls dla osoby powyzej 60 roku zycia
	
	//sredni puls dla kobiety w wieku doroslym zaleznie od kondycji
	var cond_wyczyn_fem = 57;
	var cond_swietna_fem = 64;
	var cond_dobra_fem = 67;
	var cond_ponadprz_fem = 72;
	var cond_przec_fem = 76;
	var cond_slaba_fem = 80;
	var cond_zla_fem = 84;

    //mezczyzny w wieku doroslym  zaleznie od kondycji
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
		
		var diff_years =now.diff(birthday,'years');  //roznica w latach 
		var diff_minutes = now.diff(birthday,'minutes')  ; //roznica w minutach
		
	if(!minutes){minutes =0;}

		var diff = diff_minutes - minutes; //roznica w minutach od urodzin po odjeciu godziny urodzenia
		
		var sex =document.getElementById('sex').value;  //plec
		var condition =document.getElementById('condition').value; //kondycja

		if(birthday){
			if(diff>0){
				heart_beats();
				document.getElementById('content').innerHTML = ("masz : " +diff_years +"lat <br>" +
				"a twoje serce bilo "  +Math.floor(heart_beats_total) + " tys. razy do tej pory");
			}else{
				document.getElementById('content').innerHTML = ("data urodzin nie moze byc pozniejsza od dzisiejszej");
			}
		}else{
			document.getElementById('content').innerHTML = ("prosze wpisac date urodzin");
		}

		function heart_beats() {
			if(diff_years<=3){
				heart_beats_total= diff*child_puls/1000;
			}else if(diff_years<=8){
				heart_beats_total = (age_child*child_puls+(diff-age_child)*kids_puls)/1000;
			}else if(diff_years<=18){
				heart_beats_total = (age_child*child_puls+age_kid *kids_puls + (diff- age_kid_total)*teen_puls)/1000;
			}else if(diff_years<=60){
				middle_age();
			     heart_beats_total = (age_child*child_puls+age_kid*kids_puls+age_teen*teen_puls + middle_age()/1000)/1000;
			}else{
				heart_beats_total = (age_child*child_puls+ age_kid *kids_puls + age_teen*teen_puls+ middle_age()/1000 +(diff-age_matur_total)*old_puls)/1000;			
			}
		}


		function middle_age(){
			switch(condition) {
			    case "dobra":
			   		 beats = (sex == "kobieta") ?  calc_beats(cond_dobra_fem)  :  calc_beats(cond_dobra_male);
			        break;
			     case "wyczynowa":
			    	beats = (sex == "kobieta") ?  calc_beats(cond_wyczyn_fem)  : calc_beats(cond_wyczyn_male);
			        break;
			    case "swietna":
			    	beats = (sex == "kobieta") ? calc_beats(cond_swietna_fem)  : calc_beats(cond_swietna_male);
			        break;
			    case "ponadprzecietna":
			    	beats =(sex == "kobieta") ?  calc_beats(cond_ponadprz_fem) : calc_beats(cond_ponadprz_male);
			        break;
			    case "przecietna":
			    	beats =(sex == "kobieta") ? calc_beats(cond_przec_fem)     : calc_beats(cond_przec_male);
			        break;
			    case "słaba":
			    	beats =(sex == "kobieta") ?  calc_beats(cond_slaba_fem)    :  calc_beats(cond_slaba_male);
			        break;
			    case "zla":
			    	beats =(sex == "kobieta") ?  calc_beats(cond_zla_fem)        :  calc_beats(cond_zla_male);
			        break;  
					}
			return beats;
		}

		function calc_beats(beats_per_minute) {
			//sprawdzamy czy mamy do czynienia z osoba powyzej czy ponizej 60 roku zycia;
			//jezeli powyzej to bierzemy caly okres od 18 lat do 60 
			if(diff>age_matur_total) {
				return age_matur*beats_per_minute;
			}else
			    return (diff - age_teen_total)*beats_per_minute;
		}
	});
});

