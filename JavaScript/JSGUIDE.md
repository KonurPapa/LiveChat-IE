<b>When writing JavaScript for <em>LiveChat IE</em>, please follow these general syntax rules.</b>
<br>
<br>
1 - <b>Always</b> indent code inside a function/loop.
```
function dog() {
    console.log("Woof!");
};
```
is more readable than
```
function dog() { console.log("Woof!"); };
```
<br>
2 - <b>Always</b> end lines with a semicolon. It's a better practice to write a line like <code>var dog = true;</code> than it is to write <code>var dog = true</code>.
<br>
<br>
3 - <b>Always</b> add whitespace before and after a logical operator (`+`, `%`, `=`, etc). `dog = "can" + "ine"` is more readable than `dog="can"+"ine"`.
<br>
<br>
4 - <b>Never</b> release new features without having them thoroughly tested beforehand. New features can potentially break others, and it is often very difficult for a developer to test every minutiae an update may bring.
