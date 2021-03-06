/*
new to do:
	clean up everything
	remove my location
	offline app function
	typeahead instead of dropdown?
*/

//global variable for my locations array
var myLocations = [];

function myCallback(json) {
	//Global variable containing the current time in UTC
    nowUTC = moment.tz(json.dateString, "UTC"); 
}

$( document ).ready( function () {
	var localTimeZone,
		localLocationName,
		currentTimeLocations, 
		$proposedTime,
		$proposedTimeZone,
		$proposedDate,
		allTimeZoneNames,
		newProposedDate,
		localTime;

	hideEverything();
	$('div .my-locations').show();
	$('.nav-current-time').on('click', function () {
		hideEverything();
		$('div .current-time').show();
	});
	$('.nav-time-converter').on('click', function () {
		hideEverything();
		$('div .proposed-time').show();
	});
	$('.nav-meeting-planner').on('click', function () {
		hideEverything();
		$('div .meeting-planner').show();
	});
	$('.nav-my-locations').on('click', function () {
		hideEverything();
		$('div .my-locations').show();
	});

	//local storage stuff---------------------------------
	if(typeof(Storage) !== "undefined") {
	    if (localStorage.myLocations !== undefined) {
	    	myLocations = JSON.parse(localStorage["myLocations"]);
	    }
	   	else {
	   		myLocations = [];
	   	}
	} else {
	    myLocations = [];
	}
	//end local storage------------------------------------------------------------

	hideEverything();
	if (myLocations.length > 1) {
		$('div .current-time').show();
	}
	else {
		$('div .my-locations').show();
	}
	
	$('.nav-current-time').on('click', function () {
		hideEverything();
		$('div .current-time').show();
	});
	$('.nav-time-converter').on('click', function () {
		hideEverything();
		$('div .proposed-time').show();
	});
	$('.nav-meeting-planner').on('click', function () {
		hideEverything();
		$('div .meeting-planner').show();
	});
	$('.nav-my-locations').on('click', function () {
		hideEverything();
		$('div .my-locations').show();
	});

	//Get local time zone of the user
	var userTimeZone = minutesToTime(-new Date().getTimezoneOffset());

	//Get the local time zone name of the user
	var jstzTemp = jstz.determine(); // Determines the time zone of the browser client
	var userTimeZoneName = jstzTemp.name(); // Returns the name of the time zone eg "Europe/Berlin"
	
	//Get local time of user
	var userTime = nowUTC.tz(userTimeZoneName);
	//console.log("the user's time is" + userTime.format('dddd, MMMM Do YYYY, h:mm:ss a [GMT]Z'));

	//Update the local time zone at the top of the page
	updateLocalTime(userTimeZone, userTimeZoneName, userTime);

	//Time Zone Location Names
	allTimeZoneNames = ['Africa/Abidjan','Africa/Accra','Africa/Addis_Ababa','Africa/Algiers','Africa/Asmara','Africa/Asmera','Africa/Bamako','Africa/Bangui','Africa/Banjul','Africa/Bissau','Africa/Blantyre','Africa/Brazzaville','Africa/Bujumbura','Africa/Cairo','Africa/Casablanca','Africa/Ceuta','Africa/Conakry','Africa/Dakar','Africa/Dar_es_Salaam','Africa/Djibouti','Africa/Douala','Africa/El_Aaiun','Africa/Freetown','Africa/Gaborone','Africa/Harare','Africa/Johannesburg','Africa/Juba','Africa/Kampala','Africa/Khartoum','Africa/Kigali','Africa/Kinshasa','Africa/Lagos','Africa/Libreville','Africa/Lome','Africa/Luanda','Africa/Lubumbashi','Africa/Lusaka','Africa/Malabo','Africa/Maputo','Africa/Maseru','Africa/Mbabane','Africa/Mogadishu','Africa/Monrovia','Africa/Nairobi','Africa/Ndjamena','Africa/Niamey','Africa/Nouakchott','Africa/Ouagadougou','Africa/Porto-Novo','Africa/Sao_Tome','Africa/Timbuktu','Africa/Tripoli','Africa/Tunis','Africa/Windhoek','America/Adak','America/Anchorage','America/Anguilla','America/Antigua','America/Araguaina','America/Argentina/Buenos_Aires','America/Argentina/Catamarca','America/Argentina/ComodRivadavia','America/Argentina/Cordoba','America/Argentina/Jujuy','America/Argentina/La_Rioja','America/Argentina/Mendoza','America/Argentina/Rio_Gallegos','America/Argentina/Salta','America/Argentina/San_Juan','America/Argentina/San_Luis','America/Argentina/Tucuman','America/Argentina/Ushuaia','America/Aruba','America/Asuncion','America/Atikokan','America/Atka','America/Bahia','America/Bahia_Banderas','America/Barbados','America/Belem','America/Belize','America/Blanc-Sablon','America/Boa_Vista','America/Bogota','America/Boise','America/Buenos_Aires','America/Cambridge_Bay','America/Campo_Grande','America/Cancun','America/Caracas','America/Catamarca','America/Cayenne','America/Cayman','America/Chicago','America/Chihuahua','America/Coral_Harbour','America/Cordoba','America/Costa_Rica','America/Creston','America/Cuiaba','America/Curacao','America/Danmarkshavn','America/Dawson','America/Dawson_Creek','America/Denver','America/Detroit','America/Dominica','America/Edmonton','America/Eirunepe','America/El_Salvador','America/Ensenada','America/Fort_Wayne','America/Fortaleza','America/Glace_Bay','America/Godthab','America/Goose_Bay','America/Grand_Turk','America/Grenada','America/Guadeloupe','America/Guatemala','America/Guayaquil','America/Guyana','America/Halifax','America/Havana','America/Hermosillo','America/Indiana/Indianapolis','America/Indiana/Knox','America/Indiana/Marengo','America/Indiana/Petersburg','America/Indiana/Tell_City','America/Indiana/Vevay','America/Indiana/Vincennes','America/Indiana/Winamac','America/Indianapolis','America/Inuvik','America/Iqaluit','America/Jamaica','America/Jujuy','America/Juneau','America/Kentucky/Louisville','America/Kentucky/Monticello','America/Knox_IN','America/Kralendijk','America/La_Paz','America/Lima','America/Los_Angeles','America/Louisville','America/Lower_Princes','America/Maceio','America/Managua','America/Manaus','America/Marigot','America/Martinique','America/Matamoros','America/Mazatlan','America/Mendoza','America/Menominee','America/Merida','America/Metlakatla','America/Mexico_City','America/Miquelon','America/Moncton','America/Monterrey','America/Montevideo','America/Montreal','America/Montserrat','America/Nassau','America/New_York','America/Nipigon','America/Nome','America/Noronha','America/North_Dakota/Beulah','America/North_Dakota/Center','America/North_Dakota/New_Salem','America/Ojinaga','America/Panama','America/Pangnirtung','America/Paramaribo','America/Phoenix','America/Port-au-Prince','America/Port_of_Spain','America/Porto_Acre','America/Porto_Velho','America/Puerto_Rico','America/Rainy_River','America/Rankin_Inlet','America/Recife','America/Regina','America/Resolute','America/Rio_Branco','America/Rosario','America/Santa_Isabel','America/Santarem','America/Santiago','America/Santo_Domingo','America/Sao_Paulo','America/Scoresbysund','America/Shiprock','America/Sitka','America/St_Barthelemy','America/St_Johns','America/St_Kitts','America/St_Lucia','America/St_Thomas','America/St_Vincent','America/Swift_Current','America/Tegucigalpa','America/Thule','America/Thunder_Bay','America/Tijuana','America/Toronto','America/Tortola','America/Vancouver','America/Virgin','America/Whitehorse','America/Winnipeg','America/Yakutat','America/Yellowknife','Antarctica/Casey','Antarctica/Davis','Antarctica/DumontDUrville','Antarctica/Macquarie','Antarctica/Mawson','Antarctica/McMurdo','Antarctica/Palmer','Antarctica/Rothera','Antarctica/South_Pole','Antarctica/Syowa','Antarctica/Troll','Antarctica/Vostok','Arctic/Longyearbyen','Asia/Aden','Asia/Almaty','Asia/Amman','Asia/Anadyr','Asia/Aqtau','Asia/Aqtobe','Asia/Ashgabat','Asia/Ashkhabad','Asia/Baghdad','Asia/Bahrain','Asia/Baku','Asia/Bangkok','Asia/Beirut','Asia/Bishkek','Asia/Brunei','Asia/Calcutta','Asia/Chita','Asia/Choibalsan','Asia/Chongqing','Asia/Chungking','Asia/Colombo','Asia/Dacca','Asia/Damascus','Asia/Dhaka','Asia/Dili','Asia/Dubai','Asia/Dushanbe','Asia/Gaza','Asia/Harbin','Asia/Hebron','Asia/Ho_Chi_Minh','Asia/Hong_Kong','Asia/Hovd','Asia/Irkutsk','Asia/Istanbul','Asia/Jakarta','Asia/Jayapura','Asia/Jerusalem','Asia/Kabul','Asia/Kamchatka','Asia/Karachi','Asia/Kashgar','Asia/Kathmandu','Asia/Katmandu','Asia/Khandyga','Asia/Kolkata','Asia/Krasnoyarsk','Asia/Kuala_Lumpur','Asia/Kuching','Asia/Kuwait','Asia/Macao','Asia/Macau','Asia/Magadan','Asia/Makassar','Asia/Manila','Asia/Muscat','Asia/Nicosia','Asia/Novokuznetsk','Asia/Novosibirsk','Asia/Omsk','Asia/Oral','Asia/Phnom_Penh','Asia/Pontianak','Asia/Pyongyang','Asia/Qatar','Asia/Qyzylorda','Asia/Rangoon','Asia/Riyadh','Asia/Saigon','Asia/Sakhalin','Asia/Samarkand','Asia/Seoul','Asia/Shanghai','Asia/Singapore','Asia/Srednekolymsk','Asia/Taipei','Asia/Tashkent','Asia/Tbilisi','Asia/Tehran','Asia/Tel_Aviv','Asia/Thimbu','Asia/Thimphu','Asia/Tokyo','Asia/Ujung_Pandang','Asia/Ulaanbaatar','Asia/Ulan_Bator','Asia/Urumqi','Asia/Ust-Nera','Asia/Vientiane','Asia/Vladivostok','Asia/Yakutsk','Asia/Yekaterinburg','Asia/Yerevan','Atlantic/Azores','Atlantic/Bermuda','Atlantic/Canary','Atlantic/Cape_Verde','Atlantic/Faeroe','Atlantic/Faroe','Atlantic/Jan_Mayen','Atlantic/Madeira','Atlantic/Reykjavik','Atlantic/South_Georgia','Atlantic/St_Helena','Atlantic/Stanley','Australia/ACT','Australia/Adelaide','Australia/Brisbane','Australia/Broken_Hill','Australia/Canberra','Australia/Currie','Australia/Darwin','Australia/Eucla','Australia/Hobart','Australia/LHI','Australia/Lindeman','Australia/Lord_Howe','Australia/Melbourne','Australia/NSW','Australia/North','Australia/Perth','Australia/Queensland','Australia/South','Australia/Sydney','Australia/Tasmania','Australia/Victoria','Australia/West','Australia/Yancowinna','Brazil/Acre','Brazil/DeNoronha','Brazil/East','Brazil/West','CET','CST6CDT','Canada/Atlantic','Canada/Central','Canada/East-Saskatchewan','Canada/Eastern','Canada/Mountain','Canada/Newfoundland','Canada/Pacific','Canada/Saskatchewan','Canada/Yukon','Chile/Continental','Chile/EasterIsland','Cuba','EET','EST','EST5EDT','Egypt','Eire','Etc/GMT','Etc/GMT+0','Etc/GMT+1','Etc/GMT+10','Etc/GMT+11','Etc/GMT+12','Etc/GMT+2','Etc/GMT+3','Etc/GMT+4','Etc/GMT+5','Etc/GMT+6','Etc/GMT+7','Etc/GMT+8','Etc/GMT+9','Etc/GMT-0','Etc/GMT-1','Etc/GMT-10','Etc/GMT-11','Etc/GMT-12','Etc/GMT-13','Etc/GMT-14','Etc/GMT-2','Etc/GMT-3','Etc/GMT-4','Etc/GMT-5','Etc/GMT-6','Etc/GMT-7','Etc/GMT-8','Etc/GMT-9','Etc/GMT0','Etc/Greenwich','Etc/UCT','Etc/UTC','Etc/Universal','Etc/Zulu','Europe/Amsterdam','Europe/Andorra','Europe/Athens','Europe/Belfast','Europe/Belgrade','Europe/Berlin','Europe/Bratislava','Europe/Brussels','Europe/Bucharest','Europe/Budapest','Europe/Busingen','Europe/Chisinau','Europe/Copenhagen','Europe/Dublin','Europe/Gibraltar','Europe/Guernsey','Europe/Helsinki','Europe/Isle_of_Man','Europe/Istanbul','Europe/Jersey','Europe/Kaliningrad','Europe/Kiev','Europe/Lisbon','Europe/Ljubljana','Europe/London','Europe/Luxembourg','Europe/Madrid','Europe/Malta','Europe/Mariehamn','Europe/Minsk','Europe/Monaco','Europe/Moscow','Europe/Nicosia','Europe/Oslo','Europe/Paris','Europe/Podgorica','Europe/Prague','Europe/Riga','Europe/Rome','Europe/Samara','Europe/San_Marino','Europe/Sarajevo','Europe/Simferopol','Europe/Skopje','Europe/Sofia','Europe/Stockholm','Europe/Tallinn','Europe/Tirane','Europe/Tiraspol','Europe/Uzhgorod','Europe/Vaduz','Europe/Vatican','Europe/Vienna','Europe/Vilnius','Europe/Volgograd','Europe/Warsaw','Europe/Zagreb','Europe/Zaporozhye','Europe/Zurich','GB','GB-Eire','GMT','GMT+0','GMT-0','GMT0','Greenwich','HST','Hongkong','Iceland','Indian/Antananarivo','Indian/Chagos','Indian/Christmas','Indian/Cocos','Indian/Comoro','Indian/Kerguelen','Indian/Mahe','Indian/Maldives','Indian/Mauritius','Indian/Mayotte','Indian/Reunion','Iran','Israel','Jamaica','Japan','Kwajalein','Libya','MET','MST','MST7MDT','Mexico/BajaNorte','Mexico/BajaSur','Mexico/General','NZ','NZ-CHAT','Navajo','PRC','PST8PDT','Pacific/Apia','Pacific/Auckland','Pacific/Bougainville','Pacific/Chatham','Pacific/Chuuk','Pacific/Easter','Pacific/Efate','Pacific/Enderbury','Pacific/Fakaofo','Pacific/Fiji','Pacific/Funafuti','Pacific/Galapagos','Pacific/Gambier','Pacific/Guadalcanal','Pacific/Guam','Pacific/Honolulu','Pacific/Johnston','Pacific/Kiritimati','Pacific/Kosrae','Pacific/Kwajalein','Pacific/Majuro','Pacific/Marquesas','Pacific/Midway','Pacific/Nauru','Pacific/Niue','Pacific/Norfolk','Pacific/Noumea','Pacific/Pago_Pago','Pacific/Palau','Pacific/Pitcairn','Pacific/Pohnpei','Pacific/Ponape','Pacific/Port_Moresby','Pacific/Rarotonga','Pacific/Saipan','Pacific/Samoa','Pacific/Tahiti','Pacific/Tarawa','Pacific/Tongatapu','Pacific/Truk','Pacific/Wake','Pacific/Wallis','Pacific/Yap','Poland','Portugal','ROC','ROK','Singapore','Turkey','UCT','US/Alaska','US/Aleutian','US/Arizona','US/Central','US/East-Indiana','US/Eastern','US/Hawaii','US/Indiana-Starke','US/Michigan','US/Mountain','US/Pacific','US/Pacific-New','US/Samoa','UTC','Universal','W-SU','WET','Zulu'];
	
	//Populate time zone dropdowns
	$myLocationDropdown = $('.my-location-dropdown');
	$proposedTimeDropdown = $('.proposed-time-dropdown');
	for (var i = 0; i < allTimeZoneNames.length; i++) {
		$myLocationDropdown.append("<option>"+allTimeZoneNames[i]+"</option>");
		$proposedTimeDropdown.append("<option>"+allTimeZoneNames[i]+"</option>");
	}
	$('.proposed-time-dropdown').val(userTimeZoneName);
	$('.proposed-AMPM-dropdown').val(userTime.format('a').toUpperCase());

	//Add the user's local time zone to my locations by default
	if (myLocations.length === 0) {
		addMyLocation(userTimeZoneName);	
	}
	else {
		updateMyLocationsTable();
		// Update the Current Time Table
		updateTimeTable($('div.current-time tbody'), nowUTC);
		// Update the Proposed Time Table
		newProposedDate = parseDate($('.proposed-time-input').val(), $('.proposed-date-input').val(), $('.proposed-AMPM-dropdown').val(), $('.proposed-time-dropdown').val());
		updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
		// Update meeting planner
		updateMeetingPlanner();
	}
	

	$proposedTime = $('.proposed-time-input');
	$proposedDate = $('.proposed-date-input');
	$proposedTimeZone = $('.proposed-time-dropdown');
	$proposedAMPM = $('.proposed-AMPM-dropdown');

	//Event handler for the Proposed time text box and dropdown
	$proposedTime.on('change', function (e) {
		newProposedDate = parseDate($proposedTime.val(), $proposedDate.val(), $proposedAMPM.val(), $proposedTimeZone.val());
		updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
		
	});
	$proposedTimeZone.on('change', function (e) {
		newProposedDate = parseDate($proposedTime.val(), $proposedDate.val(), $proposedAMPM.val(), $proposedTimeZone.val());
		updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
		
	});
	$proposedDate.on('change', function (e) {
		newProposedDate = parseDate($proposedTime.val(), $proposedDate.val(), $proposedAMPM.val(), $proposedTimeZone.val());
		updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
	});
	$proposedAMPM.on('change', function (e) {
		newProposedDate = parseDate($proposedTime.val(), $proposedDate.val(), $proposedAMPM.val(), $proposedTimeZone.val());
		updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
	});

	//Event handler for "Add Location Button"
	$('.add-location-button').on('click', function (e) {
		// Stop the button from reloading the page
		e.preventDefault();
		// The new location we're going to add is the current value of the dropdown
		newLocation = $('.my-location-dropdown').val();
		// Add the location
		addMyLocation(newLocation);
	});

} );

function addMyLocation (newLocation) {
	
	// Add it to the array
	myLocations.push(newLocation);
	localStorage.setItem('myLocations', JSON.stringify(myLocations));

	// Update my locations table
	updateMyLocationsTable();
	// Update the Current Time Table
	updateTimeTable($('div.current-time tbody'), nowUTC);
	// Update the Proposed Time Table
	newProposedDate = parseDate($('.proposed-time-input').val(), $('.proposed-date-input').val(), $('.proposed-AMPM-dropdown').val(), $('.proposed-time-dropdown').val());
	updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
	updateMeetingPlanner();
}

function updateTimeTable($div, baseLocation) {
	$div.empty();
	for (var i = 0; i < myLocations.length; i++) {
		var color, html;
		color = colors(baseLocation.tz(myLocations[i]).hour());
		html = '<tr class="' + color + '"><th class="placeName" scope="row">' + myLocations[i] + '</th><td class="placeTime">' + baseLocation.tz(myLocations[i]).format('h:mm a (dddd)') + '</td></tr>';
		
		$div.append(html);
	}
}

function parseDate (proposedTime, proposedDate, proposedAMPM, proposedTimeZone) {
	//need to fix bug: 9:44 won't work, must be 09:44
	var patt = /(\d+?):(\d.*)/;
	var match = patt.exec(proposedTime);
	var hour = match[1];
	var minutes = match[2];

	hour = (parseInt(hour, 0) === 12) ? 0 : hour;
	hour = (proposedAMPM === 'PM') ? parseInt(hour, 0) + 12 : hour;
	hour = (hour < 10) ? "0" + hour : hour;

	proposedTime = hour + ":" + minutes;
	var data = proposedDate + "T" + proposedTime;
	proposedMoment = moment.tz(data, proposedTimeZone);
	//var hour = proposedMoment.hour();
	//proposedMoment = (proposedAMPM === 'PM') ? proposedMoment.hour(hour + 12) : proposedMoment;
	return proposedMoment;
}

function updateLocalTime (userTimeZone, userTimeZoneName, userTime) {
	$('.local-name').text(userTimeZoneName);
	$('.local-time-zone').text('(' + userTimeZone +')');
	$('.local-dst').text((userTime.isDST()) ? 'DST' : 'No DST');
	$('.localTime').text(userTime.format('dddd, MMMM Do YYYY, h:mma'));
	$('.proposed-time-input').val(userTime.format('h:mm'));
	$('.proposed-date-input').val(userTime.format('YYYY-MM-DD'));

}

function minutesToTime (totalMinutes) {
	var hours, minutes, time;
	hours = Math.floor( totalMinutes / 60);          
	minutes = totalMinutes % 60;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	time = hours + ":" + minutes;
	return time;
}

function updateMeetingPlanner () {
	var headers, body, hours, incrementingUTC, color;
	for (var i = 0; i < myLocations.length; i++) {
		headers += "<th>" + myLocations[i] + "</th>";
	}
	incrementingUTC = nowUTC.clone();
	incrementingUTC.minutes(0);
	
	for (i = 0; i < 24; i++) {
		body += "<tr>";
		
		for (var j = 0; j < myLocations.length; j++) {
			color = colors(incrementingUTC.tz(myLocations[j]).hour());
			body += '<td class="' + color + '">' + incrementingUTC.tz(myLocations[j]).format('h:mm a (dddd)') +"</td>";
		}
		body += "</tr>";
		incrementingUTC.hours(incrementingUTC.hours() + 1);
	}
	$('.meeting-planner-table thead tr').empty();
	$('.meeting-planner-table tbody tr').empty();
	$('.meeting-planner-table thead tr').append(headers);
	$('.meeting-planner-table tbody').append(body);
}

function colors (hour) {
	// 0 to 5 danger
	// 6 to 8 warning
	// 9 to 5 (9 to 17) success
	// 6 to 10 (18 to 22) warning
	// 11 to 12 (23+) danger
	if (hour <= 5) {
		color = "danger";
	}
	else if (hour <= 8) {
		color = "warning";
	}
	else if (hour <= 17) {
		color = "success";
	}
	else if (hour <= 22) {
		color = "warning";
	}
	else {
		color = "danger";
	}
	return color;
}

function updateMyLocationsTable() {
	$('table.my-location-table tbody').empty();
	for (var i = 0; i < myLocations.length; i++) {
		$('table.my-location-table tbody').append('<tr><td class="my-location-row" data-index="' + i + '"><span class="my-location-row-name">' + myLocations[i] + '</span>&nbsp;&nbsp;&nbsp;<a href="#" class="remove-my-location">remove</a></td></tr>');
		//Since we're adding it dynamically, we must add the onlick handler for "remove" in the same function
	}
	$('.remove-my-location').on('click', function () {
		index = $(this).parent().data("index");
		//remove it from the array
		console.log('remove index ' + index);
		myLocations.splice(index, 1);		//need to remove the value from the array here, but need to know the index first

		localStorage.setItem('myLocations', JSON.stringify(myLocations));

		// Update my locations table
		updateMyLocationsTable();
		// Update the Current Time Table
		updateTimeTable($('div.current-time tbody'), nowUTC);
		// Update the Proposed Time Table
		newProposedDate = parseDate($('.proposed-time-input').val(), $('.proposed-date-input').val(), $('.proposed-AMPM-dropdown').val(), $('.proposed-time-dropdown').val());
		updateTimeTable($('div.proposed-time-table tbody'), newProposedDate);
		updateMeetingPlanner();
	});
}

function hideEverything () {
	$('div .my-locations').hide();
	$('div .proposed-time').hide();
	$('div .current-time').hide();
	$('div .meeting-planner').hide();
}