const request = require('request');
const fs = require('fs');
const MEDIA_URL = 'http://sandbox.miltonjones.nl:1932/';
const run = (keyList) => {
    return new observable(o => {
        const next = () => {
            if (!keyList.length) {
                o.next('all done');
                return;
            }
            const name = keyList.shift();
            const url = MEDIA_URL + 'genre?id=' + name;
            request(url, (error, response, body) => read(name, body));
        }
        const read = (name, body) => {
            fs.writeFileSync('src/app/library/media-player/data/' + name + '.json', body)
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

genres().subscribe((list) => {

    fs.writeFileSync('src/app/library/media-player/data/genres.json', JSON.stringify(list))
    // run(list.map(f => f.genreKey)).subscribe(console.log)
})