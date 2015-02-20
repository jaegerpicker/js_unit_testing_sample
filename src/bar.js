var Bar = {
    hello: function(name) {
        if(!name) {
            throw new Error("It's rude to not introduce yourself");
        }
        return "Hello " + name + "!";
    },

    delayedHello: function(name, cb) {
        setTimeout(function(self) {
            try {
                cb(null, self.hello(name));
            } catch(err) {
                cb(err);
            }
        }, 1000, this);

    },

    printName: function(func_name) {
        func_name();
        return true;
    }

}

module.exports = Bar;
