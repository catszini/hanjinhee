var cal = {
	init : function(){
		
		if(this.params.searchYear.isNvl() && this.params.searchMonth.isNvl()){
			this.calendar(this.params.searchYear, this.params.searchMonth);
		} else {
			var objnow = new Date();
			this.calendar(objnow.getFullYear(), objnow.getMonth());
		}
		// 메인에서 링크클릭 시 ....
		if(this.params.directBoardKey != ''){
			cal.detail(this.params.directBoardKey);
		}
		$(document).on('click','.sch_pop, .sch_cir', function(e){
			e.preventDefault();
			cal.detail($(this).data('board-key'));
		});
		
		$('.sch_popup_header .close_btn').on('click', function(){
			$('.bg_black').fadeOut();
			$('.sch_popup').fadeOut();
		});
		
	},
	params : {
		arrweekDay : new Array("일", "월", "화", "수", "목", "금", "토")
		,	arrLstMonth : new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")
		,	arrLstDay : new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
		,	boardId : ""
		,	linkAddress : ""
		,	museumNo : ""
		,	menuCode : ""
		,	searchYear : ""
		,	searchMonth : ""
		,	directBoardKey : ""
	},
	detail : function(boardKey){
		//console.log(boardKey)
		var params = {board_key:boardKey}
		ajaxCall(params,'boardViewJson');
		ajaxRes.success(function(result){
			//console.log(result);
			if(result.RESULT_CODE == 'SUCCESS'){
				var data = result.RESULT_DATA;
				var startDay = data.start_day;
				var endDay = data.end_day;
				
				$('#txtTitle').html(data.title);
				$('#txtLocation').html(data.location);
				$('#txtDate').html(startDay+' ~ '+endDay);
				$('#txtContent').html(data.content);
				
				$('.bg_black').fadeIn();
				$('.sch_popup').fadeIn();
			} else {
				alert('데이터가 없습니다.');
			}
		});
	},
	calendar : function(year, month){
		var nYear = year;
		var nMonth = month;
		var objnow = new Date();
		
		if (((nYear % 4 == 0) && (nYear % 100 != 0)) || (nYear % 400 == 0)) {
			cal.params.arrLstDay[1] = 29;
		} else {
			cal.params.arrLstDay[1] = 28;
		}
		
		var ojbMonth = objnow.getMonth();
		var ndate = objnow.getDate();
		nMonth = parseInt(nMonth);
		if (nMonth > 11){
			nMonth = 0;
			nYear = nYear + 1;
		}else if (nMonth < 0){
			nMonth = 11;
			nYear = nYear - 1;
		};
		
		var firstTmp = new Date(nYear, nMonth, 1);
		var nFstDay = firstTmp.getDay() + 1;
		var strHtml = '';
		var params = {board_id : this.params.boardId, search_year : nYear, search_month : cal.params.arrLstMonth[nMonth]}
		ajaxCall(params,'boardScheduleListJson');
		ajaxRes.success(function(result){
			
			if(result.RESULT_CODE == 'SUCCESS'){
				//console.log(result.RESULT_DATA);
				
				var dataList = new Array();
				
				strHtml += '<section class="cal_header">';
				strHtml += '<div class="tit_wrap">';
				strHtml += '<h2>'+nYear+'년 '+cal.params.arrLstMonth[nMonth]+'월</h2>';
				strHtml += '<a href="#" class="prev_btn" onclick="cal.calendar('+nYear+',' + (nMonth - 1) +'); return false;">이전달</a>';
				strHtml += '<a href="#" class="next_btn" onclick="cal.calendar('+nYear+',' + (nMonth + 1) +'); return false;">다음달</a>';
				strHtml += '</div>';
				strHtml += '<div class="legend_wrap">';
				strHtml += '	<span class="cal_today"><em></em>오늘</span>';
				strHtml += '	<span class="cal_sch"><em></em>일정</span>';
				strHtml += '</div>';
				strHtml += '</section>';
				
				strHtml += '<div class="cal_body">';
				strHtml += '	<section class="cal_left calendar">';
				
				strHtml += '<table class="tb_calendar">';
				strHtml += '<colgroup><col width="14.28%"><col width="14.28%"><col width="14.28%"><col width="14.28%"><col width="14.28%"><col width="14.28%"><col width="14.28%"></colgroup>';
				strHtml += '<thead><tr>';
				for (var i = 0; i < 7; i++){
					strHtml += '<th>' + cal.params.arrweekDay[i] + '</th>';
				}
				strHtml += '</tr></thead>';
				strHtml += '<tbody>';
				var ndays = 1;
				var strnbsp = 1;
				var nDate = '';
				for (var i = 1; i <= Math.ceil((cal.params.arrLstDay[nMonth] + nFstDay - 1) / 7); ++i) {
					strHtml += '<tr>';
					
					for (var j = 1; j <= 7; j++) {
						if (ndays <= cal.params.arrLstDay[nMonth]) {
							if (strnbsp < nFstDay) {
								strHtml += '<td>&nbsp;</td>';
								strnbsp++;
							} else {
								var className = '';
								//오늘날짜 체크
								if (ndays == ndate && ojbMonth == nMonth) {
									className = 'day_today';
								}
								//일요일, 토요일 체크
								if(j == 1) {
									className += 'day_sun';
								} else if(j == 7) {
									className += 'day_sat';
								}
								calMonth = nMonth+1;
								nDate = nYear+""+(calMonth<10?"0"+calMonth:calMonth)+""+(ndays<10?"0"+ndays:ndays);
								//console.log(nYear+""+calMonth+""+ndays +", "+today+","+nDate)
								
								strHtml += '<td class="'+ className +'"><span class="num">' + ndays + '</span>';
								strHtml += '		<div class="sch_cir_wrap">';
								
								
								var scheduleList = new Array();
								$(result.RESULT_DATA).each(function(i,data){
									//console.log(nDate+', '+data.start_day.replace(/-/g,'')+', '+data.end_day.replace(/-/g,''))
									if(parseInt(nDate) >= parseInt(data.start_day.replace(/-/g,'')) && parseInt(nDate) <= parseInt(data.end_day.replace(/-/g,''))){
										
										// 전체일정 데이터 가공
										var scheduleData = new Object();
										scheduleData.board_key = data.board_key;
										scheduleData.title = data.title;
										scheduleList.push(scheduleData);
										
										strHtml += '<a href="#" class="sch_cir" data-board-key="'+data.board_key+'" title="'+data.title+'"></a>';
									}
								});
								if(scheduleList.length > 0){
									var objData = new Object();
									objData.date = nDate;
									objData.list = scheduleList;
									dataList.push(objData);
								}
								strHtml += '		</div>';
								strHtml += '</td>';
								
								ndays++;
							}
						} else {
							strHtml += '<td>&nbsp;</td>';
						}
					};
					strHtml += '</tr>';
				};
				
				var jsonData = JSON.stringify(dataList);
				//console.log(jsonData);
				
				strHtml += '</tbody>';
				strHtml += '</table>';
				
				strHtml += '	</section>';
				strHtml += '<section class="cal_right">	';
				strHtml += '		<div class="tit_wrap">';
				strHtml += '		<h2>'+cal.params.arrLstMonth[nMonth]+'월 전체일정</h2>';
				strHtml += '		</div>';
				
				strHtml += '<div class="all_sch_list">';
				$(JSON.parse(jsonData)).each(function(i, data){
					strHtml += '<dl>';
					strHtml += ' <dt><span class="tit">'+data.date.substring(4,6)+'월'+data.date.substring(6,8)+'일</span></dt>';
					strHtml += ' <dd>';
					$(data.list).each(function(i, sdata){
						strHtml += ' <p class="list_s4"><a href="#a" class="sch_pop" data-board-key="'+sdata.board_key+'">'+sdata.title+'</a></p>';
					});
					strHtml += ' </dd>';
					strHtml += '</dl>';
				});
				
				strHtml += '</div>';
				strHtml += '	</section>';
				strHtml += '	</div>';
				
				$('#calenda').html(strHtml);
				
			}
		});
		
	}
	
};