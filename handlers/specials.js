module.exports = {
    Specials: {
        Default: function() {
            return this.message('specials').then(message => {
                this.confirm(message);
                return this.toIntent('_AskContact');
            });
        },
        _AskContact: {
            Default: function() {
                this.suggestion('Yes', 'No');
                this.ask('Would you like to hear our contact information?')
            },
            Yes: function() {
                return this.toGlobalIntent('Contact');
            },
            No: function() {
                this.confirm('Okay, you can get that later.');
                return this.toGlobalIntent('Help');
            },
            Unknown: function() {
                this.ask(this.iterate([
                    'What was that? I was expecting a yes or no answer. Would you like to hear our contact information?',
                    'Sorry, I still didn\'t hear you. One more time?'
                ]));
            }
        },
        Help: function() {
            this.suggestion('Go Back');
            this.ask(this.iterate([
                'If you\'ve had enough of specials, you can say \'go back\''
            ]));
        },
        Back: function() {
            this.confirm('I\'ll stop talking about specials now.');
            return this.toGlobalIntent('Help');
        },
        Unknown: function() {
            this.confirm(this.random(this.constants.FALLBACKS));
            this.ask('Shall we talk about something else, or would you like hear another one?');
        }
    }
};