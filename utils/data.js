import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Dominic',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Stella',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ],
    vinyl: [
        {
            name: 'Led Zeppelin I',
            slug: 'led-zeppelin-i',
            genre: 'Classic Rock',
            image: '/images/lz1.png',
            price: 70,
            artist: 'Led Zeppelin',
            rating: 5.0,
            numReviews: 8,
            countInStock: 2,
            description: 'Debut studio album by English rock band Led Zeppelin. It was released on 12 January 1969 in the United States and on 31 March in the United Kingdom by Atlantic Records.'
        },
        {
            name: 'Abbey Road',
            slug: 'abbey-road',
            genre: 'Classic Rock',
            image: '/images/ar1.jpeg',
            price: 80,
            artist: 'The Beatles',
            rating: 4.9,
            numReviews: 9,
            countInStock: 1,
            description: 'Abbey Road is the eleventh studio album by the English rock band the Beatles.'
        },
        {
            name: 'Unknown Mortal Orchestra',
            slug: 'unknown-mortal-orchestra',
            genre: 'Indie Rock',
            image: '/images/umo1.jpeg',
            price: 20,
            artist: 'Unknown Mortal Orchestra',
            rating: 4.0,
            numReviews: 20,
            countInStock: 10,
            description: 'Unknown Mortal Orchestra is the debut album by the New Zealand rock band Unknown Mortal Orchestra, released on 21 June 2011 on Fat Possum Records.'
        },
        {
            name: 'DAMN',
            slug: 'damn',
            genre: 'Rap',
            image: '/images/damn1.png',
            price: 30,
            artist: 'Kendrick Lamar',
            rating: 5.0,
            numReviews: 99,
            countInStock: 15,
            description: 'Unknown Mortal Orchestra is the debut album by the New Zealand rock band Unknown Mortal Orchestra, released on 21 June 2011 on Fat Possum Records.'
        }
    ]
}

export default data