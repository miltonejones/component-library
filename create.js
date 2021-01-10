const fs = require('fs');

const read = (dir) => {
    const dirs = fs.readdirSync(dir);
    const out = [];
    const imp = [];
    dirs.map(file => {
        if (file.indexOf('-') > 0) {
            out.push(`ng g module library/${file}`);
            imp.push(`export * from './${file}/${file}.module'`)
            const child = fs.readdirSync(`${dir}/${file}`);
            child.map(ch => {
                const rex = /(\w+\-\w+)\.(\w+)\.ts/.exec(ch);
                if (rex) {
                    console.log('---' + rex[1], rex[2])
                    if (rex[2] === 'component') {
                        imp.push(`export * from './${file}/${file}.component'`)
                        out.push(`ng g component library/${file}`);
                    }
                    if (rex[2] === 'directive'
                        || rex[2] === 'service') {
                        imp.push(`export * from './${file}/${file}.${rex[2]}'`)
                        out.push(`ng g ${rex[2]} library/${file}/${file}`);
                    }
                }
            })
        }
        // console.log(file);
    });
    return {out, imp};
}


const msg = read('src/app/library');

const ng = ['ng new component-library-sorted', 'cd component-library-sorted'];
const ts = [];

msg.out.map(e => {
    ng.push(e);
    console.log(e)
})
msg.imp.map(e => {
    ts.push(e);
    console.log(e);
})

fs.writeFileSync('../create_new.sh', ng.join('\n'));
fs.writeFileSync('../index.ts', ts.join('\n'));