const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./src/models/Product');

const productsData = [
  { "name": "Samsung 65\" 4K QLED Smart TV", "category": "Electronics", "price": 899.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f4e301?w=400" },
  { "name": "Apple MacBook Air M2", "category": "Electronics", "price": 1099.99, "rating": 4.9, "availability": true, "image": "https://images.unsplash.com/photo-1611186871525-b935a8e62ebb?w=400" },
  { "name": "Sony WH-1000XM5 Headphones", "category": "Electronics", "price": 349.99, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { "name": "iPad Pro 12.9\" M2", "category": "Electronics", "price": 1099.00, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" },
  { "name": "Canon EOS R50 Mirrorless Camera", "category": "Electronics", "price": 679.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
  { "name": "LG 27\" 4K Monitor", "category": "Electronics", "price": 399.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
  { "name": "Logitech MX Master 3 Mouse", "category": "Electronics", "price": 99.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
  { "name": "PlayStation 5 Console", "category": "Electronics", "price": 499.99, "rating": 4.9, "availability": false, "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400" },
  { "name": "Kindle Paperwhite 11th Gen", "category": "Electronics", "price": 139.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=400" },
  { "name": "Apple Watch Series 9", "category": "Electronics", "price": 399.00, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400" },
  { "name": "JBL Flip 6 Bluetooth Speaker", "category": "Electronics", "price": 129.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
  { "name": "Anker 65W USB-C Charger", "category": "Electronics", "price": 45.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400" },
  { "name": "Men's Slim Fit Chino Pants", "category": "Clothing", "price": 49.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400" },
  { "name": "Women's Floral Maxi Dress", "category": "Clothing", "price": 59.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { "name": "Unisex Hoodie Sweatshirt", "category": "Clothing", "price": 39.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400" },
  { "name": "Nike Air Force 1 Sneakers", "category": "Clothing", "price": 110.00, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { "name": "Men's Formal Blazer", "category": "Clothing", "price": 89.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400" },
  { "name": "Women's Yoga Leggings", "category": "Clothing", "price": 34.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400" },
  { "name": "Classic Denim Jacket", "category": "Clothing", "price": 69.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400" },
  { "name": "Men's Polo T-Shirt Pack (3)", "category": "Clothing", "price": 44.99, "rating": 4.2, "availability": true, "image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400" },
  { "name": "Women's Trench Coat", "category": "Clothing", "price": 119.99, "rating": 4.5, "availability": false, "image": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400" },
  { "name": "Adidas Running Shorts", "category": "Clothing", "price": 29.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1562886877-84b0a83a8a6e?w=400" },
  { "name": "Leather Belt Brown", "category": "Clothing", "price": 24.99, "rating": 4.1, "availability": true, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { "name": "Winter Knit Beanie Hat", "category": "Clothing", "price": 14.99, "rating": 4.2, "availability": true, "image": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400" },
  { "name": "Instant Pot Duo 7-in-1", "category": "Home & Kitchen", "price": 89.99, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400" },
  { "name": "Dyson V15 Cordless Vacuum", "category": "Home & Kitchen", "price": 649.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { "name": "Nespresso Vertuo Coffee Machine", "category": "Home & Kitchen", "price": 179.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?w=400" },
  { "name": "KitchenAid Stand Mixer", "category": "Home & Kitchen", "price": 379.99, "rating": 4.9, "availability": true, "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { "name": "Non-Stick Cookware Set (10pc)", "category": "Home & Kitchen", "price": 129.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400" },
  { "name": "Air Purifier HEPA Filter", "category": "Home & Kitchen", "price": 149.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" },
  { "name": "Bamboo Cutting Board Set", "category": "Home & Kitchen", "price": 34.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" },
  { "name": "Electric Kettle 1.7L", "category": "Home & Kitchen", "price": 39.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1594213114616-f7b5bd0f4e2b?w=400" },
  { "name": "Blackout Curtains (2 panels)", "category": "Home & Kitchen", "price": 44.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1558618047-f4e80a5a5b63?w=400" },
  { "name": "Memory Foam Pillow", "category": "Home & Kitchen", "price": 49.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
  { "name": "Toaster Oven with Air Fry", "category": "Home & Kitchen", "price": 99.99, "rating": 4.4, "availability": false, "image": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400" },
  { "name": "Glass Food Storage Set (18pc)", "category": "Home & Kitchen", "price": 54.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400" },
  { "name": "Whey Protein Powder 5lb", "category": "Sports & Fitness", "price": 59.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400" },
  { "name": "Adjustable Dumbbell Set", "category": "Sports & Fitness", "price": 299.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400" },
  { "name": "Yoga Mat Non-Slip 6mm", "category": "Sports & Fitness", "price": 29.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
  { "name": "Resistance Bands Set (5)", "category": "Sports & Fitness", "price": 19.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400" },
  { "name": "Treadmill Folding Electric", "category": "Sports & Fitness", "price": 599.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400" },
  { "name": "Jump Rope Speed Cable", "category": "Sports & Fitness", "price": 14.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1598971639058-a4574c4f8a2f?w=400" },
  { "name": "Foam Roller Deep Tissue", "category": "Sports & Fitness", "price": 24.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" },
  { "name": "Boxing Gloves 12oz", "category": "Sports & Fitness", "price": 39.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400" },
  { "name": "Pull Up Bar Doorframe", "category": "Sports & Fitness", "price": 34.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400" },
  { "name": "Cycling Helmet Adult", "category": "Sports & Fitness", "price": 54.99, "rating": 4.6, "availability": false, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { "name": "Water Bottle Insulated 32oz", "category": "Sports & Fitness", "price": 34.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
  { "name": "Gym Bag with Wet Pocket", "category": "Sports & Fitness", "price": 44.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { "name": "Neutrogena Hydro Boost Serum", "category": "Beauty & Personal Care", "price": 24.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400" },
  { "name": "Electric Toothbrush Oral-B", "category": "Beauty & Personal Care", "price": 79.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1559591935-b3e3c845b577?w=400" },
  { "name": "Dyson Airwrap Hair Styler", "category": "Beauty & Personal Care", "price": 599.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
  { "name": "Vitamin C Face Wash", "category": "Beauty & Personal Care", "price": 14.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400" },
  { "name": "SPF 50 Sunscreen Lotion", "category": "Beauty & Personal Care", "price": 18.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
  { "name": "Men's Grooming Kit", "category": "Beauty & Personal Care", "price": 49.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400" },
  { "name": "Jade Facial Roller", "category": "Beauty & Personal Care", "price": 19.99, "rating": 4.2, "availability": true, "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400" },
  { "name": "Perfume Set Gift Box", "category": "Beauty & Personal Care", "price": 89.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400" },
  { "name": "Retinol Anti-Aging Cream", "category": "Beauty & Personal Care", "price": 34.99, "rating": 4.5, "availability": false, "image": "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=400" },
  { "name": "Hair Growth Shampoo", "category": "Beauty & Personal Care", "price": 22.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1585232350449-e5c70a576b08?w=400" },
  { "name": "Nail Care Kit 12pc", "category": "Beauty & Personal Care", "price": 16.99, "rating": 4.2, "availability": true, "image": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400" },
  { "name": "Makeup Brush Set 16pc", "category": "Beauty & Personal Care", "price": 27.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400" },
  { "name": "LEGO Technic Formula 1 Car", "category": "Toys & Games", "price": 179.99, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400" },
  { "name": "Monopoly Board Game Classic", "category": "Toys & Games", "price": 24.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400" },
  { "name": "Remote Control Monster Truck", "category": "Toys & Games", "price": 49.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400" },
  { "name": "Barbie Dreamhouse Playset", "category": "Toys & Games", "price": 199.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?w=400" },
  { "name": "Jenga Giant Outdoor Game", "category": "Toys & Games", "price": 44.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400" },
  { "name": "Nerf Elite 2.0 Blaster", "category": "Toys & Games", "price": 29.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400" },
  { "name": "Kids Art & Craft Supplies Kit", "category": "Toys & Games", "price": 34.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400" },
  { "name": "Chess Set Wooden", "category": "Toys & Games", "price": 39.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400" },
  { "name": "Hot Wheels 20 Car Gift Pack", "category": "Toys & Games", "price": 19.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400" },
  { "name": "Rubik's Cube 3x3", "category": "Toys & Games", "price": 9.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1551710029-86f94d9a3b05?w=400" },
  { "name": "Drone with HD Camera", "category": "Toys & Games", "price": 149.99, "rating": 4.4, "availability": false, "image": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400" },
  { "name": "Puzzle 1000 Pieces Landscape", "category": "Toys & Games", "price": 17.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1606503153255-59d5e417b0c2?w=400" },
  { "name": "Atomic Habits by James Clear", "category": "Books & Stationery", "price": 16.99, "rating": 4.9, "availability": true, "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
  { "name": "The Psychology of Money", "category": "Books & Stationery", "price": 14.99, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400" },
  { "name": "Moleskine Classic Notebook", "category": "Books & Stationery", "price": 19.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400" },
  { "name": "Staedtler Coloring Pencils 72pc", "category": "Books & Stationery", "price": 24.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400" },
  { "name": "The Lean Startup Book", "category": "Books & Stationery", "price": 13.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400" },
  { "name": "Desk Organizer Set", "category": "Books & Stationery", "price": 29.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400" },
  { "name": "Pilot G2 Gel Pens 20 Pack", "category": "Books & Stationery", "price": 17.99, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400" },
  { "name": "Don't Make Me Think Book", "category": "Books & Stationery", "price": 34.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400" },
  { "name": "Sticky Notes Assorted 12 Pads", "category": "Books & Stationery", "price": 9.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400" },
  { "name": "Watercolor Paint Set 48", "category": "Books & Stationery", "price": 22.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400" },
  { "name": "A5 Planner 2025", "category": "Books & Stationery", "price": 15.99, "rating": 4.4, "availability": false, "image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400" },
  { "name": "Highlighter Set 10 Colors", "category": "Books & Stationery", "price": 8.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400" },
  { "name": "Organic Multivitamin 90 Caps", "category": "Health & Wellness", "price": 29.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
  { "name": "Blood Pressure Monitor", "category": "Health & Wellness", "price": 49.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400" },
  { "name": "Pulse Oximeter Fingertip", "category": "Health & Wellness", "price": 24.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
  { "name": "Omega-3 Fish Oil 120 Softgels", "category": "Health & Wellness", "price": 19.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400" },
  { "name": "Digital Thermometer", "category": "Health & Wellness", "price": 14.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
  { "name": "Melatonin Sleep Aid 5mg", "category": "Health & Wellness", "price": 12.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400" },
  { "name": "First Aid Kit 100pc", "category": "Health & Wellness", "price": 27.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400" },
  { "name": "Heating Pad Electric", "category": "Health & Wellness", "price": 34.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400" },
  { "name": "Vitamin D3 + K2 Supplement", "category": "Health & Wellness", "price": 22.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400" },
  { "name": "Massage Gun Deep Tissue", "category": "Health & Wellness", "price": 119.99, "rating": 4.7, "availability": false, "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400" },
  { "name": "Probiotic 50 Billion CFU", "category": "Health & Wellness", "price": 34.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400" },
  { "name": "Posture Corrector Back Brace", "category": "Health & Wellness", "price": 29.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400" },
  { "name": "Men's Leather Wallet Slim", "category": "Accessories", "price": 39.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { "name": "Aviator Sunglasses UV400", "category": "Accessories", "price": 24.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" },
  { "name": "Leather Handbag Women", "category": "Accessories", "price": 79.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { "name": "Travel Backpack 40L", "category": "Accessories", "price": 89.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { "name": "Stainless Steel Watch Men", "category": "Accessories", "price": 149.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { "name": "Phone Case iPhone 15 Pro", "category": "Accessories", "price": 19.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400" },
  { "name": "Luggage Set 3pc Hardshell", "category": "Accessories", "price": 199.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400" },
  { "name": "Silk Scarf Women", "category": "Accessories", "price": 29.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  { "name": "Keychain Organizer", "category": "Accessories", "price": 12.99, "rating": 4.2, "availability": true, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { "name": "Laptop Sleeve 15 inch", "category": "Accessories", "price": 22.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { "name": "Gold Hoop Earrings Set", "category": "Accessories", "price": 34.99, "rating": 4.4, "availability": false, "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
  { "name": "Umbrella Windproof Compact", "category": "Accessories", "price": 19.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { "name": "Organic Green Tea 100 Bags", "category": "Food & Beverages", "price": 14.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
  { "name": "Dark Chocolate Gift Box 500g", "category": "Food & Beverages", "price": 24.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400" },
  { "name": "Cold Brew Coffee Kit", "category": "Food & Beverages", "price": 34.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" },
  { "name": "Mixed Nuts Premium 1kg", "category": "Food & Beverages", "price": 29.99, "rating": 4.6, "availability": true, "image": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400" },
  { "name": "Manuka Honey 500g", "category": "Food & Beverages", "price": 39.99, "rating": 4.8, "availability": true, "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400" },
  { "name": "Protein Granola Bar 12 Pack", "category": "Food & Beverages", "price": 22.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=400" },
  { "name": "Olive Oil Extra Virgin 1L", "category": "Food & Beverages", "price": 18.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
  { "name": "Specialty Coffee Beans 500g", "category": "Food & Beverages", "price": 19.99, "rating": 4.7, "availability": true, "image": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400" },
  { "name": "Dried Fruit Mix 800g", "category": "Food & Beverages", "price": 16.99, "rating": 4.3, "availability": true, "image": "https://images.unsplash.com/photo-1563208771-f8f6bef27e87?w=400" },
  { "name": "Matcha Powder Premium 100g", "category": "Food & Beverages", "price": 24.99, "rating": 4.6, "availability": false, "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
  { "name": "Apple Cider Vinegar 946ml", "category": "Food & Beverages", "price": 12.99, "rating": 4.4, "availability": true, "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
  { "name": "Spice Gift Set 12 Jars", "category": "Food & Beverages", "price": 44.99, "rating": 4.5, "availability": true, "image": "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const productsToInsert = productsData.map(p => ({
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      availability: p.availability,
      image_url: p.image,
      description: `Premium ${p.name} from the ${p.category} collection. High quality and reliable.`,
      is_popular: p.rating >= 4.7 // Automatically mark high rated as popular for the section
    }));

    await Product.insertMany(productsToInsert);
    console.log(`Successfully seeded ${productsToInsert.length} products.`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
