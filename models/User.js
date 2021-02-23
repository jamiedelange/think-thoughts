const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Please provide a username',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'Please provide an e-mail address',
            unique: true,
            trim: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;