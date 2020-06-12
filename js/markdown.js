// Standard Fetch Functions //
async function fetchData(data = {}) {

	const url = 'http://139.59.62.18:2018/blog/fetch'

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}

// Placeholder text //
var text = "# Broken Link";

// Fetch the blog name //
var url_string = window.location.href;
var url = new URL(url_string);
var name = url.searchParams.get("name");

var converter = new showdown.Converter();
converter.setOption('noHeaderId', true);
document.getElementById('inner-markdown').innerHTML = converter.makeHtml(text)

if(name && name.length > 0){

	// Name exists, fetch the document //
	fetchData({ name: name })
	.then((res) => {
		if(res && res.markdown)
			document.getElementById('inner-markdown').innerHTML = converter.makeHtml(res.markdown)
	})
	.catch(console.log)
}
else{
	
	// Hide the Markdown DIV Element
	document.getElementById("outer-markdown").style.display = "none"
}