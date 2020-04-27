#!/usr/bin/nodejs

dog = "Arnold"
this.dog = " FUERA ";
this.bala = () => {console.log("Raul tenia Razon")};

const perro = {

    dog : " DENTRO ",
    guau : function(){
        console.log(dog);
    },
    miau : function(){
        this.bala()
        console.log(this.dog);
    },
    bala : () => {
        let dog = "PajaroUno";
        function hola(){console.log(this.dog)}
        const adios = () =>{console.log(this.dog)}
        hola();
        adios();
        console.log(this.dog)
    },

    maulla : () => () => {
        this.bala();
    }
}

const relincha = () => {console.log(this)};

//perro.miau();
//perro.maulla()();
//relincha();


let me = {
	name: "Kyle"
};

let you = {
	name: "Reader"
};

function identify() {
    return this.name.toUpperCase();
    
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

identify.call( me ); // KYLE
identify.call( you ); // READER
//identify.call( this ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER