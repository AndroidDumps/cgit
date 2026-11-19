// dumps.tadiphone.dev: client-side syntax highlighting for cgit's tree view.
// Runs in the viewer's browser, so highlighting costs the server nothing.
document.addEventListener('DOMContentLoaded', function () {
  var code = document.querySelector('table.blob td.lines code');
  if (!code || !window.hljs) return;
  if (code.textContent.length > 512 * 1024) return; // keep big files snappy
  var name = decodeURIComponent(location.pathname.split('/').pop()).toLowerCase();
  var byName = {
    'makefile': 'makefile', 'android.mk': 'makefile', 'build.prop': 'properties',
    'default.prop': 'properties', 'prop.default': 'properties'
  };
  var byExt = {
    prop: 'properties', props: 'properties', properties: 'properties',
    conf: 'ini', cfg: 'ini', ini: 'ini', toml: 'ini',
    xml: 'xml', html: 'xml', svg: 'xml', json: 'json',
    sh: 'bash', mk: 'makefile', py: 'python', yaml: 'yaml', yml: 'yaml',
    c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', hpp: 'cpp', java: 'java',
    kt: 'kotlin', md: 'markdown', js: 'javascript', ts: 'typescript'
  };
  var dot = name.lastIndexOf('.');
  var lang = byName[name] || (dot >= 0 ? byExt[name.slice(dot + 1)] : null);
  if (!lang || !hljs.getLanguage(lang)) return;
  code.classList.add('language-' + lang);
  hljs.highlightElement(code);
});
