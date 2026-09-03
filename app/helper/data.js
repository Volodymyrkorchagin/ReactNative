const initialRecipes = [
    {
        id: 1,
        title: 'Spaghetti Carbonara',
        category: 'dinner',
        ingredients: 'Pasta, Eggs, Pancetta, Parmesan, Black Pepper',
        instructions: 'Boil pasta. Fry pancetta. Mix eggs and cheese, then combine all with hot pasta.',
        image: 'https://img.chefkoch-cdn.de/rezepte/1298241234947062/bilder/1616493/crop-640x427/carbonara-wie-bei-der-mamma-in-rom.jpg'
    },
    {
        id: 2,
        title: 'Chicken Curry',
        category: 'dinner',
        ingredients: 'Chicken, Curry Powder, Coconut Milk, Onion, Garlic',
        instructions: 'Sauté onions and garlic, add chicken and curry powder, pour in coconut milk and simmer.',
        image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chickpea-curry-71b3e8e.jpg'
    },
    {
        id: 3,
        title: 'Classic Cheeseburger',
        category: 'lunch',
        ingredients: 'Beef Patty, Cheddar Cheese, Burger Bun, Lettuce, Tomato, Sauce',
        instructions: 'Grill the patty, melt the cheese on top, toast the bun, and assemble with fresh vegetables.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
    },
    {
        id: 4,
        title: 'Avocado Toast',
        category: 'breakfast',
        ingredients: 'Bread, Avocado, Egg, Salt, Pepper, Red Pepper Flakes',
        instructions: 'Toast bread, mash avocado on top, add a poached egg and seasoning.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4UkznLRB9ctBkHLBgeAJlKI9F2z4dcr_oEw4_7dG7g&s=10'
    },
    {
        id: 5,
        title: 'Pancakes',
        category: 'breakfast',
        ingredients: 'Flour, Milk, Egg, Sugar, Baking Powder, Butter',
        instructions: 'Mix dry and wet ingredients. Pour batter onto a hot skillet and flip when bubbly.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoL8bhHH2PVi6iT6y7ziN140LFPHaxWBL3L2kIwYIK8g&s=10'
    },
    {
        id: 6,
        title: 'Caesar Salad',
        category: 'lunch',
        ingredients: 'Romaine Lettuce, Croutons, Parmesan, Caesar Dressing, Grilled Chicken',
        instructions: 'Chop lettuce, mix with dressing, top with croutons, parmesan, and warm chicken slices.',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9'
    },
    {
        id: 7,
        title: 'Chocolate Brownies',
        category: 'dessert',
        ingredients: 'Chocolate, Butter, Sugar, Eggs, Flour, Cocoa Powder',
        instructions: 'Melt chocolate and butter, whisk with sugar and eggs, fold in flour and bake at 180°C.',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c'
    },
    {
        id: 8,
        title: 'Fruit Cheesecake',
        category: 'dessert',
        ingredients: 'Graham Crackers, Cream Cheese, Sugar, Eggs, Mixed Berries',
        instructions: 'Make cracker crust, beat cream cheese with sugar and eggs, bake and top with berries.',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad'
    },
    {
        id: 9,
        title: 'Iced Latte',
        category: 'drinks',
        ingredients: 'Espresso, Milk, Ice, Sugar Syrup',
        instructions: 'Fill glass with ice, pour milk over ice, and top with a fresh shot of espresso.',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c'
    },
    {
        id: 10,
        title: 'Berry Smoothie',
        category: 'drinks',
        ingredients: 'Mixed Berries, Banana, Yogurt, Honey, Milk',
        instructions: 'Place all ingredients in a blender and blend until smooth.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd3h0lfMYhjIbaCAna3KfUo421K-Qal1zFL-rmGyif6A&s=10'
    }
];

export default initialRecipes;