const cssnano = require('cssnano');

module.exports = function (content, sourceMap, meta) {
    const callback = this.async();

    const groups = ['prefix', 'css', 'suffix'];

    // regular expression reference: https://github.com/webpack-contrib/css-loader/blob/master/src/utils.js#L336
    const re = new RegExp(`(?<${groups[0]}>exports.push\\(\\[module\\.id, ")(?<${groups[1]}>.*)(?<${groups[2]}>", ""]\\);)`);
    const match = re.exec(content);

    const includesGroups = (obj) => !groups.some((key) => !obj[key]);

    if (match && match.groups && includesGroups(match.groups)) {
        const { prefix, css, suffix } = match.groups;

        const clean = css.replace(/\\n/g, '');
        const config = {
            preset: 'default',
            from: undefined,
        };

        cssnano.process(clean, config).then((res) => {
            const output = content.replace(re, `${prefix}${res.css}${suffix}`);

            callback(null, output, sourceMap, meta);
        }).catch((err) => {
            this.emitError(new Error(err));
            callback(null, content, sourceMap, meta);
        });
    } else {
        const warning = (/"sources":\[.*"sourcesContent":\[/.test(content))
            ? 'Unexpected option: `sourceMap: true`. Content unmodified.'
            : 'Unexpected input. Content unmodified.';

        this.emitWarning(new Error(warning));
        callback(null, content, sourceMap, meta);
    } 
};
