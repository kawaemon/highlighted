const el = (x) => document.getElementById(x);
const inputs = [el("langs"), el("code")];
const copybutton = el("copybutton");
const output = el("output");
const [langSel, code] = inputs;

// prettier-ignore
const languageList = ["plaintext", "html", "1c", "abnf", "accesslog", "actionscript", "ada", "angelscript", "apache", "applescript", "arcade", "arduino", "armasm", "asciidoc", "aspectj", "autohotkey", "autoit", "avrasm", "awk", "axapta", "bash", "basic", "bnf", "brainfuck", "c", "cal", "capnproto", "ceylon", "clean", "clojure-repl", "clojure", "cmake", "coffeescript", "coq", "cos", "cpp", "crmsh", "crystal", "csharp", "csp", "css", "d", "dart", "delphi", "diff", "django", "dns", "dockerfile", "dos", "dsconfig", "dts", "dust", "ebnf", "elixir", "elm", "erb", "erlang-repl", "erlang", "excel", "fix", "flix", "fortran", "fsharp", "gams", "gauss", "gcode", "gherkin", "glsl", "gml", "go", "golo", "gradle", "graphql", "groovy", "haml", "handlebars", "haskell", "haxe", "hsp", "http", "hy", "inform7", "ini", "irpf90", "isbl", "java", "javascript", "jboss-cli", "json", "julia-repl", "julia", "kotlin", "lasso", "latex", "ldif", "leaf", "less", "lisp", "livecodeserver", "livescript", "llvm", "lsl", "lua", "makefile", "markdown", "mathematica", "matlab", "maxima", "mel", "mercury", "mipsasm", "mizar", "mojolicious", "monkey", "moonscript", "n1ql", "nestedtext", "nginx", "nim", "nix", "node-repl", "nsis", "objectivec", "ocaml", "openscad", "oxygene", "parser3", "perl", "pf", "pgsql", "php-template", "php", "plaintext", "pony", "powershell", "processing", "profile", "prolog", "properties", "protobuf", "puppet", "purebasic", "python-repl", "python", "q", "qml", "r", "reasonml", "rib", "roboconf", "routeros", "rsl", "ruby", "ruleslanguage", "rust", "sas", "scala", "scheme", "scilab", "scss", "shell", "smali", "smalltalk", "sml", "sqf", "sql", "stan", "stata", "step21", "stylus", "subunit", "swift", "taggerscript", "tap", "tcl", "thrift", "tp", "twig", "typescript", "vala", "vbnet", "vbscript-html", "vbscript", "verilog", "vhdl", "vim", "wasm", "wren", "x86asm", "xl", "xml", "xquery", "yaml", "zephir"];

languageList.sort();
for (const lang of languageList) {
  const sel = document.createElement("option");
  sel.textContent = lang;
  langSel.appendChild(sel);
}
langSel.value = "javascript"; // default

const theme =
  "https://unpkg.com/@highlightjs/cdn-assets@11.11.1/styles/github.min.css";
let themecss = "";
(async () => {
  const data = await fetch(theme);
  themecss = await data.text();
  regen();
})();

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

copybutton.addEventListener("click", () => {
  const doc = output.contentWindow.document;
  const targethtml = doc.getElementById("target").getHTML();
  const data = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    ${targethtml}
    <style>${themecss}</style>
  </body>
</html>`;

  console.log(data);

  navigator.clipboard.writeText(data).then(() => {
    copybutton.textContent = "コピーしました";
    setTimeout(() => {
      copybutton.textContent = "コードをコピー";
    }, 2000);
  });
});

function regen() {
  // prettier-ignore
  const template = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="target">
      <pre id="target"><code class="language-${langSel.value}">${escapeHtml(code.value)}</code></pre>
    </div>
    <style>${themecss}</style>
    <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
  </body>
</html>`;
  output.srcdoc = template;
}

for (const i of inputs) {
  i.addEventListener("input", () => regen());
}
