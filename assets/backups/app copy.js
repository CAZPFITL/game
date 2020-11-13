//----------------------------------------------------------------------------------------------------
/**
 * GAME VARIABLES
 */
//----------------------------------------------------------------------------------------------------
let session
let savedGame
//----------------------------------------------------------------------------------------------------
/**
 * FUNCTIONS
 */
//----------------------------------------------------------------------------------------------------
let functions = {
	anyNumber: function(number) {
		return Math.floor(Math.random() * Math.floor(number))
	},
	hideObject: function(object) {
		object = object.classList.add("hide")

	},
	showObject: function(object) {
		object = object.classList.remove("hide")
	},
	showMessage: function(message) {
		document.querySelector(".note-wrapper").classList.remove("hide")
		document.querySelector(".note-message").innerHTML = message
	},
	closeMessage: function() {
		document.querySelector(".note-wrapper").classList.add("hide")
	},
	saveGame: function(session) {
		localStorage.setItem('save', JSON.stringify(session));
		alert('saved')
		console.log(session)
	},
	showMenu: function() {
		/**
		 * Update newGame-Menu Displays
		 */
		functions.showObject(document.querySelector("#username"))
		document.querySelector(".startup").classList.remove("startup")

		functions.showObject(document.querySelector(".stats"))
		functions.showObject(document.querySelector(".display-menu"))
		functions.hideObject(document.querySelector(".display-start"))
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: USER INFO
 */
//----------------------------------------------------------------------------------------------------
class UserInfo {
	constructor() {
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: STORAGE
 */
//----------------------------------------------------------------------------------------------------
class Storage {
	constructor() {
	}
	createStorage(lemon, sugar, ice, glasses, alias) {
		this.lemon = lemon
		this.sugar = sugar
		this.ice = ice
		this.glasses = glasses
		this.alias = alias
		return [this.lemon, this.sugar, this.ice, this.glasses, this.alias]
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: RECEPY
 */
//----------------------------------------------------------------------------------------------------
class Recepy {
	constructor() {
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: PRODUCT
 */
//----------------------------------------------------------------------------------------------------
class Product {
	constructor(name, size, price, alias) {
		this.name = name
		this.size = size
		this.price = price
		this.alias = alias
	}
	createProduct(name, size, price, alias) {
		this.name = name
		this.size = size
		this.price = price
		this.alias = alias
		return [this.name, this.size, this.price, this.alias]
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: INVENTORY
 */
//----------------------------------------------------------------------------------------------------
class Inventory {
	constructor() {
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: CART
 */
//----------------------------------------------------------------------------------------------------
class Cart {
	constructor() {
		this.cart_products = []
		this.total_cart_price = 0
	}
	pushProduct(product) {
		this.cart_products.push(product);
		this.total_cart_price += product.price;
		session.updateCartDisplay()
	}
	buyCart() {
		this.get_lemon = session.cart.cart_products.filter(item => item.name === "lemon")
		this.get_sugar = session.cart.cart_products.filter(item => item.name === "sugar")
		this.get_ice = session.cart.cart_products.filter(item => item.name === "ice")
		this.get_glass = session.cart.cart_products.filter(item => item.name === "glass")
		this.lemon_total = 0
		this.sugar_total = 0
		this.ice_total = 0
		this.glass_total = 0
		/**
		 * Get totals for inventory
		 **/
		for (let i = 0; i < this.get_lemon.length; i++) {
			this.lemon_total += this.get_lemon[i].size
		}
		for (let i = 0; i < this.get_sugar.length; i++) {
			this.sugar_total += this.get_sugar[i].size
		}
		for (let i = 0; i < this.get_ice.length; i++) {
			this.ice_total += this.get_ice[i].size
		}
		for (let i = 0; i < this.get_glass.length; i++) {
			this.glass_total += this.get_glass[i].size
		}
		/**
		 * Validate Funds
		 */
		if (session.user_info.money < session.cart.total_cart_price) {
			functions.showMessage('¡Not enought Money!')
			return
		} else {
			session.user_info.money = session.user_info.money - session.cart.total_cart_price
		}
		session.updateInventory(this.lemon_total, this.sugar_total, this.ice_total, this.glass_total, "add")
		functions.saveGame(session)
		session.cart.cleanCart()
	}
	cleanCart() {
		session.cart.cart_products = []
		session.cart.total_cart_price = 0
		session.updateCartDisplay()
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: BASE
 */
//----------------------------------------------------------------------------------------------------
class Base {
	constructor(name) {
		/*
		 * Declare session info
		 */
		this.user_info = new UserInfo()
		/*
		 * Declare user storage
		 */
		this.storage = new Storage()
		/*
		 * Declare Recepy
		 */
		this.recepy = new Recepy()
		/*
		 * Declare inventory
		 */
		this.inventory = new Inventory()
		/*
		 * Declare cart
		 */
		this.cart = new Cart()
		/*
		 * Declare products
		 */
		this.products = []
		/*
		 * Declare user storages sizes
		 */
		this.storages = []
		/*
		 * Declare clients array
		 */
		this.clients_array = []
		/**
		 * Startup Declarations
		 */
	}
	//------------------------------------------------------------------------------------------------
	/**
	 * DECLARE SECTION
	 */
	//------------------------------------------------------------------------------------------------
	addListeners() {
		/**
		 *Lemons
		 */
		document.querySelector(".more-l").addEventListener('click', this.recepyListenerSelector)
		document.querySelector(".less-l").addEventListener('click', this.recepyListenerSelector)
		/**
		 *sugar
		 */
		document.querySelector(".more-s").addEventListener('click', this.recepyListenerSelector)
		document.querySelector(".less-s").addEventListener('click', this.recepyListenerSelector)
		/**
		 *ice
		 */
		document.querySelector(".more-i").addEventListener('click', this.recepyListenerSelector)
		document.querySelector(".less-i").addEventListener('click', this.recepyListenerSelector)
		/**
		 *STORE SELECTION
		 */
		/**
		 * Cart Listeners
		 */
		document.querySelector(".note-close").addEventListener('click', functions.closeMessage)
		document.querySelector('.clean_cart').addEventListener('click', this.cart.cleanCart)
		document.querySelector('.buy_cart').addEventListener('click', this.cart.buyCart)
		/*
		 *Lemons
		 */
		document.querySelector("#l-small").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#l-medium").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#l-big").addEventListener('click', this.storeListenerSelection)
		/*
		 *Sugar
		 */
		document.querySelector("#s-small").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#s-medium").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#s-big").addEventListener('click', this.storeListenerSelection)
		/*
		 *Ice
		 */
		document.querySelector("#i-small").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#i-medium").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#i-big").addEventListener('click', this.storeListenerSelection)
		/*
		 *Glasses
		 */
		document.querySelector("#g-small").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#g-medium").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#g-big").addEventListener('click', this.storeListenerSelection)
		document.querySelector("#g-big").addEventListener('click', this.storeListenerSelection)
		return true
	}
	declareProducts() {
		let product = new Product()
		/**
		 * Lemon Presentations name,size,price
		 */
		this.products.push(product.createProduct('lemon', 5, 5, 'small'))
		this.products.push(product.createProduct('lemon', 10, 7, 'medium'))
		this.products.push(product.createProduct('lemon', 15, 11, 'big'))
		/*
		 * Sugar Presentations name,size,price
		 */
		this.products.push(product.createProduct('sugar', 10, 8, 'small'))
		this.products.push(product.createProduct('sugar', 15, 12, 'medium'))
		this.products.push(product.createProduct('sugar', 20, 16, 'big'))
		/*
		 * Ice Presentations name,size,price
		 */
		this.products.push(product.createProduct('ice', 10, 8, 'small'))
		this.products.push(product.createProduct('ice', 15, 12, 'medium'))
		this.products.push(product.createProduct('ice', 20, 16, 'big'))
		/*
		 * Glass Presentations name,size,price
		 */
		this.products.push(product.createProduct('glass', 10, 5, 'small'))
		this.products.push(product.createProduct('glass', 20, 10, 'medium'))
		this.products.push(product.createProduct('glass', 30, 15, 'big'))
		/**
		 * Display declarations
		 */
		// Lemon-Small
		document.querySelector('.size-qty-l-s').innerHTML = this.products[0][1]
		document.querySelector('.product-price-l-s').innerHTML = this.products[0][2]
		// Lemon-Medium
		document.querySelector('.size-qty-l-m').innerHTML = this.products[1][1]
		document.querySelector('.product-price-l-m').innerHTML = this.products[1][2]
		// Lemon-Big
		document.querySelector('.size-qty-l-b').innerHTML = this.products[2][1]
		document.querySelector('.product-price-l-b').innerHTML = this.products[2][2]
		// Sugar-Small
		document.querySelector('.size-qty-s-s').innerHTML = this.products[3][1]
		document.querySelector('.product-price-s-s').innerHTML = this.products[3][2]
		// Sugar-Medium
		document.querySelector('.size-qty-s-m').innerHTML = this.products[4][1]
		document.querySelector('.product-price-s-m').innerHTML = this.products[4][2]
		// Sugar-Big
		document.querySelector('.size-qty-s-b').innerHTML = this.products[5][1]
		document.querySelector('.product-price-s-b').innerHTML = this.products[5][2]
		// Ice-Small
		document.querySelector('.size-qty-i-s').innerHTML = this.products[6][1]
		document.querySelector('.product-price-i-s').innerHTML = this.products[6][2]
		// Ice-Medium
		document.querySelector('.size-qty-i-m').innerHTML = this.products[7][1]
		document.querySelector('.product-price-i-m').innerHTML = this.products[7][2]
		// Ice-Big
		document.querySelector('.size-qty-i-b').innerHTML = this.products[8][1]
		document.querySelector('.product-price-i-b').innerHTML = this.products[8][2]
		// Glass-Small
		document.querySelector('.size-qty-g-s').innerHTML = this.products[9][1]
		document.querySelector('.product-price-g-s').innerHTML = this.products[9][2]
		// Glass-Medium
		document.querySelector('.size-qty-g-m').innerHTML = this.products[10][1]
		document.querySelector('.product-price-g-m').innerHTML = this.products[10][2]
		// Glass-Big
		document.querySelector('.size-qty-g-b').innerHTML = this.products[11][1]
		document.querySelector('.product-price-g-b').innerHTML = this.products[11][2]

		product = null
		return true
	}
	declareStorages() {
		let storage = new Storage()
		/*
		 * Storage Sices                                      : lemon,sugar,ice,glass,alias
		 */
		this.storages.push(storage.createStorage(10, 10, 10, 20, 'small'))
		this.storages.push(storage.createStorage(20, 20, 20, 30, 'medium'))
		this.storages.push(storage.createStorage(35, 35, 35, 40, 'big'))
		this.storages.push(storage.createStorage(50, 50, 50, 50, 'special'))

		storage = null
		return true
	}
	declareStorageSize(size) {
		if (size === 'small') {
			this.storage.lemon = this.storages[0][0]
			this.storage.sugar = this.storages[0][1]
			this.storage.ice = this.storages[0][2]
			this.storage.glass = this.storages[0][3]
			this.storage.alias = this.storages[0][4]
		}
		else if (size === 'medium') {
			this.storage.lemon = this.storages[1][0]
			this.storage.sugar = this.storages[1][1]
			this.storage.ice = this.storages[1][2]
			this.storage.glass = this.storages[1][3]
			this.storage.alias = this.storages[1][4]
		}
		else if (size === 'big') {
			this.storage.lemon = this.storages[2][0]
			this.storage.sugar = this.storages[2][1]
			this.storage.ice = this.storages[2][2]
			this.storage.glass = this.storages[2][3]
			this.storage.alias = this.storages[2][4]
		}
		else if (size === 'special') {
			this.storage.lemon = this.storages[3][0]
			this.storage.sugar = this.storages[3][1]
			this.storage.ice = this.storages[3][2]
			this.storage.glass = this.storages[3][3]
			this.storage.alias = this.storages[3][4]
		}
		return true
	}
	declareGameStats(/*USER STATS*/user,money,date,storageSize,/*RECEPY:*/r_lemon,r_sugar,r_ice,/*INVENTORY*/i_lemon,i_sugar,i_ice,i_glass) {
		/**
		 * StorageSize
		 */
		this.declareStorageSize(storageSize)
		/**
		 * User
		 */
		this.user_info.user = user
		this.user_info.money = money
		this.user_info.date = date
		this.user_info.storageSize = storageSize
		/**
		 * Recepy
		 */
		this.recepy.sugar = r_lemon
		this.recepy.ice = r_sugar
		this.recepy.lemon = r_ice
		/**
		 * Inventory
		 */
		this.inventory.lemon = i_lemon
		this.inventory.sugar = i_sugar
		this.inventory.ice = i_ice
		this.inventory.glass = i_glass
	}
	//------------------------------------------------------------------------------------------------
	/**
	 * DISPLAYS SECTION
	 */
	//------------------------------------------------------------------------------------------------
	updateBarDisplay() {
		document.getElementById("Lemons-bar").innerHTML = this.inventory.lemon
		document.getElementById("Sugar-bar").innerHTML = this.inventory.sugar
		document.getElementById("Ice-bar").innerHTML = this.inventory.ice
		document.getElementById("Glasses-bar").innerHTML = this.inventory.glass
		document.getElementById("Money-bar").innerHTML = this.user_info.money
		document.getElementById("Date-bar").innerHTML = this.user_info.date
		document.querySelector("#username").innerHTML = this.user_info.user.toUpperCase()
	}
	updateRecepyDisplay() {
		document.querySelector(".qty-l").innerHTML = this.recepy.lemon
		document.querySelector(".qty-s").innerHTML = this.recepy.sugar
		document.querySelector(".qty-i").innerHTML = this.recepy.ice
	}
	updateCartDisplay() {
		/**
		 * Printing the product in the list
		 */
		this.new_row_name = document.createElement('span');
		this.new_row_size = document.createElement('span');
		this.new_row_price = document.createElement('span');
		this.cart_total_title = document.querySelector('.cart_total_title')
		
		this.new_row_name.className = 'l-' + this.cart.cart_products.length
		this.new_row_size.className = 'l-' + this.cart.cart_products.length
		this.new_row_price.className = 'l-' + this.cart.cart_products.length
		
		this.clean_name = document.querySelector('.cart_products')
		this.clean_size = document.querySelector('.cart_sizes')
		this.clean_price = document.querySelector('.cart_price')
		this.clean_total = document.querySelector(".digit")
		this.cart_total_title = document.querySelector('.cart_total_title')

		if(this.cart.cart_products.length===0){

			this.clean_name.innerHTML = ''
			this.clean_size.innerHTML = ''
			this.clean_price.innerHTML = ''
			this.clean_total.innerHTML = 0
			this.cart_total_title.innerHTML = 0

			this.cart.cart_products = []
			this.cart.total_cart_price = 0
			
		}else{
			
			for (let row = 0; row < this.cart.cart_products.length; row++) {
				this.new_row_name.innerHTML = this.cart.cart_products[row].name
				this.new_row_size.innerHTML = this.cart.cart_products[row].size
				this.new_row_price.innerHTML = this.cart.cart_products[row].price
				this.cart_total_title.innerHTML = this.cart.cart_products.length
			}
			
			document.querySelector(".digit").innerHTML = ''
			document.querySelector(".digit").innerHTML = this.cart.total_cart_price
			
			document.querySelector(".cart_products").appendChild(this.new_row_name);
			document.querySelector(".cart_sizes").appendChild(this.new_row_size);
			document.querySelector(".cart_price").appendChild(this.new_row_price);
			
			}	
		}
		//------------------------------------------------------------------------------------------------
	/**
	 * UPDATE SECTION
	 */
	//------------------------------------------------------------------------------------------------
	updateScreen() {}
	
	updateRecepy(lemon,sugar,ice,movement){
		switch (movement) {
			case 'add':
				this.recepy.lemon = this.recepy.lemon + lemon
				this.recepy.sugar = this.recepy.sugar + sugar
				this.recepy.ice = this.recepy.ice + ice
				
				if(this.recepy.lemon>=10) {
					this.recepy.lemon = 10
				}
				else if (this.recepy.sugar>=10) {
					this.recepy.sugar = 10
				} 
				else if (this.recepy.ice>=10){
					this.recepy.ice = 10
				}
				break

			case 'remove':
				this.recepy.lemon = this.recepy.lemon - lemon
				this.recepy.sugar = this.recepy.sugar - sugar
				this.recepy.ice = this.recepy.ice - ice

				if(this.recepy.lemon<=0) {
					this.recepy.lemon = 0
				}
				else if (this.recepy.sugar<=0) {
					this.recepy.sugar = 0
				} 
				else if (this.recepy.ice<=0){
					this.recepy.ice = 0
				}
				break
				
				default:
					break
					
					
		}
		this.updateRecepyDisplay()
	}
	updateInventory(lemon, sugar, ice, glass, movement) {
		switch (movement) {
			/**
			 * Validation on inventory entry
			 */
			case 'add':
				this.inventory.lemon = this.inventory.lemon + lemon
				this.inventory.sugar = this.inventory.sugar + sugar
				this.inventory.ice = this.inventory.ice + ice
				this.inventory.glass = this.inventory.glass + glass
				/*
				 * limit the totals nothing bigger than the storage limits
				 */
				if (this.inventory.lemon > this.storage.lemon) {
					this.inventory.lemon = this.storage.lemon
				} else {
				}
				if (this.inventory.sugar > this.storage.sugar) {
					this.inventory.sugar = this.storage.sugar
				} else {
				}
				if (this.inventory.ice > this.storage.ice) {
					this.inventory.ice = this.storage.ice
				} else {
				}
				if (this.inventory.glass > this.storage.glass) {
					this.inventory.glass = this.storage.glass
				} else {
				}
				break
			/**
			 * Validation on inventory out
			 */
			case 'remove':
				this.inventory.lemon = this.inventory.lemon - lemon
				this.inventory.sugar = this.inventory.sugar - sugar
				this.inventory.ice = this.inventory.ice - ice
				this.inventory.glass = this.inventory.glass - glass
				/*
				 *limit the totals nothing smaller than 0
				 */
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
		this.updateBarDisplay()

	}
	//------------------------------------------------------------------------------------------------
	/**
	 * LISTENERS PROCESSES
	 */
	//------------------------------------------------------------------------------------------------
	storeListenerSelection(id) {
		this.session = session
		/**
		  * Get id from the event (Process Call)
		  **/
		this.event = event.target.id
		/**
		  * Get selection information ingredient, command and qty in screen
		  **/
		this.product = this.event.slice(0, 1)
		this._size = this.event.slice(2)
		/**
		  * lemon
		  **/
		if (this.product === `l`) {
			this.product = `lemon`
			if (this._size === 'small') { this.size = this.session.products[0][1]; this.price = this.session.products[0][2] }
			if (this._size === 'medium') { this.size = this.session.products[1][1]; this.price = this.session.products[1][2] }
			if (this._size === 'big') { this.size = this.session.products[2][1]; this.price = this.session.products[2][2] }
		}
		/**
		  * sugar
		  **/
		else if (this.product === `s`) {
			this.product = `sugar`
			if (this._size === 'small') { this.size = this.session.products[3][1]; this.price = this.session.products[3][2] }
			if (this._size === 'medium') { this.size = this.session.products[4][1]; this.price = this.session.products[4][2] }
			if (this._size === 'big') { this.size = this.session.products[5][1]; this.price = this.session.products[5][2] }
		}
		/**
		  * ice
		  **/
		else if (this.product === `i`) {
			this.product = `ice`
			if (this._size === 'small') { this.size = this.session.products[6][1]; this.price = this.session.products[6][2] }
			if (this._size === 'medium') { this.size = this.session.products[7][1]; this.price = this.session.products[7][2] }
			if (this._size === 'big') { this.size = this.session.products[8][1]; this.price = this.session.products[8][2] }
		}
		/**
		  * glasses
		  **/
		else if (this.product === `g`) {
			this.product = `glass`
			if (this._size === 'small') { this.size = this.session.products[9][1]; this.price = this.session.products[9][2] }
			if (this._size === 'medium') { this.size = this.session.products[10][1]; this.price = this.session.products[10][2] }
			if (this._size === 'big') { this.size = this.session.products[11][1]; this.price = this.session.products[11][2] }
		}
		/**
		 * Create product
		 **/
		this.new_cart_product = new Product(this.product, this.size, this.price, this._size)
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
	recepyListenerSelector(id) {
		/**
		 * Get id from the event
		 */
		this.event = event.target.id
		this.recepy = session.recepy
		/**
		 * Get selection information ingredient, command and qty in screen
		 */
		this.selection = this.event.slice(0, -2)
		this.target = this.event.slice(-1)
		this.qty = document.querySelector(".qty-" + this.target).innerHTML

		if (this.selection === 'more') {
			this.operation = 'add'
		}else{
			this.operation = 'remove'
		}

		switch (this.target) {
			case "l":
				session.updateRecepy(1,0,0,this.operation)
				break

			case "s":
				session.updateRecepy(0,1,0,this.operation)
				break

			case "i":
				session.updateRecepy(0,0,1,this.operation)
				break

			default:
				functions.showMessage('Error!!!')
				break
		}
	}
}
//----------------------------------------------------------------------------------------------------
/**
 * CLASS: SESSION
 */
//----------------------------------------------------------------------------------------------------
class Session extends Base {
	constructor(user) {
		super()
		/**
		 * ------------------------------------------------------
		 * STAGE: START
		 * ------------------------------------------------------
		 */
		this.engineInitializer()
		this.declareGameStats('0',100,1,'small',0,0,0,0,0,0,0)
		if (this.detectSavedGame() === true) {
			alert('loadin saved game')
			this.loadSavedGame(savedGame)
		} else {
			alert('starting a new game')
			this.startNewGame(user)
		}
		/**
		 * ----------------------------------------------------
		 * STAGE: MENU
		 * ----------------------------------------------------
		 */
		functions.showMenu()
		this.updateScreen()
	}

	/*-----------------------------
	|
	| STARTUP SECTION
	|
	\*-----------------------------*/
	engineInitializer() {
		this.addListeners()
		this.declareProducts()
		this.declareStorages()
	}
	detectSavedGame() {
		savedGame = localStorage.getItem('save')
		savedGame = JSON.parse(savedGame)

		if (savedGame !== null || savedGame === undefined) {
			return true
		} else {
			return false
		}
	}
	loadSavedGame(savedGame) {
		let a = savedGame.user_info.user
		let b = savedGame.user_info.money
		let c = savedGame.user_info.date
		let d = savedGame.user_info.storageSize
		let e = savedGame.recepy.lemon
		let f = savedGame.recepy.sugar
		let g = savedGame.recepy.ice
		let h = savedGame.inventory.lemon
		let i = savedGame.inventory.sugar
		let j = savedGame.inventory.ice
		let k = savedGame.inventory.glass
		this.declareGameStats(a,b,c,d,e,f,g,h,i,j,k)
	}
	startNewGame(user) {
		this.declareGameStats(user,/* (MONEY:*/100,/*) (DATE:*/1,/*) (STORAGE SIZE:*/'small',/*) (RECEPY:Lemons:*/0,/*sugar:*/0,/*ice:*/0, 0, 0, 0, 0)
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
		savedGame = localStorage.getItem('save')
		savedGame = JSON.parse(savedGame)
		console.log(savedGame)
	}
	document.querySelector(".begin").addEventListener('click', startGame)
	document.querySelector(".name").addEventListener('change', startGame)
})();