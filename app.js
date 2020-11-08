let session

/////////////////////////////////////////////////////////

let functions                                                 = {
	anyNumber                                                 : function(number) {
		return Math.floor(Math.random() * Math.floor(number))
	},
	hideObject                                                : function(object){
		object                                                = object.classList.add("hide")

	},
	showObject                                                : function(object){
		object                                                = object.classList.remove("hide")
	}
}

/////////////////////////////////////////////////////////

class Product {
	constructor(name,size,price,alias){
		this.name                                             = name
		this.size                                             = size
		this.price                                            = price
		this.alias                                            = alias
	}

	createProduct(name,size,price,alias){
		this.name                                             = name
		this.size                                             = size
		this.price                                            = price
		this.alias                                            = alias
		return [this.name,this.size,this.price,this.alias]
	}
}

/////////////////////////////////////////////////////////

class Cart {
	constructor() {
		this.cart_products   = []
		this.total_cart_price     = 0
	}

	addProduct(name,size,price) {

		this.new_cart_product = new Product(name,size,price)
		/**
		 * Limit the cart Items
		 */
		if (this.cart_products.length <= 9) {
			this.pushProduct(this.new_cart_product)
		}
		else {
			this.new_cart_product = '';
		}
	}

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
		session.cart.cart_products                = []
		session.cart.total_cart_price             = 0
	}

}

/////////////////////////////////////////////////////////

class Storage {
	constructor(lemon,sugar,ice,glasses,alias) {
		this.lemon                                            = lemon
		this.sugar                                            = sugar
		this.ice                                              = ice
		this.glasses                                          = glasses
		this.alias                                            = alias
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

class GameListeners {
	constructor(){}
	/**
	 *RECEPY SELECTION
	 */
	addRecepyListeners() {
		/**
		 *Lemons
		 */
		document.querySelector(".more-l").addEventListener('click', this.recepySelector)
		document.querySelector(".less-l").addEventListener('click', this.recepySelector)
		/**
		 *sugar
		 */
		document.querySelector(".more-s").addEventListener('click', this.recepySelector)
		document.querySelector(".less-s").addEventListener('click', this.recepySelector)
		/**
		 *ice
		 */
		document.querySelector(".more-i").addEventListener('click', this.recepySelector)
		document.querySelector(".less-i").addEventListener('click', this.recepySelector)
		return true
	}
	removeRecepyListeners() {
		/**
		 *Lemons
		 */
		document.querySelector(".more-l").removeEventListener('click', this.recepySelector)
		document.querySelector(".less-l").removeEventListener('click', this.recepySelector)
		/**
		 *sugar
		 */
		document.querySelector(".more-s").removeEventListener('click', this.recepySelector)
		document.querySelector(".less-s").removeEventListener('click', this.recepySelector)
		/**
		 *ice
		 */
		document.querySelector(".more-i").removeEventListener('click', this.recepySelector)
		document.querySelector(".less-i").removeEventListener('click', this.recepySelector)
		return true
	}
	/**
	 *STORE SELECTION
	 */
	addStoreListeners() {
		/**
		 * Cart Listeners
		 */
		document.querySelector('.clean_cart').addEventListener('click', this.cart.cleanCart)
		/*
		 *Lemons
		 */
		document.querySelector("#l-small").addEventListener('click', this.addToCart)
		document.querySelector("#l-medium").addEventListener('click', this.addToCart)
		document.querySelector("#l-big").addEventListener('click', this.addToCart)
		/*
		 *Sugar
		 */
		document.querySelector("#s-small").addEventListener('click', this.addToCart)
		document.querySelector("#s-medium").addEventListener('click', this.addToCart)
		document.querySelector("#s-big").addEventListener('click', this.addToCart)
		/*
		 *Ice
		 */
		document.querySelector("#i-small").addEventListener('click', this.addToCart)
		document.querySelector("#i-medium").addEventListener('click', this.addToCart)
		document.querySelector("#i-big").addEventListener('click', this.addToCart)
		/*
		 *Glasses
		 */
		document.querySelector("#g-small").addEventListener('click', this.addToCart)
		document.querySelector("#g-medium").addEventListener('click', this.addToCart)
		document.querySelector("#g-big").addEventListener('click', this.addToCart)
		document.querySelector("#g-big").addEventListener('click', this.addToCart)
		return true
	}
	remodeStoreListeners() {
		/**
		 *Lemons
		 */
		document.querySelector("#l-small").removeEventListener('click', this.addToCart)
		document.querySelector("#l-medium").removeEventListener('click', this.addToCart)
		document.querySelector("#l-big").removeEventListener('click', this.addToCart)
		/*
		 *Sugar
		 */
		document.querySelector("#s-small").removeEventListener('click', this.addToCart)
		document.querySelector("#s-medium").removeEventListener('click', this.addToCart)
		document.querySelector("#s-big").removeEventListener('click', this.addToCart)
		/*
		 *Ice
		 */
		document.querySelector("#i-small").removeEventListener('click', this.addToCart)
		document.querySelector("#i-medium").removeEventListener('click', this.addToCart)
		document.querySelector("#i-big").removeEventListener('click', this.addToCart)
		/*
		 *Glasses
		 */
		document.querySelector("#g-small").removeEventListener('click', this.addToCart)
		document.querySelector("#g-medium").removeEventListener('click', this.addToCart)
		document.querySelector("#g-big").removeEventListener('click', this.addToCart)
		return true
	}
}

/////////////////////////////////////////////////////////

class SessionProcess extends GameListeners {
	constructor() {
		super()
		/**
		 * Session array collection
		 */
		this.stages      = ["start","menu","game","post"]
		this.cart        = new Cart()
		this.session_info= []
		this.products    = []
		this.storages    = []
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

		return true
	}
	/**
	 * Products declaration
	 */
	declareProducts() {
		let product                                           = new Product()
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


		product                                               = null
		return true
	}
	/**
	 * Storages declaration
	 */
	declareStorages() {
		let storage                                           = new Storage()
		/*
		 * Storage Sices                                      : lemon,sugar,ice,glass,alias
		 */
		this.storages.push(storage.createStorage(10,10,10,20,'small'))
		this.storages.push(storage.createStorage(20,20,20,30,'medium'))
		this.storages.push(storage.createStorage(35,35,35,40,'big'))
		this.storages.push(storage.createStorage(50,50,50,50,'special'))

		storage                                               = null
		return true
	}
	/**
	 * Update Session Storage - Re-usable
	 */
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
	recepySelector(id) {

		/**
		 * Get id from the event
		 */
		this.event            = event.target.id

		/**
		 * Get selection information ingredient, command and qty in screen
		 */
		this.selection        = this.event.slice(0, -2)
		this.target           = this.event.slice(-1)
		this.qty              = document.querySelector(".qty-"+this.target).innerHTML

		/**
		 * update recepy on screen an on global
		 */
		if (this.selection    == 'more' && this.qty < 10){
			this.qty          = Number(this.qty) + 1
		}
		else if(this.selection== 'less' && this.qty > 0) {
			this.qty          = Number(this.qty) - 1
		}

		/**
		 * update recepy display
		 */
		document.querySelector(".qty-"+this.target).innerHTML = ""
		document.querySelector(".qty-"+this.target).innerHTML = this.qty
		/**
		 * update the global array
		 */
		switch (this.target) {
			case "l": 
			session.session_info.recepy.lemon= Number(this.qty);
			break

			case "s": 
			session.session_info.recepy.sugar= Number(this.qty);
			break

			case "i": 
			session.session_info.recepy.ice  = Number(this.qty);
			break

			default:
			alert('ERROR')
			break
		}

		return
	}
	addToCart(id){
		/**
		 * Get id from the event
		 */
		this.event = event.target.id
		/**
		 * Get selection information ingredient, command and qty in screen
		 */
		this.product= this.event.slice(0, 1)
		this.size   = this.event.slice(2)
		/*
		 * lemon
		 */
		if(this.product===`l`){
			this.product = `lemon`
			if(this.size==='small') { this.size=session.products[0][1];this.price=session.products[2][2]}
			if(this.size==='medium'){ this.size=session.products[1][1];this.price=session.products[2][2]}
			if(this.size==='big')   { this.size=session.products[2][1];this.price=session.products[2][2]}
		}
		/*
		 * sugar
		 */
		else if(this.product===`s`){
			this.product = `sugar`
			if(this.size==='small') { this.size=session.products[3][1];this.price=session.products[3][2]}
			if(this.size==='medium'){ this.size=session.products[4][1];this.price=session.products[4][2]}
			if(this.size==='big')   { this.size=session.products[5][1];this.price=session.products[5][2]}
		}
		/*
		 * ice
		 */
		else if(this.product===`i`){
			this.product = `ice`
			if(this.size==='small') { this.size=session.products[6][1];this.price=session.products[6][2]}
			if(this.size==='medium'){ this.size=session.products[7][1];this.price=session.products[7][2]}
			if(this.size==='big')   { this.size=session.products[8][1];this.price=session.products[8][2]}
		}
		/*
		 * glasses
		 */
		else if(this.product===`g`){
			this.product = `glasses`
			if(this.size==='small') { this.size=session.products[9][1];this.price=session.products[9][2]}
			if(this.size==='medium'){ this.size=session.products[10][1];this.price=session.products[10][2]}
			if(this.size==='big')   { this.size=session.products[11][1];this.price=session.products[11][2]}
		}
		/*
		 * Add to Cart
		 */
		// this.product = new Product(this.product,this.size,this.price)
		session.cart.addProduct(this.product,this.size,this.price)
		return
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
		 * Start Stage
		 */
		this.session_info.stage                               = this.stages[0]
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
		}
		/**
		 * User initial Declaration
		 */
		this.session_info.user                                = user
		/**
		 * Update initial money
		 */
		this.session_info.money                               = 100
		/**
		 * Update initial date
		 */
		this.session_info.date                                = 1
		/*
		 * Declare user storage
		 */
		this.session_info.storage                             = []
		/*
		 * Declare Recepy
		 */
		this.session_info.recepy                              = {lemon:0,sugar:0,ice:0}
		/**
		 * Session storage size update
		 */
		if (this.updateSessionStorage('small')!==true) {
			alert('Problem session storage declaration')
		}
		/**
		 * go to Menu
		 */
		this.Menu()
	}

	Menu() {
		this.session_info.stage = this.stages[1]
		/**
		 * Go for Menu Printing
		 */
		if (this.showMenu()!==true) {
			alert('Problem displaying the menu')
		}
		/**
		 * Process Recepy Listeners
		 */
		if (this.addRecepyListeners()!==true) {
			alert('Problem adding recepy listeners')
		}
		/**
		 * Process Store Listeners
		 */
		if (this.addStoreListeners()!==true){
			alert('Problem adding stores listeners')
		}
	}
}

(function () {
	function startGame(event) {
		if (!event.target || !event.target.value) {
			return;
		}
		session                                               = new Session(event.target.value)
		console.log(session)
	}
	document.querySelector(".begin").addEventListener('click', startGame)
	document.querySelector(".name").addEventListener('change', startGame)
})();