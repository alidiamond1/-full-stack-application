const { Product } = require('./models');
const sequelize = require('./config/database');

const seedProducts = [
    {
        name: 'Wireless Headphones',
        description: 'High-quality noise-cancelling wireless headphones.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        quantity: 15
    },
    {
        name: 'Smart Watch',
        description: 'Fitness tracker with heart rate monitor.',
        price: 149.50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
        quantity: 4
    },
    {
        name: 'Running Shoes',
        description: 'Lightweight and durable running shoes.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        quantity: 20
    },
    {
        name: 'Digital Camera',
        description: 'Professional DSLR camera.',
        price: 450.00,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        quantity: 2
    }
];

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset database
        await Product.bulkCreate(seedProducts);
        console.log('Database seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Failed to seed database:', error);
        process.exit(1);
    }
};

seed();
