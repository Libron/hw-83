const mongoose = require('mongoose');
const config = require('./config');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const artists = await Artist.create(
        {
            name: 'Jennifer Lopez',
            image: 'artist1.jpg',
            bio: 'Jennifer Lynn Lopez is an American singer, actress, dancer and producer. In 1991, Lopez began appearing as a Fly Girl dancer on In Living Color, where she remained a regular until she decided to pursue an acting career in 1993.'
        },
        {
            name: 'Nickelback',
            image: 'artist2.jpg',
            bio: 'Nickelback is a Canadian rock band formed in 1995 in Hanna, Alberta, Canada. The band is composed of guitarist and lead vocalist Chad Kroeger, guitarist, keyboardist and backing vocalist Ryan Peake, bassist Mike Kroeger, and drummer Daniel Adair.'
        },
        {
            name: 'Avril Lavigne',
            image: 'artist3.jpg',
            bio: 'Avril Ramona Lavigne is a Canadian singer, songwriter, and actress. By the age of 15, she had appeared on stage with Shania Twain and by 16, she had signed a two-album recording contract with Arista Records worth more than $2 million.'
        },
        {
            name: 'Whitney Houston',
            image: 'artist4.jpg',
            bio: 'Whitney Elizabeth Houston was an American singer and actress. She was cited as the most awarded female artist of all time by Guinness World Records and remains one of the best-selling music artists of all time with 200 million records sold worldwide.'
        }
    );

    const albums = await Album.create(
        {
            title: 'Ain\'t It Funny',
            year: 2009,
            image: 'alb1.jpeg',
            artist: artists[0]._id
        },
        {
            title: 'Never Again',
            year: 2011,
            image: 'alb2.jpeg',
            artist: artists[1]._id
        },
        {
            title: 'The Best Damn Thing',
            year: 2007,
            image: 'alb3.jpeg',
            artist: artists[2]._id
        },
        {
            title: 'One Wish: The Holiday Album',
            year: 2003,
            image: 'alb4.jpeg',
            artist: artists[3]._id
        }
    );

    await Track.create(
        {
            title: 'On The Floor',
            duration: '02:00:15',
            album: albums[0]._id
        },
        {
            title: 'Burn it To the Ground',
            duration: '04:01:05',
            album: albums[1]._id
        },
        {
            title: 'When you are gone',
            duration: '03:25:06',
            album: albums[2]._id
        },
        {
            title: 'I will always love you',
            duration: '03:30:45',
            album: albums[3]._id
        },
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});