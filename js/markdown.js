////////////////////
//      INIT      //
////////////////////
const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);



////////////////////
//   PLACEHOLDER  //
////////////////////
var text = "# Broken Link";
setBody(text)



////////////////////
//     ROUTER     //
////////////////////
const pathname = window.location.pathname

switch(pathname){

	case "/": 	populateBody("home");
				break;

	case "/views/blog":		fetchBlog();
							break;
}


/////////////////////////////
//    MARKDOWN FUNCTIONS   //
/////////////////////////////
async function fetchBlogData(data = {}) {

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

function populateBody(name){
	// Name exists, fetch the document //
	fetchBlogData({ name: name })
	.then((res) => {
		if(res && res.markdown)
			setBody(res.markdown)
	})
	.catch(console.log)
}

function setBody(body){
	document.getElementById('inner-markdown').innerHTML = converter.makeHtml(body)
}

async function fetchBlog(){

	// Fetch the blog name //
	const url_string = window.location.href;
	const url = new URL(url_string);
	const name = url.searchParams.get("name");

	if(name && name.length > 0){
		// Hide the LIST DIV Element //
		document.getElementById("outer-list").style.display = "none"

		populateBody(name)
	}
	else{
		// Hide the Markdown DIV Element //
		document.getElementById("outer-markdown").style.display = "none"

		// Fetch all blogs //
		createListItems()
	}
}

/////////////////////////////
//   LIST BLOG FUNCTIONS   //
/////////////////////////////

async function fetchAllBlogs(data = {}) {

	const url = 'http://139.59.62.18:2018/blog/fetchAll'

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}

function createListItems(items){

	fetchAllBlogs()
	.then((items) => {
		var list = document.getElementById("outer-list");
		for(var i = 0; i < items.length; i++) {

			// A Tag //
			var link = document.createElement("a");
			link.href = `?name=${items[i].name}`;

			// List item //
			var listItem = document.createElement("div");
			listItem.id = "list-item";

			// Title //
			var title = document.createElement("p");
			title.id = "list-item-title";
			title.innerHTML = items[i].title;
			listItem.appendChild(title);

			// Time //
			var time = document.createElement("p");
			time.id = "list-item-time";
			time.innerHTML = new Date(items[i].createdAt).toDateString();
			listItem.appendChild(time);

			link.appendChild(listItem);
			list.appendChild(link);
		}
	})
	.catch(console.log)
}