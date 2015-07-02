/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var ajax1 = require('ajax');
var ajax2 = require('ajax');
var ajax3 = require('ajax');
var ajax4 = require('ajax');

var main = new UI.Card({
	title: 'Pebble.js',
	icon: 'images/menu_icon.png',
	subtitle: 'Hello World!',
	body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
	var menu = new UI.Menu({
		sections: [{
			items: [{
				title: 'Pebble.js',
				icon: 'images/menu_icon.png',
				subtitle: 'Can do Menus'
			}, {
				title: 'Second Item',
				subtitle: 'Subtitle Text'
			}]
		}]
	});
	menu.on('select', function(e) {
		console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
		console.log('The item is titled "' + e.item.title + '"');
	});
	menu.show();
});

main.on('click', 'select', function(e) {
	var wind = new UI.Window({
		fullscreen: true,
	});
	var textfield = new UI.Text({
		position: new Vector2(0, 65),
		size: new Vector2(144, 30),
		font: 'gothic-24-bold',
		text: 'Made with love\nby Librae',
		textAlign: 'center'
	});
	wind.add(textfield);
	wind.show();
});

main.on('click', 'down', function(e) {
	var card = new UI.Card();
	/*
	card.title('A Card');
	card.subtitle('Is a Window');
	card.body('The simplest window type in Pebble.js.');
	*/
	ajax1({ url: 'http://api.theysaidso.com/qod.json', type: 'json' },
		function(data) {
			card.title(data.contents.author);
			card.body(data.contents.quote);
		},
		function(error) {
			card.body('GET failed, ret: ' + error);
		}
	);
    
	card.show();
	card.on('click', function(e) {
        card.subtitle('');
        card.body('');
		if (e.button == 'up') {
            card.title('POST on');
			console.log('http POST...');
            ajax2({
                    url: 'http://128.199.232.247:5000/on',
                    method: 'post',
                    type: 'text',
                    data: 'on'
                },
                function(data) {
                    card.body('POST done.\nret: ' + data);
                    console.log('POST done.\nret: ' + data);
                },
                function(error) {
                    card.body('POST failed, ret:\n' + error);
                    console.log('POST failed, ret:\n' + error);
                });
            card.show();
		} else if (e.button == 'down') {
            card.title('POST off');
			console.log('http POST...');
            ajax3({
                    url: 'http://128.199.232.247:5000/off',
                    method: 'post',
                    type: 'text',
                    data: 'off'
                },
                function(data) {
                    card.body('POST done.\nret: ' + data);
                    console.log('POST done.\nret: ' + data);
                },
                function(error) {
                    card.body('POST failed, ret:\n' + error);
                    console.log('POST failed, ret:\n' + error);
                });
            card.show();
		} else if (e.button == 'select') {
            card.title('GET');
			console.log('http GET...');
            ajax4({ url: 'http://eth0.me', method: 'get', type: 'text' },
                function(data) {
                    card.body('ip: ' + data + '\nMaster Mind?');
                    console.log('GET done, ip: ' + data);
                },
                function(error) {
                    card.body('GET failed, ret:\n' + error);
                    console.log('GET failed, ret:\n' + error);
                });
            card.show();
		}
	});
});

Settings.config(
	{ url: 'http://linkgo.io' },
	function(e) {
		console.log('opening configurable');

		// Reset color to red before opening the webview
		Settings.option('color', 'red');
	},
	function(e) {
		console.log('closed configurable');
	}
);