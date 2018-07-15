// lokendra rawat es6 exercises 

// ------------------------ let const and block scoping ---------------------------//

// 'use strict';

// console.log(productId);
// var productId = 34;
// let productId = 23;

// {
// 	let productId = 343;
// }

// console.log(productId);

// let updateFunctions = [];

// for (let i = 0; i < 2; i++) {
// 	updateFunctions.push(function () { return i; }); // coz i in closure will return 2 in var | in let it doesn't 
// }

// console.log(updateFunctions[0]());


// ---------------------- ARROW FUNCTIONS ------------------//

// var invoice = {
// 	num: 3434,
// 	process: () => {
// 		console.log(this); // in arrow function this always bounds to the context of code it is running.
// 	}
// }

var invoice = {
	num: 3434,
	process: function () {
		return _ => {
			// console.log(this);
			console.log(this.num); // in this example the code is running in invoice context. so we get num = 3434
		}
	}
}

var newInvoice = {
	num: 34223
}

// invoice.process().bind(newInvoice)(); // we cannot bind new object(or even call and apply) when we are using arrow functions

// invoice.process()();

// console.log(invoice.process().hasOwnProperty('prototype')); // arrow functions does not have prototype property


// --------------------------------- DEFAULT FUNCTION PARAMETERS ------------------------------- //

var getProduct = function (productId = 1000) {
	console.log(productId);
}

// getProduct();

// -------------------------------- REST AND SPREAD ------------------------- //

// rest 
var showCatagories = function (productId, ...catagories) {
	console.log(catagories instanceof Array);
	console.log(catagories);
	console.log(arguments.length);
};

// showCatagories(123, 'search', 'toys', 'automobils');
// console.log(showCatagories.length);

// spread

var prices = [132, 3213, 23, 32, 12, 5, 7, 7, 32300];
var maxPrice = Math.max(...prices);
// console.log(maxPrice);
// console.log(...prices);

// console.log(Math.max(..."97654321")); // also spreads strings 

// ---------------------------------- OBJECT LITEREL EXTENSIONS ---------------------------------- //

var price = 5.99, quantity = 10;

var productView = {
	price: 300,
	// quantity,
	quantity: 3,
	calculateValue() {
		return this.price * this.quantity; // this is going to be reffered to the context of the code it is running
	}
}

// console.log(productView.calculateValue());

// ---------------------------------- FOR OF LOOPS ---------------------------------- //

var catagories = ['hardware', 'software', 'moblie'];

// for (var item of "catagories") {
// 	console.log(item); // also works on strings
// }

// ----------------------------------- OCTALS AND BINARY LITEREALS ---------------------------- //

var octal = 0o11;
var binary = 0b01;
// console.log(octal, binary);


// ---------------------------------- TEMPLATE LITERELS ------------------------------ //

let invoiceNum = '1230';

// console.log(`the invoice no is : ${invoiceNum}`);

// ------------------------------------- DESTRUCTURING --------------------------------- //_

// let salary = [23233, 1223323, 23123, 123232];
// let [low, average, high, poor] = salary;
// console.log(poor);

let salary = {
	low: 233,
	high: 32423423,
	poor: 3
}

// let { low, high, poor } = salary;
// console.log(poor, high);

// -------------------------------------- ES6 MODULES AND CLASSES ---------------------------------- //

// -------------------------------------- CLASSES IN ES6 ----------------------------------------- //

// --------------------------------------- EXTENDS AND SUPER --------------------------------------------//

// class Project{
// 	constructor(){
// 		console.log('constructing project ');
// 	}
// }

// class SoftwareProject extends Project{
// 	constructor(name){
// 		super();
// 		console.log('my project ' + name)
// 	}
// }

// let p = new SoftwareProject('loki');

// let obj1 ={
// 	name : 'loki'
// }

// let obj = {
// 	name(){
// 		return super.name;
// 	}
// }
// Object.setPrototypeOf(obj,obj1);
// console.log(obj.name());

//----------------------------------- PROPERTIES IN CLASS INSTANCES ------------------------ //

// class Project{
// 	constructor(){
// 		this.location = "las vagas";
// 	}
// }

// class SoftwareProject extends Project{
// 	constructor(name){
// 		super();
// 	}
// }

// let p = new SoftwareProject('loki');
// console.log(p.location);

// --------------------------------- new.target property ------------------------------ //

class Project{
	constructor(){
		console.log(new.target);
	}
}

// let p = new Project();

// -------------------------------- new types and object extensions -------------------------- //

// ----------- symbols ------------ //

let symbol = Symbol('resize event');
// console.log(typeof symbol);

// console.log(symbol.toString());




// ------------------------------ OBJECT SYMBOLS ------------------------ // 

let a = {
	x : 1
}
let b = {
	y : 2,
	x  :5
}

// Object.setPrototypeOf(a,b);
// console.log(a.y , a.x);

let target = {};
Object.assign(target,a,b); // x is going to overwrite a.x
// console.log(target);

Object.defineProperty(b, "c" , {
	value : 30,
	enumerable : false
});

// console.log(target);

// let amount = NaN;
// console.log(Object.is(amount , amount)); // solves the problem of nan === nan
let amount = 0,total = -0;

// console.log(Object.is(amount , total));/

// ------------------------- string extensions ----------------------- //

let title = "hello world is the first \u{1f3c4} program";

// console.log(title.startsWith('hello'));
// console.log(title);

//---------------------------- iterators and generators ------------------------- //

// iterators 

let ids = [299,3213,123];
// console.log(typeof ids[Symbol.iterator]);
// let it = ids[Symbol.iterator]();
// console.log(it.next())

var idMaker = {
	[Symbol.iterator](){
		let nextId = 1000;
		return {
			next(){
				return {
					value : nextId++,
					done : false
				}
			}
		}
	}
}

let it = idMaker[Symbol.iterator]();
// console.log(it.next().value);
// console.log(it.next().value);

// ------------------------ generators --------------------- //

function *process(){
	yield 8000;
	yield 8001;
}

let gen = process();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

// ------------------------ PROMISES ----------------------- // 

function doAsync() {
	let p = new Promise(function(resolve,reject){
		console.log('in promise code');
		setTimeout(function(){
			console.log('resolving');
			resolve();
		},2000);
	});
	return p;
}

// let promise = doAsync();

// kyle simpson promise flow control 

function getFile(file){
	return new Promise(function executer(resolve){
		// fakeAjax(file , resolve);
	});
}

function output(string){
	console.log(string);
}

// request to all file in parallel 

var p1 = getFile('file1');
var p2 = getFile('file2');
var p3 = getFile('file3');

p1
.then(output)
.then(function(){
	return p2;
})
.then(output)
.then(function(){
	return p3;
})
.then(output)
.then(function(){
	output('complete!');
})

