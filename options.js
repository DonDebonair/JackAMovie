http://tpb.hidde.se/

// Saves options to localStorage.
function save_options() {
	var $selectedradio = $('input[name=proxy]:radio:checked');
	var proxy = $selectedradio.val();
	if(proxy == 'own') {
		localStorage["proxy"] = $('input[name=owntext]').val();
	} else {
		localStorage["proxy"] = proxy;
	}

	// Update status to let user know options were saved.
	$('#status').html("Options Saved!");
	setTimeout(function() {
		$('#status').html("");
	}, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  	var proxy = localStorage["proxy"];
  	if (!proxy) {
    	return;
  	}
  	console.log("localStorage val: <" + proxy + ">");
	if($.inArray(proxy, ['http://tpb.hidde.se/', 'https://piratereverse.info/']) == -1) {
		$('#own').prop('checked', true);
		$('#owntext').val(proxy);
	} else {
		$('input[name=proxy]').each(function(index) {
			if($(this).val() == proxy) {
		  		$(this).prop('checked',true);
		  	}
		});
	}
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);