let session

document.querySelector(".begin").addEventListener('click', caca)

function caca() {
	session             = new Session('Carlos')
	console.log(session)
}

class Product {
	constructor(name,size,price){
		this.name = name
		this.size = size
		this.price = price
	}
}

class Session {
	constructor(user) {
		this.stages            = ["start","menu","game","post"]
		this.session_info      = []
		this.session_info.stage= this.stages[0]
		this.start(user)
	}

	start(user,stage){
		this.session_info.user = user
		this.session_info.money = 100
		this.session_info.date = 1
		this.session_info.stage = 'start'
	}

	menu() {

	}

}