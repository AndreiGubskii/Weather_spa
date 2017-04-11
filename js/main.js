$(document).ready(function(){
	var days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
	var months = ["Январь","Февраль","Март","Апрель","Май","Июнь",
	"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

	const city = '1528334';
	const appId = '5c1d0967b16758024c3835edee7fa27c';
	const lang = 'ru';

	$.ajax({
		url:"http://api.openweathermap.org/data/2.5/weather?id="+city+"&APPID="+appId+"&units=metric&lang="+lang,
		success: function(data,status){
			$(".weather-title").text(data.name);
			
			var weather = '<div class="weather-body">'+
			'<img class="weather-icon" src="http://openweathermap.org/img/w/'
			+data.weather[0].icon+'.png" alt="weather-icon"><p class="weather-temp">'
			+data.main.temp+'° C</p><p class="description">'
			+data.weather[0].description+'</p></div>'+
			'<div class="weather-footer"><p class="humidity">'+"Влажность:"+data.main.humidity+'%</p>'+
			'<p class="pressure">'+"Давление:"+data.main.pressure+' мм</p><p class="wind">'+"Ветер "+data.wind.speed+'м/с</p>';

			$(".weather").append(weather);		

		}
	});

	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?id="+city+"&APPID="+appId+"&units=metric&lang="+lang+"&cnt=6",
		success: function(data,status){		
			$.each(data.list,function(index,obj){
				var date = new Date(obj.dt*1000);
				var weather = '<div class="weather-week-item"><h3 class="weather-week-title">'+getDayName(date.getDay())+" "+date.getDate()+'</h3>'+
				'<div class="weather-week-body"><img class="weather-week-icon" src="http://openweathermap.org/img/w/'+obj.weather[0].icon+'.png" alt="weather-icon">'+
				'<p class="weather-week-temp">'+obj.temp.max+'° C</p><p class="weather-week-min-temp">'+obj.temp.min+
				'° C</p><p class="weather-week-description">'+obj.weather[0].description+'</p></div></div>';
				
				$(".weather-week").append(weather);
			});
			
		}
	});

	

	function getDayName(day){
		return days[day];
	}
	function getMonthName(month){
		return months[month];
	}
});
//"http://api.openweathermap.org/data/2.5/forecast?id="+city+"&APPID="+appId+"&units=metric&lang="+lang
