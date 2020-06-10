var text = 
`
# Why should you use markdown

![image info](https://picsum.photos/1920/800)

## Hello World

### This is **Kevin's** blog

- Yo
- Lo
	- lo
`

for(var i=0;i<=1;i++)
	text += text

var converter = new showdown.Converter()
converter.setOption('noHeaderId', true)

document.getElementById('inner-markdown').innerHTML = converter.makeHtml(text)