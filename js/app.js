var limit = 10;
		var videosData = [];
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
						fnShowVideos(1);
						fnGeneratePagination();
						$('#videosContainer').slideDown();
						$('#paginationContainer').slideDown();
					}
				}
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
					v = (page - 1) * 10;
				}
				for (var i = 0; i < 10; i++) {
					if(v < videosData.length){
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
						$('#videosContainer').append(html);
						v = v + 1;
					}
				}
			}
		}
		function fnGeneratePagination(){
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
		}var limit = 10;
		var videosData = [];
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
						fnShowVideos(1);
						fnGeneratePagination();
						$('#videosContainer').slideDown();
						$('#paginationContainer').slideDown();
					}
				}
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
					v = (page - 1) * 10;
				}
				for (var i = 0; i < 10; i++) {
					if(v < videosData.length){
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
						$('#videosContainer').append(html);
						v = v + 1;
					}
				}
			}
		}
		function fnGeneratePagination(){
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