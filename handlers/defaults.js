module.exports = {
    Welcome: function() {
        return this.message('welcome').then(message => {
            this.confirm(message);
            //this.confirm('Hi! Welcome to '+this.appConfig.appName+'! We are a voice app development company.');
            this.toIntent('Help');
        });
    },
    Stop: 'Cancel',
    Cancel: function() {
        this.close(this.random([
            'Goodbye!',
            'See you later!',
            'Let\'s talk again soon!',
        ]));
    },
    Help: function() {
        this.suggestion('Mission statement', 'Specials', 'Contact Info');
        this.ask('What shall we talk about next? I can tell you our mission statement, our specials, or our contact information.');
    },
    More: 'Help',
    Unknown: function() {
        //confirm instead of ask to prevent repeating of fallback message
        if (this.data.unknownCount > 3) {
            this.close(this.random([
                'I\'m having too much difficulty understanding you at the moment. Let\'s do this again another time.',
                'This is too hard, you\'re not making any sense. Talk to me again soon',
                'I still can\'t figure out what you want. Come back later and maybe I\'ll understand you better'
            ]))
        } else {
            this.confirm(this.random(this.constants.FALLBACKS));
            this.ask();
        }
    },
    NoInput: function() {
        /*
         * Google only
         */
        this.reprompt();
    },
    Repeat: function() {
        this.confirm(this.random([
            'I\'ll repeat that for you.',
            'I\'ll say that again.',
            'I said:'
        ]));
        this.ask(this.data.lastMessage);
    },
    Back: function() {
        return this.toIntent('Help');
    }
};