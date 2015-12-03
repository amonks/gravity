## url params and defaults

usage, eg: 

* [gravity?playerHeight=40&playerStroke=black](http://ss.cx/~ajm/gravity?playerHeight=40&playerStroke=black)
* [gravity?&playerStroke=black&showPlanets=true&planetCount=1](http://ss.cx/~ajm/gravity?&playerStroke=black&showPlanets=true&planetCount=1)
* [gravity/?&playerStroke=black&showPlanets=true&planetCount=5&planetLineWidth=50&jumpHeight=20&playerWidth=50&playerHeight=50&playerFill=red](http://ss.cx/~ajm/gravity?&playerStroke=black&showPlanets=true&planetCount=5&planetLineWidth=50&jumpHeight=20&playerWidth=50&playerHeight=50&playerFill=red)
* [gravity?&playerStroke=black&showPlanets=true&planetCount=5&planetLineWidth=1&jumpHeight=5&playerFill=white](http://ss.cx/~ajm/gravity/?&playerStroke=black&showPlanets=true&planetCount=5&planetLineWidth=1&jumpHeight=5&playerFill=white)

```
"msPerFrame": 1,        // miliseconds for each frame
"gravitationalConstant": 100, // used in newton's equation
"jumpHeight": 15,
"showPlanets": "false", // enable drawing planets
"widthRange": 50,       // range of planet masses
"widthMin": 70,         // planet minimum mass (random() * widthRange + widthMin)
"autojump": "true",     // automatically jump upon landing
"planetColor": "black",
"playerStroke": "red",  // accepts css colors
"playerFill": "green",  // accepts css colors
"playerWidth": 1,       // width of player rectangle
"playerHeight": 1,      // height of player rectangle
"planetLineWidth": 1,   // planet outline width
"playerLineWidth": 1,   // player rectangle ilne width
"planetCount": 4        // number of planets
```
