module.exports = {
    Contact: {
        Default: function() {
            return this.toIntent('Website');
        },
        _AskPhone: {
            Default: function() {
                this.suggestion('Yes', 'No');
                this.ask('Would you like to know the phone number as well?');
            },
            Yes: function() {
                this.setFollowupIntent('Contact');
                return this.toIntent('Phone');
            },
            No: function() {
                this.confirm('Alright, you can always get it later.');
                return this.toGlobalIntent('Help');
            },
            Unknown: function() {
                this.ask(this.iterate([
                    'Pardon? Would you like the phone number?',
                    'Sorry, I still didn\'t hear you. One more time?'
                ]));
            }
        },
        Phone: function() {
            return this.message('phone').then(message => {
                this.data.told_phone = true;
                this.confirm(message);

                if (!this.data.told_website) {
                    return this.toIntent('_AskWebsite');
                } else {
                    return this.toGlobalIntent('Help');
                }
            });
        },
        _AskWebsite: {
            Default: function() {
                this.ask('Would you like to know the website as well?');
            },
            Yes: function() {
                this.setFollowupIntent('Contact');
                return this.toIntent('Website');
            },
            No: function() {
                this.confirm('Alright, you can always get it later.');
                return this.toGlobalIntent('Help');
            },
            Unknown: function() {
                this.ask(this.iterate([
                    'Pardon? Would you like the website address?',
                    'Sorry, I still didn\'t hear you. One more time?'
                ]));
            }
        },
        Website: function() {
            return this.message('website').then(message => {
                this.data.told_website = true;
                this.confirm(message);

                if (!this.data.told_phone) {
                    return this.toIntent('_AskPhone');
                } else {
                    return this.toGlobalIntent('Help');
                }
            });
        },
        Unknown: function() {
            this.ask(this.iterate([
                'Pardon? Would you like the phone number or the website?',
                'Sorry, I still didn\'t hear you. One more time?'
            ]));
        }
    },

    /*
     * Globally accessible
     */
    Phone: function() {
        this.setFollowupIntent('Contact');
        return this.toIntent('Phone');
    },
    Website: function() {
        this.setFollowupIntent('Contact');
        return this.toIntent('Website');
    }
};