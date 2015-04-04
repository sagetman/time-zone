/*
to do:
	auto-detect whether DST is true or not
		find out if the location observes DST (look up from tz database)
		find out the difference in time zone during DST (look up from tz database)
		find out when the location observes DST (where can we find?)
		find out if they're observing it for the specific dates (just test > or <)
		update the time zone accordingly (update it with the difference)
	table comparison (easy)
	add all countries (moderate)
	auto-detect time zone based on your geolocation (moderate)
	allow users to add the time zones they care about (long)
	store time zones to local storage to remember for next time (?)
	offline app function (easy)
*/


$( document ).ready( function () {
	var localTimeZone,
		localLocationName,
		currentTimeLocations, 
		$proposedTime,
		$proposedTimeZone,
		localTime;

	localTime = new Date(); // hard code local time to the timestamp of the client pc
	localLocationName = 'New York'; // hard code to NYC
	localTimeZone = lookupTimeZone(localLocationName); //hard code the time zone for NYC for now
	console.log(localTimeZone);
	updateLocalTime(localTime);

	currentTimeLocations = setLocations(localTime, localTimeZone); // create all locations we care about
	updateTimeTable(currentTimeLocations, $('div.current-time tbody')); // add the current time table
	
	$proposedTime = $('.proposed-time-input');
	$proposedTimeZone = $('.proposed-time-location');
	updateProposedTimeTable($proposedTime.val(), $proposedTimeZone.val()); //run the first time automatically

	$proposedTime.on('change', function (e) {
		updateProposedTimeTable($proposedTime.val(), $proposedTimeZone.val());
	});
	$proposedTimeZone.on('change', function (e) {
		updateProposedTimeTable($proposedTime.val(), $proposedTimeZone.val());
	});
} );



function updateTimeTable(locations, $div) {
	$div.empty();
	for (var i = 0; i < locations.length; i++) {
		var color, html;
		if (locations[i].currentTime.getHours() >= 9 && locations[i].currentTime.getHours() <= 16) {
			color = "success";
		}
		else if (locations[i].currentTime.getHours() > 16 && locations[i].currentTime.getHours() <= 20) {
			color = "warning";
		}
		else if (locations[i].currentTime.getHours() < 9 && locations[i].currentTime.getHours() >= 6) {
			color = "warning";
		}
		else {
			color = "danger";
		}
		html = '<tr class="' + color + '"><th class="placeName" scope="row">' + locations[i].name + '</th><td class="placeTime">' + locations[i].currentTime.format('#h#:#mm# #AMPM#') + '</td></tr>';
		
		$div.append(html);
	}
}


function setLocations (baseTime, baseTimeZone) {
	var locations = [];

	locations.addLocation = function  (name, time) {
		var baseTime = copyTime(time);
		this.push({name: name, timeZone: lookupTimeZone(name), currentTime: changeTimeZone(baseTime, baseTimeZone, lookupTimeZone(name))});
	};

	locations.addLocation('New York', baseTime);
	locations.addLocation('Chicago', baseTime);
	locations.addLocation('California', baseTime);
	locations.addLocation('Hong Kong', baseTime);
	locations.addLocation('Cambodia', baseTime);
	locations.addLocation('Germany', baseTime);
	locations.addLocation('Sydney', baseTime);
	locations.addLocation('GMT', baseTime);
	return locations;
}

function changeTimeZone (time, baseTimeZone, newTimeZone) {
	time.addHours(-baseTimeZone+newTimeZone);
	return time;
}


function updateProposedTimeTable (proposedTimeInput, proposedPlace) {
	var proposedTime,
		proposedTimeZone,
		proposedLocations;
	proposedTime = parseDate(proposedTimeInput);
	proposedTimeZone = lookupTimeZone(proposedPlace);
	proposedLocations = setLocations(proposedTime, proposedTimeZone); //location object
	updateTimeTable(proposedLocations, $('div.proposed-time-table tbody'));
	
}

function lookupTimeZone (locationName) {
	//Note: This only checks whether it's DST according to the client's local time and US schedule
	//Obviously this will need to be fixed
	// Problem 1: Uses client local time to check for DST. Should be passed in a base date to check
	// Problem 2: Every country has a different schedule for observing DST

	var now = new Date();
	var timeZone;
	var dictionary = {
		'New York': {noDST: -5, DST: -4},
		'Chicago': {noDST: -6, DST: -5},
		'California': {noDST: -8, DST: -7},
		'Hong Kong': {noDST: 8, DST: 8},
		'Cambodia': {noDST: 7, DST: 7},
		'Germany': {noDST: 1, DST: 1},
		'Sydney': {noDST: 11, DST: 11},
		'GMT': {noDST: 0, DST: 0},
		};
	if (isDST(now, locationName)) {
		timeZone = dictionary[locationName].DST;
	}
	else {
		timeZone = dictionary[locationName].noDST;
	}

	return timeZone;
}

function copyTime (time) {
	return new Date(time.getFullYear(), time.getMonth(), time.getDay()+1, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
}

function parseDate (proposedTimeInput) {
	var now, ampm, year, month, day, hours, minutes, seconds, milliseconds;
	now = new Date();

	//hard code values we won't use
	//we can set them up to user input later if we want to include them
	year = now.getFullYear();
	month = now.getMonth();
	day = now.getDay();
	seconds = now.getSeconds();
	milliseconds = now.getMilliseconds();

	var myString = proposedTimeInput;
	var myRegexp = /(\d+):(\d+)(am|pm)/g;

	hours = getMatches2(myString, myRegexp, 1)[0];
	minutes = getMatches2(myString, myRegexp, 2)[0];
	ampm = getMatches2(myString, myRegexp, 3)[0];
	
	if (hours === 12 && ampm === 'am') {
		hours = 0;
	}
	console.log(hours);

	var parsedDate = new Date(year, month, day, hours, minutes, seconds, milliseconds);
	if (ampm == 'pm') {
		parsedDate.addHours(12);
	}
	

	console.log(parsedDate);
	return parsedDate;
}



function getMatches(string, regex) {
    return regex.exec(string);
}

function getMatches2(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}


function updateLocalTime (localTime) {
	$('.local-name').text('New York City');
	$('.local-time-zone').text('(-5 UTC)');
	if (isDST(localTime)) {
		$('.local-dst').text('DST');
	}
	else {
		$('.local-dst').text('No DST');
	}
	
	$('.localTime').text(localTime.format('#h#:#mm# #AMPM#'));
	$('.proposed-time-input').val(localTime.format('#h#:#mm##ampm#'));
}

function isDST (date, country) {
	//CURRENTLY ONLY CHECK US SCHEDULE
	// Should update so that it checks the country being passed in, and checks the local schedule for that country

	var dst;	
	var month = date.getMonth() + 1;
	if (month < 3 || month >= 11) {
		dst = false;
	}
	else if (month === 3 && date.getDate() < 8) {
		dst = false;
	}
	else {
		dst = true;
	}
	return dst;
}
