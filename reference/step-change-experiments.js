// Tiles read left to right

let data = [ 'aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj', 'kkk', 'lll', 'mmm', 'nnn', 'ooo', 'ppp', 'qqq', 'rrr', 'sss', 'ttt', 'uuu', 'vvv', 'www', 'xxx', 'yyy']

function calcLeft(nOfTiles, width=256) {
	let j=0;
	data.map((object, i) => {
		let resetValue = (i % nOfTiles === 0) ? true : false;
		resetValue ? j = 0 : j++;
		console.log(j * width);
	});
}
calcLeft(5);


function calcTop(nOfTiles, height=256) {
	let j=0;
	data.map((object, i) => {
		let increaseValue = (i % nOfTiles === 0) ? true : false;
		if (increaseValue && i !== 0) { j++ };
		console.log(j* height);
	});
}
calcTop(5)
