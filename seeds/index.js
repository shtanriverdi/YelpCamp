const mongoose = require('mongoose');
const Campground = require('../models/campground');

/*
"import" needs curly braces for named exports 
and doesn’t need them for the default one.
Not giving a name is fine, because there is only one export default per file,so import without curly braces knows what to import.
*/
// Sample default export, ES6 way
// import cities from './cities';
// Old way to import things
const cities = require('./cities');

// Sample named export, ES6 Way
// import { places, descriptors } from './seedHelpers';
// const { places, descriptors } = require('./seedHelpers');
// Old way
const { places, descriptors } = require('./seedHelpers');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('Mongo connection opened ✓');
}
main().catch(err => console.log("Mongo Error happened:", err));

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * 1000);
        const random1000 = cities[randomIndex];
        const camp = new Campground({
            location: `${random1000.city}, ${random1000.state}`,
            title: `${sample(places)} ${sample(descriptors)}`
        });
        await camp.save();
    }

    console.log("campgrounds db has been removed and re-populated!");
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("DB connection closed.");
})