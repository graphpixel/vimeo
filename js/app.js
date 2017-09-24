var limit = 10;
		var searchText = '';
		var videosData = [];
		var responseData = [];
		$(document).ready(function(){
			$('#videosContainer').hide();
			$('#paginationContainer').hide();
			$.ajax({
				type: 'GET',
				url: 'https://api.vimeo.com/channels/top/videos?page=1&per_page=50&sort=likes&direction=desc',
				headers: {
					'Authorization': 'Bearer 5b7278649663001ed4984ed0b88a3138',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				crossDomain: true,
    			success: function(response) {
    				if(response.data && response.data.length > 0){
    					videosData = response.data;
						responseData = response.data;
						fnShowVideos(1);
						fnGeneratePagination();
						$('#videosContainer').slideDown();
						$('#paginationContainer').slideDown();
					}
				}
			});
			$('#btnSearch').click(function(){
				var sText = $('#txtSearchText').val();
				sText = sText.trim()
				var filterLikes = $('#chkFilterUserLikes').is(':checked');
				if(sText){
					sText = sText.toLowerCase();
					videosData = [];
					if(responseData && responseData.length > 0){
						for (var i = 0; i < responseData.length; i++) {
							var t = responseData[i].name.toLowerCase();
							var s = t.indexOf(sText);
							if( (s > -1) && ( (!filterLikes) || (filterLikes && responseData[i].user.metadata.connections.likes.total > 0) ) ){
								videosData.push(responseData[i]);
							}
						}
					}
					searchText = sText;
					$('#sSearchText').text(sText);
					$('#searchBox').hide();
					$('#searchInfoBox').slideDown();
					$('#videosContainer').hide();
					$('#videosContainer').html('');
					$('#paginationContainer').hide();
					fnShowVideos(1);
					fnGeneratePagination();
					$('#videosContainer').slideDown();
					$('#paginationContainer').slideDown();
				}
			});
			$('#btnClearSearch').click(function(){
				searchText = '';
				$('#sSearchText').text('');
				$('#txtSearchText').val('');
				$('#searchInfoBox').hide();
				$('#searchBox').slideDown();
				if(responseData && responseData.length > 0){
					videosData = [];
					var filterLikes = $('#chkFilterUserLikes').is(':checked');
					for (var i = 0; i < responseData.length; i++) {
						if( (!filterLikes) || (filterLikes && responseData[i].user.metadata.connections.likes.total > 0) ){
							videosData.push(responseData[i]);
						}
					}
				}
				$('#videosContainer').hide();
				$('#videosContainer').html('');
				$('#paginationContainer').hide();
				fnShowVideos(1);
				fnGeneratePagination();
				$('#videosContainer').slideDown();
				$('#paginationContainer').slideDown();
			});
			$('#chkFilterUserLikes').click(function(){
				if(responseData && responseData.length > 0){
					videosData = [];
					var filterLikes = $('#chkFilterUserLikes').is(':checked');
					for (var i = 0; i < responseData.length; i++) {
						var s = 1;
						if(searchText != ''){
							var t = responseData[i].name.toLowerCase();
							s = t.indexOf(sText);
						}
						if( (s > -1) && ( (!filterLikes) || (filterLikes && responseData[i].user.metadata.connections.likes.total > 0) ) ){
							videosData.push(responseData[i]);
						}
					}
					$('#videosContainer').hide();
					$('#videosContainer').html('');
					$('#paginationContainer').hide();
					fnShowVideos(1);
					fnGeneratePagination();
					$('#videosContainer').slideDown();
					$('#paginationContainer').slideDown();
				}
			});
			$('#lstPageLimit').change(function(){
				limit = $('#lstPageLimit').val();
				$('#videosContainer').hide();
				$('#videosContainer').html('');
				$('#paginationContainer').hide();
				fnShowVideos(1);
				fnGeneratePagination();
				$('#videosContainer').slideDown();
				$('#paginationContainer').slideDown();
			});
		});
		$(document).on('click', '.page-link', function(){
			var page = $(this).data('page');
			$('.page-item').removeClass('active');
			$(this).parent().addClass('active');
			$('#videosContainer').html('');
			fnShowVideos(page);
		});
		function fnShowVideos(page){
			if(videosData && videosData.length > 0){
				var v = 0;
				if(page != 1){
					v = (page - 1) * limit;
				}
				for (var i = 0; i < limit; i++) {
					if(v < videosData.length){
						/*
						var html = '<div class="col-sm-6 mtb10">';
						html += '<div class="row">';
						html += '<div class="col-sm-9">';
						html += '<h5 class="videoTitle">' + videosData[v].name + '</h5>';
						html += '</div><div class="col-sm-3 text-right">';
						html += 'Likes: ' + videosData[v].metadata.connections.likes.total;
						html += '</div></div>';
						html += '<div class="embed-responsive embed-responsive-16by9">';
						html += videosData[v].embed.html;
						html += '</div></div>';
						*/
						var html = '';
						var imgLink = 'img/default-user.png';
						if(videosData[v].user.pictures && videosData[v].user.pictures.sizes && videosData[v].user.pictures.sizes.length > 0){
							var pLen = videosData[v].user.pictures.sizes.length;
							if(pLen > 0){
								pLen = pLen - 1;
							}
							if(pLen < 2){

							}
							else{
								pLen = 2;
							}
							imgLink = videosData[v].user.pictures.sizes[pLen].link;
						}
						html += "<div class='row videoBox'>";
						html += "<div class='col-sm-1'>";
						html += "<a href='" + videosData[v].user.link + "'>";
						html += "<img class='profileImg' src='" + imgLink + "' />";
						html += "</a>";
						html += "</div>";
						html += "<div class='col-sm-11'>";
						html += "<a href='" + videosData[v].link + "'>";
						html += "<h5>" + videosData[v].name + "</h5>";
						html += "</a>";
						html += '<div class="embed-responsive embed-responsive-16by9">';
						html += videosData[v].embed.html;
						html += '</div>';
						html += "<p>" + videosData[v].description + "</p>";
						html += "<div>";
						html += "<strong>Playes: </strong><span>" + videosData[v].stats.plays + "</span>&nbsp;";
						html += "<strong>Comments: </strong><span>" + videosData[v].metadata.connections.comments.total + "</span>&nbsp;";
						html += "<strong>Likes: </strong><span>" + videosData[v].metadata.connections.likes.total + "</span>&nbsp;";
						html += "</div>";
						html += "</div>";
						html += "</div>";
						$('#videosContainer').append(html);
						v = v + 1;
					}
				}
			}
		}
		function fnGeneratePagination(){
			$('#paginationBox').html('');
			if(videosData && videosData.length > 0){
				var vLen = videosData.length;
				var pages = Math.ceil(vLen / limit);
				for (var i = 0; i < pages; i++) {
					var c = '';
					var p = i + 1;
					if(p == 1){
						c = 'active';
					}
					$('#paginationBox').append('<li class="page-item ' + c + '"><a class="page-link" href="javascript:void(0)" data-page="' + p + '"> ' + p + ' </a></li>');
				}
			}
		}