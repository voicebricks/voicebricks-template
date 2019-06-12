module.exports = {
    Mission: {
        Default: function() {
            return this.message('mission').then(message => {
                this.confirm(message);
                return this.toIntent('_AskSpecials');
            });
        },
        _AskSpecials: {
            Default: function() {
                this.suggestion('Yes', 'No');
                this.ask('Would you like to know our specials?');
            },
            Yes: function() {
                return this.toGlobalIntent('Specials');
            },
            No: function() {
                this.confirm('Okay, we can talk about it later.');
                return this.toGlobalIntent('Help');
            },
            Unknown: function() {
                this.ask(this.iterate([
                    'What was that? I was expecting a yes or no answer. Would you like to know about our specials?',
                    'Sorry, I still didn\'t hear you. One more time?'
                ]));
            }
        }
    }
};