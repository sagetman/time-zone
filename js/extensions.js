Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
};
Date.prototype.addDays= function(d){
    this.setDate(this.getDate()+d);
    return this;
};
Date.prototype.addMonths= function(m){
    this.setMonth(this.getMonth()+m);
    return this;
};
Date.prototype.addYears= function(y){
    this.setYear(this.getFullYear()+y);
    return this;
};


Date.prototype.format=function(formatString){   
    	   var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,dMod,th,AMPM;
    	   YY = ((YYYY=this.getFullYear())+"").substr(2,2);
    	   MM = (M=this.getMonth()+1)<10?('0'+M):M;
    	   MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substr(0,3);
    	   DD = (D=this.getDate())<10?('0'+D):D;
    	   DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substr(0,3);
    	   th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    	   formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    	   h=(hhh=this.getHours());
    	   if (h===0) h=24;
    	   if (h>12) h-=12;
    	   hh = h<10?('0'+h):h;
    	   ampm=hhh<12?'am':'pm';
    	   AMPM=hhh<12?'AM':'PM';
    	   mm=(m=this.getMinutes())<10?('0'+m):m;
    	   ss=(s=this.getSeconds())<10?('0'+s):s;
    	   return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
    	};
    	/*
		D = 5
		DD = 05
		DDD = Sat
		DDDD = Saturday
		
		M = 3
		MM = 03
		MMM = Mar
		MMMM = March
		
		YY = 15
		YYYY = 2015

		h   6
		hh 06
		hhh 18

		m 3
		mm 03

		s  7
		ss 07
		
		ampm = am
		AMPM = AM

		th = th/nd/rd

		now.format('#DDDD#, #MMMM# #D##th# #h#:#mm##ampm#')
*/