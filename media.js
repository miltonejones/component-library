const request = require('request');
const fs = require('fs');
const MEDIA_URL = 'http://sandbox.miltonjones.nl:1932/';
const run = (genreList) => {
    const ret = [];
    return new observable(o => {
        const next = () => {
            if (!genreList.length) {
                o.next(ret);
                return;
            }
            const genre = genreList.shift();
            const name = genre.genreKey;
            const url = MEDIA_URL + 'genre?id=' + name;
            console.log(url)
            request(url, (error, response, body) => read(genre, body));
        }
        const read = (genre, body) => {
            genre.related = JSON.parse(body);
            ret.push(genre);
            wait(2000).subscribe(next);
        };
        next();
    })
}


const genres = () => {
    return new observable(f => {
        const read = (error, response, body) => {
            const data = JSON.parse(body);
            const out = data.filter(f => f.Count > 49);
            f.next(out)
        };
        request(MEDIA_URL + 'genre', read);
    })
}

 const wait = (ms) => {
     return new observable(o => {
         console.log('waiting %sms', ms)
        let d = new Date().getTime();
        let t = d + ms;
        while (d < t) {
            d = new Date().getTime()
        }
        o.next();
     })
 }

class observable {
    constructor(f) { this.f = f }
    subscribe(next) { this.f({ next }); }
}

const save = (list) => {
    fs.writeFileSync('src/app/library/media-player/data/db_genre.json', JSON.stringify(list))
}

genres().subscribe((list) => {
    run(list).subscribe(save)
})