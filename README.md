# **Music Visualizer**

### [Live App](http://music-vis-js.herokuapp.com)
![Photo1](https://i.imgur.com/df8Bczn.png) 


This music visualizer was made using **JavaScript**, **Three.js**, and the **Web Audio API**. Watch as the earth and its surrounding
colorful sound waves react to your uploaded track. By extracting and modulating the frequencies of the user's input song, vertices of the rendered objects
are displaced in realtime in 3D space. 

### **Code Snippet**

**Helper Methods For Audio Analysis**
 
``` javascript
    
    function fraction(val, minVal, maxVal) {
        return (val - minVal) / (maxVal - minVal);
    }

    function modulate(val, minVal, maxVal, outMin, outMax) {
        var frac = fraction(val, minVal, maxVal);
        var delta = outMax - outMin;
        return outMin + (frac * delta);
    }

    function avg(arr) {
        var total = arr.reduce(function (sum, b) { return sum + b; });
        return (total / arr.length);
    }

    function max(arr) {
        return arr.reduce(function (a, b) { return Math.max(a, b); })
    }

```




### **Future Features**
* Optimizations
* Functionality to customize the color and number of outer rings
* Incorporating Spotify API to allow user's to view visualization of any tracks in the Spotify database

