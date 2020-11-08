let session

let functions = {
	anyNumber : function(number) {
		return Math.floor(Math.random() * Math.floor(number))
	},
	hideObject : function(object){
		object = object.classList.add("hide")

	},
	showObject : function(object){
		object = object.classList.remove("hide")
	}
}
/////////////////////////////////////////////////////////


class Product {
	constructor(name,size,price,alias){
		this.name                      = name
		this.size                      = size
		this.price                     = price
		this.alias                     = alias
	}

	createProduct(name,size,price,alias){
		this.name                      = name
		this.size                      = size
		this.price                     = price
		this.alias                     = alias
		return [this.name,this.size,this.price,this.alias]
	}
}

/////////////////////////////////////////////////////////

class Cart {
	constructor(){
		this.cart_products             = []
		this.total_cart_price          = 0
	}
}

/////////////////////////////////////////////////////////

class Storage {
	constructor(lemon,sugar,ice,glasses,alias) {
		this.lemon                     = lemon
		this.sugar                     = sugar
		this.ice                       = ice
		this.glasses                   = glasses
		this.alias                     = alias
	}
	createStorage(lemon,sugar,ice,glasses,alias){
		this.lemon                     = lemon
		this.sugar                     = sugar
		this.ice                       = ice
		this.glasses                   = glasses
		this.alias                     = alias
		return [this.lemon,this.sugar,this.ice,this.glasses,this.alias]
	}
}

/////////////////////////////////////////////////////////

class SessionProcess {
	constructor() {
		/**
		 * Session array collection
		 */
		this.stages                    = ["start","menu","game","post"]
		this.session_info              = []
		this.products                  = []
		this.cart                      = []
		this.storages                  = []
		this.session_info.stage        = this.stages[0]
	}
	/*
	 * screen Change functions
	 */
	showMenu() {
		/**
		 * Update newGame-Menu Displays
		 */
		functions.showObject(document.querySelector("#username"))
		functions.showObject(document.querySelector(".stats"))
		functions.showObject(document.querySelector(".display-menu"))
		functions.hideObject(document.querySelector(".display-start"))
		/**
		 * Process Listeners
		 */
		// functions.addRecepyListeners()
		// functions.addStoreListeners()
	}
	declareProducts() {
		let product                    = new Product()
		/**
		 * Lemon Presentations name,size,price
		 */
		this.products.push(product.createProduct('lemon',5,5,'small'))
		this.products.push(product.createProduct('lemon',10,7,'medium'))
		this.products.push(product.createProduct('lemon',15,11,'big'))
		/*
		 * Sugar Presentations name,size,price
		 */
		this.products.push(product.createProduct('sugar',10,8,'small'))
		this.products.push(product.createProduct('sugar',15,12,'medium'))
		this.products.push(product.createProduct('sugar',20,16,'big'))
		/*
		 * Ice Presentations name,size,price
		 */
		this.products.push(product.createProduct('ice',10,8,'small'))
		this.products.push(product.createProduct('ice',15,12,'medium'))
		this.products.push(product.createProduct('ice',20,16,'big'))
		/*
		 * Glass Presentations name,size,price
		 */
		this.products.push(product.createProduct('glass',10,5,'small'))
		this.products.push(product.createProduct('glass',20,10,'medium'))
		this.products.push(product.createProduct('glass',30,15,'big'))

		product                        = null
		return true
	}

	declareStorages() {
		let storage                    = new Storage()
		/*
		 * Storage Sices: lemon,sugar,ice,glass,alias
		 */
		this.storages.push(storage.createStorage(10,10,10,20,'small'))
		this.storages.push(storage.createStorage(20,20,20,30,'medium'))
		this.storages.push(storage.createStorage(35,35,35,40,'big'))
		this.storages.push(storage.createStorage(50,50,50,50,'special'))

		storage                        = null
		return true
	}

	updateSessionStorage(size){
		if(size==='small'){
			this.session_info.storage.lemon= this.storages[0][0]
			this.session_info.storage.sugar= this.storages[0][1]
			this.session_info.storage.ice  = this.storages[0][2]
			this.session_info.storage.glass= this.storages[0][3]
			this.session_info.storage.alias= this.storages[0][4]
		}
		else if(size==='medium'){
			this.session_info.storage.lemon= this.storages[1][0]
			this.session_info.storage.sugar= this.storages[1][1]
			this.session_info.storage.ice  = this.storages[1][2]
			this.session_info.storage.glass= this.storages[1][3]
			this.session_info.storage.alias= this.storages[1][4]
		}
		else if(size==='big'){
			this.session_info.storage.lemon= this.storages[2][0]
			this.session_info.storage.sugar= this.storages[2][1]
			this.session_info.storage.ice  = this.storages[2][2]
			this.session_info.storage.glass= this.storages[2][3]
			this.session_info.storage.alias= this.storages[2][4]
		}
		else if(size==='special'){
			this.session_info.storage.lemon= this.storages[3][0]
			this.session_info.storage.sugar= this.storages[3][1]
			this.session_info.storage.ice  = this.storages[3][2]
			this.session_info.storage.glass= this.storages[3][3]
			this.session_info.storage.alias= this.storages[3][4]
		}
		return true
	}
}

/////////////////////////////////////////////////////////

class Session extends SessionProcess {
	constructor(user) {
		super()
		/**
		 * Start the process
		 */
		this.start(user)
	}

	start(user){
		/**
		 * Products Declaration
		 */
		if (this.declareProducts()!==true) {
			alert('Problem in Product declaration')
		}
		/**
		 * Storage sizes declaration
		 */
		if (this.declareStorages()!==true) {
			alert('Problem in Storages declaration')
		}else {
			/**
			 * User initial Declaration
			 */
			this.session_info.user         = user
			/**
			 * Update initial money
			 */
			this.session_info.money        = 100
			/**
			 * Update initial date
			 */
			this.session_info.date         = 1
			/*
			 * Update user storage
			 */
			this.session_info.storage      = []
		}
		if(this.updateSessionStorage('small')!==true){
			alert('Problem updating your storage size')
		}else {
			this.showMenu()
		}

		this.session_info.stage        = this.stages[1]
	}
}

document.querySelector(".begin").addEventListener('click', startGame)

function startGame() {
	session                            = new Session('Carlos')
	console.log(session)
}