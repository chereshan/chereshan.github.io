let msg = "Hello," + "world"; //Образует строку "Hello, world"
let name = 'egor';
let greeting = "Welcome to my blog," + " " + name;

let s = "Hello, world";

console.log(
    s.substring(1,4),
    s.slice (1,4),
    s.slice(-3),
    s.split(", "),
    s.indexOf("1"),
    s.indexOf("1", 3),
    s.indexOf("zz"),
    s.lastIndexOf("l"),
    s.startsWith("Hell"),
    s.endsWith("!"),
    s.includes("or"),
    s.replace ("Но", "уа"),
    s.toLowerCase(),
    s.toUpperCase(),
    " test ".trim(),
    s.concat ("!"),
    " о " .repeat(5),
    s[0],
    s[s.length-1]
);

// Шаблонные литералы
let greetings = `Hello ${ name }.`;
console.log(greetings);