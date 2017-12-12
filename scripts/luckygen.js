const luckyCatGen = {};

const $loader = $('.result .loader');
const $result = $('.result .message');
const $radioButton = $('form input:radio');

let selectedLuck = $('input:checked').val();

const signOff = ['Yours truly,', 'Sincerely,', 'May the odds ever be in your favour,', 'Welp, good luck to ya!', 'Yours meowly,', `( ͡° ͜ʖ ͡°)`, 'ಠ_ಠ', '༼ つ ◕_◕ ༽つ', '(づ｡◕‿‿◕｡)づ', '(◕‿◕✿)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'];

const author = ['Emperor Miao', 'Lady Meowsifer', 'Magnus and Agnes, they\'ve seen things.', 'Kiddie Kat', 'Bob Meowerly', 'Anderson Pooper', 'Catalie Portman', 'Cleo Catra', 'Notorious C.A.T', 'Ebefleazer Scrooge', 'Gehnghis Cat', 'Ron Furgandy', 'Catnip Everdeen', 'Ripper', 'Fleyonce', 'Francesca LeMow'];

const loadingMessage = ['Herding cats...', 'Cat generator purring...', 'Cat generator hissing...', 'Herding kittens...', 'Scratching scratching post...', 'Looking for treats...', 'Playing with yarn...', 'Meowing...', 'Purring...', 'Flicking tail...', 'Fluffing tail...', 'Playing with strings','Grooming tail...','ConCATenating loose yarn...'];

let allLuckyMessages = {
	noLuck: ['Try standing under a tree so a bird poops on you. It will be the best luck you will have today...and probably all week.', 'You should probably throw salt over your shoulder...no reason other than it can\'t hurt your luck any more than it already is today.', 'It will be a catasphrophic day', 'Don\'t have a catitude!', 'Today will go down in hisstory as a pawesitvely mediocre day.', 'Today is litterboxly so bad.', 'I literboxly can\'t even with today.', 'You\'ve cat to be kitten me right meow', 'Call it a day and get the catnip right meow!'],
	medLuck: ['No furballs in your future. It will be a pawsitive day.', 'Stay pawesome.', 'Everything is better with guacatmole!', 'Keep a pawsitive catitude today.', 'Everything will be better with catnip.', 'Don\'t take things too purrsonally today.', 'Today won\'t be total catlateral damage.', 'Keep a pawesitive attitude and groom the toxhissity out of your 9 lives.', 'Purrserverence is key to getting the meowst out of today.'],
	bestLuck: ['You are going to have a pawsitively meowtastic day ~ meow ~', 'You\'re going to have an absolutely pawesome day!', 'You\'re feline pawsome today!', 'I have a good feeline about today!', 'It will be the purrfect day today.', 'Furrget bein\' meown on your luck! Stay pawsitive!', 'Purr proudly and meow loadly on this beautify brand mew day!', 'Today is good day to move furrward on your business pawpurrsitions.', 'It will be a meowgical day ~']
};

// random selector
function selectRandom(name) {
	return name[Math.floor(Math.random() * name.length)]
};

//catLoader
let catLoader = function() {
	// add animation here

	// select random loading message
	let randLoadingMessage = selectRandom(loadingMessage);

	// display loading message
	$loader.append(
		$loader.append(randLoadingMessage).typeIt({
			breakLines: true
		}));
			//remove loader in x seconds
	setTimeout(function () {
		$loader.empty();
	}, 5000);
};

//weight
let weight = [0.2];

//weighted array function
let generateWeightedLuck = function (list, weight) {
	var weightedLuck=[];
	// loop over weights
	for (let i = 0; i < weight.length; i++) {
		let multiples = weight[i] * 10;

		// loop over the list of items list or in this case ojb.array
		for (let x = 0; x < multiples; x++) {
			weightedLuck = weightedLuck.concat(list);
			// console.log(weightedLuck)
			
		} // end loop over
	} // end loop over weight


	return weightedLuck;
}; //End weighted random selector function


// listen for radio button click, put into selectedLuck const
luckyCatGen.buttonClick = function() {
		$radioButton.on('click', function () {
			let selectedLuck = $('input:checked').val();
			// console.log(selectedLuck);
			// console.log(allLuckyMessages[selectedLuck]);

			// generate weightedLuck.array duplicating the items from allLuckyMessages[selectedLuck]
			weightedLuck = generateWeightedLuck(allLuckyMessages[selectedLuck], weight);
			// console.log(weightedLuck);

			// conCAT to weightedLuck.array the arrays from buttons that were not selected
			if (selectedLuck === 'noLuck') {
				weightedLuck = weightedLuck.concat(allLuckyMessages.medLuck, allLuckyMessages.bestLuck);
				// console.log(weightedLuck);

			} else if (selectedLuck === 'medLuck') {
				weightedLuck = weightedLuck.concat(allLuckyMessages.noLuck, allLuckyMessages.bestLuck);
				// console.log(weightedLuck);

			} else if (selectedLuck === 'bestLuck') {
				weightedLuck = weightedLuck.concat(allLuckyMessages.noLuck, allLuckyMessages.medLuck);
				// console.log(weightedLuck);

			}; // end weighted selection
		}); // end radio listener
};  // end button click


// LUCKY MESSAGE LOADER
function luckyMessageLoader() {
	// select random from weightedLuck and create dislay message variable that changes based on random selection
	let selectedMessage = selectRandom(weightedLuck);
	// console.log(weightedLuck);

	//select random signoff
	let randSignOff = selectRandom(signOff);

	//seiect random author
	let randAuthor = selectRandom(author);
	
	// console.log(luckMsgStr);
	// display result in dom in 3-5 sscond suse setTimeOut()
	setTimeout(function () {
		$result.append(
			$('<li class="author">').typeIt({
				strings: [selectedMessage,' ',randSignOff,' ',randAuthor],
				cursor: false,
				breakLines: true
			}))
	}, // close function
	5000); // timing
	
	//remove result for when clicked again
	$result.empty();
	

}; //END MESSAGE LOADER

//ERROR MESSAGE
function errorMessage() {
	
	$loader.html('<span class="error typeIt2">Purrrlease make a selection...... You can do that right meoewwwwermmmm thanks.</span>');

	//typeIt effect
	$('.typeIt2').typeIt({
		cursor: false,
	});

}; // END ERROR MESSAGE

// FORM SUBMIT
luckyCatGen.submit = () => {

	// listen for form submit
	$('form').on('submit', function (e) {
		e.preventDefault();

		let selectedLuck = $('input:checked').val();

		if (selectedLuck === '' || selectedLuck === undefined) {
			errorMessage();
		} else {
			// Display loading message or animation (within this func, it removes itself)
			catLoader();

			// load message
			luckyMessageLoader();
		} // end if statement

		//disable button for 10 seconds and turn back on
		let $submitBtn = $('input.submitBtn');
		
		$submitBtn.attr('disabled','disabled');	
		
		setTimeout(function() {
			$submitBtn.removeAttr('disabled','disabled');
			console.log('hello');
		}, 10000);

	});// end form submit listener
	
};  //END FORM SUBMIT

// WINDOW INTERATCTION
luckyCatGen.windowInteraction = () => {
	let $window = $('.window');
	let $windowPane = $('.windowPane');
	let $icon = $('li .icon');
	let $iconMin = $('.minimize');
	let $iconExpand = $('.expand');
	let $iconClose = $('.close');
	let $reloadMsg = $('.reloadMsg');
	let $reloadBtn = $('.reloadMsg button')
	let displayNone = 'displayNone';

	$window.draggable().resizable();
	$reloadMsg.draggable();

	//close window
	$iconClose.on('click', () => {
		$window.addClass(displayNone);
		$reloadMsg.css("display","flex");
		$reloadBtn.css("display", "flex");
	});
	
	//open window
	$reloadBtn.on('click', () => {
		$window.removeClass(displayNone);
		$reloadBtn.css("display","none");
	});

	//minimize window
	$iconMin.on('click', () => {
		$window.addClass('windowMinimize');
		$window.css("position","absolute");
		$windowPane.css("display", "none");
	});

	//maximize window
	$iconExpand.on('click', () => {
		$window.removeClass('windowMinimize');
		$windowPane.removeClass(displayNone);
		$windowPane.css("display","block");
		$reloadBtn.addClass(displayNone);
	});
};// end WindowInteraction

// TYPEIT FEATURE
luckyCatGen.messageAnimations = () => {
	//opening message
	$('h2').typeIt({
		strings: ['Feline Lucky Today?',' ', 'Purrlease select how lucky you\'re feline today!'],
		breakLines: true,
		cursor: false,
	});

	//questions

	
};//TYPEIT FEATURE


// LuckyCatGen INITIALIZER
luckyCatGen.init = function() {

	//typeIt feature
	luckyCatGen.messageAnimations();
	
	//window interaction feature
	luckyCatGen.windowInteraction();
	
	luckyCatGen.buttonClick();
	luckyCatGen.submit();
	
	
}; // INITIALIZER END

// DOC FUNC START
$(function() {
	luckyCatGen.init();

}); //DOC FUNC END


// STRETCHIER GOAL
	// display random image based on cat theme selected
	// cat themes: lucky cat, gif cat, cat drawings, cat glyphs
	// theme changes result class which changes font family and background based on theme
	// nts, would i be able to use switch statement for ^
