<b>When writing JavaScript for <em>LiveChat IE</em>, please follow these general syntax rules.</b>
<br>
<br>
1 - <b>Always</b> indent code inside a function/loop.
```javascript
function dog() {
    console.log("Woof!");
};
```
is more readable than
```javascript
function dog() { console.log("Woof!"); };
```
<br>
2 - <b>Always</b> end lines with a semicolon. It's a better practice to write a line like
```javascript
var dog = true;
```
than it is to write
```javascript
var dog = true
```
<br>
3 - <b>Always</b> add whitespace before and after a logical operator (<code>+</code>, <code>%</code>, <code>=</code>, etc). <code>dog = "can" + "ine"</code> is more readable than <code>dog="can"+"ine"</code>.
<br>
<br>
4 - <b>Never</b> release new features without having them thoroughly tested beforehand. New features can potentially break others, and it is often very difficult for a developer to test every minutiae an update may bring.
