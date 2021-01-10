
const request = require('request');
const fs = require('fs');
const NEWS_API_KEY = "ae230f263ba24e9e8106e38970b4c747";
const DATA_PATH = 'src/app/library/scrolling-text/scrolling-text-data/scrolling-data.json';
const NEWS_REGIONS = ['iceland', 'india', 'alaska', 'norway', 'tokyo',
  'berlin', 'amsterdam', 'africa', 'puerto+rico', 'china'];
class observable {
  constructor(f) { this.f = f }
  subscribe(next) { this.f({ next }); }
}

const download = (names) => {
  const out = {}
  return new observable(o => {
    const next = () => {
      if (!names.length) {
        return o.next(out);
      }
      const name = names.pop();
      const url = buildURL(name);
      console.log('getting news for "%s"', name)
      request(url, (error, response, body) => read(name, body));
    }
    const read = (subject, body) => {
      const info = JSON.parse(body);
      console.log('received %s bytes', body.length)
      out[subject] = info;
      wait(5000).subscribe(next);
    };
    next();
  })
};


function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}
function formattedDate() {
  const m = pad(new Date().getMonth(), 2);
  const d = pad(new Date().getDate(), 2);
  const y = pad(new Date().getFullYear(), 4);
  return `${y}-${m}-${d}`;
}
function buildURL(subject) {
  const address = ['http://newsapi.org/v2/everything?q='];
  address.push(subject, '&from=', formattedDate());
  address.push('&sortBy=publishedAt&apiKey=', NEWS_API_KEY);
  return address.join('');
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
const save = data => fs.writeFileSync(DATA_PATH, JSON.stringify(data));

download(NEWS_REGIONS).subscribe(save)