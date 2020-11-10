//----------------------------------------------
/**
 * Game variables declaration
 */
//----------------------------------------------
let session
let savedGame
//----------------------------------------------
/**
 * Game global Functions declaration
 */
//----------------------------------------------
let functions  = {
	anyNumber  : function(number) {
		return Math.floor(Math.random() * Math.floor(number))
	},
	hideObject : function(object){
		object = object.classList.add("hide")

	},
	showObject : function(object){
		object = object.classList.remove("hide")
	},
	showMessage : function(message){
		document.querySelector(".note-wrapper").classList.remove("hide")
		document.querySelector(".note-message").innerHTML= message
	},
	closeMessage : function(){
		document.querySelector(".note-wrapper").classList.add("hide")
	},
	saveGame : function(session){
		localStorage.setItem('save', JSON.stringify(session));
		console.log('saved')
	}
}
//----------------------------------------------
/**
 * Classes Declared on Base
 */
//----------------------------------------------
class UserInfo {
	constructor() {
	}
}
class Storage {
	constructor() {
	}
	createStorage(lemon,sugar,ice,glasses,alias){
		this.lemon                                            = lemon
		this.sugar                                            = sugar
		this.ice                                              = ice
		this.glasses                                          = glasses
		this.alias                                            = alias
		return [this.lemon,this.sugar,this.ice,this.glasses,this.alias]
	}
}

class Recepy {
	constructor() {
	}
}

class Product {
	constructor(name,size,price,alias) {
		this.name = name
		this.size = size
		this.price= price
		this.alias= alias
	}
	createProduct(name,size,price,alias){
		this.name = name
		this.size = size
		this.price= price
		this.alias= alias
		return [this.name,this.size,this.price,this.alias]
	}
}

class Inventory {
	constructor() {
	}
}
//----------------------------------------------
/**
 * Game Cart
 */
//----------------------------------------------
class Cart {
	constructor() {
		this.cart_products   = []
		this.total_cart_price= 0
	}
	processProduct(id) {
		this.session=session
		/**
		  * Get id from the event (Process Call)
		  **/
		this.event = event.target.id
		/**
		  * Get selection information ingredient, command and qty in screen
		  **/
		this.product= this.event.slice(0, 1)
		this.size   = this.event.slice(2)
		/**
		  * lemon
		  **/
		if(this.product===`l`){
			this.product = `lemon`
			if(this.size==='small') { this.size=this.session.products[0][1];this.price=this.session.products[0][2]}
			if(this.size==='medium'){ this.size=this.session.products[1][1];this.price=this.session.products[1][2]}
			if(this.size==='big')   { this.size=this.session.products[2][1];this.price=this.session.products[2][2]}
		}
		/**
		  * sugar
		  **/
		else if(this.product===`s`){
			this.product = `sugar`
			if(this.size==='small') { this.size=this.session.products[3][1];this.price=this.session.products[3][2]}
			if(this.size==='medium'){ this.size=this.session.products[4][1];this.price=this.session.products[4][2]}
			if(this.size==='big')   { this.size=this.session.products[5][1];this.price=this.session.products[5][2]}
		}
		/**
		  * ice
		  **/
		else if(this.product===`i`){
			this.product = `ice`
			if(this.size==='small') { this.size=this.session.products[6][1];this.price=this.session.products[6][2]}
			if(this.size==='medium'){ this.size=this.session.products[7][1];this.price=this.session.products[7][2]}
			if(this.size==='big')   { this.size=this.session.products[8][1];this.price=this.session.products[8][2]}
		}
		/**
		  * glasses
		  **/
		else if(this.product===`g`){
			this.product = `glass`
			if(this.size==='small') { this.size=this.session.products[9][1];this.price=this.session.products[9][2]}
			if(this.size==='medium'){ this.size=this.session.products[10][1];this.price=this.session.products[10][2]}
			if(this.size==='big')   { this.size=this.session.products[11][1];this.price=this.session.products[11][2]}
		}
		/**
		 * Create product
		 **/
		this.new_cart_product = new Product(this.product,this.size,this.price,this.size)
		/**
		 * Limit the cart Items
		 */
		if (this.session.cart.cart_products.length <= 9) {
			this.session.cart.pushProduct(this.new_cart_product)
		}
		else {
			this.new_cart_product = '';
		}
	}
	/**
	 * Push product into cart array
	 **/
	pushProduct(product) {
		this.cart_products.push(product);
		this.total_cart_price += product.price;
		/**
		 * Printing the product in the list
		 */
		this.new_row_name                         = document.createElement('span');
		this.new_row_size                         = document.createElement('span');
		this.new_row_price                        = document.createElement('span');
		this.cart_total_title                     = document.querySelector('.cart_total_title')

		this.new_row_name.className               = 'l-'+this.cart_products.length
		this.new_row_size.className               = 'l-'+this.cart_products.length
		this.new_row_price.className              = 'l-'+this.cart_products.length

		this.new_row_name.innerHTML               = product.name
		this.new_row_size.innerHTML               = product.size
		this.new_row_price.innerHTML              = product.price
		this.cart_total_title.innerHTML           = this.cart_products.length

		document.querySelector(".digit").innerHTML= ''
		document.querySelector(".digit").innerHTML= this.total_cart_price

		document.querySelector(".cart_products").appendChild(this.new_row_name);
		document.querySelector(".cart_sizes").appendChild(this.new_row_size);
		document.querySelector(".cart_price").appendChild(this.new_row_price);
		functions.saveGame(session)
	}

	cleanCart() {
		this.clean_name                           = document.querySelector('.cart_products')
		this.clean_size                           = document.querySelector('.cart_sizes')
		this.clean_price                          = document.querySelector('.cart_price')
		this.clean_total                          = document.querySelector(".digit")
		this.cart_total_title                     = document.querySelector('.cart_total_title')

		this.clean_name.innerHTML                 = ''
		this.clean_size.innerHTML                 = ''
		this.clean_price.innerHTML                = ''
		this.clean_total.innerHTML                = 0
		this.cart_total_title.innerHTML           = 0

		session.cart.cart_products                   = []
		session.cart.total_cart_price                = 0
		functions.saveGame(session)
	}

	buyCart() {
		this.get_lemon         = session.cart.cart_products.filter(item => item.name === "lemon")
		this.get_sugar         = session.cart.cart_products.filter(item => item.name === "sugar")
		this.get_ice           = session.cart.cart_products.filter(item => item.name === "ice")
		this.get_glass         = session.cart.cart_products.filter(item => item.name === "glass")
		this.lemon_total       = 0
		this.sugar_total       = 0
		this.ice_total         = 0
		this.glass_total       = 0
		/**
		 * Get totals for inventory
		 **/
		for(let i              = 0; i < this.get_lemon.length; i++){
			this.lemon_total  += this.get_lemon[i].size
		}
		for(let i              = 0; i < this.get_sugar.length; i++){
			this.sugar_total  += this.get_sugar[i].size
		}
		for(let i              = 0; i < this.get_ice.length; i++){
			this.ice_total    += this.get_ice[i].size
		}
		for(let i              = 0; i < this.get_glass.length; i++){
			this.glass_total  += this.get_glass[i].size
		}
		/**
		 * Validate Funds
		 */
		if(session.user_info.money < session.cart.total_cart_price) {
			functions.showMessage('¡Not enought Money!')
			return
		}else {
			session.user_info.money = session.user_info.money - session.cart.total_cart_price
		}
		session.updateInventory(this.lemon_total,this.sugar_total,this.ice_total,this.glass_total,"inventory_in")
		functions.saveGame(session)
	}
}
//----------------------------------------------
/**
 * Game Class Base
 */
//----------------------------------------------
class Base {
	constructor(name) {
		/*
		 * Declare session info
		 */
		this.user_info = new UserInfo()
		/*
		 * Declare user storage
		 */
		this.storage      = new Storage()
		/*
		 * Declare Recepy
		 */
		this.recepy       = new Recepy()
		/*
		 * Declare inventory
		 */
		this.inventory    = new Inventory()
		/*
		 * Declare cart
		 */
		this.cart         = new Cart()
		/*
		 * Declare products
		 */
		this.products     = []
		/*
		 * Declare user storages sizes
		 */
		this.storages     = []
		/*
		 * Declare clients array
		 */
		this.clients_array= []
		/**
		 * Startup Declarations
		 */
	}
	/**
	 * Start Game Listeners
	 */
	addListeners() {
		/**
		 *Lemons
		 */
		document.querySelector(".more-l").addEventListener('click', 	this.recepySelector)
		document.querySelector(".less-l").addEventListener('click', 	this.recepySelector)
		/**
		 *sugar
		 */
		document.querySelector(".more-s").addEventListener('click', 	this.recepySelector)
		document.querySelector(".less-s").addEventListener('click', 	this.recepySelector)
		/**
		 *ice
		 */
		document.querySelector(".more-i").addEventListener('click', 	this.recepySelector)
		document.querySelector(".less-i").addEventListener('click', 	this.recepySelector)
		/**
		 *STORE SELECTION
		 */
		/**
		 * Cart Listeners
		 */
		document.querySelector(".note-close").addEventListener('click',	functions.closeMessage)
		document.querySelector('.clean_cart').addEventListener('click',	this.cart.cleanCart)
		document.querySelector('.buy_cart').addEventListener('click',		this.cart.buyCart)
		/*
		 *Lemons
		 */
		document.querySelector("#l-small").addEventListener('click',	this.cart.processProduct)
		document.querySelector("#l-medium").addEventListener('click',	this.cart.processProduct)
		document.querySelector("#l-big").addEventListener('click',		this.cart.processProduct)
		/*
		 *Sugar
		 */
		document.querySelector("#s-small").addEventListener('click',	this.cart.processProduct)
		document.querySelector("#s-medium").addEventListener('click',	this.cart.processProduct)
		document.querySelector("#s-big").addEventListener('click',		this.cart.processProduct)
		/*
		 *Ice
		 */
		document.querySelector("#i-small").addEventListener('click',	this.cart.processProduct)
		document.querySelector("#i-medium").addEventListener('click',	this.cart.processProduct)
		document.querySelector("#i-big").addEventListener('click',		this.cart.processProduct)
		/*
		 *Glasses
		 */
		document.querySelector("#g-small").addEventListener('click', 	this.cart.processProduct)
		document.querySelector("#g-medium").addEventListener('click', 	this.cart.processProduct)
		document.querySelector("#g-big").addEventListener('click', 		this.cart.processProduct)
		document.querySelector("#g-big").addEventListener('click', 		this.cart.processProduct)
		return true
	}
	/**
	 * Products declaration
	 */
	declareProducts() {
		let product = new Product()
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
		/**
		 * Display declarations
		 */
		// Lemon-Small
		document.querySelector('.size-qty-l-s').innerHTML     = this.products[0][1]
		document.querySelector('.product-price-l-s').innerHTML= this.products[0][2]
		// Lemon-Medium
		document.querySelector('.size-qty-l-m').innerHTML     = this.products[1][1]
		document.querySelector('.product-price-l-m').innerHTML= this.products[1][2]
		// Lemon-Big
		document.querySelector('.size-qty-l-b').innerHTML     = this.products[2][1]
		document.querySelector('.product-price-l-b').innerHTML= this.products[2][2]
		// Sugar-Small
		document.querySelector('.size-qty-s-s').innerHTML     = this.products[3][1]
		document.querySelector('.product-price-s-s').innerHTML= this.products[3][2]
		// Sugar-Medium
		document.querySelector('.size-qty-s-m').innerHTML     = this.products[4][1]
		document.querySelector('.product-price-s-m').innerHTML= this.products[4][2]
		// Sugar-Big
		document.querySelector('.size-qty-s-b').innerHTML     = this.products[5][1]
		document.querySelector('.product-price-s-b').innerHTML= this.products[5][2]
		// Ice-Small
		document.querySelector('.size-qty-i-s').innerHTML     = this.products[6][1]
		document.querySelector('.product-price-i-s').innerHTML= this.products[6][2]
		// Ice-Medium
		document.querySelector('.size-qty-i-m').innerHTML     = this.products[7][1]
		document.querySelector('.product-price-i-m').innerHTML= this.products[7][2]
		// Ice-Big
		document.querySelector('.size-qty-i-b').innerHTML     = this.products[8][1]
		document.querySelector('.product-price-i-b').innerHTML= this.products[8][2]
		// Glass-Small
		document.querySelector('.size-qty-g-s').innerHTML     = this.products[9][1]
		document.querySelector('.product-price-g-s').innerHTML= this.products[9][2]
		// Glass-Medium
		document.querySelector('.size-qty-g-m').innerHTML     = this.products[10][1]
		document.querySelector('.product-price-g-m').innerHTML= this.products[10][2]
		// Glass-Big
		document.querySelector('.size-qty-g-b').innerHTML     = this.products[11][1]
		document.querySelector('.product-price-g-b').innerHTML= this.products[11][2]

		product = null
		return true
	}
	/**
	 * Storage declaration
	 */
	declareStorages() {
		let storage = new Storage()
		/*
		 * Storage Sices                                      : lemon,sugar,ice,glass,alias
		 */
		this.storages.push(storage.createStorage(10,10,10,20,'small'))
		this.storages.push(storage.createStorage(20,20,20,30,'medium'))
		this.storages.push(storage.createStorage(35,35,35,40,'big'))
		this.storages.push(storage.createStorage(50,50,50,50,'special'))

		storage = null
		return true
	}
	/**
	 * New Game Stats declaration
	 */
	declareNewGameStats(user){
		/**
		 * User
		 */
		this.user_info.user       = user
		this.user_info.money      = 50
		this.user_info.date       = 1
		this.user_info.storageSize= 'small'
		/**
		 * Recepy
		 */
		this.recepy.lemon         = 0
		this.recepy.sugar         = 0
		this.recepy.ice           = 0
		/**
		 * Inventory
		 */
		this.inventory.lemon      = 0
		this.inventory.sugar      = 0
		this.inventory.ice        = 0
		this.inventory.glass      = 0
	}
	/*
	 * show Menu function
	 */
	showMenu() {
		/**
		 * Update newGame-Menu Displays
		 */
		functions.showObject(document.querySelector("#username"))
		document.querySelector(".startup").classList.remove("startup")

		functions.showObject(document.querySelector(".stats"))
		functions.showObject(document.querySelector(".display-menu"))
		functions.hideObject(document.querySelector(".display-start"))
	}
	/**
	 * Recepy Selector
	 */
	recepySelector(id) {
		/**
		 * Get id from the event
		 */
		this.event    = event.target.id
		this.recepy   = session.recepy
		/**
		 * Get selection information ingredient, command and qty in screen
		 */
		this.selection= this.event.slice(0, -2)
		this.target   = this.event.slice(-1)
		this.qty      = document.querySelector(".qty-"+this.target).innerHTML
		/**
		 * update recepy on screen an on global
		 */
		if (this.selection==='more' && this.qty < 10){
			this.qty  = Number(this.qty) + 1
		}
		else if(this.selection==='less' && this.qty > 0) {
			this.qty  = Number(this.qty) - 1
		}
		/**
		 * update recepy display
		 */
		document.querySelector(".qty-"+this.target).innerHTML = ""
		document.querySelector(".qty-"+this.target).innerHTML = this.qty
		/**
		 * update the global array
		 */
		 console.log(this.recepy)
		switch (this.target) {
			case "l": 
			this.recepy.lemon= Number(this.qty);
			break

			case "s": 
			this.recepy.sugar= Number(this.qty);
			break

			case "i": 
			this.recepy.ice  = Number(this.qty);
			break

			default:
			functions.showMessage('Error!!!')
			break
		}
	}
	/*
	 * Update bar
	 */
	updateBar() {
		document.getElementById("Lemons-bar").innerHTML = this.inventory.lemon
		document.getElementById("Sugar-bar").innerHTML  = this.inventory.sugar
		document.getElementById("Ice-bar").innerHTML    = this.inventory.ice
		document.getElementById("Glasses-bar").innerHTML= this.inventory.glass
		document.getElementById("Money-bar").innerHTML  = this.user_info.money
		document.getElementById("Date-bar").innerHTML   = this.user_info.date
		document.querySelector("#username").innerHTML   = this.user_info.user.toUpperCase()
	}
	/**
	 * Process any update to the inventory
	 **/
	updateInventory(lemon,sugar,ice,glass,movement) {
		this.lemon   = lemon
		this.sugar   = sugar
		this.ice     = ice
		this.glass   = glass
		this.movement= movement
		switch (movement) {
			/**
			 * Validation on inventory entry
			 */
			case 'inventory_in':
				 // console.log(this.inventory.ice,this.storage.ice)
				this.inventory.lemon = this.inventory.lemon + this.lemon
				this.inventory.sugar = this.inventory.sugar + this.sugar
				this.inventory.ice   = this.inventory.ice   + this.ice
				this.inventory.glass = this.inventory.glass + this.glass
				/*
				 * limit the totals nothing bigger than the storage limits
				 */
				if (this.inventory.lemon > this.storage.lemon) {
					this.inventory.lemon = this.storage.lemon
				}else {
				}
				if (this.inventory.sugar > this.storage.sugar) {
					this.inventory.sugar = this.storage.sugar
				}else {
				}
				if (this.inventory.ice > this.storage.ice) {
					this.inventory.ice = this.storage.ice
				}else {
				}
				if (this.inventory.glass > this.storage.glass) {
					this.inventory.glass = this.storage.glass
				}else {
				}
				break
			/**
			 * Validation on inventory out
			 */
			case 'inventory_out':
				this.inventory.lemon = this.inventory.lemon - this.lemon
				this.inventory.sugar = this.inventory.sugar - this.sugar
				this.inventory.ice   = this.inventory.ice   - this.ice
				this.inventory.glass = this.inventory.glass - this.glass
				/*
				 *limit the totals nothing smaller than 0
				 */
				 console.log(this.inventory.lemon,this.storage.lemon)
				if (this.inventory.lemon < 0) {
					this.inventory.lemon = 0
					alert('You run out lemons')
				}
				else if (this.inventory.sugar < 0) {
					this.inventory.sugar = 0
					alert('You run out sugar')
				}
				else if (this.inventory.ice < 0) {
					this.inventory.ice = 0
					alert('You run out ice')
				}
				else if (this.inventory.glass < 0) {
					this.inventory.glass = 0
					alert('You run out glass')
				}
				break
		}

		this.updateBar()
		this.cart.cleanCart()
	}
	/**
	 * Update Stogare size.
	 **/
	updateSessionStorage(size){
		if(size==='small'){
			this.storage.lemon= this.storages[0][0]
			this.storage.sugar= this.storages[0][1]
			this.storage.ice  = this.storages[0][2]
			this.storage.glass= this.storages[0][3]
			this.storage.alias= this.storages[0][4]
		}
		else if(size==='medium'){
			this.storage.lemon= this.storages[1][0]
			this.storage.sugar= this.storages[1][1]
			this.storage.ice  = this.storages[1][2]
			this.storage.glass= this.storages[1][3]
			this.storage.alias= this.storages[1][4]
		}
		else if(size==='big'){
			this.storage.lemon= this.storages[2][0]
			this.storage.sugar= this.storages[2][1]
			this.storage.ice  = this.storages[2][2]
			this.storage.glass= this.storages[2][3]
			this.storage.alias= this.storages[2][4]
		}
		else if(size==='special'){
			this.storage.lemon= this.storages[3][0]
			this.storage.sugar= this.storages[3][1]
			this.storage.ice  = this.storages[3][2]
			this.storage.glass= this.storages[3][3]
			this.storage.alias= this.storages[3][4]
		}
		return true
	}
}
//----------------------------------------------
/**
 * Session Class
 */
//----------------------------------------------
class Session extends Base{
	constructor(user){
		super()
		/**
		 * Add listeners and declare constants
		 */
		this.engineInitializer()
		/**
		 * Detect a saved game or start a New game
		 */
 		if(this.detectSavedGame()===true){
			alert('detected')
			this.loadSavedGame(savedGame)
		}else {
			alert('not-detected')
			this.startNewGame(user)
		}
	}

	engineInitializer(){
		this.addListeners()
		this.declareProducts()
		this.declareStorages()
	}

	detectSavedGame() {
		/**
		 * Load savedGame localstorage-variable
		 **/
		savedGame = localStorage.getItem('save')
		savedGame = JSON.parse(savedGame)
		/**
		 * if a saved game exist return true
		 **/
		if(savedGame!==undefined){
			return true
		}else {
			return false
		}
	}
	
	/**
	 * Load saved game process
	 **/
	loadSavedGame(savedGame) {
		this.user_info    = savedGame.user_info
		this.storage      = savedGame.storage
		this.recepy       = savedGame.recepy
		this.inventory    = savedGame.inventory
		this.cart         = savedGame.cart
		this.products     = savedGame.products
		this.storages     = savedGame.storages
		this.clients_array= savedGame.clients_array
		this.showMenu()
		this.updateBar()
	}

	startNewGame(user) {
		this.declareNewGameStats(user)
		this.updateSessionStorage(this.user_info.storageSize)
		this.showMenu()
		this.updateBar()
	}
}
//----------------------------------------------
/**
 * On start Functions
 */
//----------------------------------------------
(function () {
	function startGame(event) {
		session = new Session(event.target.value)
		console.log(session)
	}
	document.querySelector(".begin").addEventListener('click', startGame)
	document.querySelector(".name").addEventListener('change', startGame)
})();