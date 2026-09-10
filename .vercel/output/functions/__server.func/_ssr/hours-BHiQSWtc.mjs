//#region node_modules/.nitro/vite/services/ssr/assets/hours-BHiQSWtc.js
var RESTAURANT = {
	name: "South End Pizza III",
	shortName: "South End Pizza 3",
	address: "443 Zion Rd",
	city: "Egg Harbor Township, NJ 08234",
	phone: "(609) 788-8512",
	phoneHref: "tel:+16097888512",
	hours: "Open Daily 11:00 AM – 8:00 PM",
	established: "2005"
};
var DEFAULT_FOOTER = "Ask about extra toppings, wing sauces, and dressing. Prices may change.";
function extras(...rows) {
	return rows.map(([name, price, extra], i) => ({
		id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "cond"}-${i + 1}`,
		name,
		price,
		extraPrice: extra ?? price,
		maxQty: "9"
	}));
}
var DIP_CUPS = extras(["Ranch", "0.75"], ["Blue cheese", "0.75"], ["BBQ", "0.75"], ["Honey mustard", "0.75"]);
var SALAD_DRESSING = extras(["Italian", "0"], ["Ranch", "0"], ["Blue cheese", "0"], ["Extra dressing", "0.75"]);
var MENU = [
	{
		id: "pizza",
		name: "Pizza",
		note: "12\" small · 14\" medium · 16\" large. Extra toppings $2.00 each.",
		kind: "pizza",
		items: [
			{
				name: "Cheese Pizza",
				description: "Classic cheese or create your own pizza",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "14.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "15.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "16.75"
					}
				]
			},
			{
				name: "Extra Cheese Pizza",
				description: "Classic cheese or create your own pizza",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Pepperoni Pizza",
				description: "Topped with classic cheese and pepperoni",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Sausage Pizza",
				description: "Topped with classic cheese and sausage",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Beef Pizza",
				description: "Topped with classic cheese and beef",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Ham Pizza",
				description: "Topped with classic cheese and ham",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Bacon Pizza",
				description: "Classic cheese and bacon",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Mushrooms Pizza",
				description: "Classic cheese and mushrooms",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Green Peppers Pizza",
				description: "Classic cheese and green peppers",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Olives Pizza",
				description: "Topped with classic cheese and olives",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Onions Pizza",
				description: "Topped with classic cheese and onions",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Spinach Pizza",
				description: "Topped with classic cheese and spinach",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			},
			{
				name: "Broccoli Pizza",
				description: "Topped with classic cheese and broccoli",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "16.75"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "17.75"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "18.75"
					}
				]
			}
		]
	},
	{
		id: "gourmet",
		name: "Gourmet Pizza",
		note: "12\" small · 14\" medium · 16\" large.",
		kind: "pizza",
		items: [
			{
				name: "White Combo Pizza",
				description: "Tomatoes, spinach, broccoli & ricotta cheese",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "Richie's Special Pizza",
				description: "White pizza with tomatoes, garlic, oil & oregano",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "18.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "19.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "20.00"
					}
				]
			},
			{
				name: "Buffalo Chicken Pizza",
				description: "Chicken, hot or mild sauce & mozzarella",
				highlight: true,
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "19.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "21.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "23.00"
					}
				]
			},
			{
				name: "BBQ Chicken Pizza",
				description: "Chicken, BBQ sauce & mozzarella cheese",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "19.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "21.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "23.00"
					}
				]
			},
			{
				name: "Bonzano Italiano Pizza",
				description: "Cappicola, salami, pepperoni & provolone cheese",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "Greek Pizza",
				description: "Feta, garlic, olives & spinach. Red or white",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "Grilled Chicken Pizza",
				description: "Chicken, sauce & cheese",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "18.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "20.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "22.00"
					}
				]
			},
			{
				name: "Mexicana Pizza",
				description: "Tomatoes, onions, beef & jalapenos",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "Hawaiian Pizza",
				description: "Ham & pineapple. White or red",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "Veggie Pizza",
				description: "Mushrooms, broccoli, green peppers & onions",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "18.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "20.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "Meat Lovers Pizza",
				description: "Sausage, pepperoni & bacon",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			},
			{
				name: "C.B.R. Pizza",
				description: "Chicken, bacon & Ranch",
				prices: [
					{
						label: "SM",
						inches: "12\"",
						price: "20.00"
					},
					{
						label: "MD",
						inches: "14\"",
						price: "22.00"
					},
					{
						label: "LG",
						inches: "16\"",
						price: "24.00"
					}
				]
			}
		]
	},
	{
		id: "appetizers",
		name: "Appetizers",
		kind: "split",
		items: [
			{
				name: "French Fries",
				description: "Deep fried till golden brown",
				prices: [{ price: "7.25" }]
			},
			{
				name: "Curly Fries",
				description: "Spiraled potatoes, deep fried and seasoned",
				prices: [{ price: "7.50" }]
			},
			{
				name: "Onion Rings",
				description: "Crispy onion slices deep-fried until golden-brown",
				prices: [{ price: "7.50" }]
			},
			{
				name: "Cheesy French Fries",
				description: "Melted cheese over our delicious fries",
				prices: [{ price: "8.50" }]
			},
			{
				name: "Mozzarella Sticks",
				description: "Deep fried cheese sticks. Served with sauce",
				prices: [{
					label: "5 pc",
					price: "8.50"
				}],
				condiments: extras(["Extra marinara", "0.75"])
			},
			{
				name: "Jalapeno Poppers",
				description: "Juicy jalapeno poppers breaded and filled with cheese and fried to golden perfection",
				prices: [{
					label: "5 pc",
					price: "9.75"
				}]
			},
			{
				name: "South End Style Fries",
				description: "Bacon, cheddar cheese & Mozzarella cheese",
				prices: [{ price: "12.75" }]
			},
			{
				name: "Chicken Fingers",
				description: "With french fries. Breaded and fried chicken strips",
				prices: [{ price: "14.95" }],
				condiments: DIP_CUPS
			},
			{
				name: "Buffalo Fries",
				prices: [{ price: "12.75" }]
			},
			{
				name: "Buffalo Chicken Tenders",
				description: "Tossed in hot sauce or Mild sauce",
				prices: [
					{
						label: "6 pc",
						price: "11.50"
					},
					{
						label: "12 pc",
						price: "16.50"
					},
					{
						label: "18 pc",
						price: "24.50"
					}
				],
				condiments: extras(["Ranch", "0.75"], ["Blue cheese", "0.75"], ["Extra sauce", "0.75"])
			},
			{
				name: "Pizza Bread",
				description: "Cheesy pizza bread",
				prices: [{
					label: "Half",
					price: "8.00"
				}]
			}
		]
	},
	{
		id: "salads",
		name: "Salads",
		kind: "single",
		items: [
			{
				name: "Antipasto Salad",
				description: "Genoa salami, capicola, provolone cheese, and ham. Served with lettuce, tomatoes, onions, cucumbers, green peppers, and black olives",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			},
			{
				name: "Chef Salad",
				description: "Crispy greens with sliced ham, turkey, cheese, tomato, cucumber, and hard-boiled egg",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			},
			{
				name: "Tuna Salad",
				description: "House salad with a big scoop of white tuna",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			},
			{
				name: "Caesar Salad",
				description: "Crisp romaine tossed with croutons, Caesar dressing, and grated cheese",
				prices: [{
					label: "LG",
					price: "10.00"
				}]
			},
			{
				name: "Grilled Chicken Caesar Salad",
				description: "Romaine lettuce, croutons, red onions & Romano cheese in Roma Caesar dressing",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			},
			{
				name: "Tossed Salad",
				description: "House salad with your choice of dressing",
				prices: [{
					label: "LG",
					price: "11.25"
				}],
				condiments: SALAD_DRESSING
			},
			{
				name: "Turkey & Cheese Salad",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			},
			{
				name: "Greek Salad",
				description: "Feta cheese, olives",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			},
			{
				name: "Blackened Chicken Caesar Salad",
				prices: [{
					label: "LG",
					price: "14.75"
				}]
			},
			{
				name: "Cajun Chicken Caesar Salad",
				prices: [{
					label: "LG",
					price: "14.75"
				}]
			},
			{
				name: "Chicken Tender Salad",
				prices: [{
					label: "LG",
					price: "14.95"
				}]
			}
		]
	},
	{
		id: "sides",
		name: "Side Orders",
		kind: "split",
		items: [
			{
				name: "Side of Meatballs",
				description: "Ground meat rolled into small spheres, prepared with bread crumbs, minced onion, eggs, butter, and seasoning",
				prices: [{ price: "9.00" }]
			},
			{
				name: "Garlic Bread",
				description: "Bread, topped with garlic & olive oil or butter, herb seasoning, baked to perfection",
				prices: [{
					label: "Half",
					price: "7.75"
				}]
			},
			{
				name: "Side of Sausage",
				description: "Italian sausage",
				prices: [{ price: "9.00" }]
			},
			{
				name: "Side of Pasta",
				prices: [{ price: "10.00" }]
			},
			{
				name: "Cheesy Garlic Bread",
				description: "French garlic bread with cheese",
				prices: [{
					label: "Half",
					price: "8.75"
				}]
			}
		]
	},
	{
		id: "wings",
		name: "Wings",
		note: "Tossed in your choice of sauce.",
		kind: "split",
		items: [{
			name: "Fresh Wings",
			description: "Deep-fried chicken wings with your choice of sauce",
			prices: [{
				label: "10 pc",
				price: "14.00"
			}],
			condiments: extras(["Ranch", "0.75"], ["Blue cheese", "0.75"], ["Celery", "0"], ["Extra sauce", "0.75"])
		}, {
			name: "Chicken Nuggets with Fries",
			description: "Breaded & fried chicken strips. Served with fries",
			prices: [{
				label: "9 pc",
				price: "14.95"
			}]
		}]
	},
	{
		id: "turnovers",
		name: "Pizza Turnovers",
		kind: "single",
		items: [
			{
				name: "Stromboli",
				description: "Pepperoni, sausage & mozzarella cheese",
				prices: [{
					label: "LG",
					price: "18.50"
				}]
			},
			{
				name: "Steak Stromboli",
				description: "Steak & cheese",
				prices: [{
					label: "LG",
					price: "18.50"
				}]
			},
			{
				name: "Vegetable Stromboli",
				description: "Sweet peppers, mushrooms, broccoli, onions & cheese",
				prices: [{
					label: "LG",
					price: "19.50"
				}]
			},
			{
				name: "Calzone",
				description: "Ham, ricotta & mozzarella",
				prices: [{
					label: "LG",
					price: "18.50"
				}]
			},
			{
				name: "Spinach Calzone",
				description: "With ricotta and mozzarella cheese",
				prices: [{
					label: "LG",
					price: "18.50"
				}]
			},
			{
				name: "Chicken Steak Stromboli",
				prices: [{
					label: "LG",
					price: "18.50"
				}]
			},
			{
				name: "Panzarotti",
				description: "Sauce & cheese",
				prices: [{
					label: "LG",
					price: "15.50"
				}]
			}
		]
	},
	{
		id: "sandwiches",
		name: "Sandwiches",
		note: "White, wheat, rye, or Kaiser roll.",
		kind: "single",
		items: [
			{
				name: "Turkey & Cheese Sandwich",
				prices: [{ price: "11.00" }]
			},
			{
				name: "Ham & Cheese Sandwich",
				description: "Classic ham & cheese sandwich",
				prices: [{ price: "11.00" }]
			},
			{
				name: "Tuna & Cheese Sandwich",
				prices: [{ price: "11.00" }]
			},
			{
				name: "Chicken Breast Sandwich",
				description: "On a kaiser roll with roasted peppers & cheese",
				prices: [{ price: "11.00" }]
			}
		]
	},
	{
		id: "clubs",
		name: "Club Sandwiches",
		note: "Served with French fries & onion rings.",
		kind: "single",
		items: [
			{
				name: "Turkey Club Sandwich",
				description: "Cheese, bacon, lettuce, tomato & mayo on toasted bread",
				prices: [{ price: "14.50" }]
			},
			{
				name: "Ham & Cheese Club Sandwich",
				description: "Ham, cheese, bacon, lettuce, tomato & mayo on toasted bread",
				prices: [{ price: "14.50" }]
			},
			{
				name: "Tuna Club Sandwich",
				description: "Tuna, bacon & cheese, lettuce, tomato & mayo on toasted bread",
				prices: [{ price: "14.50" }]
			},
			{
				name: "BLT Club Sandwich",
				description: "Crisp bacon, lettuce, tomato, and mayonnaise",
				prices: [{ price: "14.50" }]
			}
		]
	},
	{
		id: "hot-subs",
		name: "Hot Subs",
		note: "Half or whole where listed.",
		kind: "split",
		items: [
			{
				name: "Veal Parmigiana Hot Sub",
				description: "Veal cutlets, tomato sauce, and parmesan cheese",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Chicken Parmigiana Hot Sub",
				description: "Chicken, parmesan and classic cheese",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Sausage Hot Sub",
				prices: [{
					label: "Half",
					price: "11.50"
				}, {
					label: "Whole",
					price: "17.00"
				}]
			},
			{
				name: "Sausage Parmigiana Hot Sub",
				description: "Topped with sausage and parmesan cheese",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Meatball Parmigiana Hot Sub",
				description: "Topped with homemade meatballs and cheese",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Eggplant Hot Sub",
				prices: [{
					label: "Half",
					price: "11.50"
				}, {
					label: "Whole",
					price: "17.50"
				}]
			},
			{
				name: "Eggplant Parmigiana Hot Sub",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			}
		]
	},
	{
		id: "cold-subs",
		name: "Cold Subs",
		note: "Lettuce, tomato, onion, oil & vinegar on request.",
		kind: "split",
		items: [
			{
				name: "Italian Cold Sub",
				description: "Ham, salami, capicola, onions, lettuce, tomato, cheese",
				prices: [{
					label: "Half",
					price: "13.95"
				}]
			},
			{
				name: "Ham & Cheese Cold Sub",
				description: "Topped with ham and classic cheese",
				prices: [{
					label: "Half",
					price: "11.50"
				}]
			},
			{
				name: "Salami & Cheese Cold Sub",
				prices: [{
					label: "Half",
					price: "11.50"
				}]
			},
			{
				name: "Turkey Cold Sub",
				description: "Topped with sliced turkey meat",
				prices: [{
					label: "Half",
					price: "11.00"
				}]
			},
			{
				name: "Turkey & Cheese Cold Sub",
				description: "Topped with turkey and classic cheese",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Tuna Cold Sub",
				description: "White meat. Delicious tuna fish salad, veggies in a satisfying sub",
				prices: [{
					label: "Half",
					price: "11.75"
				}]
			},
			{
				name: "Tuna & Cheese Cold Sub",
				description: "White meat. Delicious tuna fish salad, & cheese, veggies in a satisfying sub",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			}
		]
	},
	{
		id: "steak-subs",
		name: "Steak Subs",
		note: "Lettuce, tomato, mayo, onions & hot peppers on request.",
		kind: "split",
		items: [
			{
				name: "Buffalo Chicken Cheesesteak Sub",
				description: "Bleu cheese & mild or hot sauce",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Steak Sub",
				description: "Shaved steak",
				prices: [{
					label: "Half",
					price: "11.50"
				}]
			},
			{
				name: "Cheesesteak Sub",
				description: "Shredded steak topped with classic cheese",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Bacon Cheesesteak Sub",
				prices: [{
					label: "Half",
					price: "13.50"
				}]
			},
			{
				name: "Mushroom Steak Sub",
				prices: [{
					label: "Half",
					price: "13.50"
				}]
			},
			{
				name: "Mushroom Cheesesteak Sub",
				prices: [{
					label: "Half",
					price: "13.50"
				}]
			},
			{
				name: "Pepper Steak Sub",
				prices: [{
					label: "Half",
					price: "12.00"
				}, {
					label: "Whole",
					price: "18.00"
				}]
			},
			{
				name: "Pepper Cheesesteak Sub",
				prices: [{
					label: "Half",
					price: "12.50"
				}]
			},
			{
				name: "Pizza Steak Sub",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Pepperoni Cheesesteak Sub",
				prices: [{
					label: "Half",
					price: "13.95"
				}]
			},
			{
				name: "Chicken Cheesesteak Sub",
				prices: [{
					label: "Half",
					price: "12.95"
				}]
			},
			{
				name: "Chicken Steak Sub",
				prices: [{
					label: "Half",
					price: "11.50"
				}, {
					label: "Whole",
					price: "18.00"
				}]
			},
			{
				name: "Veggie Sub",
				prices: [{
					label: "Half",
					price: "13.00"
				}]
			}
		]
	},
	{
		id: "burgers",
		name: "Burgers",
		note: "Served with lettuce, tomato & onion.",
		kind: "single",
		items: [
			{
				name: "Hamburger",
				description: "Plain hamburger",
				prices: [{ price: "9.25" }]
			},
			{
				name: "Cheeseburger",
				prices: [{ price: "10.50" }]
			},
			{
				name: "Bacon Cheeseburger",
				description: "Delicious cheeseburger topped with fresh crispy bacon",
				prices: [{ price: "11.00" }]
			},
			{
				name: "Pizza Burger",
				description: "Beef, cheese, and red sauce",
				prices: [{ price: "11.00" }]
			},
			{
				name: "Double Cheeseburger",
				description: "Double patty with cheese",
				prices: [{ price: "15.00" }]
			},
			{
				name: "Western Burger",
				description: "Mushrooms, onions & BBQ sauce",
				prices: [{ price: "13.75" }]
			}
		]
	},
	{
		id: "wraps",
		name: "Wraps",
		note: "Served with chips where noted.",
		kind: "single",
		items: [
			{
				name: "Fresh Grilled Chicken Wrap",
				prices: [{ price: "12.00" }]
			},
			{
				name: "Ham Wrap",
				prices: [{ price: "10.00" }]
			},
			{
				name: "Turkey Wrap",
				description: "Turkey, lettuce, tomatoes and onions",
				prices: [{ price: "10.00" }]
			},
			{
				name: "Tuna Wrap",
				description: "Lettuce, tomatoes, onions, and melted cheese",
				prices: [{ price: "12.00" }]
			},
			{
				name: "California Cobb Wrap",
				description: "Mixed greens, cucumbers, black olives, boiled egg, diced chicken & bacon",
				prices: [{ price: "13.95" }]
			},
			{
				name: "Chicken Balsamic Wrap",
				description: "Mixed greens, red onions, roasted peppers, grilled chicken, fresh basil & Balsamic Vinaigrette",
				prices: [{ price: "13.95" }]
			},
			{
				name: "Black & Bleu Chicken Wrap",
				description: "Lettuce, bacon, Bleu cheese & blackened chicken",
				prices: [{ price: "13.95" }]
			},
			{
				name: "Chicken BLT Wrap",
				description: "Bacon, lettuce, tomato & grilled chicken, served with chips",
				prices: [{ price: "13.95" }]
			},
			{
				name: "Chicken Fajita Wrap",
				description: "Peppers, onions, Cajun spices, lime, salsa, lettuce & grilled chicken, served with chips",
				prices: [{ price: "13.95" }]
			}
		]
	},
	{
		id: "gyros",
		name: "Gyro Sandwiches",
		kind: "single",
		items: [{
			name: "Gyro Sandwich",
			description: "Juicy gyro meat with lettuce, onions, tomatoes, and tzatziki sauce",
			prices: [{ price: "11.50" }]
		}]
	},
	{
		id: "pasta",
		name: "Pasta Dishes",
		note: "Platters served with salad, bread & butter.",
		kind: "single",
		items: [
			{
				name: "Pasta with Tomato Sauce",
				description: "Pasta tossed in our homemade tomato sauce",
				prices: [{ price: "14.50" }]
			},
			{
				name: "Pasta with Meatballs",
				description: "Spaghetti topped in our homemade meatballs",
				prices: [{ price: "16.50" }]
			},
			{
				name: "Spaghetti",
				prices: [{ price: "15.50" }]
			},
			{
				name: "Pasta with Sausage",
				description: "Pasta topped with sausage",
				prices: [{ price: "16.50" }]
			},
			{
				name: "Ziti",
				prices: [{ price: "10.50" }]
			},
			{
				name: "Baked Ziti",
				description: "Ziti with mozzarella and tomato sauce baked to perfection in our oven",
				prices: [{ price: "16.50" }]
			},
			{
				name: "Spaghetti with Clams",
				prices: [{ price: "16.50" }]
			},
			{
				name: "Manicotti",
				description: "A large tube of fresh pasta stuffed with a blend of soft cheese",
				prices: [{ price: "16.50" }]
			},
			{
				name: "Cheese Ravioli",
				description: "Ravioli stuffed with classic cheese",
				prices: [{ price: "16.50" }]
			},
			{
				name: "Eggplant Parmigiana Pasta",
				description: "Topped with eggplant slices, parmesan cheese, and marinara sauce",
				prices: [{ price: "17.50" }]
			},
			{
				name: "Veal Parmigiana Pasta",
				prices: [{ price: "18.50" }]
			},
			{
				name: "Chicken Parmigiana Pasta",
				prices: [{ price: "18.50" }]
			}
		]
	},
	{
		id: "desserts",
		name: "Desserts",
		kind: "single",
		items: [
			{
				name: "New York Style Cheesecake",
				description: "Classic New York cheesecake with a creamy satiny texture",
				prices: [{ price: "6.95" }]
			},
			{
				name: "Chocolate Suicide Cake",
				prices: [{ price: "6.95" }]
			},
			{
				name: "Cannoli",
				description: "Delicious tube of fried dough, filled with a sweet, creamy ricotta filling",
				prices: [{ price: "6.95" }]
			}
		]
	},
	{
		id: "beverages",
		name: "Beverages",
		kind: "split",
		items: [
			{
				name: "Soda",
				prices: [{
					label: "20 oz",
					price: "4.75"
				}, {
					label: "2 Liter",
					price: "5.50"
				}]
			},
			{
				name: "Brisk Iced Tea",
				prices: [{
					label: "2 Liter",
					price: "5.50"
				}]
			},
			{
				name: "Pure Leaf Ice Tea",
				prices: [{
					label: "20 oz",
					price: "4.75"
				}]
			},
			{
				name: "Apple Juice",
				prices: [{
					label: "20 oz",
					price: "4.75"
				}]
			}
		]
	}
];
/** Shop desk identity. Better Auth still stores an email; the form maps this username to it. */
var STAFF_ADMIN_ID = "staff-admin";
var STAFF_ADMIN_USERNAME = "admin";
var STAFF_ADMIN_NAME = "Admin";
var STAFF_ADMIN_EMAIL = "admin@staff.southend.pizza";
function isStaffAdminUsername(raw) {
	return raw.trim().toLowerCase() === STAFF_ADMIN_USERNAME;
}
function isStaffAdminAccount(userId, email) {
	if (userId && userId === "staff-admin") return true;
	return String(email ?? "").trim().toLowerCase() === STAFF_ADMIN_EMAIL;
}
var SEASON_EFFECTS = [
	{
		id: "none",
		label: "Off"
	},
	{
		id: "newyear",
		label: "New Year's"
	},
	{
		id: "christmas",
		label: "Christmas"
	},
	{
		id: "halloween",
		label: "Halloween"
	},
	{
		id: "july4",
		label: "4th of July"
	},
	{
		id: "valentines",
		label: "Valentine's Day"
	},
	{
		id: "stpatrick",
		label: "St. Patrick's Day"
	}
];
function sanitizeSeasonEffect(raw) {
	const s = String(raw ?? "none");
	return SEASON_EFFECTS.some((e) => e.id === s) ? s : "none";
}
var CARD_TEXT_SIZES = [
	{
		id: "sm",
		label: "Small"
	},
	{
		id: "md",
		label: "Medium"
	},
	{
		id: "lg",
		label: "Large"
	},
	{
		id: "xl",
		label: "XL"
	}
];
var CARD_SIZES = CARD_TEXT_SIZES;
var CARD_TEXT_COLORS = [
	{
		id: "ink",
		label: "Ink"
	},
	{
		id: "tomato",
		label: "Tomato"
	},
	{
		id: "tomato-dark",
		label: "Deep red"
	},
	{
		id: "muted",
		label: "Muted"
	},
	{
		id: "brass",
		label: "Brass"
	},
	{
		id: "forest",
		label: "Forest"
	}
];
var CARD_BG_COLORS = [
	{
		id: "paper",
		label: "Paper"
	},
	{
		id: "cream",
		label: "Cream"
	},
	{
		id: "wheat",
		label: "Wheat"
	}
];
var CARD_COLOR_HEX = {
	ink: "#1a1410",
	tomato: "#9a221c",
	"tomato-dark": "#6e1612",
	muted: "#6b5d52",
	brass: "#8a5a12",
	forest: "#2f4a38"
};
var CARD_BG_HEX = {
	paper: "#f4ead8",
	cream: "#fbf6ec",
	wheat: "#eadcc4"
};
function expandShortHex(s) {
	if (!/^#[0-9a-f]{3}$/.test(s)) return s;
	const r = s[1];
	const g = s[2];
	const b = s[3];
	return `#${r}${r}${g}${g}${b}${b}`;
}
function parseNamedOrHex(raw, named, fallback) {
	const s = String(raw ?? fallback).trim().toLowerCase();
	if (named.some((x) => x.id === s)) return s;
	if (/^#[0-9a-f]{6}$/.test(s)) return s;
	if (/^#[0-9a-f]{3}$/.test(s)) return expandShortHex(s);
	return fallback;
}
function sanitizeCardTextSize(raw) {
	const s = String(raw ?? "md");
	return CARD_TEXT_SIZES.some((x) => x.id === s) ? s : "md";
}
var sanitizeCardSize = sanitizeCardTextSize;
function sanitizeCardTextColor(raw) {
	return parseNamedOrHex(raw, CARD_TEXT_COLORS, "ink");
}
function sanitizeCardBg(raw) {
	return parseNamedOrHex(raw, CARD_BG_COLORS, "paper");
}
function cardColorKind(color) {
	const c = sanitizeCardTextColor(color);
	if (CARD_TEXT_COLORS.some((x) => x.id === c)) return c;
	return "custom";
}
function cardBgKind(color) {
	const c = sanitizeCardBg(color);
	if (CARD_BG_COLORS.some((x) => x.id === c)) return c;
	return "custom";
}
function cardColorHex(color) {
	const c = sanitizeCardTextColor(color);
	if (c.startsWith("#")) return c;
	return CARD_COLOR_HEX[c] ?? CARD_COLOR_HEX.ink;
}
function cardBgHex(color) {
	const c = sanitizeCardBg(color);
	if (c.startsWith("#")) return c;
	return CARD_BG_HEX[c] ?? CARD_BG_HEX.paper;
}
function relLum(hex) {
	const n = parseInt(hex.slice(1), 16);
	const ch = (v) => {
		const s = v / 255;
		return s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
	};
	return .2126 * ch(n >> 16 & 255) + .7152 * ch(n >> 8 & 255) + .0722 * ch(n & 255);
}
function cardTextContrastOk(color, bg = "paper") {
	const a = relLum(cardColorHex(color));
	const b = relLum(cardBgHex(bg));
	return (Math.max(a, b) + .05) / (Math.min(a, b) + .05) >= 3;
}
function cardTypeStyle(color, descColor, priceColor, bg) {
	return {
		["--food-card-ink"]: cardColorHex(color),
		["--food-card-muted"]: cardColorHex(descColor || "muted"),
		["--food-card-price-ink"]: cardColorHex(priceColor || color),
		["--food-card-bg"]: cardBgHex(bg || "paper")
	};
}
function isActiveOrderStatus(status) {
	return status !== "completed" && status !== "canceled";
}
function formatTicketNo(n) {
	const v = Math.round(Number(n) || 0);
	return v > 0 ? String(v).padStart(6, "0") : "------";
}
var DEFAULT_RECEIPT_OPTIONS = {
	taxId: "",
	footer: "Thank you for dining with us. Keep this receipt for your records.",
	autoPrintOnAccept: true
};
function moneyNumber(value) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : 0;
}
function formatUsd(value) {
	return `$${value.toFixed(2)}`;
}
function payMethodLabel(method) {
	if (method === "pay_delivery") return "Cash";
	if (method === "pay_pickup") return "Pay at pickup";
	if (method === "pay_card") return "Card";
	return method.replaceAll("_", " ");
}
function computeTax(subtotal, discount, deliveryFee, taxRate) {
	const taxable = Math.max(0, subtotal - discount) + Math.max(0, deliveryFee);
	const rate = Math.max(0, taxRate) / 100;
	const tax = Math.round(taxable * rate * 100) / 100;
	return {
		taxable,
		tax,
		total: Math.round((taxable + tax) * 100) / 100
	};
}
function tipFromPercent(subtotal, discount, percent) {
	const food = Math.max(0, subtotal - discount);
	return Math.round(Math.max(0, percent) / 100 * food * 100) / 100;
}
function clampTip(value) {
	const n = Math.round(Math.max(0, moneyNumber(value)) * 100) / 100;
	return Math.min(n, 500);
}
function newPrinter(init) {
	return {
		id: `ptr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
		name: init?.name || "Receipt printer",
		bluetoothId: init?.bluetoothId || "",
		bluetoothName: init?.bluetoothName || "",
		enabled: init?.enabled ?? true,
		copies: init?.copies ?? 1,
		customerCopy: init?.customerCopy ?? true,
		storeCopy: init?.storeCopy ?? true,
		paper: init?.paper === "80mm" ? "80mm" : "58mm"
	};
}
function parsePrinters(raw) {
	let src = raw;
	if (typeof raw === "string") try {
		src = JSON.parse(raw);
	} catch {
		src = [];
	}
	if (!Array.isArray(src)) return [];
	return src.map((row) => {
		const r = row && typeof row === "object" ? row : {};
		return {
			id: String(r.id || `ptr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`),
			name: String(r.name || "Receipt printer"),
			bluetoothId: String(r.bluetoothId || ""),
			bluetoothName: String(r.bluetoothName || ""),
			enabled: r.enabled !== false,
			copies: Math.max(1, Math.round(moneyNumber(r.copies) || 1)),
			customerCopy: r.customerCopy !== false,
			storeCopy: r.storeCopy !== false,
			paper: r.paper === "80mm" ? "80mm" : "58mm"
		};
	});
}
function parseReceiptOptions(raw) {
	let src = raw;
	if (typeof raw === "string") try {
		src = JSON.parse(raw);
	} catch {
		src = {};
	}
	const r = src && typeof src === "object" ? src : {};
	return {
		taxId: String(r.taxId ?? ""),
		footer: String(r.footer ?? DEFAULT_RECEIPT_OPTIONS.footer),
		autoPrintOnAccept: r.autoPrintOnAccept !== false
	};
}
var DAY_KEYS = [
	"sun",
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat"
];
var DAY_LABELS = {
	sun: "Sunday",
	mon: "Monday",
	tue: "Tuesday",
	wed: "Wednesday",
	thu: "Thursday",
	fri: "Friday",
	sat: "Saturday"
};
var DAY_SHORT = {
	sun: "Sun",
	mon: "Mon",
	tue: "Tue",
	wed: "Wed",
	thu: "Thu",
	fri: "Fri",
	sat: "Sat"
};
var OPEN_DAY = {
	closed: false,
	open: "11:00",
	close: "20:00"
};
var DEFAULT_WEEKLY_HOURS = {
	sun: { ...OPEN_DAY },
	mon: { ...OPEN_DAY },
	tue: { ...OPEN_DAY },
	wed: { ...OPEN_DAY },
	thu: { ...OPEN_DAY },
	fri: { ...OPEN_DAY },
	sat: { ...OPEN_DAY }
};
function cleanClock(value, fallback) {
	const m = /^(\d{1,2}):(\d{2})$/.exec(String(value || "").trim());
	if (!m) return fallback;
	const h = Math.min(23, Math.max(0, Number(m[1])));
	const min = Math.min(59, Math.max(0, Number(m[2])));
	return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}
function parseWeeklyHours(raw) {
	const src = typeof raw === "string" ? safeJson(raw) : raw && typeof raw === "object" ? raw : {};
	const next = { ...DEFAULT_WEEKLY_HOURS };
	for (const key of DAY_KEYS) {
		const d = src[key] ?? {};
		next[key] = {
			closed: Boolean(d.closed),
			open: cleanClock(String(d.open ?? OPEN_DAY.open), OPEN_DAY.open),
			close: cleanClock(String(d.close ?? OPEN_DAY.close), OPEN_DAY.close)
		};
	}
	return next;
}
function safeJson(raw) {
	try {
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function formatClock(hhmm) {
	const [hs, ms] = cleanClock(hhmm, "11:00").split(":");
	const h = Number(hs);
	const m = Number(ms);
	const am = h < 12;
	return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${am ? "AM" : "PM"}`;
}
function hoursSummary(hours) {
	const slot = (d) => d.closed ? "closed" : `${d.open}-${d.close}`;
	const all = DAY_KEYS.map((k) => hours[k] ?? DEFAULT_WEEKLY_HOURS[k]);
	if (all.every((d) => slot(d) === slot(all[0]))) {
		if (all[0].closed) return "Closed";
		return `Open Daily ${formatClock(all[0].open)} – ${formatClock(all[0].close)}`;
	}
	return DAY_KEYS.map((k) => {
		const d = hours[k];
		return d.closed ? `${DAY_SHORT[k]} closed` : `${DAY_SHORT[k]} ${formatClock(d.open)}–${formatClock(d.close)}`;
	}).join(" · ");
}
var WEEKDAY = {
	Sun: "sun",
	Mon: "mon",
	Tue: "tue",
	Wed: "wed",
	Thu: "thu",
	Fri: "fri",
	Sat: "sat"
};
function isOpenNow(hours, at = /* @__PURE__ */ new Date()) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).formatToParts(at);
	const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
	const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
	const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
	const key = WEEKDAY[wd] ?? "mon";
	const day = hours[key] ?? DEFAULT_WEEKLY_HOURS[key];
	if (day.closed) return false;
	const now = hour * 60 + minute;
	const [oh, om] = day.open.split(":").map(Number);
	const [ch, cm] = day.close.split(":").map(Number);
	return now >= oh * 60 + om && now < ch * 60 + cm;
}
function etaMinutes(prep, delivery, fulfillment) {
	const p = Math.max(5, Math.round(prep || 25));
	return fulfillment === "delivery" ? p + Math.max(5, Math.round(delivery || 40)) : p;
}
/** First open kitchen slot at least `leadMinutes` from now, on a 15-minute grid. */
function nextOpenSlot(hours, leadMinutes = 15, from = /* @__PURE__ */ new Date()) {
	const start = new Date(from.getTime() + leadMinutes * 60 * 1e3);
	start.setSeconds(0, 0);
	const min = start.getMinutes();
	start.setMinutes(min + (15 - min % 15) % 15);
	for (let i = 0; i < 1344; i += 1) {
		const at = new Date(start.getTime() + i * 15 * 60 * 1e3);
		if (isOpenNow(hours, at)) return at;
	}
	return null;
}
function nyHm(at) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: NY,
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).formatToParts(at);
	const h = parts.find((p) => p.type === "hour")?.value ?? "12";
	const m = parts.find((p) => p.type === "minute")?.value ?? "00";
	return `${h === "24" ? "00" : h.padStart(2, "0")}:${m}`;
}
var NY = "America/New_York";
function nyYmd(at = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: NY,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(at);
}
function formatShopDay(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleDateString("en-US", {
		timeZone: NY,
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function formatShopWhen(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleString("en-US", {
		timeZone: NY,
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function formatShopClock(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleTimeString("en-US", {
		timeZone: NY,
		hour: "numeric",
		minute: "2-digit"
	});
}
function zoneParts(at) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: NY,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).formatToParts(at);
	const g = (t) => Number(parts.find((p) => p.type === t)?.value ?? 0);
	const hour = g("hour") === 24 ? 0 : g("hour");
	return {
		y: g("year"),
		m: g("month"),
		d: g("day"),
		h: hour,
		min: g("minute")
	};
}
/** Convert an Egg Harbor Township wall-clock date+time to a Date. */
function nyWallToDate(date, time) {
	const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
	const tm = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
	if (!dm || !tm) return null;
	const y = Number(dm[1]);
	const m = Number(dm[2]);
	const d = Number(dm[3]);
	const hh = Math.min(23, Math.max(0, Number(tm[1])));
	const mm = Math.min(59, Math.max(0, Number(tm[2])));
	const utcGuess = Date.UTC(y, m - 1, d, hh, mm);
	const got = zoneParts(new Date(utcGuess));
	const gotMs = Date.UTC(got.y, got.m - 1, got.d, got.h, got.min);
	const wantMs = Date.UTC(y, m - 1, d, hh, mm);
	const at = new Date(utcGuess + (wantMs - gotMs));
	return Number.isNaN(at.getTime()) ? null : at;
}
//#endregion
export { isActiveOrderStatus as A, parsePrinters as B, etaMinutes as C, formatTicketNo as D, formatShopWhen as E, newPrinter as F, sanitizeCardSize as G, parseWeeklyHours as H, nextOpenSlot as I, sanitizeSeasonEffect as J, sanitizeCardTextColor as K, nyHm as L, isStaffAdminAccount as M, isStaffAdminUsername as N, formatUsd as O, moneyNumber as P, nyWallToDate as R, computeTax as S, formatShopDay as T, payMethodLabel as U, parseReceiptOptions as V, sanitizeCardBg as W, tipFromPercent as Y, cardColorHex as _, DAY_KEYS as a, cardTypeStyle as b, DEFAULT_RECEIPT_OPTIONS as c, SEASON_EFFECTS as d, STAFF_ADMIN_EMAIL as f, cardBgKind as g, cardBgHex as h, CARD_TEXT_SIZES as i, isOpenNow as j, hoursSummary as k, MENU as l, STAFF_ADMIN_NAME as m, CARD_SIZES as n, DAY_LABELS as o, STAFF_ADMIN_ID as p, sanitizeCardTextSize as q, CARD_TEXT_COLORS as r, DEFAULT_FOOTER as s, CARD_BG_COLORS as t, RESTAURANT as u, cardColorKind as v, formatShopClock as w, clampTip as x, cardTextContrastOk as y, nyYmd as z };
