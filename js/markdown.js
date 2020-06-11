var text = "# Broken Link"

var converter = new showdown.Converter()
converter.setOption('noHeaderId', true)

document.getElementById('inner-markdown').innerHTML = converter.makeHtml(text)