<h3>About</h3>
Harut is a carusel jquery plugin that polls an url for json data to fill html with.


<h3>Usage</h3>
<strong>Html binding</strong>
url/get/jsonObject returns:
```
{
		"Header": "Picture 1",
		"Items": [{
			"Name": "item1"
		}, {
			"Name": "item2"
		}]
	}
	```
Haruts html binding could look like this:
```
<div id="harut">
    <strong data-harut="text:Header"></strong>
    <span data-harut="foreach:Items">
        <span data-harut="text:Name"></span>
    </span>
</div>
```

<strong>Config options</strong>

```
$('#harut').harut({
url: 'url/get/jsonObject',                                  //Ajax post url
arguments: {userId : 1},                                    //Ajax post argumenst
speed: 5000,                                                //ms delay between posts
onComplete: function () { console.log('ajax post done'); }, //On post done
counterEnabled: true,                                       //On true will add current poll count to post               
counterName: 'count',                                       //Set current poll count key
 fadeSpeed: 'slow',                                          //Html element fade in speed
        });
```
