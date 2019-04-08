define(() => {
	return {
		comfotUrl: function() {
			let url = location.search.slice(1);
			return JSON.parse('{"' + url.replace('=', '":"').replace('&', '","') + '"}')
		}
	}
})
